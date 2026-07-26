import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { TOAST } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Menu Coming Soon | Manna Bakery',
  description:
    'Manna Bakery is preparing a fresh online menu. Online ordering remains available through Toast.',
};

export default function MenuPage() {
  return (
    <main className="min-h-[82vh] bg-brand-forest px-5 pb-20 pt-28 sm:px-6 sm:pt-36 md:px-10 md:pt-44">
      <section className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <p className="mb-4 font-body text-[11px] font-semibold uppercase tracking-[3px] text-brand-gold">
            Menu
          </p>
          <h1 className="mb-6 font-display text-4xl font-medium leading-tight text-white sm:text-5xl md:text-6xl">
            Something fresh
            <span className="block text-brand-gold">is taking shape.</span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl font-body text-base leading-[1.8] text-white/75 lg:mx-0 md:text-lg">
            Manna&apos;s online menu is being refreshed to match what is currently
            served in the bakery. Until it is ready, pickup orders can still be
            placed through Toast.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button
              href={TOAST.orderOnline}
              external
              variant="accent"
              className="w-full sm:w-auto"
            >
              Order Online
            </Button>
            <Button href="/contact" variant="ghost" className="w-full sm:w-auto">
              Plan a Visit
            </Button>
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-none">
          <div className="relative aspect-[4/5]">
            <div className="absolute -inset-5 rounded-t-full bg-brand-gold/[0.12] blur-3xl" />
            <div className="relative h-full overflow-hidden rounded-t-full rounded-b-2xl border border-brand-gold/25 shadow-2xl">
              <Image
                src="/images/manna-croissant-tray.webp"
                alt="Fresh pastries arranged at Manna Bakery"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
