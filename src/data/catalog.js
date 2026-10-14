// All products in the store and the 6 collections behind the header tabs.
// Order of products inside each collection matches the reference site.

export const colorHex = {
  Black: '#1d1d1f',
  Plum: '#6b1f35',
  Gray: '#8a8a8d',
  Beige: '#e3cdb4',
  Pink: '#e7a8b5',
  'Light blue': '#a9c8e3',
  Turquoise: '#3fb8b0',
  'Navy blue': '#1f2a44',
  Orange: '#e8833a',
  Wine: '#5e1a2b',
  Forest: '#2f4a3a',
  Melon: '#f2a07b',
  Red: '#c8323c',
};

export const LEGGINGS = '3d-sculpting-anti-cellulite-leggings-instant-lift-smooth';

export const products = [
  {
    handle: 'multi-collagen-powder-for-women',
    title: 'Multi Collagen Superblend — Chocolate | Firmer Skin, Fuller Hair, Stronger Nails',
    shape: 'pouch',
    price: 45.95,
    compareAt: null,
    colors: [],
    option: { name: 'Supply', values: ['1 Pouch', '2 Pouches', '3 Pouches'] },
    text: 'Five types of collagen in a rich chocolate blend. Stir into coffee, a smoothie or hot water once a day.',
  },
  {
    handle: LEGGINGS,
    title: 'Sculpt 3D™ – Lift & Smooth Leggings',
    shape: 'leggings',
    price: 45.95,
    compareAt: 63.95,
    colors: ['Black', 'Plum', 'Gray', 'Beige', 'Pink', 'Light blue', 'Turquoise'],
    option: { name: 'Size', values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL'] },
  },
  {
    handle: '3d-sculpting-anti-cellulite-shorts',
    title: 'Sculpt 3D™ – Lift & Smooth Shorts',
    shape: 'shorts',
    price: 31.95,
    compareAt: 45.95,
    colors: ['Navy blue', 'Black', 'Plum', 'Beige', 'Orange', 'Pink', 'Turquoise'],
    option: { name: 'Size', values: ['S', 'M', 'L', 'XL', '2XL', '3XL'] },
    text: 'The same 3D micro-massage knit as the leggings, cut as bike shorts for warm days and under dresses.',
  },
  {
    handle: 'sculpt-3d-compression-tee',
    title: 'Sculpt 3D™ – Slim & Support Tee',
    shape: 'tee',
    price: 31.95,
    compareAt: 45.95,
    colors: ['Pink', 'Black'],
    option: { name: 'Size', values: ['S', 'M', 'L', 'XL', '2XL', '3XL'] },
    text: 'A compression tee that smooths the waist and back and gently pulls the shoulders back for better posture.',
  },
  {
    handle: 'sculpt-posture-bra',
    title: 'Sculpt Posture Bra — Wireless Front-Closure Lift',
    shape: 'bra',
    price: 36.95,
    compareAt: 54.95,
    colors: ['Black', 'Beige'],
    option: { name: 'Size', values: ['S', 'M', 'L', 'XL', '2XL', '3XL'] },
    text: 'Wireless lift with an easy front closure and a cross-back panel that supports your posture all day.',
  },
  {
    handle: 'sculpt-lift-smooth-arm-sleeves',
    title: 'Sculpt™ – Lift & Smooth Arm Sleeves',
    shape: 'sleeve',
    price: 9.95,
    compareAt: 13.95,
    colors: ['Beige', 'Black'],
    option: null,
    text: 'Light compression sleeves that firm and smooth the upper arms. Invisible under clothes.',
  },
  {
    handle: 'sculpt-cutout-lift-swimsuit',
    title: 'Sculpt™ — Cutout & Lift Swimsuit',
    shape: 'swim-cutout',
    price: 41.95,
    compareAt: 63.95,
    colors: ['Wine', 'Black', 'Forest'],
    option: { name: 'Size', values: ['S', 'M', 'L', 'XL', '2XL'] },
    soldOut: true,
    text: 'A one-piece with a flattering side cutout, built-in tummy control and a lifting bust.',
  },
  {
    handle: 'sculpt-smooth-lift-swimsuit',
    title: 'Sculpt™ — Smooth & Lift Swimsuit',
    shape: 'swim',
    price: 41.95,
    compareAt: 63.95,
    colors: ['Melon', 'Black', 'Light blue', 'Red'],
    option: { name: 'Size', values: ['S', 'M', 'L', 'XL', '2XL', '3XL'] },
    soldOut: true,
    text: 'A smoothing one-piece with tummy control panels and a lifting bust. Classic cut, full coverage.',
  },
];

export const getProduct = (handle) => products.find((p) => p.handle === handle);

// Header tabs, in order. `title` is the heading shown on the collection page.
export const collections = [
  {
    handle: 'all',
    label: 'Shop ALL',
    title: 'Products',
    items: ['multi-collagen-powder-for-women', LEGGINGS, '3d-sculpting-anti-cellulite-shorts', 'sculpt-3d-compression-tee', 'sculpt-posture-bra', 'sculpt-lift-smooth-arm-sleeves', 'sculpt-cutout-lift-swimsuit', 'sculpt-smooth-lift-swimsuit'],
  },
  {
    handle: 'frontpage',
    label: 'Best Sellers',
    title: 'Best Sellers',
    items: [LEGGINGS, 'sculpt-posture-bra', '3d-sculpting-anti-cellulite-shorts', 'sculpt-3d-compression-tee', 'sculpt-smooth-lift-swimsuit', 'sculpt-cutout-lift-swimsuit', 'multi-collagen-powder-for-women'],
  },
  {
    handle: 'sculpt-collection',
    label: 'Sculpt™ Collection',
    title: 'Sculpt™ Collection',
    items: [LEGGINGS, '3d-sculpting-anti-cellulite-shorts', 'sculpt-lift-smooth-arm-sleeves', 'sculpt-posture-bra', 'sculpt-3d-compression-tee', 'sculpt-smooth-lift-swimsuit', 'sculpt-cutout-lift-swimsuit'],
  },
  {
    handle: 'sculpt-swim',
    label: 'Sculpt™ Swim',
    title: 'Sculpt™ Swim',
    items: ['sculpt-smooth-lift-swimsuit', 'sculpt-cutout-lift-swimsuit'],
  },
  {
    handle: 'posture-support',
    label: 'Posture & Support',
    title: 'Posture & Support',
    items: ['sculpt-posture-bra', 'sculpt-3d-compression-tee'],
  },
  {
    handle: 'wellness-supplements',
    label: 'Wellness & Supplements',
    title: 'Wellness & Supplements',
    items: ['multi-collagen-powder-for-women'],
  },
];

export const getCollection = (handle) => collections.find((c) => c.handle === handle);

export const productUrl = (handle) => `/products/${handle}`;
export const collectionUrl = (handle) => `/collections/${handle}`;
