import type { MetadataRoute } from 'next';
import { STOREFRONT_ROUTES, getStorefrontRouteForProduct } from '@/lib/products';
import { publicProducts } from '@/lib/catalog-withholding';

const SITE_URL = 'https://queerpathways.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/shop`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/prepare`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // Category routes stay: the withheld line is a product set, not a route. The
  // affected categories carry other inventory and remain valid destinations.
  const routeRoutes: MetadataRoute.Sitemap = STOREFRONT_ROUTES.filter((route) => route.slug !== 'loop-subscription').map((route) => ({
    url: `${SITE_URL}/shop/${route.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Withheld products are omitted here as well as at the route level, so a
  // pending-consent SKU cannot be discovered through the sitemap.
  const productRoutes: MetadataRoute.Sitemap = publicProducts().map((product) => ({
    url: `${SITE_URL}/shop/${getStorefrontRouteForProduct(product)}/${product.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...routeRoutes, ...productRoutes];
}
