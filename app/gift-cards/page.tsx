import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GiftCardVine } from '@/components/ui/ScrollVine';
import { HeadingPumpkin } from '@/components/sections/PumpkinTouches';
import { CONTACT, TOAST } from '@/lib/constants';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata(
  'Bakery Gift Cards',
  'Give the gift of Manna Bakery with a digital gift card for handcrafted food, warm hospitality, and time together.',
  '/gift-cards',
);

interface GiftCardStep {
  title: string;
  body: string;
}

interface GiftCardQuestion {
  question: string;
  answer: ReactNode;
}

const STEPS: GiftCardStep[] = [
  {
    title: 'Pick an amount',
    body: 'Choose $25, $50, $100 or $200, or type in your own amount. You can add a personal message too.',
  },
  {
    title: 'Send it',
    body: 'We can text or email it to them, or send it to you so you can hand it over yourself.',
  },
  {
    title: 'Use it at the bakery',
    body: `Show it on your phone at the counter at ${CONTACT.address.street}. We'll scan it or type in the card number.`,
  },
];

const QUESTIONS: GiftCardQuestion[] = [
  {
    question: 'Can I send it on a certain day?',
    answer: "Yes. Pick Later at checkout and choose the date and time. It's a nice way to have it land on a birthday or on Christmas morning.",
  },
  {
    question: 'How do I check the balance?',
    answer: (
      <>
        Use the{' '}
        <a
          href={TOAST.giftCards}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-gold underline underline-offset-4 hover:text-brand-cognac-light transition-colors"
        >
          Check Balance link
        </a>{' '}
        at the top of our gift card page, or just ask us at the counter.
      </>
    ),
  },
  {
    question: 'Where can I use it?',
    answer: `Here at the bakery, ${CONTACT.address.street} in Old Town Tomball. It works on anything we sell, from a loaf to your morning coffee.`,
  },
];

export default function GiftCardsPage() {
  return (
    <main className="relative isolate overflow-hidden pt-24 sm:pt-32 md:pt-40 pb-14 sm:pb-20 md:pb-28 bg-brand-forest min-h-screen">
      <GiftCardVine className="z-0 opacity-90" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        <HeadingPumpkin />
        <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
          Gift Cards
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-white leading-tight mb-6 sm:mb-8">
          Give the gift of Manna
        </h1>
        <p className="font-body text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
          A Manna gift card is a digital gift card for handcrafted food, warm hospitality, and time together. It can be used in the bakery at {CONTACT.address.street} in Old Town Tomball, for scratch-made breads and pastries, breakfast, lunch, or a coffee shared with someone you love. It makes an easy gift for anyone who could use an unhurried morning.
        </p>

        <div className="bg-brand-forest-mid/50 border border-white/10 rounded-2xl p-6 sm:p-8 md:p-12 mb-6 sm:mb-8">
          <Button href={TOAST.giftCards} external variant="accent" className="w-full sm:w-auto">
            Purchase Gift Card
          </Button>
          <p className="font-accent italic text-base sm:text-lg text-brand-gold/90 mt-5">
            Easy to send, and they get to pick their own treat.
          </p>
        </div>

        <section className="mt-16 sm:mt-20 md:mt-24" aria-labelledby="gift-card-steps">
          <SectionHeader label="Gift Cards" title="How it works" light />
          <ol id="gift-card-steps" className="grid gap-4 sm:gap-6 md:grid-cols-3 text-left">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="bg-brand-forest-mid/50 border border-white/10 rounded-2xl p-6 sm:p-7"
              >
                <p className="font-display text-2xl text-brand-gold mb-3">{index + 1}</p>
                <h3 className="font-display text-xl font-medium text-white mb-2">{step.title}</h3>
                <p className="font-body text-[15px] text-white/70 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 sm:mt-20 md:mt-24" aria-labelledby="gift-card-questions">
          <SectionHeader label="Questions" title="Common questions" light />
          <dl id="gift-card-questions" className="max-w-2xl mx-auto text-left divide-y divide-white/10 border-y border-white/10">
            {QUESTIONS.map((item) => (
              <div key={item.question} className="py-5 sm:py-6">
                <dt className="font-display text-lg sm:text-xl font-medium text-white mb-2">{item.question}</dt>
                <dd className="font-body text-[15px] text-white/70 leading-relaxed">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </main>
  );
}
