// Brand identity, legal entity, navigation and footer links for Vela Labs (legal entity: Vella)
import { collectionUrl, collections } from './catalog.js';

export const brand = {
  name: 'Vela',
  suffix: 'Labs',
  fullName: 'Vela Labs',
  legalName: 'Vella',
  email: 'contact@velalabs.co',
  supportEmail: 'support@velalabs.co',
  privacyEmail: 'privacy@velalabs.co',
  tagline: 'Compression discrète & maintien postural pour hommes',
};

// Header main menu
export const nav = [
  { label: 'Accueil', to: '/' },
  {
    label: 'Nos Modèles',
    to: '/collections/all',
    children: [
      { label: 'Sans Manches (Débardeur)', to: '/products/vela-sculpt-sans-manches' },
      { label: 'Demi-Manches (Manches courtes)', to: '/products/vela-sculpt-demi-manches' },
      { label: 'Manches Longues', to: '/products/vela-sculpt-manches-longues' },
    ],
  },
  { label: 'Nos Packs & Offres', to: '/pages/offres' },
  { label: 'Pourquoi Vela Labs ?', to: '/pages/notre-technologie' },
  { label: 'Garantie 30 Jours', to: '/pages/garantie' },
  { label: 'Avis Clients', to: '/#reviews' },
];

export const announcements = [
  'Garantie Satisfait ou Remboursé de 30 jours',
  'Livraison Suivie Offerte dès 55 € d’achat ou dès 2 t-shirts',
  'Plus de 45 000 hommes portent Vela Sculpt™ au quotidien',
];

export const footerColumns = [
  {
    title: 'Vela Labs',
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
    title: 'Informations Légales',
    links: [
      { label: 'Politique de Confidentialité', to: '/policies/privacy-policy' },
      { label: 'Conditions Générales de Vente (CGV)', to: '/policies/terms-of-service' },
      { label: 'Politique de Retour & Remboursement (30j)', to: '/policies/refund-policy' },
      { label: 'Mentions Légales', to: '/policies/legal-notice' },
    ],
  },
];

export const policies = [
  { label: 'Politique de Confidentialité', to: '/policies/privacy-policy' },
  { label: 'Conditions Générales de Vente', to: '/policies/terms-of-service' },
  { label: 'Retours & Remboursements (30 jours)', to: '/policies/refund-policy' },
  { label: 'Mentions Légales', to: '/policies/legal-notice' },
];

export const payments = ['Shop Pay', 'Apple Pay', 'Visa', 'Mastercard', 'American Express', 'PayPal', 'Klarna'];

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
    text: 'Transactions chiffrées SSL 256 bits via Shop Pay, Apple Pay, Cartes Bancaires et PayPal.',
  },
  {
    icon: 'chat',
    title: 'Support Client Réactif',
    text: 'Une équipe francophone disponible et réactive pour répondre à toutes vos questions 7j/7.',
  },
];
