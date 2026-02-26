import type { Metadata } from 'next';
import { Playfair_Display, Cormorant_Garamond, Libre_Franklin } from 'next/font/google';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { BRAND } from '@/lib/constants';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-accent',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const libre = Libre_Franklin({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${BRAND.name} | ${BRAND.tagline}`,
  description: BRAND.description,
  openGraph: {
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: BRAND.description,
    images: [
      {
        url: '/images/Bread from Heaven.PNG',
        width: 1050,
        height: 600,
        alt: 'Manna — Cafe and Bakery, Bread from Heaven',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: BRAND.description,
    images: ['/images/Bread from Heaven.PNG'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${libre.variable}`}>
      <body className="font-body bg-brand-warm-white text-brand-charcoal antialiased">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
