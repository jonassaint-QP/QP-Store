/**
 * Homepage grid metadata for the storefront route registry.
 *
 * WHY THIS FILE EXISTS
 * Two pieces of business logic were living inside the homepage component and
 * both were brittle:
 *
 *   1. Card labels were derived from array position
 *      (`Category ${String.fromCharCode(65 + index)}`). Inserting, removing,
 *      or reordering a route silently re-lettered every card after it, so
 *      "Category C" could come to mean a different product with no copy
 *      change anywhere. Labels are now explicit here and immutable.
 *
 *   2. `route.slug !== 'loop-subscription'` was a product rule hardcoded in
 *      the page. It is now the `showInHomepageGrid` flag on the record below.
 *      The page no longer knows any product slug.
 *
 * WHY IT IS NOT ON `StorefrontRoute`
 * The intended home for these fields is the route record itself. It is here
 * instead because the only write path available to us is a full-file rewrite,
 * and `products.ts` is ~64KB of live catalog data — rewriting it in full to
 * add two presentation fields risks corrupting the registry. This module is
 * the narrowest change that removes the coupling without touching catalog
 * data.
 *
 * THE GUARANTEE THAT MAKES IT SAFE
 * `GRID_META` is typed `Record<StorefrontRouteSlug, GridMeta>`. Add a route to
 * `STOREFRONT_ROUTES` without adding it here and the build fails at the type
 * check — a missing card cannot ship silently. That is a stronger guarantee
 * than an optional field on the route would have given.
 *
 * WHEN TO COLLAPSE THIS BACK
 * If a line-level patch path is ever restored, fold `label`, `ctaLabel`,
 * `titleOverride`, `subtitleOverride`, and `showInHomepageGrid` onto
 * `StorefrontRoute` in products.ts and delete this file. Nothing else depends
 * on it.
 */
import { STOREFRONT_ROUTES, type StorefrontRoute, type StorefrontRouteSlug } from '@/lib/products';

export type GridMeta = {
  /**
   * Stable, human-readable card label. Never derived from array position —
   * these letters are frozen to their slugs for the life of the grid.
   */
  label: string;
  /**
   * Explicit button copy. Never interpolate a descriptor into a verb — it
   * produced "View Anal Sex", "View Fisting", "View Lube".
   */
  ctaLabel: string;
  /**
   * Whether the route is merchandised on the homepage catalog grid. This is
   * the flag that used to be a slug comparison inside the page component.
   */
  showInHomepageGrid: boolean;
  /**
   * Presentation-layer title, used where the registry title carries an
   * explicit term that must not appear on the undifferentiated public
   * homepage grid (payment-processor high-risk adult merchant guidance).
   * Registry data is untouched; the category landing page is unaffected.
   */
  titleOverride?: string;
  /**
   * Optional card subtitle override, used where the registry descriptor is
   * identical to the title and would therefore render the same string twice.
   */
  subtitleOverride?: string;
};

/**
 * Keyed by `StorefrontRouteSlug`, so this is exhaustive by construction:
 * adding a route to `STOREFRONT_ROUTES` without a record here is a type error.
 */
export const GRID_META: Record<StorefrontRouteSlug, GridMeta> = {
  loop: {
    label: 'Category A',
    ctaLabel: 'Shop the Loop Line',
    showInHomepageGrid: true,
  },
  'anal-sex': {
    label: 'Category B',
    ctaLabel: 'Shop Ass Play',
    showInHomepageGrid: true,
    // Softened 2026-09-16 per merchant-policy review.
    titleOverride: 'Ass Play',
    subtitleOverride: 'Plugs, Probes & Dilators',
  },
  'loop-subscription': {
    label: 'Category C',
    ctaLabel: 'Explore the Club',
    showInHomepageGrid: false,
  },
  'black-sm': {
    label: 'Category D',
    ctaLabel: 'Shop Impact Gear',
    showInHomepageGrid: true,
  },
  'blue-light-oral': {
    label: 'Category E',
    ctaLabel: 'Shop Oral Play',
    showInHomepageGrid: true,
  },
  'green-hustler-sugar': {
    label: 'Category F',
    ctaLabel: 'Shop Power Dynamics',
    showInHomepageGrid: true,
  },
  'grey-bondage': {
    label: 'Category G',
    ctaLabel: 'Shop Bondage',
    showInHomepageGrid: true,
  },
  'red-fisting': {
    label: 'Category H',
    ctaLabel: 'Shop Depth Play',
    showInHomepageGrid: true,
    // Softened 2026-09-16 per merchant-policy review.
    titleOverride: 'Depth Play',
  },
  'yellow-watersports': {
    label: 'Category I',
    ctaLabel: 'Shop Specialty Hardware',
    showInHomepageGrid: true,
    subtitleOverride: 'Sheets, Suits & Specialty Gear',
  },
};

export type HomepageCard = {
  slug: StorefrontRouteSlug;
  label: string;
  title: string;
  subtitle: string | null;
  description: string;
  href: string;
  ctaLabel: string;
};

/**
 * The homepage catalog grid, derived from the route registry and filtered by
 * the registry-side merchandising flag. The page component consumes this and
 * holds no label logic and no product-slug knowledge of its own.
 */
export function getHomepageCards(): HomepageCard[] {
  return STOREFRONT_ROUTES.filter(
    (route: StorefrontRoute) => GRID_META[route.slug].showInHomepageGrid
  ).map((route: StorefrontRoute) => {
    const meta = GRID_META[route.slug];

    // Presentation overrides win. The registry is not modified.
    const title = meta.titleOverride ?? route.title;
    const subtitle = meta.subtitleOverride ?? route.descriptor;

    return {
      slug: route.slug,
      label: meta.label,
      title,
      // Suppressed rather than duplicated: on two routes the registry
      // descriptor is identical to the title, and rendering the same string
      // twice reads as a bug. Compared against the EFFECTIVE title, so a
      // softened title cannot collide with its descriptor. Registry data is
      // not modified — only the way the card presents it.
      subtitle: subtitle === title ? null : subtitle,
      description: route.description,
      href: `/shop/${route.slug}`,
      ctaLabel: meta.ctaLabel,
    };
  });
}
