import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';
import Section from '@/components/Section';

export const metadata: Metadata = {
  title: 'Terms of Service — Queer Pathways',
  description:
    'Terms of service for Queer Pathways LLC, including ordering, shipping, refund, and privacy terms.',
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      lastUpdated="September 16, 2026"
    >
      <Section heading="1. Agreement">
        <p>
          By accessing or purchasing from queerpathways.com you agree to these
          terms. These terms govern retail orders placed through the storefront.
          Clinical services are governed separately and operate on a distinct
          domain and clinical record system.
        </p>
      </Section>

      <Section heading="2. Eligibility">
        <p>
          You must be 18 years of age or older to order. By placing an order you
          confirm you meet that requirement.
        </p>
      </Section>

      <Section heading="3. Orders">
        <p>
          All orders are subject to acceptance and availability. We may decline
          or cancel an order where a product is unavailable, where pricing or
          description contains an error, or where an order appears fraudulent.
        </p>
      </Section>

      <Section heading="4. Shipping">
        <p>
          We ship to United States addresses only. Shipping timelines are
          estimates and are not guaranteed.
        </p>
      </Section>

      <Section heading="5. Refund Policy">
        <p>
          All completed charges and shipments are final and are not refundable,
          except where a product arrives damaged or defective or we shipped the
          wrong item. The full storefront refund policy at /refund-policy
          governs and controls where it differs from this summary.
        </p>
      </Section>

      <Section heading="6. Privacy">
        <p>
          We collect only the information required to fulfil your order and
          meet our legal obligations. We do not sell customer data.
        </p>
      </Section>

      <Section heading="7. Contact">
        <p>
          Legal and order inquiries: jonassaint@queerpathways.org. Write to this
          address for any question about these terms or about an order.
        </p>
      </Section>

      <Section heading="8. Changes">
        <p>
          We may update these terms. The version published on this page at the
          time of your order governs that order.
        </p>
      </Section>
    </LegalLayout>
  );
}
