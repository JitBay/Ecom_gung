# ZVAR — Vela Sculpt™ | Storefront E-Commerce Headless (Shopify)

Boutique e-commerce moderne, ultra-rapide et haute conversion développée en **React 18 + Vite 5**, conçue pour la marque **ZVAR** et sa gamme de t-shirts et débardeurs de compression ergonomique pour homme **Vela Sculpt™** ([https://www.zvar-shop.com](https://www.zvar-shop.com)).

L'architecture est **100% statique (JAMstack)** sans aucun serveur ni backend à gérer :
- **Frontend** : Bundle statique compilé via Vite 5, optimisé pour mobile / iOS, hébergé sur **Vercel** ou **Cloudflare Pages**.
- **E-Commerce & Paiement** : Intégralement délégué à **Shopify** (gestion du panier, redirection sécurisée vers le checkout Shopify, gestion des stocks, devises, taxes et paiements CB / Apple Pay / PayPal).
- **SEO & Google Search** : Balises Open Graph / Twitter Cards complètes, conformité Googlebot pour favicons carrés (multiples de 48px, ICO multi-couches, SVG), `robots.txt` et en-têtes CORS.
- **Expérience Mobile Optimisée** : Verrouillage strict du viewport (`maximum-scale=1.0, user-scalable=no, viewport-fit=cover`), prévention des débordements horizontaux (`overscroll-behavior-x: none`, `touch-action: pan-y`) et gestion des safe areas iPhone / dynamic island.

---

## 📋 Table des Matières

1. [Démarrage Local (Node.js)](#-démarrage-local-nodejs)
2. [Intégration & Configuration Shopify](#-intégration--configuration-shopify)
3. [Optimisations Mobiles & Performance](#-optimisations-mobiles--performance)
4. [SEO & Conformité Googlebot (Favicons, Robots.txt)](#-seo--conformité-googlebot-favicons-robotstxt)
5. [Déploiement sur Vercel (Production)](#-déploiement-sur-vercel-production)
6. [Déploiement sur Cloudflare Pages (Alternative)](#-déploiement-sur-cloudflare-pages-alternative)
7. [Pipelines CI/CD GitHub Actions](#-pipelines-cicd-github-actions)
8. [Structure du Projet](#-structure-du-projet)
9. [Pages & Navigation](#-pages--navigation)

---

## 💻 Démarrage Local (Node.js)

### Prérequis
- **Node.js** : version 18+ ou 20+ ([Télécharger Node.js](https://nodejs.org/))
- **npm** : version 9+ (inclus avec Node.js)

### 1. Cloner le dépôt et installer les dépendances
```bash
git clone https://github.com/JitBay/Ecom_gung.git
cd Ecom_gung
npm install
```

### 2. Configurer les variables d'environnement
Créez un fichier `.env` à la racine (ou copiez `.env.example`) :
```bash
cp .env.example .env
```
Renseignez votre domaine de boutique Shopify :
```env
VITE_SHOPIFY_STORE_DOMAIN=votre-boutique.myshopify.com
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```
👉 L'application est disponible sur : **[http://localhost:5173](http://localhost:5173)**

### 4. Compiler pour la production
```bash
npm run build
```
Le bundle statique optimisé est généré dans le dossier `dist/`.

---

## 🛍️ Intégration & Configuration Shopify

Le projet intègre une couche de commerce headless dans [`src/lib/shopify.js`](./src/lib/shopify.js) :

### Composants Shopify inclus :
- **Panier tiroir connecté (`CartDrawer.jsx`)** : calcul des totaux en direct, sauvegarde automatique dans le `localStorage`, barre de livraison offerte et bouton de redirection vers la caisse Shopify.
- **Bouton d'achat direct (`ShopifyBuyButton.jsx`)** : bouton d'achat express "Acheter maintenant" qui redirige directement le client vers la caisse Shopify avec l'article sélectionné (sans étape intermédiaire).
- **Badges de réassurance et moyens de paiement (`ShopifyPaymentBadges.jsx`)** : logos officiels Apple Pay, Visa, Mastercard, AMEX, PayPal avec mention de chiffrement SSL 256 bits.
- **Cart Permalinks Shopify & Nettoyage d'URL** : génération automatique d'URLs de commande standardisées et suppression automatique des paramètres de tracking internes pour garantir un lien direct et sécurisé.

---

## 📱 Optimisations Mobiles & Performance

Le storefront est conçu avec une approche mobile-first stricte :
- **Rigidité de la mise en page** : Balise viewport configurée avec `viewport-fit=cover` et protection contre le dézoom intempestif.
- **Zéro fuite horizontale** : Confinement strict de l'ensemble des éléments animés et inclinés (`clip-path: inset(0)`, `contain: paint`), suppression du rubber-banding iOS via `overscroll-behavior-x: none`.
- **Typographie et inputs iOS** : Tailles de police des champs `>= 16px` pour neutraliser le zoom automatique Safari lors de la saisie.
- **Lecteur vidéo et médias responsives** : Adaptation automatique des ratios 4:3 et 3:4 sur mobile avec badges d'information lisibles en glassmorphism sombre.

---

## 🔍 SEO & Conformité Googlebot (Favicons, Robots.txt)

Le site respecte scrupuleusement les exigences de Google Search Central pour l'affichage du favicon dans les résultats de recherche :
- **Dimensions strictement 1:1 et multiples de 48px** :
  - `favicon-48x48.png` (48×48 px)
  - `favicon-96x96.png` (96×96 px)
  - `favicon-192x192.png` (192×192 px)
  - `favicon.ico` (multi-résolutions 16×16, 32×32, 48×48)
  - `favicon.svg` (vectoriel haute fidélité)
- **Règles d'exploration `robots.txt`** : Autorisation explicite de `Googlebot` et `Googlebot-Image` pour l'indexation de tous les favicons et médias.
- **En-têtes CORS (`vercel.json`)** : `Access-Control-Allow-Origin: *` et gestion du cache pour garantir un crawl sans erreur 401/403.
- **Balises statiques initiales** : Balises `<link rel="icon">` intégrées dans le HTML brut de [index.html](./index.html) pour une détection immédiate sans exécution JavaScript.

---

## ▲ Déploiement sur Vercel (Production)

### Option A : Connexion Git Directe (Recommandé)
1. Rendez-vous sur [Vercel](https://vercel.com/) et cliquez sur **Add New** > **Project**.
2. Importez le dépôt `JitBay/Ecom_gung`.
3. Vercel détecte automatiquement le fichier [`vercel.json`](./vercel.json) et le preset Vite.
4. Renseignez la variable d'environnement `VITE_SHOPIFY_STORE_DOMAIN`.
5. Cliquez sur **Deploy**.

---

## ⚡ Déploiement sur Cloudflare Pages (Alternative)

1. Rendez-vous sur votre tableau de bord [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages**.
2. Cliquez sur **Create Application** > onglet **Pages** > **Connect to Git**.
3. Sélectionnez le dépôt `JitBay/Ecom_gung`.
4. Paramètres de build :
   - **Framework preset** : `Vite`
   - **Build command** : `npm run build`
   - **Build output directory** : `dist`
   - **Environment variables** : `VITE_SHOPIFY_STORE_DOMAIN=votre-boutique.myshopify.com`
5. Cliquez sur **Save and Deploy**.

> Le fichier [`public/_redirects`](./public/_redirects) est inclus pour assurer le routage SPA sans erreur 404 lors du rafraîchissement des pages.

---

## 🔄 Pipelines CI/CD GitHub Actions

| Workflow | Fichier | Déclenchement | Rôle |
|---|---|---|---|
| **CI Pipeline** | [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) | Push & PR | Teste le build Vite sur Node 18 et 20 et vérifie l'intégrité du bundle `dist/`. |
| **Cloudflare Pages** | [`.github/workflows/deploy-cloudflare.yml`](./.github/workflows/deploy-cloudflare.yml) | Push `main` ou manuel | Compile et publie automatiquement les fichiers statiques sur Cloudflare Pages. |
| **Vercel** | [`.github/workflows/deploy-vercel.yml`](./.github/workflows/deploy-vercel.yml) | Push `main` ou manuel | Compile et publie le projet sur la plateforme Vercel. |

---

## 📁 Structure du Projet

```text
├── public/
│   ├── _redirects              # Règle de réécriture SPA pour Cloudflare Pages
│   ├── favicon.ico             # Favicon multi-tailles (16, 32, 48px)
│   ├── favicon-48x48.png       # Favicon conforme Googlebot (48x48)
│   ├── favicon-96x96.png       # Favicon Retina (96x96)
│   ├── favicon-192x192.png     # Favicon Android / PWA (192x192)
│   ├── favicon.svg             # Favicon vectoriel ZVAR
│   ├── robots.txt              # Règles d'indexation Googlebot
│   ├── images/                 # Visuels produits et bannières
│   ├── reviews/                # Avis clients réels (photos et vidéos)
│   └── videos/                 # Vidéos produit (sleevless.mp4, etc.)
├── src/
│   ├── components/
│   │   ├── collection/         # Cartes produits, tiroir de filtres
│   │   ├── layout/             # Header bilingue, Footer, CartDrawer (panier Shopify)
│   │   ├── product/            # Configurateur de pack, sélecteur de couleurs, galerie
│   │   ├── sections/           # Hero, CameraRolls, VideoTestimonials, CustomerReviews
│   │   ├── shopify/            # ShopifyBuyButton, ShopifyPaymentBadges
│   │   └── ui/                 # Accordéons, icônes, étoiles de notation
│   ├── context/
│   │   ├── CartContext.jsx     # Gestion du panier avec persistence et redirection checkout
│   │   └── LanguageContext.jsx # Support bilingue FR / EN
│   ├── data/                   # Catalogue de modèles, avis clients réels, traductions
│   ├── lib/
│   │   └── shopify.js          # Couche d'intégration Cart Permalinks & Checkout Shopify
│   ├── pages/                  # HomePage, ProductPage, CollectionPage, Pages légales
│   └── styles/                 # global.css (palette, typographie, design system)
├── vercel.json                 # Configuration SPA & en-têtes CORS pour Vercel
├── vite.config.js              # Configuration Vite 5
└── package.json                # Métadonnées, scripts et dépendances
```

---

## 🌐 Pages & Navigation

| URL | Description |
|---|---|
| `/` | Page d'accueil (Hero, Best-Sellers, Avis Vidéo, Avis Clients réels, FAQ) |
| `/products/vela-sculpt-sans-manches` | Modèle phare Débardeur Sans Manches avec démonstration vidéo et configurateur |
| `/products/vela-sculpt-demi-manches` | Modèle Demi-Manches (t-shirt classique) |
| `/products/vela-sculpt-manches-longues` | Modèle Manches Longues (maintien intégral) |
| `/products/pack-decouverte` | Pack Découverte (3 coupes complémentaires avec offre bundle) |
| `/collections/all` | Catalogue complet des modèles |
| `/pages/guide-tailles` | Guide interactif des tailles |
| `/pages/garantie` | Garantie 30 Jours Satisfait ou Remboursé |
| `/pages/suivi-commande` | Portail de suivi de colis |
| `/pages/contact` | Support et contact client |
