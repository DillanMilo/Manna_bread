import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Lora, Libre_Franklin } from 'next/font/google';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { StructuredData } from '@/components/seo/StructuredData';
import { createPageMetadata, SITE_URL } from '@/lib/seo';
import { siteStructuredData } from '@/lib/structuredData';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-accent',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1E2A23',
};

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...createPageMetadata({
    title: 'Bread from Heaven | Manna Bakery',
    description:
      'Manna Bakery is a handcrafted bakery, cafe, and gathering place in Tomball, Texas—made for good food, unhurried moments, and community.',
    path: '/',
  }),
  verification: googleSiteVerification
    ? {
        google: googleSiteVerification,
      }
    : undefined,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable} ${libreFranklin.variable}`}>
      <body className="font-body bg-brand-forest text-brand-warm-white antialiased">
        <StructuredData data={siteStructuredData} />
        <Navigation />
        {children}
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
