import { Button } from '@/components/ui/Button';
import { GiftCardVine } from '@/components/ui/ScrollVine';
import { TOAST } from '@/lib/constants';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata(
  'Gift Cards',
  'Give the gift of Manna Bakery with a digital gift card for handcrafted food, warm hospitality, and time together.',
  '/gift-cards',
);

export default function GiftCardsPage() {
  return (
    <main className="relative isolate overflow-hidden pt-24 sm:pt-32 md:pt-40 pb-14 sm:pb-20 md:pb-28 bg-brand-forest min-h-screen">
      <GiftCardVine className="z-0 opacity-90" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
          Gift Cards
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-white leading-tight mb-6 sm:mb-8">
          Give the gift of Manna
        </h1>

        <div className="bg-brand-forest-mid/50 border border-white/10 rounded-2xl p-6 sm:p-8 md:p-12 mb-6 sm:mb-8">
          <Button href={TOAST.giftCards} external variant="accent" className="w-full sm:w-auto">
            Purchase Gift Card
          </Button>
        </div>
      </div>
    </main>
  );
}
