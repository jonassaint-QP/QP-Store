import type { Metadata } from 'next';

// /membership/manage/page.tsx carries 'use client', and a Client Component cannot export
// metadata. So the de-index goes here rather than in the page, the same mechanism /cart
// and /checkout already use. Founder's ruling 8 October: de-index this route and
// /conversations; both are storefront, not practice.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function MembershipManageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
