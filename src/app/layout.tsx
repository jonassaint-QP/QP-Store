import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AgeGate from "@/components/AgeGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://queerpathways.com";

export const metadata: Metadata = {
  // "./" resolves against metadataBase AND the current route, so every page declares
  // its own URL as canonical. A plain "/" would resolve to the home page for every
  // descendant, telling Google that /about, /prepare and every product page are
  // duplicates of the homepage. Verified per-route on Next 16.2.7.
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "./" },
  title: "Queer Pathways — High-Fidelity Kink Infrastructure",
  description:
    "A dedicated, identity-fluent digital commerce ecosystem built for the queer, gay, trans, and neurodivergent kink communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <AgeGate>{children}</AgeGate>
      </body>
    </html>
  );
}
