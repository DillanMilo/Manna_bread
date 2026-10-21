import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { KitchenMoments } from '@/components/kitchen-moments/KitchenMoments';
import { isKitchenMomentsPreview } from '@/lib/kitchenMomentsPreview';

// Check the deployment guard for every request, including prebuilt deployments.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Kitchen Moments with Christin | Manna Bakery · Design preview',
  description: 'A design preview of recipes, kitchen stories and seasonal notes from Manna Bakery.',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function KitchenMomentsPage() {
  // Hosted access is opt-in and Preview-only; Production always returns 404.
  if (process.env.NODE_ENV !== 'development' && !isKitchenMomentsPreview()) notFound();

  return <KitchenMoments />;
}
