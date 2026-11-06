/**
 * Rentals FAQ, built only from Jamie Hawley's standard rental response
 * letter (6 Nov 2026). Facts are kept exactly as Manna wrote them.
 * REVIEW: Jamie and Christin to approve before this goes live.
 *
 * Each answer is a list of blocks: a string is a paragraph, a string
 * array is a bullet list. The same text feeds the page and the FAQPage
 * structured data, so they never drift apart.
 */

export type RentalFaqBlock = string | string[];

export type RentalFaq = {
  question: string;
  answer: RentalFaqBlock[];
  link?: { href: string; label: string };
};

export const RENTAL_FAQS: RentalFaq[] = [
  {
    question: 'What does it cost to rent Manna?',
    answer: [
      [
        'Monday through Thursday, at or after 2 PM: $195 per hour',
        'Friday and Saturday, at or after 2 PM: $295 per hour',
        'Cleaning fee: $70',
      ],
    ],
  },
  {
    question: 'Is there a minimum rental time?',
    answer: [
      [
        'Up to 25 guests: a 3-hour minimum',
        '26 guests or more: a 4-hour minimum',
      ],
      'Please give yourself enough time in your reservation for setup, early guest arrivals, the event itself, time for guests to visit afterward, cleanup, and departure.',
    ],
  },
  {
    question: 'When can my rental begin, and how much setup time should I plan?',
    answer: [
      'Rentals begin at 2 PM or later. Plan for about one hour of setup between the start of your rental and the start of your event.',
      'Your rental start time is when you and your vendors may begin arriving and preparing the space, not when your event begins. Events that need very little setup may be able to begin sooner with Manna’s approval ahead of time.',
      'All setup and preparation happens within your reserved rental period.',
    ],
  },
  {
    question: 'Can we arrive early or stay a little late?',
    answer: [
      'People, supplies, vendors, and decorations can’t arrive before your confirmed rental start time, and your group and belongings should be completely out of the space by your confirmed end time.',
      'Events that run past the reserved time are billed in 30-minute increments at 130% of the rental rate.',
    ],
  },
  {
    question: 'How do I reserve my date?',
    answer: [
      'A signed rental agreement and a 50% deposit of the total bill secure your reservation. The remaining balance is due two weeks before your event.',
      'Invoices are sent by email and can be paid by credit or debit card through the payment link provided.',
    ],
  },
  {
    question: 'What if our plans change?',
    answer: [
      'We understand that plans sometimes change. Your deposit and reservation and catering payments are fully refundable up to four weeks before your event.',
      'After that, barista services and the cleaning fee stay fully refundable, and other payments may be refunded at 50%. No refunds are available within one week of the event date.',
    ],
  },
  {
    question: 'Can we decorate the space?',
    answer: [
      'We want you to make the space feel special for your event. A few things to keep in mind:',
      [
        'Nothing may be attached, taped, pinned, or mounted to the walls.',
        'No loose glitter, confetti, or other small-particle decor.',
        'No helium balloons.',
        'Freestanding decorations, balloons, arches, and other event items need to be removed at the end of your rental period to avoid a disposal fee.',
        'Any markings, residue, holes, or other property damage may result in an additional fee.',
      ],
      'Have leftover flowers or plants? We’re often happy to give them a home for future Manna guests to enjoy.',
    ],
  },
  {
    question: 'Can we rearrange the furniture?',
    answer: [
      'You’re welcome to rearrange our tables and furniture to fit your layout. Please take a photo before moving anything, and return everything to its original spot before the end of your rental period.',
      'If you’d like a hand, Manna can help with loading and unloading supplies and arranging tables and chairs for a $20 setup-assistance fee.',
    ],
  },
  {
    question: 'How many guests can Manna hold?',
    answer: [
      'As a general guideline, Manna can accommodate:',
      [
        'Up to 55 seated guests indoors',
        'Up to 25 guests on the outdoor patio',
        'Up to 120 standing guests indoors when dining tables are removed',
        'Up to 40 standing guests on the patio',
      ],
      'We’re happy to work with you on a layout that fits your gathering and the experience you’d like to create for your guests.',
    ],
  },
  {
    question: 'Where should our guests park?',
    answer: [
      'Street parking in front of Manna is very limited, but there is plenty of public parking around back, reached from the left (west) side of our block. There are dozens of spots there, and guests can stroll through the open-alley sidewalk to Manna, only a 2 to 3 minute walk.',
    ],
  },
  {
    question: 'Can Manna cater our event?',
    answer: [
      'Yes. We offer a selection of fresh, in-house catering from our regular menu, and our chefs can often accommodate custom variations or personal favorites on request.',
    ],
    link: { href: '/catering', label: 'See the catering menu' },
  },
  {
    question: 'Can we bring in outside food?',
    answer: [
      'Approved outside food and catering are welcome, particularly for specialty items Manna doesn’t offer. We just ask that:',
      [
        'All outside food and beverages are approved by Manna in advance.',
        'If more than 50% of the catering comes from an outside source, an additional 10% rental fee applies.',
        'Outside-catered dishes are clearly labeled at the serving area with the restaurant or company they came from.',
        'Items Manna offers, such as coffee, cinnamon rolls, salads, and sandwiches, aren’t brought in from outside sources.',
      ],
      'Please note that Manna does not provide tableware for outside-catered meals.',
    ],
  },
  {
    question: 'Can we have coffee at our event?',
    answer: [
      'For a $50 attendant fee, you can reserve your own private Manna barista and offer our full espresso menu to your guests.',
      'Drinks are offered at a discounted event rate of $5 small and $6 large. We keep an open tab during your event rather than invoicing coffee in advance, and the tab is settled at the end.',
      'Guests may also buy bottled and refrigerated drinks from Manna at regular retail prices.',
    ],
  },
  {
    question: 'What’s included with the rental?',
    answer: [
      'Your rental includes access to:',
      [
        'Complimentary Wi-Fi',
        'Manna service counters',
        'The outdoor patio',
        'Kitchen space for storage and faucet use only (kitchen equipment and tools are not available for event use)',
        'A microphone and amp',
        'Unlimited cubed ice',
        'Manna’s regular background music',
      ],
      'A custom Spotify playlist, created by you, reviewed by Manna, and played through our system, is available for a $15 fee. Additional serviceware and event-service options can be selected on the Event Questionnaire.',
    ],
  },
  {
    question: 'What are the next steps?',
    answer: [
      'When you’re ready, check availability and send a rental request using the form right here on this page. Tell us your date, start time, guest count, and anything else we should know about your event.',
      'Once we receive it, we’ll review the details with you and send your rental agreement and invoice. Your signed agreement and 50% deposit secure your reservation.',
    ],
    link: { href: '#check-availability', label: 'Check availability and send a request' },
  },
];

/** Plain-text answer for structured data: paragraphs and bullets joined into one string. */
export function rentalFaqAnswerText(faq: RentalFaq): string {
  return faq.answer.map((block) => (typeof block === 'string' ? block : block.join('; '))).join(' ');
}
