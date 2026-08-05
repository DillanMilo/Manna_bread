// Current in-store menu transcribed from Manna Bakery's printed menu boards.

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
        description: 'Standard espresso drinks are $6 small or $7 large.',
        items: [
          { name: 'House Drip', price: { display: '$3.50 / $4.50' } },
          { name: 'Decaf Drip', price: { display: '' } },
          { name: 'Espresso', price: { display: '$4' } },
          { name: 'Americano', price: { display: '$4' } },
          { name: 'Cortado', price: { display: '$4' } },
          { name: 'Cold Brew', price: { display: '$3 / $4' } },
          { name: 'Latte', price: { display: '$6 / $7' } },
          { name: 'Cappuccino', price: { display: '$6 / $7' } },
          { name: 'Italian Macchiato', price: { display: '$6 / $7' } },
          { name: 'Flavored Macchiato', price: { display: '$6 / $7' } },
          { name: 'Flat White', price: { display: '$6 / $7' } },
          { name: 'Mocha', price: { display: '$6 / $7' } },
        ],
      },
      {
        title: 'Tea & Chocolate',
        items: [
          { name: 'European Hot Chocolate', price: { display: '$6 / $7' } },
          { name: 'Simple Hot Chocolate', price: { display: '$4 / $5' } },
          { name: 'Matcha Latte', price: { display: '$6 / $7' } },
          { name: 'Chai Tea Latte', price: { display: '$6 / $7' } },
          { name: 'London Fog', price: { display: '$6 / $7' } },
          { name: 'Iced Tea', price: { display: '$3 / $4' } },
          {
            name: 'Brewed Tea',
            description: 'English Breakfast, Earl Grey, Mint Tea, or Decaf Black.',
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
          { name: 'Heavy Cream', price: { display: '' } },
          { name: 'Almond Milk', price: { display: '+$0.75' } },
          { name: 'Oat Milk', price: { display: '+$0.75' } },
        ],
      },
      {
        title: 'Syrups',
        description: '$0.75 each. Sugar-free options are marked below.',
        items: [
          { name: 'Peppermint', price: { display: '+$0.75' } },
          { name: 'Butterscotch', price: { display: '+$0.75' } },
          { name: 'Lavender', price: { display: '+$0.75' } },
          { name: 'Toffee Nut', price: { display: '+$0.75' } },
          { name: 'Vanilla', price: { display: '+$0.75' }, labels: ['Sugar-free available'] },
          { name: 'Strawberry', price: { display: '+$0.75' } },
          { name: 'Hazelnut', price: { display: '+$0.75' }, labels: ['Sugar-free available'] },
          { name: 'Cinnamon Bun', price: { display: '+$0.75' } },
          { name: 'Chocolate', price: { display: '+$0.75' } },
          { name: 'Cookie Butter', price: { display: '+$0.75' } },
          { name: 'Caramel', price: { display: '+$0.75' }, labels: ['Sugar-free available'] },
          { name: 'Spiced Brown Sugar', price: { display: '+$0.75' } },
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
            name: 'Breakfast Taco',
            description: 'Warm flour tortilla stuffed with fluffy scrambled eggs, melted cheese, and your choice of bacon or sausage.',
            price: { display: '$3' },
          },
          {
            name: 'Kolache',
            description: 'Soft, slightly sweet dough filled with savory sausage and melted cheese, available with or without jalapeño.',
            price: { display: '$6' },
          },
          {
            name: 'Biscuits & Gravy',
            description: 'Fluffy house biscuits topped with creamy house sausage gravy seasoned with sage and pepper.',
            price: { display: '$10 / $12' },
          },
          {
            name: 'Liège Waffle',
            description: 'A rich yeasted waffle with a caramelized sugar crust, paired with berries and whipped cream.',
            price: { display: '$8 / $12 · GF $13' },
            labels: ['Gluten-free option', 'Kids friendly'],
          },
          {
            name: 'Breakfast Sandwich',
            description: 'Egg and cheese with sausage or ham on sourdough bread, a croissant, or a biscuit.',
            price: { display: '$12' },
            labels: ['Gluten-free option'],
          },
          {
            name: 'Quiche',
            description: 'A house favorite creamy egg custard. Available with bacon, sausage, veggies, meat lovers, or a seasonal flavor.',
            price: { display: '$12 · GF $13' },
            labels: ['Gluten-free option'],
          },
          {
            name: 'Stuffed French Toast',
            description: 'Vanilla-battered house bread stuffed with sweet cream cheese, topped with strawberries and whipped cream. Syrup on the side. The gluten-free version is also eggless.',
            price: { display: '$12 · GF $13' },
            labels: ['Gluten-free option'],
          },
          {
            name: 'Avocado Toast',
            description: 'Two slices of toasted artisan bread layered with fresh smashed avocado over a bed of arugula, finished with sliced tomato and everything seasoning.',
            price: { display: '$12' },
            labels: ['Gluten-free option'],
          },
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
            price: { display: '$16' },
            labels: ['Gluten-free option'],
          },
          {
            name: 'Navajo Tacos',
            description: 'A plate-sized, flat, golden frybread topped with seasoned beef, beans, greens, tomato, cheese, and sour cream—a hearty, handcrafted Southwestern classic.',
            price: { display: '$15' },
          },
          {
            name: 'House 3-Meat Chili',
            description: 'Rough-cut steak tips, smoky bacon, and seasoned ground beef slow-simmered into a bold, hearty chili. Served with a slice of our silky-sweet house cornbread.',
            price: { display: '$15' },
          },
        ],
      },
      {
        title: 'Salads',
        items: [
          {
            name: 'Caesar Salad',
            description: 'Chopped romaine hearts, shredded parmesan, herb croutons, and creamy Caesar dressing.',
            price: { display: '$6 / $14' },
          },
          {
            name: 'Mandarin Crunch',
            description: 'Spring mix, mandarin oranges, almonds, sesame seeds, red onion, and sesame ginger dressing.',
            price: { display: '$6 / $14' },
          },
          {
            name: 'Strawberry Fields',
            description: 'Spinach and spring mix, strawberries, candied pecans, feta, and raspberry vinaigrette.',
            price: { display: '$6 / $14' },
          },
          {
            name: 'House Salad',
            description: 'Chopped romaine lettuce, tomato, red onion, croutons, shredded cheddar, and ranch dressing.',
            price: { display: '$6 / $14' },
          },
        ],
      },
      {
        title: 'Soups',
        description: 'Two to three varieties are served daily. Available by the cup or bowl.',
        items: [
          {
            name: 'Chicken Tortilla',
            description: 'Chicken in a zesty broth, topped with cheese and a touch of cilantro for a little Southwest flair.',
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
