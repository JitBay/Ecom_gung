// Hero product configuration, bundles, size chart, fabric info, and 4 offer modules for Vela Labs
import { products } from './catalog.js';

export const product = {
  title: 'Vela Sculpt™ — T-Shirt Gainant Ergonomique',
  subtitle: 'Compression discrète & soutien postural pour homme',
  rating: 4.9,
  reviewCount: 1420,
};

export const colors = [
  { id: 'noir', label: 'Noir', hex: '#1a1a1a' },
  { id: 'blanc', label: 'Blanc', hex: '#f8f8fa' },
  { id: 'gris', label: 'Gris Chiné', hex: '#63666f' },
];

export const sizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];

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
    title: '100% Invisible sous les vêtements',
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

export const stats = [
  { value: '30', unit: 'Jours', label: 'Garantie satisfait ou remboursé' },
  { value: '100', unit: '%', label: 'Discret sous vos vêtements' },
  { value: '45k', unit: '+', label: 'Hommes conquis au quotidien' },
];

export const bundles = [
  {
    id: 1,
    qty: 1,
    title: 'Pack Découverte — 1 T-Shirt',
    subtitle: 'Idéal pour tester l’effet gainant et le confort au quotidien.',
    price: 39.95,
    compareAt: 59.95,
    badge: 'Offre Découverte',
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
  { icon: 'lock', label: 'Paiement Sécurisé SSL' },
  { icon: 'truck', label: 'Expédition Suivie 24/48h' },
];

// Men's size chart: weight (kg) & height (cm)
export const sizeChart = [
  { size: 'S', kg: [58, 68], cm: [160, 172], chest: '88–96 cm', waist: '74–82 cm' },
  { size: 'M', kg: [68, 78], cm: [168, 178], chest: '96–104 cm', waist: '82–90 cm' },
  { size: 'L', kg: [78, 88], cm: [174, 184], chest: '104–112 cm', waist: '90–98 cm' },
  { size: 'XL', kg: [88, 98], cm: [178, 188], chest: '112–120 cm', waist: '98–106 cm' },
  { size: '2XL', kg: [98, 110], cm: [180, 192], chest: '120–128 cm', waist: '106–116 cm' },
  { size: '3XL', kg: [110, 125], cm: [182, 195], chest: '128–138 cm', waist: '116–128 cm' },
];

export const fabric = [
  ['Composition', '88% Polyamide technique micro-respirant, 12% Élasthanne ergonomique haute densité'],
  ['Technologie', 'Maille tridimensionnelle à compression graduée et maintien abdominal ciblé'],
  ['Invisibilité', 'Encolure dégagée et coutures ergonomiques plates imperceptibles sous chemise'],
  ['Thermo-régulation', 'Tissu respirant avec canaux d’évacuation de la sueur et propriétés anti-odeur'],
  ['Entretien', 'Lavage délicat en machine à 30°C. Séchage rapide à l’air libre (pas de sèche-linge)'],
];

export const shipping = {
  lines: [
    'Préparation & expédition : 24 à 48 heures ouvrées',
    'Livraison en France & Europe : 3 à 5 jours ouvrés',
    'Numéro de suivi fourni par email dès expédition',
    'Livraison offerte dès 55 € d’achat (ou avec les packs 2 et 3 t-shirts)',
  ],
  returns:
    'Garantie Satisfait ou Remboursé de 30 jours. Vous bénéficiez de 30 jours à compter de la réception pour essayer votre t-shirt Vela Sculpt™. Si vous n’êtes pas entièrement convaincu du confort ou du maintien, notre service client organise votre retour et remboursement en toute simplicité.',
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
