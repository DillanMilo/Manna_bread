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
    title: 'Choose an amount',
    body: 'Pick $25, $50, $100, or $200 on our secure gift card page, or enter an amount of your own. You can personalize the card before it goes out.',
  },
  {
    title: 'Send it their way',
    body: 'Send it by email or by text, or send it to yourself first so you can hand it over in person.',
  },
  {
    title: 'Come in and enjoy it',
    body: `Show the gift card on your phone at the counter at ${CONTACT.address.street}, no printing needed. We scan it or enter the card number and apply it to the order.`,
  },
];

const QUESTIONS: GiftCardQuestion[] = [
  {
    question: 'How does the gift card arrive?',
    answer: 'By email or by text, your choice at checkout. You can also send it to yourself first and pass it along in person.',
  },
  {
    question: 'Can I schedule it for a certain day?',
    answer: 'Yes. Choose Later and pick the date and time it should arrive, so it shows up right on a birthday or Christmas morning. Choose Today and it is sent as soon as you place the order.',
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
        at the top of our gift card page, or ask us at the counter.
      </>
    ),
  },
  {
    question: 'Where can I use it?',
    answer: `In the bakery at ${CONTACT.address.street} in Old Town Tomball, for breads, pastries, breakfast, lunch, and coffee.`,
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
            For the one who already knows our cinnamon rolls by name.
          </p>
        </div>

        <section className="mt-16 sm:mt-20 md:mt-24" aria-labelledby="gift-card-steps">
          <SectionHeader label="How It Works" title="Three small steps" light />
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
          <SectionHeader label="Questions" title="Good to know" light />
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
