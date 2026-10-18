// Catalog for Vela Labs — Men's Ergonomic Compression & Shapewear
// Products with real asset photography grouped by color and angles

export const colorHex = {
  Noir: '#1a1a1a',
  Blanc: '#f4f4f6',
  Gris: '#72757d',
  'Gris chiné': '#5a5d66',
  'Bleu Nuit': '#232c3a',
};

export const HERO_PRODUCT = 'vela-sculpt-demi-manches';
export const LEGGINGS = HERO_PRODUCT; // Backwards compatibility alias

export const products = [
  {
    handle: 'vela-sculpt-demi-manches',
    title: 'Vela Sculpt™ — Demi-Manches',
    shortTitle: 'Demi-Manches (Manches courtes)',
    subtitle: 'T-shirt de compression gainant ergonomique pour homme',
    tagline: 'Le basique indispensable sous les tenues de bureau, polos et chemises de tous les jours.',
    badge: 'Plus Populaire',
    modelType: 'demi-manches',
    price: 39.95,
    compareAt: 59.95,
    rating: 4.9,
    reviewCount: 1420,
    colors: ['Noir', 'Blanc', 'Gris'],
    colorImages: {
      Noir: [
        '/images/products/demi-manches/4.jpg',
        '/images/products/demi-manches/5.jpg',
        '/images/products/demi-manches/6.jpg',
      ],
      Blanc: [
        '/images/products/demi-manches/1.jpg',
        '/images/products/demi-manches/2.jpg',
        '/images/products/demi-manches/3.jpg',
      ],
      Gris: [
        '/images/products/demi-manches/7.jpg',
        '/images/products/demi-manches/8.jpg',
        '/images/products/demi-manches/9.jpg',
      ],
    },
    images: [
      '/images/products/demi-manches/4.jpg',
      '/images/products/demi-manches/5.jpg',
      '/images/products/demi-manches/6.jpg',
      '/images/products/demi-manches/1.jpg',
      '/images/products/demi-manches/2.jpg',
      '/images/products/demi-manches/3.jpg',
      '/images/products/demi-manches/7.jpg',
      '/images/products/demi-manches/8.jpg',
      '/images/products/demi-manches/9.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    usage: 'Le basique indispensable sous les tenues de bureau, polos et chemises de tous les jours. Maintien pectoral et abdominal équilibré.',
    targetAvatar: 'Hommes de 40 à 60 ans privilégiant le soutien postural et le confort abdominal au quotidien, ainsi que les hommes souhaitant une silhouette lisse et structurée sous leurs vêtements.',
    technicalDetails: [
      { label: 'Maille 3D respirante', desc: 'Évacuation active de la transpiration, thermo-régulation et technologie anti-odeur.' },
      { label: 'Tissu seconde peau ultra-discret', desc: 'Invisible sous n’importe quel vêtement, coutures plates ergonomiques anti-frottements.' },
      { label: 'Zones de maintien ciblé', desc: 'Gainage abdominal, maintien des lombaires et redressement naturel des épaules.' },
      { label: 'Entretien facile', desc: 'Lavage délicat à 30°C en machine, séchage rapide à l’air libre.' },
    ],
    text: 'Conçu spécifiquement pour les hommes, le t-shirt de compression ergonomique Vela Sculpt™ Demi-Manches lisse visuellement la silhouette sous les chemises, polos et t-shirts tout en assurant un maintien postural naturel et un confort optimal tout au long de la journée.',
  },
  {
    handle: 'vela-sculpt-sans-manches',
    title: 'Vela Sculpt™ — Sans Manches',
    shortTitle: 'Sans Manches (Débardeur)',
    subtitle: 'Débardeur de compression discret haute respirabilité',
    tagline: 'Discrétion absolue sous les chemises légères, t-shirts d’été et séances de sport.',
    badge: 'Ultra Discret',
    modelType: 'sans-manches',
    price: 34.95,
    compareAt: 49.95,
    rating: 4.8,
    reviewCount: 980,
    colors: ['Noir', 'Blanc', 'Gris', 'Bleu Nuit'],
    colorImages: {
      Noir: [
        '/images/products/sans-manches/1.jpeg',
        '/images/products/sans-manches/2.jpeg',
        '/images/products/sans-manches/3.jpeg',
      ],
      Blanc: [
        '/images/products/sans-manches/4.jpeg',
        '/images/products/sans-manches/5.jpeg',
        '/images/products/sans-manches/6.jpeg',
      ],
      Gris: [
        '/images/products/sans-manches/10.jpeg',
        '/images/products/sans-manches/11.jpeg',
        '/images/products/sans-manches/12.jpeg',
      ],
      'Bleu Nuit': [
        '/images/products/sans-manches/7.jpeg',
        '/images/products/sans-manches/8.jpeg',
        '/images/products/sans-manches/9.jpeg',
      ],
    },
    images: [
      '/images/products/sans-manches/1.jpeg',
      '/images/products/sans-manches/2.jpeg',
      '/images/products/sans-manches/3.jpeg',
      '/images/products/sans-manches/4.jpeg',
      '/images/products/sans-manches/5.jpeg',
      '/images/products/sans-manches/6.jpeg',
      '/images/products/sans-manches/10.jpeg',
      '/images/products/sans-manches/11.jpeg',
      '/images/products/sans-manches/12.jpeg',
      '/images/products/sans-manches/7.jpeg',
      '/images/products/sans-manches/8.jpeg',
      '/images/products/sans-manches/9.jpeg',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    usage: 'Discrétion absolue sous les chemises légères, t-shirts d’été et séances de sport.',
    targetAvatar: 'Hommes de 25 à 40 ans cherchant à affiner et structurer leur silhouette en toute liberté de mouvement.',
    technicalDetails: [
      { label: 'Maille 3D respirante', desc: 'Évacuation active de la transpiration et fraîcheur maximale pour l’été ou le sport.' },
      { label: 'Tissu seconde peau ultra-discret', desc: 'Emmanchures ergonomiques invisibles même sous chemise ouverte ou t-shirt léger.' },
      { label: 'Zones de maintien ciblé', desc: 'Compression ciblée sur la sangle abdominale et les pectoraux sans compression excessive.' },
      { label: 'Entretien facile', desc: 'Lavage délicat à 30°C en machine, séchage rapide à l’air libre.' },
    ],
    text: 'Le débardeur de compression Vela Sculpt™ Sans Manches offre une invisibilité totale sous vos vêtements légers. Il sculpte le torse, aplatit le ventre et affine les côtés tout en libérant totalement les bras.',
  },
  {
    handle: 'vela-sculpt-manches-longues',
    title: 'Vela Sculpt™ — Manches Longues',
    shortTitle: 'Manches Longues',
    subtitle: 'Compression intégrale haut du corps & maintien postural',
    tagline: 'Soutien complet du haut du corps, maintien thermique et maintien postural renforcé.',
    badge: 'Maintien Renforcé',
    modelType: 'manches-longues',
    price: 44.95,
    compareAt: 64.95,
    rating: 4.9,
    reviewCount: 750,
    colors: ['Noir', 'Gris chiné', 'Blanc'],
    colorImages: {
      Noir: [
        '/images/products/manches-longues/1.jpg',
        '/images/products/manches-longues/2.jpg',
        '/images/products/manches-longues/3.jpg',
      ],
      'Gris chiné': [
        '/images/products/manches-longues/4.jpg',
        '/images/products/manches-longues/5.jpg',
        '/images/products/manches-longues/6.jpg',
      ],
      Blanc: [
        '/images/products/manches-longues/7.jpg',
        '/images/products/manches-longues/8.jpg',
        '/images/products/manches-longues/9.jpg',
      ],
    },
    images: [
      '/images/products/manches-longues/1.jpg',
      '/images/products/manches-longues/2.jpg',
      '/images/products/manches-longues/3.jpg',
      '/images/products/manches-longues/4.jpg',
      '/images/products/manches-longues/5.jpg',
      '/images/products/manches-longues/6.jpg',
      '/images/products/manches-longues/7.jpg',
      '/images/products/manches-longues/8.jpg',
      '/images/products/manches-longues/9.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    usage: 'Soutien complet du haut du corps, maintien thermique sous les pulls ou vestes et maintien postural renforcé des bras et du dos.',
    targetAvatar: 'Hommes recherchant un soutien postural complet et une silhouette harmonieuse sous pulls, vestes ou tenues formelles.',
    technicalDetails: [
      { label: 'Maille 3D respirante', desc: 'Isolation thermique intelligente et thermo-régulation anti-humidité.' },
      { label: 'Tissu seconde peau ultra-discret', desc: 'Galbe complet des bras, du torse et du dos sans épaisseur sous vos vêtements.' },
      { label: 'Zones de maintien postural renforcé', desc: 'Panneau dorsal ergonomique en X pour ouvrir la cage thoracique et soutenir la colonne.' },
      { label: 'Entretien facile', desc: 'Lavage délicat à 30°C en machine, séchage rapide à l’air libre.' },
    ],
    text: 'Le t-shirt manches longues Vela Sculpt™ combine gainage abdominal et soutien postural actif sur l’ensemble du dos et des bras. Idéal sous les pulls, costumes ou pour les journées fraîches.',
  },
];

export const getColorImages = (product, color) => {
  if (!product) return [];
  if (product.colorImages && color && product.colorImages[color]) {
    return product.colorImages[color];
  }
  // Default to first color images or flat images
  if (product.colorImages) {
    const firstColor = Object.keys(product.colorImages)[0];
    return product.colorImages[firstColor];
  }
  return product.images || [];
};

export const getProduct = (handle) => {
  if (!handle) return products[0];
  // Redirect legacy handles
  if (
    handle === '3d-sculpting-anti-cellulite-leggings-instant-lift-smooth' ||
    handle === 'sculpt-posture-bra' ||
    handle === 'sculpt-3d-compression-tee' ||
    handle === '3d-sculpting-anti-cellulite-shorts' ||
    handle === 'sculpt-lift-smooth-arm-sleeves' ||
    handle === 'multi-collagen-powder-for-women' ||
    handle === 'sculpt-cutout-lift-swimsuit' ||
    handle === 'sculpt-smooth-lift-swimsuit'
  ) {
    return products[0];
  }
  return products.find((p) => p.handle === handle) || products[0];
};

export const collections = [
  {
    handle: 'all',
    label: 'Tous nos modèles',
    title: 'La Gamme Vela Sculpt™',
    description: 'Découvrez nos 3 coupes ergonomiques conçues pour lisser la silhouette et soutenir la posture masculine au quotidien.',
    items: ['vela-sculpt-demi-manches', 'vela-sculpt-sans-manches', 'vela-sculpt-manches-longues'],
  },
  {
    handle: 'sans-manches',
    label: 'Sans Manches (Débardeur)',
    title: 'Vela Sculpt™ Sans Manches',
    description: 'Invisibilité totale sous les chemises légères, polos et t-shirts.',
    items: ['vela-sculpt-sans-manches'],
  },
  {
    handle: 'demi-manches',
    label: 'Demi-Manches (Manches courtes)',
    title: 'Vela Sculpt™ Demi-Manches',
    description: 'Notre modèle classique le plus plébiscité pour le quotidien et le bureau.',
    items: ['vela-sculpt-demi-manches'],
  },
  {
    handle: 'manches-longues',
    label: 'Manches Longues',
    title: 'Vela Sculpt™ Manches Longues',
    description: 'Gainage intégral et renfort postural supérieur pour les saisons fraîches.',
    items: ['vela-sculpt-manches-longues'],
  },
];

export const getCollection = (handle) => collections.find((c) => c.handle === handle) || collections[0];

export const productUrl = (handle) => `/products/${handle}`;
export const collectionUrl = (handle) => `/collections/${handle}`;
