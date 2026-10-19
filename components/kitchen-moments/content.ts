// Editorial scaffolding. None of this sample copy or recipe is Christin's.
export interface SampleIngredient {
  name: string;
  quantity: number;
  unit: 'g' | 'ml';
  note?: string;
}

export interface SampleStep {
  title: string;
  time: string;
  instruction: string;
  cue: string;
}

export const ingredients: SampleIngredient[] = [
  { name: 'Bread flour', quantity: 500, unit: 'g', note: 'plus a little for the counter' },
  { name: 'Lukewarm water', quantity: 350, unit: 'ml' },
  { name: 'Instant yeast', quantity: 7, unit: 'g' },
  { name: 'Fine salt', quantity: 10, unit: 'g' },
  { name: 'Olive oil', quantity: 20, unit: 'ml', note: 'plus a little for the bowl' },
];

export const steps: SampleStep[] = [
  { title: 'Bring it together', time: '5 minutes', instruction: 'Stir the flour, yeast and salt in a large bowl. Add the water and olive oil. Mix until no dry patches remain, scraping the sides of the bowl as you go.', cue: 'A shaggy, sticky dough is a good place to start.' },
  { title: 'Work the dough', time: '10 minutes', instruction: 'Turn onto a lightly floured counter. Knead until smoother and elastic, using a scraper if it sticks. Add extra flour sparingly.', cue: 'Look for a soft dough that begins to hold its shape.' },
  { title: 'Leave room to rise', time: '60–90 minutes', instruction: 'Place in a lightly oiled bowl and cover. Leave in a comfortably warm spot until roughly doubled in size.', cue: 'A cooler kitchen will need a little longer. Watch the dough.' },
  { title: 'Shape & rest', time: '30–45 minutes', instruction: 'Shape into a round, tucking the edges underneath. For a larger batch, divide into equal loaves first. Place on a parchment-lined baking sheet, cover loosely, and rest until puffy. Heat the oven to 425°F / 220°C.', cue: 'A gentle fingertip press should spring back slowly.' },
  { title: 'Bake & let it settle', time: '30–35 minutes, then cool', instruction: 'Make a shallow slash across the top. Bake until deeply golden, checking from 30 minutes. Bake multiple loaves in batches if the oven is crowded. Cool on a rack for at least 20 minutes before slicing.', cue: 'Scaling changes the number of loaves, not the oven temperature.' },
];

export const journalCategories = ['All moments', 'Recipes', 'Kitchen stories', 'Seasonal notes'] as const;
export type JournalCategory = (typeof journalCategories)[number];

export interface JournalEntry {
  id: string;
  category: Exclude<JournalCategory, 'All moments'>;
  title: string;
  summary: string;
  image: string;
  alt: string;
  detail: string;
  number: string;
}

export const journalEntries: JournalEntry[] = [
  {
    id: 'cinnamon', category: 'Recipes', title: 'The last spoonful of icing', number: '01',
    summary: 'A warm pan, soft spirals, and the little wait before the icing goes on.',
    image: '/images/kitchen-moments/cinnamon-rolls.webp', alt: 'AI concept: golden cinnamon rolls with cream glaze cooling on a walnut counter',
    detail: 'A recipe direction for Christin to develop: the feel of an enriched dough, how tightly to roll it, and how long to let the pan cool before adding icing. Her tested quantities and kitchen notes will belong here.',
  },
  {
    id: 'books', category: 'Kitchen stories', title: 'The pages we come back to', number: '02',
    summary: 'An open cookbook. A note in the margin. A recipe with a history.',
    image: '/images/kitchen-moments/cookbook-and-linen.webp', alt: 'AI concept: a well-used open cookbook with indistinct handwritten notes on a walnut counter beside cream linen and greenery',
    detail: 'A story direction: ask Christin to open a book she has kept for years and talk about one recipe she returns to. Who shared it? What has she changed? The story will be written from her own recollections.',
  },
  {
    id: 'autumn', category: 'Seasonal notes', title: 'A loaf for the longer evenings', number: '03',
    summary: 'A thick slice, a small dish of butter, and the light moving across the table.',
    image: '/images/kitchen-moments/bread-and-linen.webp', alt: 'AI concept: rustic bread and butter on cream linen in soft afternoon light',
    detail: 'A seasonal direction: bread alongside a pot of soup, a table set a little earlier, and the small changes Christin notices in the bakery as the days get shorter. This is a sample outline awaiting her words.',
  },
];
