// Main product: name, gallery, bundles, sizes and the accordion content.
export const product = {
  title: 'Sculpt 3D – Lift & Smooth Leggings',
  rating: 4.8,
  reviewCount: 1010,
};

// Each colour drives the tint of the placeholder product art.
export const colors = [
  { id: 'black', label: 'Black', hex: '#1d1d1f' },
  { id: 'plum', label: 'Plum', hex: '#6b1f35' },
  { id: 'forest', label: 'Forest', hex: '#2f3d33' },
  { id: 'navy', label: 'Navy', hex: '#1f2a44' },
];

export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL'];

// Gallery slides: colour + pose of the placeholder figure.
export const gallery = [
  { color: 'black', pose: 'side' },
  { color: 'black', pose: 'front' },
  { color: 'black', pose: 'back' },
  { color: 'plum', pose: 'side' },
  { color: 'plum', pose: 'front' },
  { color: 'forest', pose: 'back' },
  { color: 'navy', pose: 'front' },
];

export const benefits = [
  { icon: 'pulse', title: 'Visibly smooths skin', text: 'Micro-massage texture works with every step', tag: 'Clinically tested' },
  { icon: 'sparkle', title: 'Firms loose skin', text: 'Better blood flow helps skin bounce back over time', tag: 'Patented' },
  { icon: 'bolt', title: 'Instant lift + flatter tummy', text: 'The sculpting cut shapes you the second you pull them on', tag: '#1 Seller' },
  { icon: 'clock', title: 'Relieves heavy, tired legs', text: 'Worn by nurses through 12-hour shifts on their feet' },
  { icon: 'check', title: '100% squat-proof', text: 'Fully opaque when you bend — second skin, morning to night' },
];

export const stats = [
  { value: '+30', unit: '%', label: 'Circulation boost' },
  { value: '47', unit: '+', label: 'Micro-massage points' },
  { value: '<2', unit: '%', label: 'Return rate' },
];

export const bundles = [
  { id: 1, qty: 1, title: '1 Legging', price: 45.9, compareAt: 65.95 },
  { id: 2, qty: 2, title: '2 Leggings — Get Your 2nd Free', subtitle: 'Two colors. Zero regrets.', price: 45.9, compareAt: 91.9, freeShipping: true },
  {
    id: 3,
    qty: 3,
    title: '3 Leggings — Save €82,95',
    subtitle: 'Wear a different color every day.',
    badge: 'Only €18,30 each',
    price: 54.9,
    compareAt: 137.85,
    freeShipping: true,
    gift: 'FREE €10 Gift Card',
    highlight: true,
  },
];

export const badges = [
  { icon: 'waves', label: '3D Micro-Massage' },
  { icon: 'shield', label: 'Clinically Tested' },
  { icon: 'heart', label: '100% Squat-Proof' },
];

// Size chart: weight (kg) picks the size, height (cm) tells how the leg sits.
export const sizeChart = [
  { size: 'XS', kg: [40, 50], cm: [155, 165], leg: 78 },
  { size: 'S', kg: [50, 60], cm: [158, 168], leg: 80 },
  { size: 'M', kg: [60, 70], cm: [160, 170], leg: 82 },
  { size: 'L', kg: [70, 80], cm: [162, 172], leg: 84 },
  { size: 'XL', kg: [80, 90], cm: [165, 175], leg: 86 },
  { size: 'XXL', kg: [90, 100], cm: [168, 180], leg: 88 },
  { size: 'XXXL', kg: [100, 110], cm: [170, 182], leg: 90 },
  { size: '4XL', kg: [110, 120], cm: [172, 185], leg: 91 },
];

export const howItWorks = [
  { title: 'Micro-massage activation', text: '47+ contact points gently stimulate skin with every movement. Not passive compression — active stimulation all day.' },
  { title: 'Circulation boost', text: 'Graduated compression improves blood flow to problem areas and reduces the fluid retention that makes legs feel heavy.' },
  { title: 'Visible change over time', text: 'Compression, micro-massage and better circulation work together to smooth skin texture with regular wear over 30 days.' },
];

export const timeline = [
  { when: '24 hours', what: 'Lighter legs, instant lift, smoother silhouette' },
  { when: '1 week', what: 'Less swelling, better circulation, less heaviness' },
  { when: '30 days', what: 'Smoother-looking skin, firmer texture, more sculpted look' },
];

export const fabric = [
  ['Fabric', '90% Polyamide / 10% Elastane — compression grade'],
  ['Technology', '3D-ribbed texture with 47+ micro-massage contact points'],
  ['Opacity', '100% squat-proof — opaque under full stretch'],
  ['Waistband', 'High-rise stay-put elastic — no rolling, no digging'],
  ['Lift', 'Built-in sculpting cut shapes glutes as soon as you wear them'],
  ['Care', 'Machine wash at 30°C. Do not bleach, iron or tumble dry.'],
];

export const shipping = {
  lines: ['Processing: 1–2 business days', 'Europe: 5–10 business days', 'International: 10–20 business days', 'Tracking included on every order'],
  returns:
    '90-day money-back guarantee. Not satisfied? Contact us for a full refund — no questions asked. Arrived damaged? Tell us within 10 days and we will replace it.',
};

export const quickFaq = [
  { q: 'Are they see-through?', a: 'No. The 90/10 polyamide-elastane stays fully opaque even at max stretch. It is the first thing we tested for.' },
  { q: 'What if my size is wrong?', a: 'Use the size finder. If it still does not feel right, we exchange or refund within 90 days.' },
  { q: 'How long until I see results?', a: 'Instant lift when you put them on. Lighter legs in the first week. Smoother-looking skin after 30 days of regular wear.' },
];

export const related = [
  { title: 'Sculpt – Lift & Smooth Arm Sleeves', price: 9.95, compareAt: 13.95, colors: ['#e3cdb4', '#1d1d1f'], shape: 'sleeve' },
  { title: 'Sculpt Posture Bra — Front Closure', price: 36.95, compareAt: 54.95, colors: ['#1d1d1f', '#e3cdb4'], shape: 'bra' },
  { title: 'Sculpt 3D – Slim & Support Tee', price: 31.95, compareAt: 45.95, colors: ['#e7a8b5', '#1d1d1f'], shape: 'tee' },
  { title: 'Sculpt 3D – Lift & Smooth Shorts', price: 31.95, compareAt: 45.95, colors: ['#1f2a44', '#1d1d1f', '#6b1f35', '#e3cdb4'], shape: 'shorts' },
];
