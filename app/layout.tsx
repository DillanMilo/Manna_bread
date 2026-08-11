import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Lora, Libre_Franklin } from 'next/font/google';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { BRAND } from '@/lib/constants';
import { SOCIAL_SHARE_IMAGE, SOCIAL_SHARE_IMAGE_URL } from '@/lib/seo';
import { getSiteUrl } from '@/lib/siteUrl';
import { createSiteStructuredData, serializeStructuredData } from '@/lib/structuredData';
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

const siteUrl = getSiteUrl();
const siteStructuredData = createSiteStructuredData();
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1E2A23',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${BRAND.name} | ${BRAND.tagline}`,
  description: BRAND.description,
  openGraph: {
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: BRAND.description,
    url: siteUrl,
    siteName: BRAND.name,
    images: [SOCIAL_SHARE_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: BRAND.description,
    images: [SOCIAL_SHARE_IMAGE_URL],
  },
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
        <script
          id="manna-site-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(siteStructuredData) }}
        />
        <Navigation />
        {children}
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
