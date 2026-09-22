// Approved menu transcribed from IMG_4118–IMG_4121. Launch approved September 11, 2026.

export type Price = {
  display: string;
};

export type MenuItem = {
  name: string;
  description?: string;
  price: Price;
  labels?: string[];
  isOutOfStock?: boolean;
};

export type MenuSection = {
  title: string;
  description?: string;
  items: MenuItem[];
};

export type MenuCategory = {
  title: string;
  sections: MenuSection[];
};

export const menuData: MenuCategory[] = [
  {
    title: 'Drinks',
    sections: [
      {
        title: 'Coffee & Espresso',
        description: 'Small / large prices are shown where available.',
        items: [
          { name: 'House Drip', description: 'Bottomless.', price: { display: '$5' } },
          { name: 'Espresso', price: { display: '$4' } },
          { name: 'Americano', price: { display: '$5' } },
          { name: 'Cortado', description: '4 oz.', price: { display: '$4' } },
          { name: 'Cold Brew', price: { display: '$5 / $6' } },
          { name: 'Pour Over', price: { display: '$7 / $8' } },
          { name: 'Affogato', price: { display: '$8' } },
          { name: 'Latte', price: { display: '$6 / $7' } },
          { name: 'Cappuccino', price: { display: '$6 / $7' } },
          { name: 'Traditional Macchiato', description: '3 oz.', price: { display: '$5' } },
          { name: 'Flavored Macchiato', price: { display: '$6 / $7' } },
          { name: 'Flat White', description: '6 oz.', price: { display: '$5' } },
          { name: 'Mocha', price: { display: '$6 / $7' } },
        ],
      },
      {
        title: 'Tea, Chocolate & Spritzers',
        items: [
          { name: 'Spritzers', description: 'Seasonal.', price: { display: '$7' } },
          { name: 'European Hot Chocolate', price: { display: '$6 / $7' } },
          { name: 'Simple Hot Chocolate', price: { display: '$4 / $5' } },
          { name: 'Matcha Latte', price: { display: '$6 / $7' } },
          { name: 'Chai Tea Latte', price: { display: '$6 / $7' } },
          { name: 'London Fog', price: { display: '$6 / $7' } },
          { name: 'Iced Tea', description: 'Bottomless.', price: { display: '$4.50' } },
          {
            name: 'Brewed Tea',
            price: { display: '$3 / $4' },
          },
        ],
      },
      {
        title: 'Milk',
        items: [
          { name: 'Skim Milk', price: { display: '' } },
          { name: 'Whole Milk', price: { display: '' } },
          { name: '2% Milk', price: { display: '' } },
          { name: 'Heavy Cream', price: { display: '+$0.75' } },
          { name: 'Almond Milk', price: { display: '+$0.75' } },
          { name: 'Oat Milk', price: { display: '+$0.75' } },
          { name: 'Coconut Milk', price: { display: '+$0.75' } },
          { name: 'Cold Foam', price: { display: '+$1' } },
        ],
      },
      {
        title: 'Syrups',
        description: '75¢ each. Sugar-free options are marked below. Ask about our seasonal flavors and proteins for your drink.',
        items: [
          { name: 'Peppermint', price: { display: '' } },
          { name: 'Butterscotch', price: { display: '' } },
          { name: 'Lavender', price: { display: '' } },
          { name: 'Toffee Nut', price: { display: '' } },
          { name: 'Vanilla', price: { display: '' }, labels: ['Sugar-free available'] },
          { name: 'Strawberry', price: { display: '' } },
          { name: 'Hazelnut', price: { display: '' }, labels: ['Sugar-free available'] },
          { name: 'Cinnamon Bun', price: { display: '' } },
          { name: 'Chocolate', price: { display: '' } },
          { name: 'Cookie Butter', price: { display: '' } },
          { name: 'Caramel', price: { display: '' }, labels: ['Sugar-free available'] },
          { name: 'Spiced Brown Sugar', price: { display: '' } },
        ],
      },
    ],
  },
  {
    title: 'Breakfast',
    sections: [
      {
        title: 'Breakfast',
        items: [
          {
            name: 'Breakfast Burrito',
            description: 'Warm flour tortilla stuffed with fluffy scrambled eggs, minced chiles, melted cheese, and your choice of bacon, ham, or sausage.',
            price: { display: '$7' },
            labels: ['Kids friendly'],
          },
          {
            name: 'Kolache',
            description: 'Our soft brioche filled with savory sausage and melted cheese, available with or without jalapeño.',
            price: { display: '$6' },
            labels: ['Kids friendly'],
          },
          {
            name: 'Biscuits & Gravy',
            description: 'Fluffy scratch biscuits topped with creamy house sausage gravy seasoned with sage, thyme, and pepper.',
            price: { display: 'Single $10 · Double $12' },
            labels: ['Kids friendly'],
          },
          {
            name: 'Liège Waffle',
            description: 'A rich yeasted waffle with a caramelized sugar crust, paired with berries and whipped cream.',
            price: { display: '$8 / $12 · GF $13' },
            labels: ['Gluten-free option', 'Kids friendly'],
          },
          {
            name: 'Breakfast Sandwich',
            description: 'Savory egg whites and melted cheese with your choice of sausage or ham, served on sourdough, a croissant, or a biscuit.',
            price: { display: '$12' },
            labels: ['Gluten-free option'],
          },
          {
            name: 'Quiche',
            description: 'A house favorite! Creamy egg custard in flaky crust. Available with bacon, sausage, veggies, or meat lovers.',
            price: { display: '$12 · GF $13' },
            labels: ['Gluten-free option'],
          },
          {
            name: 'Stuffed French Toast',
            description: 'Vanilla-battered house bread stuffed with sweet cream cheese, toasted and topped with strawberries and whipped cream. Syrup on the side. The gluten-free version is also eggless.',
            price: { display: '$14 · GF $15' },
            labels: ['Gluten-free option'],
          },
          {
            name: 'Avocado Toast',
            description: 'Two slices of our toasted artisan bread layered with fresh smashed avocado under a bed of arugula, finished with sliced tomato, everything seasoning, and feta cheese.',
            price: { display: '$14' },
            labels: ['Gluten-free option'],
          },
        ],
      },
      {
        title: 'Add-ons',
        items: [
          { name: 'Egg', price: { display: '+$2' } },
          { name: 'Cheese', price: { display: '+$2' } },
          { name: 'Sausage', price: { display: '+$3' } },
          { name: 'Ham', price: { display: '+$3' } },
          { name: 'Bacon', price: { display: '+$3' } },
          { name: 'Guac', price: { display: '+$3' } },
        ],
      },
      {
        title: 'Scratch Pastries',
        description: 'Our scratch pastries are self-serve from the bakery case.',
        items: [],
      },
    ],
  },
  {
    title: 'Lunch',
    sections: [
      {
        title: 'Sandwiches & House Favorites',
        items: [
          {
            name: 'The Italian',
            description: 'Fresh pepperoni, salami, ham, and provolone rolled with lettuce, pepperoncinis, red onion, red vinegar, olive oil, mayo, and oregano. Wrapped in our fresh scratch bread.',
            price: { display: 'Sandwich $14 · Handwich $16' },
            labels: ['Gluten-free option'],
          },
          {
            name: 'Turkey or Ham',
            description: 'Fresh turkey or ham and provolone rolled with lettuce, tomato, red onion, and mayo. Wrapped in our fresh scratch bread.',
            price: { display: 'Sandwich $14 · Handwich $16' },
            labels: ['Gluten-free option'],
          },
          {
            name: 'Ham & Honey Mustard Panini',
            description: 'Ham, Swiss cheese, and honey mustard sandwiched between two slices of our scratch buttered sourdough. Toasted until golden.',
            price: { display: '$16' },
            labels: ['Gluten-free option'],
          },
          {
            name: 'Turkey Pesto Panini',
            description: 'Turkey, provolone, and basil pesto sandwiched between two slices of our scratch buttered sourdough and toasted until golden.',
            price: { display: '$17' },
            labels: ['Gluten-free option'],
          },
          {
            name: 'Grilled Cheese Panini',
            description: 'Cheddar and provolone sandwiched between two slices of our from-scratch buttered sourdough and toasted until golden.',
            price: { display: '$12' },
            labels: ['Gluten-free option', 'Kids friendly'],
          },
          {
            name: 'Chicken Salad Sandwich',
            description: 'Made with white chicken, mayo, celery, pecans, craisins, pineapple, and poppy seeds. Served on a croissant or sourdough.',
            price: { display: '$14' },
            labels: ['Gluten-free option'],
          },
          {
            name: 'Cuban Sandwich',
            description: 'Seasoned carnitas pork and house ham layered with Swiss cheese, Cuban mustard, and pickles on our house-baked bread.',
            price: { display: '$18' },
            labels: ['Gluten-free option'],
          },
          {
            name: 'Navajo Taco',
            description: 'A plate-sized, flat, golden frybread topped with seasoned beef, beans, greens, tomato, cheese, and sour cream—a hearty, handcrafted Southwestern classic.',
            price: { display: '$18' },
          },
          {
            name: 'House 3-Meat Chili',
            description: 'Rough-cut steak tips, smoky bacon, and seasoned ground beef slow-simmered into a bold, hearty chili. Served with a slice of our silky-sweet house cornbread.',
            price: { display: '$15' },
            labels: ['Gluten-free option'],
          },
        ],
      },
      {
        title: 'Salads',
        items: [
          {
            name: 'Caesar Salad',
            description: 'Chopped romaine hearts, shredded parmesan, herb croutons, and creamy Caesar dressing.',
            price: { display: 'Cup $6 · Bowl $14' },
          },
          {
            name: 'Mandarin Crunch',
            description: 'Spring mix, mandarin oranges, almonds, sesame seeds, red onion, and sesame ginger dressing.',
            price: { display: 'Cup $6 · Bowl $14' },
          },
          {
            name: 'Strawberry Fields',
            description: 'Spinach and spring mix, strawberries, candied pecans, feta, and raspberry vinaigrette.',
            price: { display: 'Cup $6 · Bowl $14' },
          },
          {
            name: 'House Salad',
            description: 'Chopped romaine lettuce, fresh tomato, red onion, house croutons, cheddar, and ranch dressing.',
            price: { display: 'Cup $6 · Bowl $14' },
          },
        ],
      },
      {
        title: 'Soups',
        description: 'Two to three varieties are served daily. Available by the cup or bowl.',
        items: [
          {
            name: 'Chicken Tortilla',
            description: 'Tender chicken and a chunky medley of roasted veggies and southwest beans simmered in a mildly spicy broth. Served with tortilla strips and sour cream on the side.',
            price: { display: 'Cup $6 · Bowl $12' },
            labels: ['Gluten-free'],
          },
          {
            name: 'Zuppa Toscana',
            description: 'A creamy, comforting soup made with Italian sausage, tender potatoes, and fresh spinach.',
            price: { display: 'Cup $6 · Bowl $12' },
            labels: ['Gluten-free'],
          },
          {
            name: 'Chophouse Potato',
            description: 'Hearty chunks of potato in a creamy base with smoked bacon and chives.',
            price: { display: 'Cup $6 · Bowl $12' },
            labels: ['Gluten-free'],
          },
          {
            name: 'Tomato Basil',
            description: 'A rich blend of ripe tomatoes and fresh basil simmered to creamy perfection.',
            price: { display: 'Cup $6 · Bowl $12' },
          },
        ],
      },
    ],
  },
];
