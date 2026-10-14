// Brand, navigation and footer content. Change the brand name here.
import { collectionUrl, collections } from './catalog.js';

export const brand = { name: 'VELA', suffix: 'LABS' };

// Header tabs: one per collection, same labels and order as the reference site.
export const nav = collections.map((c) => ({ label: c.label, to: collectionUrl(c.handle) }));

export const announcements = [
  '90-day money-back guarantee',
  'Free shipping on orders over €55',
  '250,000+ women already wear them',
];

// Footer link columns. `to` = page inside this app; `href` = placeholder link.
export const footerColumns = [
  {
    title: `${brand.name} Labs`,
    links: [{ label: 'Refer a Friend – Give $10, Get $10', href: '#' }, ...nav],
  },
  {
    title: 'Support',
    links: ['Track Your Order', 'Contact Us', 'Shipping Info', 'Returns & Warranty', 'Subscription management'].map((label) => ({ label, href: '#' })),
  },
];

export const policies = [
  'Privacy policy',
  'Refund policy',
  'Shipping policy',
  'Terms of service',
  'Contact information',
  'Cancellation policy',
  'Cookie preferences',
];

export const payments = ['VISA', 'MC', 'AMEX', 'PayPal', 'Apple Pay', 'G Pay', 'Klarna'];

export const trustItems = [
  { icon: 'shield', title: '90-Day Guarantee', text: 'Ninety days to decide. Full refund if it is not right.' },
  { icon: 'return', title: 'Under 2% Come Back', text: 'Fewer than 2 in 100 orders are returned.' },
  { icon: 'chat', title: 'Real Human Support', text: 'A real person answers. No bots, no scripts.' },
  { icon: 'lock', title: 'Secure Checkout', text: 'Encrypted payments on every order.' },
];
