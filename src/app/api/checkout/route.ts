import { after, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { store_orders } from '@/db/schema';
import { eq, gte, and, sql } from 'drizzle-orm';
import { PRODUCTS, type Product } from '@/lib/products';

// Hard cap negotiated with merchant processor (Lane 1 mandate: $30,000 monthly volume)
const MONTHLY_VOLUME_LIMIT = 30000;
const WARNING_THRESHOLD = MONTHLY_VOLUME_LIMIT * 0.85; // $25,500
const ALLOWED_CURRENCIES = new Set(['USD', 'CAD']);
const MAX_ITEM_QUANTITY = 99;

type IncomingCartItem = {
  id?: unknown;
  quantity?: unknown;
  // Deliberately ignored: the browser must never determine price.
  price?: unknown;
};

type NormalizedCartItem = {
  id: string;
  sku: string | null;
  name: string;
  quantity: number;
  unitPriceUSD: number;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cartItems, customerInfo, shippingAddress, currency = 'USD' } = body;

    // Guard: customer identity is required before any pricing or persistence
    if (!customerInfo?.name || !customerInfo?.email) {
      return NextResponse.json(
        { error: 'Customer name and email are required.' },
        { status: 400 }
      );
    }

    // Guard: nothing to check out
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty.' },
        { status: 400 }
      );
    }

    if (typeof currency !== 'string' || !ALLOWED_CURRENCIES.has(currency)) {
      return NextResponse.json(
        { error: 'Unsupported currency.' },
        { status: 400 }
      );
    }

    const normalizedItems = normalizeCartItems(cartItems);
    if (!normalizedItems.ok) {
      return NextResponse.json({ error: normalizedItems.error }, { status: 400 });
    }

    // Server-authoritative pricing: only catalog prices reach the total and NMI payload.
    const amount = calculateTotal(normalizedItems.items, currency);
    const numericAmount = Number.parseFloat(amount);

    // Velocity check: rolling 30-day paid volume
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const db = getDb();
    const volumeResult = await db
      .select({ totalVolume: sql<number>`sum(${store_orders.totalAmount})` })
      .from(store_orders)
      .where(
        and(
          eq(store_orders.status, 'paid'),
          gte(store_orders.updatedAt, thirtyDaysAgo)
        )
      );

    const currentVolume = Number(volumeResult[0]?.totalVolume || 0);
    const projectedVolume = currentVolume + numericAmount;

    // Enforce the hard cap (100%)
    if (projectedVolume > MONTHLY_VOLUME_LIMIT) {
      console.warn(`[VELOCITY LIMIT BREACHED] Transaction rejected. Projected volume: $${projectedVolume}`);
      return NextResponse.json(
        { error: 'We are currently unable to process new orders. Please contact support.' },
        { status: 429 }
      );
    }

    // Soft warning alert (85%) — runs after response via context.waitUntil()
    if (projectedVolume >= WARNING_THRESHOLD) {
      after(async () => {
        try {
          await triggerAdminAlert(projectedVolume);
        } catch (err) {
          console.error('Failed to send admin velocity alert:', err);
        }
      });
    }

    // Persist the normalized pending order before any NMI call.
    const [newOrder] = await db.insert(store_orders).values({
      customerName: customerInfo.name,
      email: customerInfo.email,
      totalAmount: amount,
      status: 'pending',
      shippingAddress: shippingAddress || null,
      items: normalizedItems.items,
      createdAt: new Date(),
    }).returning({ id: store_orders.id });

    // Hard guard: no order reference means no gateway handoff.
    if (!newOrder?.id) {
      console.error('Checkout guard: pending order insert returned no order id.');
      return NextResponse.json(
        { error: 'We could not create the order. Please try again.' },
        { status: 400 }
      );
    }

    // Step 1 of NMI Three-Step Redirect — server-to-server only
    const nmiSecurityKey = process.env.NMI_SECURITY_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.DEPLOY_PRIME_URL || 'https://queerpathways.com';
    const redirectUrl = `${baseUrl}/api/webhooks/payment`;

    const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
      <sale>
        <api-key>${nmiSecurityKey}</api-key>
        <redirect-url>${redirectUrl}</redirect-url>
        <amount>${amount}</amount>
        <order-id>${newOrder.id}</order-id>
      </sale>`;

    const nmiResponse = await fetch('https://secure.networkmerchants.com/api/v2/three-step', {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: xmlPayload,
    });

    const nmiXmlResponse = await nmiResponse.text();
    const formUrlMatch = nmiXmlResponse.match(/<form-url>(.*?)<\/form-url>/);

    if (!formUrlMatch || !formUrlMatch[1]) {
      console.error('NMI Gateway Error:', nmiXmlResponse);
      return NextResponse.json({ error: 'Failed to initialize payment gateway.' }, { status: 500 });
    }

    return NextResponse.json({ formUrl: formUrlMatch[1], orderId: newOrder.id });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : String(error);
    const errStack = error instanceof Error ? error.stack : undefined;
    console.error('Checkout Initialization Error:', { message: errMessage, stack: errStack });
    return NextResponse.json(
      { error: 'Internal Server Error', details: errMessage },
      { status: 500 },
    );
  }
}

function normalizeCartItems(
  items: unknown[],
): { ok: true; items: NormalizedCartItem[] } | { ok: false; error: string } {
  const productsById = new Map(PRODUCTS.map((product) => [product.id, product]));
  const normalized: NormalizedCartItem[] = [];

  for (const item of items as IncomingCartItem[]) {
    if (typeof item?.id !== 'string') {
      return { ok: false, error: 'Cart contains an invalid product.' };
    }

    const product = productsById.get(item.id);
    if (!product) {
      return { ok: false, error: 'Cart contains an unavailable product.' };
    }

    const quantity = item.quantity === undefined ? 1 : Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_ITEM_QUANTITY) {
      return { ok: false, error: 'Cart contains an invalid quantity.' };
    }

    normalized.push({
      id: product.id,
      sku: product.sku ?? null,
      name: product.name,
      quantity,
      unitPriceUSD: product.price,
    });
  }

  return { ok: true, items: normalized };
}

async function triggerAdminAlert(projectedVolume: number): Promise<void> {
  console.warn(`[VELOCITY SOFT WARNING] Volume is at $${projectedVolume}, exceeding the 85% threshold.`);

  const webhookUrl = process.env.ADMIN_ALERT_WEBHOOK_URL;
  if (!webhookUrl) return;

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `🚨 High Volume Alert: Rolling 30-day merchant volume is projected at $${projectedVolume.toFixed(2)}, exceeding the 85% threshold of your $30,000 limit. Consider requesting a limit increase from PaymentCloud.`,
    }),
  });
}

function calculateTotal(items: NormalizedCartItem[], currency: string): string {
  const baseUSD = items.reduce(
    (sum, item) => sum + item.unitPriceUSD * item.quantity,
    0,
  );
  // 1 USD = 1.38 CAD — existing storefront conversion, retained for staging.
  return (currency === 'CAD' ? baseUSD * 1.38 : baseUSD).toFixed(2);
}
