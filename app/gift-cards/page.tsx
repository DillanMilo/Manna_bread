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
  answer: string;
}

const STEPS: GiftCardStep[] = [
  {
    title: 'Choose an amount',
    body: 'Pick the amount on our secure gift card page. [CONFIRM WITH CHRISTIN: which amounts are offered, set amounts or any amount you like?]',
  },
  {
    title: 'Send it their way',
    body: '[CONFIRM WITH CHRISTIN: The gift card arrives by email, straight to your recipient or to you so you can pass it along yourself.]',
  },
  {
    title: 'Come in and enjoy it',
    body: `Bring the card to the counter at ${CONTACT.address.street} and we apply it to the order. [CONFIRM WITH CHRISTIN: show the email on a phone or a printed copy, both accepted?]`,
  },
];

const QUESTIONS: GiftCardQuestion[] = [
  {
    question: 'How does the gift card arrive?',
    answer: '[CONFIRM WITH CHRISTIN: By email, usually within a few minutes of purchase.]',
  },
  {
    question: 'Can I schedule it for a certain day?',
    answer: '[CONFIRM WITH CHRISTIN: Yes. Choose a delivery date at checkout and it lands in their inbox that morning, right on time for a birthday or Christmas.]',
  },
  {
    question: 'How do I check the balance?',
    answer: '[CONFIRM WITH CHRISTIN: Ask us at the counter, or use the balance link in the gift card email.]',
  },
  {
    question: 'Can I add more to a gift card?',
    answer: '[CONFIRM WITH CHRISTIN: Can a gift card be reloaded, and if so, online or only in the bakery?]',
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
