import type { MetadataRoute } from 'next';

const SITE_URL = 'https://queerpathways.com';

// Three entries. The shop taxonomy is de-indexed, so listing it here would contradict
// the robots directive on the /shop segment. The withheld-product and storefront-route
// imports are gone with it: there is nothing left to disclose, and an import that
// cannot produce a live URL is how a sitemap drifts back open.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
    // /prepare is a live holding page, not taxonomy, so it stays. The ruling took the
    // /shop taxonomy out of the index and nothing else.
    { url: `${SITE_URL}/prepare`, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
