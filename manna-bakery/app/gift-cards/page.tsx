import { Button } from '@/components/ui/Button';
import { TOAST } from '@/lib/constants';

export default function GiftCardsPage() {
  return (
    <main className="pt-32 md:pt-40 pb-20 md:pb-28 bg-brand-warm-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-cognac mb-4">
          Gift Cards
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-medium text-brand-walnut leading-tight mb-8">
          Give the gift of Manna
        </h1>

        <div className="bg-brand-soft-cream rounded-2xl p-12 mb-8">
          <p className="font-body text-brand-olive mb-6">
            [ Toast Gift Card Embed ]
          </p>
          <Button href={TOAST.giftCards} external variant="accent">
            Purchase Gift Card
          </Button>
        </div>
      </div>
    </main>
  );
}
