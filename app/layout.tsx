import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Lora, Libre_Franklin } from 'next/font/google';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { BRAND } from '@/lib/constants';
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

function getSiteUrl() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    'manna-bread.vercel.app';

  return siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`;
}

const siteUrl = getSiteUrl();
const shareImage = '/images/manna-logo-share.png';

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
    images: [
      {
        url: shareImage,
        width: 1050,
        height: 600,
        type: 'image/png',
        alt: 'Manna — Cafe and Bakery, Bread from Heaven',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: BRAND.description,
    images: [shareImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable} ${libreFranklin.variable}`}>
      <body className="font-body bg-brand-forest text-brand-warm-white antialiased">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
