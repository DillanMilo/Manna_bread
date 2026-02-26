// Menu data sourced from Toast POS
// When Toast API keys are available, this static data can be replaced with API calls

export type Price = {
  display: string;
};

export type MenuItem = {
  name: string;
  description?: string;
  price: Price;
  isOutOfStock?: boolean;
};

export type MenuSection = {
  title: string;
  items: MenuItem[];
};

export type MenuCategory = {
  title: string;
  sections: MenuSection[];
};

export const menuData: MenuCategory[] = [
  {
    title: 'Bev',
    sections: [
      {
        title: 'Coffee',
        items: [
          { name: 'Latte', description: 'creamy, smooth espresso mixed with steamed milk.', price: { display: '$6.00+' } },
          { name: 'Cappucino', description: 'bold espresso topped with equal parts steamed milk and foam.', price: { display: '$6.00+' } },
          { name: 'House Drip', description: 'our classic brewed coffee.', price: { display: '$3.50+' } },
          { name: 'Mocha', description: 'rich chocolate blended with espresso and steamed milk.', price: { display: '$6.00+' } },
          { name: 'Flavored Macchiato', description: 'espresso layered with steamed milk and your choice of flavor.', price: { display: '$6.00+' } },
          { name: 'Italian Macchiato', description: 'a traditional macchiato with espresso marked by a dash of milk foam.', price: { display: '$4.00' } },
          { name: 'Espresso', description: 'a bold double shot of pure espresso.', price: { display: '$4.00' } },
          { name: 'Americano', description: 'a smooth blend of espresso and hot water.', price: { display: '$4.00+' } },
          { name: 'Cortado', description: 'a balanced blend of espresso with a touch of steamed milk.', price: { display: '$4.00' } },
          { name: 'Flat White', price: { display: '$6.00+' } },
          { name: 'Cold Brew', price: { display: '$3.00+' } },
          { name: 'Hot Chocolate - Simple', description: 'velvety steamed milk with rich chocolate.', price: { display: '$4.00+' } },
          { name: 'Hot Chocolate - European', price: { display: '$6.00+' } },
        ],
      },
      {
        title: 'Tea & Lemonade',
        items: [
          { name: 'Iced Tea', description: 'refreshing brewed tea served chilled.', price: { display: '$3.00+' } },
          { name: 'Chai Tea', description: 'house made spiced black tea blended with milk for a warm, aromatic drink.', price: { display: '$5.75+' } },
          { name: 'Matcha', price: { display: '$5.75+' } },
          { name: 'London Fog', price: { display: '$5.75+' } },
          { name: 'English Breakfast', description: 'robust and traditional black tea.', price: { display: '$3.00+' } },
          { name: 'Earl Grey', description: 'fragrant black tea with a hint of bergamot.', price: { display: '$3.00+' } },
          { name: 'Green', description: 'a calming green tea with a refreshing mint finish.', price: { display: '$3.00+' } },
          { name: 'Mint Tea', description: 'pure and refreshing mint tea.', price: { display: '$3.00+' } },
          { name: 'Decaf Black', description: 'classic black tea without the caffeine.', price: { display: '$3.00+' } },
          { name: 'Jasmine Green', price: { display: '$3.00' } },
        ],
      },
    ],
  },

  {
    title: 'Breakfast',
    sections: [
      {
        title: 'Sandwiches',
        items: [
          { name: 'Sausage, Egg & Cheese', description: 'sausage, egg & cheese served on a croissant or sourdough', price: { display: '$12.00' } },
          { name: 'Sausage & Cheese', description: 'sausage & cheese served on a croissant or sourdough', price: { display: '$12.00' } },
          { name: 'Sausage & Egg', description: 'sausage & egg served on a croissant or sourdough', price: { display: '$12.00' } },
          { name: 'Ham, Egg & Cheese', description: 'ham, egg & cheese served on a croissant or sourdough', price: { display: '$12.00' } },
          { name: 'Ham & Cheese', description: 'ham & cheese served on a croissant or sourdough', price: { display: '$12.00' } },
          { name: 'Ham & Egg', description: 'ham & egg served on a croissant or sourdough', price: { display: '$12.00' } },
          { name: 'Egg & Cheese', description: 'egg & cheese served on a croissant or sourdough', price: { display: '$12.00' } },
        ],
      },
      {
        title: 'Quiche & More',
        items: [
          { name: 'Sausage Quiche', description: 'a house favorite', price: { display: '$12.00' }, isOutOfStock: true },
          { name: 'Bacon Quiche', description: 'a house favorite', price: { display: '$12.00' } },
          { name: 'Veggie Quiche', price: { display: '$12.00' } },
          { name: 'Meat Lovers Quiche', price: { display: '$12.00' } },
          { name: 'Ham & Rosemary Quiche', price: { display: '$12.00' } },
          { name: 'Sausage & Veggie Quiche', price: { display: '$12.00' } },
          { name: 'Gluten Free Sausage Quiche', description: 'the gluten free version of our house favorite', price: { display: '$13.00' } },
          { name: 'Gluten Free Bacon Quiche', description: 'the gluten free version of our house favorite', price: { display: '$13.00' } },
          { name: 'Gluten Free Veggie Quiche', price: { display: '$13.00' } },
          { name: 'Gluten Free Meat Lovers Quiche', price: { display: '$13.00' }, isOutOfStock: true },
          { name: 'Gluten Free Ham & Rosemary Quiche', price: { display: '$13.00' }, isOutOfStock: true },
          { name: 'Gluten Free Sausage & Tomato Quiche', price: { display: '$13.00' }, isOutOfStock: true },
          { name: 'Biscuits & Gravy', description: 'delicious flaky biscuits topped with scratch made sausage gravy', price: { display: '$10.00+' } },
        ],
      },
      // TODO: "Waffles & French Toast" section — awaiting full data from client
    ],
  },

  {
    title: 'Lunch',
    sections: [
      {
        title: 'Sandwiches & Paninis',
        items: [
          { name: 'Handwhich', description: 'fresh pepperoni, salami, ham, and provolone rolled with lettuce, pepperoncinis, red onion, red vinegar, olive oil, mayo, oregano and completely wrapped in our fresh scratch bread.', price: { display: '$16.00' } },
          { name: 'Sandwhich', description: 'fresh turkey and provolone rolled with lettuce, tomato, red onion, mayo and completely wrapped in our fresh scratch bread.', price: { display: '$14.00' } },
          { name: 'BBQ Brisket Sandwich', description: 'savory pulled brisket served on a homemade pretzel bun with a side of sweet and tangy barbecue sauce', price: { display: '$14.00' }, isOutOfStock: true },
          { name: 'Turkey Pesto Panini', description: 'turkey, provolone, and basil pesto sandwiched between two slices of our from scratch buttered sourdough and toasted until golden', price: { display: '$16.00' } },
          { name: 'Ham & Honey Mustard Panini', description: 'ham, swiss cheese, and honey mustard sandwiched between two slices of our from scratch buttered sourdough and toasted until golden', price: { display: '$16.00' } },
          { name: 'Grilled Cheese Panini', description: 'cheddar and provolone cheese sandwiched between two slices of our from scratch buttered sourdough and toasted until golden', price: { display: '$12.00' } },
          { name: 'Chicken Salad Sandwhich', description: 'made with white chicken, mayo, celery, pecans, craisins, pineapple, and poppy seeds. Served on a croissant or sourdough', price: { display: '$14.00' } },
        ],
      },
      {
        title: 'Soup',
        items: [
          { name: 'Chicken Tortilla', description: 'savory chicken in a zesty broth, topped with crispy tortilla strips, cheese, and a touch of cilantro for a little Southwest flair', price: { display: '$6.00+' } },
          { name: 'Chophouse Potato', description: 'hearty chunks of potato in a creamy, velvety base with hints of smoked bacon and chives, reminiscent of a classic baked potato', price: { display: '$6.00+' } },
          { name: 'Poblano Pepper', description: 'a creamy, roasted poblano pepper soup with a touch of spice, balanced by mild cheeses and a smoky finish.', price: { display: '$6.00+' }, isOutOfStock: true },
          { name: 'Tomato Basil', description: 'a rich blend of ripe tomatoes and fresh basil, simmered to creamy perfection and finished with a hint of garlic', price: { display: '$6.00+' } },
          { name: 'Zuppa Toscana', description: 'a creamy, comforting soup made with Italian sausage, tender potatoes, and fresh kale', price: { display: '$6.00+' }, isOutOfStock: true },
        ],
      },
      {
        title: 'Salad',
        items: [
          { name: 'Caesar Salad', description: 'chopped romaine hearts, shredded parmesan, herb croutons, and creamy caesar dressing', price: { display: '$6.00+' } },
          { name: 'Mandarin Crunch Salad', description: 'spring mix, mandarin oranges, almonds, sesame seeds, red onion, and sesame ginger dressing', price: { display: '$6.00+' } },
          { name: 'Strawberry Fields Salad', description: 'spinach & spring mix, strawberries, candied pecans, feta, and raspberry vinaigrette', price: { display: '$6.00+' } },
          { name: 'House Salad', description: 'chopped kale, dried cranberries, shredded cabbage, almonds, and honey mustard dressing', price: { display: '$6.00+' } },
        ],
      },
    ],
  },

  {
    title: 'Dinner',
    sections: [
      {
        title: 'Winter Season',
        items: [
          { name: 'Hawaiian Haystacks', price: { display: '$16.00' } },
          { name: "Shepherd's Pie (\u201cCottage Pie\u201d)", price: { display: '$15.00' } },
          { name: 'Navajo Tacos', price: { display: '$15.00' } },
          { name: 'House 3-Meat Chili', price: { display: '$15.00' } },
          { name: 'Steak-tips and Eggs', price: { display: '$15.00' } },
          { name: 'Beef Wellington Pockets', price: { display: '$16.00' } },
        ],
      },
    ],
  },

  {
    title: 'Pastries',
    sections: [
      {
        title: 'Pastries',
        items: [
          { name: 'Biscuit', price: { display: '$3.00' } },
          { name: 'Brownie', price: { display: '$6.00' } },
          { name: 'Butter Croissant', price: { display: '$6.00' } },
          { name: 'Cake Pop', price: { display: '$3.00' } },
          { name: 'Cheesecake Bars', price: { display: '$6.50' }, isOutOfStock: true },
          { name: 'Chocolate Croissant', price: { display: '$6.00' } },
          { name: 'Christmas Tree Croissant', price: { display: '$8.00' }, isOutOfStock: true },
          { name: 'Cinnamon Roll', price: { display: '$7.00' } },
          { name: 'Cream Puff', price: { display: '$4.00+' } },
          { name: 'Cretzel', price: { display: '$5.00' }, isOutOfStock: true },
          { name: 'Cupcake', price: { display: '$2.50' }, isOutOfStock: true },
          { name: 'Danish', price: { display: '$4.00' } },
          { name: 'Kouign-Amann', price: { display: '$6.00' }, isOutOfStock: true },
          { name: 'Lemon Bar', price: { display: '$5.00' } },
          { name: 'Muffin', price: { display: '$4.00' } },
          { name: 'Petite Four', price: { display: '$2.00' }, isOutOfStock: true },
          { name: 'Pizelle', price: { display: '$2.00+' }, isOutOfStock: true },
          { name: 'Pizzelle set of 6', price: { display: '$6.00' } },
          { name: 'Scone', price: { display: '$6.00' } },
          { name: 'Scotch-a-roo', price: { display: '$5.00' }, isOutOfStock: true },
          { name: 'Sticky Bun', price: { display: '$7.00' } },
          { name: 'Stroop Waffle', price: { display: '$4.00' } },
          { name: 'Almond Biscotti Pack', price: { display: '$6.00' }, isOutOfStock: true },
          { name: 'Lemon Poppy Seeds Sliced', price: { display: '$2.00' } },
          { name: 'Tres Leches Cheese Cake', price: { display: '$5.00' }, isOutOfStock: true },
        ],
      },
      {
        title: 'Kolaches',
        items: [
          { name: 'Cheddar Kolache', price: { display: '$6.00' }, isOutOfStock: true },
          { name: 'Jalapeno Kolache', price: { display: '$6.00' }, isOutOfStock: true },
        ],
      },
      {
        title: 'Cookies',
        items: [
          { name: 'Chocolate Chip', price: { display: '$4.00' } },
          { name: 'Lemon Snap', price: { display: '$3.00' } },
          { name: 'Peanut Butter', price: { display: '$4.00' }, isOutOfStock: true },
          { name: 'Red Velvet', price: { display: '$3.00' } },
          { name: 'Snickerdoodle', price: { display: '$4.00' } },
        ],
      },
      {
        title: 'Gluten Free',
        items: [
          { name: 'GF Muffin', price: { display: '$5.00' } },
          { name: 'GF Scotcharoo', price: { display: '$5.00' } },
          { name: 'GF Choc Chip Cookie', price: { display: '$4.00' } },
          { name: 'GF PB Cookie', price: { display: '$4.00' }, isOutOfStock: true },
          { name: 'GF Snickerdoodle', price: { display: '$4.00' }, isOutOfStock: true },
          { name: 'GF Lemon Snap', price: { display: '$3.00' } },
          { name: 'GF Cream Puff', price: { display: '$5.00+' } },
          { name: 'GF Scone', price: { display: '$7.00' } },
          { name: 'GF Cake Pop', price: { display: '$4.00' } },
          { name: 'GF Macaron', price: { display: '$3.00' }, isOutOfStock: true },
          { name: 'GF Cinnamon Roll', price: { display: '$8.00' } },
          { name: 'GF Brownie', price: { display: '$7.00' } },
          { name: 'GF Banana Bread', price: { display: '$10.00' }, isOutOfStock: true },
        ],
      },
    ],
  },

  {
    title: 'Retail',
    sections: [
      {
        title: 'Grab n Go',
        items: [
          { name: 'Parfait & Oats', price: { display: '$5.00' } },
          { name: 'Tiramisu', price: { display: '$8.00' } },
          { name: 'Tres Leches', price: { display: '$8.00' } },
          { name: 'Chai Tea Mix Gift Set', price: { display: '$27.00' } },
        ],
      },
      {
        title: 'Armani',
        items: [
          { name: 'Cookies', price: { display: '$6.00' } },
        ],
      },
      {
        title: 'Coffee',
        items: [
          { name: 'Bojo Coffee Beans', price: { display: '$17.50' } },
        ],
      },
      {
        title: 'Jam',
        items: [
          { name: 'Little Diamonds', price: { display: '$12.00' } },
        ],
      },
    ],
  },

  {
    title: 'Catering',
    sections: [
      {
        title: 'Pastry Trays',
        items: [
          { name: 'Mini Pastry Tray', price: { display: '$30.00' } },
          { name: 'Medium Pastry Tray', price: { display: '$40.00' } },
          { name: 'Full-Size Pastry Tray', price: { display: '$60.00' } },
        ],
      },
      {
        title: 'Sandwich Platters',
        items: [
          { name: 'Mini Sandwich Platter', price: { display: '$30.00' } },
          { name: 'Medium Sandwich Platter', price: { display: '$40.00' } },
          { name: 'Full-Size Sandwich Platter', price: { display: '$60.00' } },
        ],
      },
      {
        title: 'Fruit & Vegetable Trays',
        items: [
          { name: 'Small Tray', price: { display: '$45.00' } },
          { name: 'Medium Tray', price: { display: '$65.00' } },
          { name: 'Large Tray', price: { display: '$85.00' } },
        ],
      },
      {
        title: 'Salad Bowls',
        items: [
          { name: 'Small Salad Bowl', price: { display: '$45.00' } },
          { name: 'Medium Salad Bowl', price: { display: '$65.00' } },
          { name: 'Large Salad Bowl', price: { display: '$85.00' } },
        ],
      },
      {
        title: 'Drinks',
        items: [
          { name: 'Tea Pitcher', price: { display: '$25.00' } },
          { name: 'Lemonade Pitcher', price: { display: '$25.00' } },
        ],
      },
      {
        title: 'Whole Quiche',
        items: [
          { name: 'Bacon', price: { display: '$60.00' } },
          { name: 'Sausage', price: { display: '$60.00' } },
          { name: 'Veggie', price: { display: '$60.00' } },
        ],
      },
      {
        title: 'Soups',
        items: [
          { name: 'Tomato Basil', price: { display: '$40.00' } },
          { name: 'Chophouse Potato', price: { display: '$40.00' } },
          { name: 'Chicken Tortilla (GF)', price: { display: '$40.00' } },
          { name: 'Zuppa Toscana', price: { display: '$40.00' } },
        ],
      },
    ],
  },
];
