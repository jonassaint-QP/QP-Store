/**
 * SBLC Cancel-Flow Fixture Seed (Sandbox-Only)
 *
 * Inserts a single test subscription row so the /membership/manage cancel
 * button can be verified end-to-end without touching production billing.
 *
 * Guards (hard refuse):
 *  - ALLOW_TEST_SEED must be exactly 'true'
 *  - DATABASE_URL host must be in the sandbox allowlist
 *    (localhost, 127.0.0.1, sandbox, staging, test)
 *
 * Usage:
 *   ALLOW_TEST_SEED=true DATABASE_URL=<sandbox-url> npm run seed:test-subscription
 */
import { getDb } from '../src/db';
import { subscriptions } from '../src/db/schema';

const ALLOWLIST = new Set(['localhost', '127.0.0.1', 'sandbox', 'staging', 'test']);

function hostFromUrl(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url.split('@').pop()?.split(':')[0] ?? '';
  }
}

async function main() {
  if (process.env.ALLOW_TEST_SEED !== 'true') {
    throw new Error('Refusing to seed: set ALLOW_TEST_SEED=true to run the sandbox fixture seed.');
  }

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('Refusing to seed: DATABASE_URL is not set.');
  }

  const host = hostFromUrl(dbUrl);
  if (!ALLOWLIST.has(host)) {
    throw new Error(`Refusing to seed: host "${host}" is not in the sandbox allowlist.`);
  }

  const db = getDb();

  const [row] = await db
    .insert(subscriptions)
    .values({
      email: 'sblc-fixture@queerpathways.test',
      tier: 'standard',
      productLabel: 'Sovereign Body Lube Club — Standard (Test Fixture)',
      sku: 'SBLC-FIXTURE-001',
      pricePerShipment: '0.00',
      billingDay: 1,
      intervalMonths: 1,
      status: 'active',
      founding: false,
      nextChargeDate: new Date('2027-01-01T00:00:00Z'),
      shippingAddress: null,
      nmiVaultId: null,
      lastOrderId: null,
    })
    .returning({ id: subscriptions.id });

  console.log(`Seeded sandbox fixture subscription id=${row.id}`);
  console.log('Use this id as the subscription reference when testing /membership/manage cancel.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
