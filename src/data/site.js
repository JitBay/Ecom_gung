// Brand, navigation and footer content. Change the brand name here.
export const brand = { name: 'VELA', suffix: 'LABS' };

export const announcements = [
  '90-day money-back guarantee',
  'Free shipping on orders over €55',
  '250,000+ women already wear them',
];

export const nav = [
  'Shop All',
  'Best Sellers',
  'Sculpt Collection',
  'Sculpt Swim',
  'Posture & Support',
  'Wellness & Supplements',
];

export const footerColumns = [
  {
    title: `${brand.name} Labs`,
    links: ['Refer a Friend – Give €10, Get €10', ...nav],
  },
  {
    title: 'Support',
    links: ['Track Your Order', 'Contact Us', 'Shipping Info', 'Returns & Warranty', 'Subscription Management'],
  },
];

export const policies = [
  'Privacy policy',
  'Refund policy',
  'Shipping policy',
  'Terms of service',
  'Contact information',
  'Cookie preferences',
];

export const payments = ['VISA', 'MC', 'AMEX', 'PayPal', 'Apple Pay', 'G Pay', 'Klarna'];

export const trustItems = [
  { icon: 'shield', title: '90-Day Guarantee', text: 'Ninety days to decide. Full refund if it is not right.' },
  { icon: 'return', title: 'Under 2% Come Back', text: 'Fewer than 2 in 100 orders are returned.' },
  { icon: 'chat', title: 'Real Human Support', text: 'A real person answers. No bots, no scripts.' },
  { icon: 'lock', title: 'Secure Checkout', text: 'Encrypted payments on every order.' },
];
