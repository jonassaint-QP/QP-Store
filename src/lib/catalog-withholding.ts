/**
 * Public catalog withholding — pending-consent brand withdrawal.
 *
 * AUTHORITY
 * Founder decision 2026-09-16: withhold the M.D. Science Lab / Swiss Navy
 * line from public merchandising immediately rather than waiting for the
 * Authorized Online Seller Agreement. The Sovereign Body Lube Club is
 * suspended separately (src/lib/subscriptions.ts, LIVE_TIERS empty).
 *
 * WHY THIS IS A READ-TIME PROJECTION AND NOT A REGISTRY EDIT
 * An earlier attempt at this change rewrote src/lib/products.ts and reduced a
 * ~64KB catalogue to a 214-byte comment stub, deleting roughly ninety records
 * including inventory that has nothing to do with this brand. That branch was
 * deleted unmerged. The lesson is encoded here: the withdrawal is a read-time
 * filter over the registry, so the registry can never be damaged by it.
 *
 * PRESERVATION RULE
 * No Product record is deleted, edited or moved. Images, specs, pricing and
 * classification history all survive intact. Restoration is a one-line change
 * to the predicate, not a re-add.
 *
 * ROUTING
 * Withheld products 404 on direct URL and disappear from listings, sitemaps
 * and related-product blocks. 404 rather than 410 because the withdrawal
 * reverses on signature; 410 would tell search engines the removal is
 * permanent.
 */
import {
  PRODUCTS,
  getProductBySlug as getProductBySlugFromRegistry,
  getProductsByStorefrontRoute as getProductsByStorefrontRouteFromRegistry,
  type StorefrontRouteSlug,
} from '@/lib/products';

/** Machine-readable withdrawal status. */
export const PENDING_CONSENT_STATUS =
  'WITHHELD — PENDING M.D. SCIENCE ONLINE-SELLER CONSENT AND MAP AGREEMENT' as const;

export const CATALOGUE_SUSPENDED = true;

/**
 * Brand-family SKU prefixes for the withheld line. Derived from
 * src/lib/sku-registry.ts, where every affected SKU is documented.
 *
 * A prefix predicate is used because sku-registry.ts has no brand or
 * manufacturer field, and every Swiss Navy SKU is filed under vendor
 * 'Eldorado Trading Company' — the distributor. A vendor predicate would
 * sweep the entire Eldorado assortment.
 */
export const WITHHELD_SKU_PREFIXES = ['SNSL', 'SNWL', 'SNWB'] as const;

/** Normalized brand tokens, used as a secondary signal. */
const WITHHELD_NAME_TOKENS = ['SWISSNAVY', 'SWISS-NAVY'] as const;

/**
 * SKUs present in sku-registry.ts with NO Product record. A PRODUCTS-only
 * sweep cannot see these, which is why the predicate is applied by name and
 * prefix rather than by joining the two files.
 *
 * SNSL16 and SNSL32 are Sovereign Body Lube Club tiers (Main Stage, Throne).
 */
export const WITHHELD_REGISTRY_ONLY_SKUS = ['SNSL2', 'SNSL16', 'SNSL32'] as const;

/** SKUs named in earlier inventories that exist nowhere. Recorded as absent. */
export const NAMED_BUT_ABSENT_SKUS = ['SNMASTCREAM5'] as const;

/** Shelied registry record inside the predicate. Not merchandised; preserved. */
export const WITHHELD_SHELVED_RECORD_IDS = ['c-14'] as const;

/**
 * In-house Loop formulas. Queer Pathways-owned, unrelated to the pending
 * brand, and explicitly protected so no future sweep can absorb them.
 */
export const PROTECTED_LOOP_FORMULAS = [
  'LP-01-SRC',
  'LP-02-BSL',
  'LP-03-TNS',
  'LP-10-CMP',
] as const;

function readString(source: unknown, key: string): string {
  if (!source || typeof source !== 'object') return '';
  const value = (source as Record<string, unknown>)[key];
  return typeof value === 'string' ? value : '';
}

function normalize(value: string): string {
  return value.trim().toUpperCase().replace(/[\s_]+/g, '');
}

/**
 * True when a bare SKU belongs to the withheld brand family. Exported because
 * the Club suspension and any future checkout guard read the same rule.
 */
export function isWithheldBrandSku(sku: string | undefined | null): boolean {
  if (!sku) return false;
  const normalized = normalize(sku);
  if ((PROTECTED_LOOP_FORMULAS as readonly string[]).includes(normalized)) return false;
  return WITHHELD_SKU_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

/**
 * True when a Product record must be withheld.
 *
 * Shape-agnostic on purpose: it reads sku, id, slug and name by key rather
 * than by declared type, so it compiles and behaves correctly whether or not
 * the record carries an explicit sku field.
 */
export function isWithheldProduct(product: unknown): boolean {
  if (!product || typeof product !== 'object') return false;

  const sku = readString(product, 'sku');
  const id = readString(product, 'id');
  const slug = readString(product, 'slug');
  const name = readString(product, 'name');

  const identifiers = [sku, id, slug].filter(Boolean).map(normalize);
  if (identifiers.some((value) => (PROTECTED_LOOP_FORMULAS as readonly string[]).includes(value))) {
    return false;
  }

  if (identifiers.some((value) => WITHHELD_SKU_PREFIXES.some((prefix) => value.startsWith(prefix)))) {
    return true;
  }

  const normalizedName = normalize(name || slug);
  return WITHHELD_NAME_TOKENS.some((token) => normalizedName.includes(token));
}

/**
 * The public catalogue. Every consumer surface reads this instead of PRODUCTS.
 *
 * Return type is inferred from PRODUCTS, so element typing is identical to the
 * registry — consumers keep `product.slug`, `product.name` and so on unchanged.
 */
export function publicProducts(): typeof PRODUCTS {
  return PRODUCTS.filter(
    (product) => !CATALOGUE_SUSPENDED && !isWithheldProduct(product)
  );
}

/** Public replacement for getProductBySlug. Withheld slugs resolve to undefined. */
export function getPublicProductBySlug(
  slug: string
): ReturnType<typeof getProductBySlugFromRegistry> {
  const product = getProductBySlugFromRegistry(slug);
  if (CATALOGUE_SUSPENDED || !product || isWithheldProduct(product)) return undefined;
  return product;
}

/** Public replacement for getProductsByStorefrontRoute. */
export function getPublicProductsByStorefrontRoute(
  storefrontRouteSlug: StorefrontRouteSlug
): ReturnType<typeof getProductsByStorefrontRouteFromRegistry> {
  return getProductsByStorefrontRouteFromRegistry(storefrontRouteSlug).filter(
    (product) => !CATALOGUE_SUSPENDED && !isWithheldProduct(product)
  );
}

/**
 * Inventory artifact for review. States what matched, what has no Product
 * record, what was named but does not exist, and what is protected — so the
 * absence of SNMASTCREAM5 is documented rather than silently dropped.
 */
export function buildWithdrawalInventory() {
  const withheld = PRODUCTS.filter((product) => isWithheldProduct(product));

  return {
    status: PENDING_CONSENT_STATUS,
    withheldAt: '2026-09-16',
    predicate: `SKU prefix in [${WITHHELD_SKU_PREFIXES.join(', ')}], or brand token in name`,
    restorationCondition:
      'M.D. Science Authorized Online Seller Agreement AND MAP Pricing Agreement executed',
    withheldProductCount: withheld.length,
    withheldProductIds: withheld.map((product) => readString(product, 'id')),
    withheldProductSlugs: withheld.map((product) => readString(product, 'slug')),
    publicProductCount: publicProducts().length,
    registryOnlySkus: [...WITHHELD_REGISTRY_ONLY_SKUS],
    namedButAbsentSkus: [...NAMED_BUT_ABSENT_SKUS],
    withheldShelvedRecordIds: [...WITHHELD_SHELVED_RECORD_IDS],
    protectedLoopFormulas: [...PROTECTED_LOOP_FORMULAS],
  };
}
