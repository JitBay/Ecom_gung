// Hero product configuration, bundles, size chart, fabric info, and 4 offer modules for Vela Labs
import { products } from './catalog.js';

export const product = {
  title: 'Vela Sculpt™ — T-shirt gainant ergonomique',
  subtitle: 'Compression discrète & soutien postural pour homme',
  rating: 4.9,
  reviewCount: 67,
};

export const colors = [
  { id: 'noir', label: 'Noir', hex: '#1a1a1a' },
  { id: 'blanc', label: 'Blanc', hex: '#f8f8fa' },
  { id: 'gris', label: 'Gris chiné', hex: '#63666f' },
  { id: 'black-or', label: 'Black Or', hex: '#221e17' },
  { id: 'bleu-nuit', label: 'Black Or', hex: '#221e17' },
];

export const sizes = ['S', 'M', 'L', 'XL', '2XL'];

// 4 value propositions / offer modules for marketing and A/B testing
export const offerModules = [
  {
    id: 1,
    title: 'Silhouette plus nette',
    subtitle: 'Sans changer ta garde-robe',
    tagline: 'Lissage discret et immédiat',
    hook:
      'Obtiens une silhouette visuellement plus lisse sous tes tee-shirts et chemises grâce à un t-shirt de compression discret, conçu pour accompagner tes tenues quotidiennes sans ajouter de couches compliquées ni bouleverser tes habitudes.',
    guaranteeBadge:
      'Essaie-le pendant 30 jours. Si tu n’es pas satisfait du confort ou du rendu, demande un remboursement conformément aux conditions de la garantie.',
    icon: 'sparkle',
  },
  {
    id: 2,
    title: 'Le confort avant tout',
    subtitle: 'Maintien doux et respirant',
    tagline: 'Conçu pour le bureau & les sorties',
    hook:
      'Profite d’un maintien ajusté qui s’intègre facilement à ta journée, au bureau comme en sortie, avec un t-shirt de compression pensé pour rester discret sous tes vêtements et t’éviter de choisir entre maintien et confort.',
    guaranteeBadge:
      'Bénéficie de 30 jours pour évaluer le confort et l’ajustement du produit. Si l’expérience ne te convient pas, tu peux demander un remboursement selon les conditions annoncées.',
    icon: 'heart',
  },
  {
    id: 3,
    title: 'Plus de confiance',
    subtitle: 'Porte tes vêtements avec assurance',
    tagline: 'Idéal sous chemises ajustées',
    hook:
      'Porte tes chemises et tes tee-shirts avec davantage d’assurance grâce à une couche gainante discrète qui aide à lisser visuellement la silhouette, sans devoir renouveler ta garde-robe ni adopter une routine compliquée.',
    guaranteeBadge:
      'Tu disposes de 30 jours pour décider si le produit répond à tes attentes. Si ce n’est pas le cas, tu peux demander un remboursement selon les modalités de retour clairement communiquées lors de l’achat.',
    icon: 'shield',
  },
  {
    id: 4,
    title: 'Solution simple',
    subtitle: 'Pour ton quotidien',
    tagline: 'Enfile-le et oublie-le',
    hook:
      'Simplifie ta routine vestimentaire avec un seul t-shirt de compression conçu pour associer maintien, discrétion et facilité d’utilisation, afin de profiter d’une silhouette visuellement plus lisse sous tes vêtements, sans effort supplémentaire au quotidien.',
    guaranteeBadge:
      'Profite d’une garantie satisfait ou remboursé de 30 jours, avec des conditions transparentes concernant les retours, les frais éventuels et les modalités de remboursement.',
    icon: 'bolt',
  },
];

export const offerModulesEn = [
  {
    id: 1,
    title: 'Cleaner Silhouette',
    subtitle: 'Without changing your wardrobe',
    tagline: 'Discreet, instant smoothing',
    hook:
      'Get a visually smoother physique under your shirts and tees with discreet compression wear designed to fit seamlessly into your daily wardrobe without uncomfortable extra layers.',
    guaranteeBadge:
      'Try it for 30 days. If you are not satisfied with the fit or comfort, simply request a full refund according to our guarantee terms.',
    icon: 'sparkle',
  },
  {
    id: 2,
    title: 'Comfort Above All',
    subtitle: 'Soft, breathable support',
    tagline: 'Engineered for office & daily life',
    hook:
      'Enjoy tailored support that moves with your day—at the desk or on the move. Breathable compression designed to stay invisible so you never have to choose between support and comfort.',
    guaranteeBadge:
      'Benefit from 30 days to evaluate the comfort and fit. If the experience does not suit you, request a refund with ease.',
    icon: 'heart',
  },
  {
    id: 3,
    title: 'More Confidence',
    subtitle: 'Wear your clothes with pride',
    tagline: 'Ideal under fitted shirts',
    hook:
      'Wear fitted dress shirts and tees with effortless confidence thanks to a discreet shaping layer that slims your midsection without needing an overhaul of your closet.',
    guaranteeBadge:
      'You have 30 days to decide whether the product meets your expectations. Full refund guaranteed if you are not convinced.',
    icon: 'shield',
  },
  {
    id: 4,
    title: 'Simple Daily Solution',
    subtitle: 'For your routine',
    tagline: 'Put it on and forget it',
    hook:
      'Simplify your dressing routine with a single ergonomic base layer engineered for support, invisibility, and effortless wear every single day.',
    guaranteeBadge:
      'Backed by our 30-day money-back guarantee with straightforward return conditions and prompt refunds.',
    icon: 'bolt',
  },
];

export const benefits = [
  {
    icon: 'sparkle',
    title: 'Silhouette lissée instantanément',
    text: 'Gainage abdominal doux qui aplatit le ventre et estompe les poignées d’amour sous chemise ou t-shirt.',
    tag: 'Effet Immédiat',
  },
  {
    icon: 'pulse',
    title: 'Soutien postural ergonomique',
    text: 'Structure dorsale ciblée qui invite à redresser naturellement le torse et à soulager les tensions.',
    tag: 'Confort 24h',
  },
  {
    icon: 'shield',
    title: '100% invisible sous les vêtements',
    text: 'Encolure basse et coutures ultra-plates plates imperceptibles même sous une chemise blanche ajustée.',
    tag: 'Seconde Peau',
  },
  {
    icon: 'waves',
    title: 'Maille 3D micro-respirante',
    text: 'Évacuation active de l’humidité et fibres anti-odeur pour rester parfaitement au frais toute la journée.',
    tag: 'Thermo-régulant',
  },
];

export const benefitsEn = [
  {
    icon: 'sparkle',
    title: 'Instantly Smoothed Silhouette',
    text: 'Gentle core compression that flattens the midsection and eliminates love handles under shirts or tees.',
    tag: 'Instant Effect',
  },
  {
    icon: 'pulse',
    title: 'Ergonomic Posture Support',
    text: 'Targeted dorsal band structure that naturally aligns your torso and relieves muscle tension.',
    tag: 'All-Day Comfort',
  },
  {
    icon: 'shield',
    title: '100% Invisible Under Clothes',
    text: 'Low-cut collar and ultra-flat bonded seams imperceptible even under a crisp white fitted shirt.',
    tag: 'Second Skin',
  },
  {
    icon: 'waves',
    title: 'Micro-Breathable 3D Mesh',
    text: 'Active moisture-wicking and anti-odor fibers keep you completely fresh and dry all day.',
    tag: 'Thermo-Regulating',
  },
];

export const stats = [
  { value: '30', unit: 'Jours', label: 'Garantie satisfait ou remboursé' },
  { value: '100', unit: '%', label: 'Discret sous vos vêtements' },
  { value: '3k', unit: '+', label: 'Clients satisfaits au quotidien' },
];

export const statsEn = [
  { value: '30', unit: 'Days', label: 'Money-back guarantee' },
  { value: '100', unit: '%', label: 'Discreet under your clothes' },
  { value: '3k', unit: '+', label: 'Satisfied customers wearing daily' },
];

export const bundles = [
  {
    id: 1,
    qty: 1,
    title: 'Pack découverte — 1 t-shirt',
    subtitle: 'Idéal pour tester l’effet gainant et le confort au quotidien.',
    price: 39.95,
    compareAt: 59.95,
    badge: 'Offre découverte',
    freeShipping: false,
  },
  {
    id: 2,
    qty: 2,
    title: 'Pack Duo — 2 T-Shirts',
    subtitle: 'Le basique de rotation pour alterner au bureau ou en déplacement.',
    price: 69.9,
    compareAt: 119.9,
    badge: 'Le Plus Choisi — Économisez 50 €',
    freeShipping: true,
    highlight: true,
  },
  {
    id: 3,
    qty: 3,
    title: 'Pack Semaine — 3 T-Shirts',
    subtitle: 'La tranquillité toute la semaine : 1 t-shirt toujours propre sous la main.',
    badge: 'Meilleure Valeur — Économisez 90 €',
    price: 89.85,
    compareAt: 179.85,
    freeShipping: true,
    gift: 'Guide Posture & Maintien Offert',
  },
];

export const badges = [
  { icon: 'shield', label: 'Garantie 30 Jours' },
  { icon: 'lock', label: 'Paiement sécurisé SSL' },
  { icon: 'truck', label: 'Expédition Suivie 24/48h' },
];

export const badgesEn = [
  { icon: 'shield', label: '30-Day Guarantee' },
  { icon: 'lock', label: 'SSL Secure Checkout' },
  { icon: 'truck', label: '24/48h Tracked Shipping' },
];

// Men's size chart: weight (kg) & height (cm)
export const sizeChart = [
  { size: 'S', kg: [58, 68], cm: [160, 172], chest: '88–96 cm', waist: '74–82 cm' },
  { size: 'M', kg: [68, 78], cm: [168, 178], chest: '96–104 cm', waist: '82–90 cm' },
  { size: 'L', kg: [78, 88], cm: [174, 184], chest: '104–112 cm', waist: '90–98 cm' },
  { size: 'XL', kg: [88, 98], cm: [178, 188], chest: '112–120 cm', waist: '98–106 cm' },
  { size: '2XL', kg: [98, 115], cm: [180, 195], chest: '120–128 cm', waist: '106–116 cm' },
];

export const fabric = [
  ['Composition', '88% Polyamide technique micro-respirant, 12% Élasthanne ergonomique haute densité'],
  ['Technologie', 'Maille tridimensionnelle à compression graduée et maintien abdominal ciblé'],
  ['Invisibilité', 'Encolure dégagée et coutures ergonomiques plates imperceptibles sous chemise'],
  ['Thermo-régulation', 'Tissu respirant avec canaux d’évacuation de la sueur et propriétés anti-odeur'],
  ['Entretien', 'Lavage délicat en machine à 30°C. Séchage rapide à l’air libre (pas de sèche-linge)'],
];

export const fabricEn = [
  ['Composition', '88% High-grade technical polyamide, 12% ergonomic high-density elastane'],
  ['Technology', 'Graduated 3D knit compression with targeted abdominal support'],
  ['Invisibility', 'Deep neckline and flat ergonomic seams imperceptible under dress shirts'],
  ['Thermal Control', 'Breathable knit with sweat channels and anti-odor properties'],
  ['Care', 'Machine wash delicate at 30°C. Quick air dry (do not tumble dry)'],
];

export const shipping = {
  lines: [
    'Préparation & expédition : 24 à 48 heures ouvrées',
    'Livraison en France & Europe : 3 à 5 jours ouvrés',
    'Numéro de suivi fourni par email dès expédition',
    'Livraison offerte dès 55 € d’achat (ou avec les packs 2 et 3 t-shirts)',
  ],
  returns:
    'Garantie satisfait ou remboursé de 30 jours. Vous bénéficiez de 30 jours à compter de la réception pour essayer votre t-shirt Vela Sculpt™. Si vous n’êtes pas entièrement convaincu du confort ou du maintien, notre service client organise votre retour et remboursement en toute simplicité.',
};

export const shippingEn = {
  lines: [
    'Order processing & dispatch: 24 to 48 business hours',
    'Delivery across Europe: 3 to 5 business days',
    'Live tracking number provided via email upon dispatch',
    'Free shipping on orders over €55 or with 2+ shirt packs',
  ],
  returns:
    '30-Day Money-Back Guarantee. Take 30 days from delivery to test your Vela Sculpt™ shirt. If you are not 100% satisfied with the comfort or support, our team handles your return and full refund.',
};

export const quickFaq = [
  {
    q: 'Le t-shirt se voit-il sous une chemise blanche ou un polo ?',
    a: 'Non, c’est notre priorité numéro 1. L’encolure basse ne dépasse pas sous un premier bouton ouvert, et les coutures plates disparaissent totalement sous le tissu de vos chemises ou t-shirts.',
  },
  {
    q: 'Quelle taille dois-je choisir ?',
    a: 'Nous vous conseillons de prendre votre taille habituelle de t-shirt. Si vous êtes entre deux tailles et souhaitez une compression plus ferme, prenez la taille inférieure ; pour un confort plus décontracté, optez pour la taille supérieure.',
  },
  {
    q: 'Puis-je le porter toute la journée au travail ?',
    a: 'Absolument. La maille 3D élastique est pensée pour bouger avec vous. Elle maintient les muscles abdominaux et dorsaux sans couper la respiration ni restreindre vos mouvements.',
  },
  {
    q: 'Comment fonctionne la Garantie 30 Jours ?',
    a: 'Vous avez 30 jours complets après réception pour essayer votre produit. Si vous n’êtes pas satisfait, écrivez-nous à support@velalabs.co pour déclencher votre retour et remboursement.',
  },
];

export const quickFaqEn = [
  {
    q: 'Does the shirt show under a white dress shirt or polo?',
    a: 'No, that was our #1 design priority. The low neckline stays hidden even with an open collar button, and ultra-flat seams disappear completely under your shirt fabric.',
  },
  {
    q: 'What size should I choose?',
    a: 'We recommend your usual shirt size. If between sizes and seeking firmer compression, size down; for relaxed everyday comfort, size up.',
  },
  {
    q: 'Can I wear it all day at the office?',
    a: 'Absolutely. The elastic 3D knit is engineered to move with you all day without restricting your breathing or movement.',
  },
  {
    q: 'How does the 30-Day Guarantee work?',
    a: 'You have a full 30 days after delivery to test it. If you are not completely satisfied, email us at support@velalabs.co to arrange your return and full refund.',
  },
];
