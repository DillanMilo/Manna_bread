import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { KitchenMoments } from '@/components/kitchen-moments/KitchenMoments';

export const metadata: Metadata = {
  title: 'Kitchen Moments with Christin | Manna Bakery · Design preview',
  description: 'A local design preview of recipes, kitchen stories and seasonal notes from Manna Bakery.',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function KitchenMomentsPage() {
  // Deliberately unavailable in every production build, including previews.
  if (process.env.NODE_ENV !== 'development') notFound();

  return <KitchenMoments />;
}
