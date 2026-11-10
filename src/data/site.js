// Brand identity, legal entity, navigation and footer links for ZVAR (Shop/Company: ZVAR, Products line: Vela / Vela Sculpt™)
import { collectionUrl, collections } from './catalog.js';

export const brand = {
  name: 'zvar.',
  suffix: '',
  fullName: 'zvar.',
  companyName: 'zvar.',
  shopName: 'zvar.',
  productLine: 'Vela',
  productFullName: 'Vela Sculpt™',
  legalName: 'zvar.',
  email: 'contact@zvar-shop.com',
  supportEmail: 'support@zvar-shop.com',
  privacyEmail: 'privacy@zvar-shop.com',
  instagramUrl: '',
  tiktokUrl: '',
  tagline: 'Compression discrète & maintien postural pour hommes',
};

// Header main menu
export const nav = [
  { label: 'Accueil', to: '/' },
  {
    label: 'Nos Modèles',
    to: '/collections/all',
    children: [
      { label: 'Sans manches (débardeur)', to: '/products/vela-sculpt-sans-manches' },
      { label: 'Demi-manches (manches courtes)', to: '/products/vela-sculpt-demi-manches' },
      { label: 'Manches longues', to: '/products/vela-sculpt-manches-longues' },
    ],
  },
  { label: 'Nos Packs & Offres', to: '/pages/offres' },
  { label: 'Pourquoi zvar ?', to: '/pages/notre-technologie' },
  { label: 'Garantie 30 Jours', to: '/pages/garantie' },
  { label: 'Avis Clients', to: '/#reviews' },
];

export const announcements = [
  'Garantie satisfait ou remboursé de 30 jours',
  'Livraison suivie 100% offerte (6 à 12 jours ouvrés) · Suivi complet en direct · club zvar',
  'Plus de 3 000 clients satisfaits portent Vela Sculpt™ au quotidien',
];

export const footerColumns = [
  {
    title: 'ZVAR',
    links: [
      { label: 'Accueil', to: '/' },
      { label: 'Tous nos modèles', to: '/collections/all' },
      { label: 'Nos Packs & Offres', to: '/pages/offres' },
      { label: 'Notre Technologie', to: '/pages/notre-technologie' },
      { label: 'Garantie 30 Jours', to: '/pages/garantie' },
      { label: 'Avis Vérifiés', to: '/#reviews' },
    ],
  },
  {
    title: 'Support & Aide',
    links: [
      { label: 'Suivi de commande', to: '/pages/suivi-commande' },
      { label: 'Guide des tailles', to: '/pages/guide-tailles' },
      { label: 'Foire Aux Questions (FAQ)', to: '/#faq' },
      { label: 'Contactez-nous', to: '/pages/contact' },
    ],
  },
  {
    title: 'Informations légales',
    links: [
      { label: 'Politique de confidentialité', to: '/policies/privacy-policy' },
      { label: 'Conditions générales de vente (CGV)', to: '/policies/terms-of-service' },
      { label: 'Politique de retour & remboursement (30j)', to: '/policies/refund-policy' },
      { label: 'Mentions légales', to: '/policies/legal-notice' },
    ],
  },
];

export const policies = [
  { label: 'Politique de confidentialité', to: '/policies/privacy-policy' },
  { label: 'Conditions générales de vente', to: '/policies/terms-of-service' },
  { label: 'Retours & Remboursements (30 jours)', to: '/policies/refund-policy' },
  { label: 'Mentions légales', to: '/policies/legal-notice' },
];

export const payments = ['Apple Pay', 'Shop Pay', 'Visa', 'Mastercard', 'American Express', 'Cartes Bancaires'];

export const trustItems = [
  {
    icon: 'shield',
    title: 'Garantie 30 Jours',
    text: 'Testez l’effet gainant chez vous pendant 30 jours. Satisfait ou remboursé selon nos conditions.',
  },
  {
    icon: 'truck',
    title: 'Expédition Suivie 24/48h',
    text: 'Colis expédié avec soin depuis nos entrepôts. Numéro de suivi en temps réel transmis par email.',
  },
  {
    icon: 'lock',
    title: 'Paiement 100% Sécurisé',
    text: 'Transactions chiffrées SSL 256 bits via Apple Pay, Shop Pay et Cartes Bancaires (Visa, Mastercard, Amex).',
  },
  {
    icon: 'chat',
    title: 'Support Client Réactif',
    text: 'Une équipe francophone disponible et réactive pour répondre à toutes vos questions 7j/7.',
  },
];
