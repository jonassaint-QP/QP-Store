import type { Metadata } from 'next';

// The shop taxonomy is deliberately de-indexed while the storefront is dormant. The
// homepage and /about stay indexable and act as the card for the domain. The practice
// site's /shop gateway is a separate page on a separate host and is unaffected by this.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ShopLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
