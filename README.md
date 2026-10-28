# Vela Labs — Men's Ergonomic Compression Storefront (Shopify Headless)

Boutique e-commerce moderne, ultra-rapide et haute conversion développée en **React 18 + Vite**, conçue pour la marque **Vela Labs** (t-shirts et débardeurs de compression ergonomique pour homme).

L'architecture est **100% statique (JAMstack)** sans aucun serveur ni backend à gérer :
- **Frontend** : Bundle statique compilé via Vite 5, hébergeable instantanément sur **Cloudflare Pages** ou **Vercel**.
- **E-Commerce & Paiement** : Intégralement délégué à **Shopify** (gestion du panier, redirection sécurisée vers la caisse Shopify, gestion des stocks, devises, taxes et paiements CB / Apple Pay / PayPal).

---

## 📋 Table des Matières

1. [Démarrage Local (Node.js)](#-démarrage-local-nodejs)
2. [Intégration & Configuration Shopify](#-intégration--configuration-shopify)
3. [Déploiement sur Cloudflare Pages (Recommandé)](#-déploiement-sur-cloudflare-pages-recommandé)
4. [Déploiement sur Vercel (Alternative)](#-déploiement-sur-vercel-alternative)
5. [Pipelines CI/CD GitHub Actions](#-pipelines-cicd-github-actions)
6. [Structure du Projet](#-structure-du-projet)
7. [Pages & Navigation](#-pages--navigation)

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
- **Cart Permalinks Shopify** : génération automatique d'URLs de commande standardisées (`https://{shop}/cart/{variant_id}:{qty}?channel=headless_front`).

---

## ⚡ Déploiement sur Cloudflare Pages (Recommandé)

### Option A : Connexion Git Directe (Le plus simple, 0 configuration)
1. Rendez-vous sur votre tableau de bord [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages**.
2. Cliquez sur **Create Application** > onglet **Pages** > **Connect to Git**.
3. Sélectionnez le dépôt `JitBay/Ecom_gung`.
4. Paramètres de build :
   - **Framework preset** : `Vite`
   - **Build command** : `npm run build`
   - **Build output directory** : `dist`
   - **Environment variables** : Ajoutez `VITE_SHOPIFY_STORE_DOMAIN=votre-boutique.myshopify.com`
5. Cliquez sur **Save and Deploy**. Votre site est en ligne avec CDN mondial et certificat SSL automatique !

> Le fichier [`public/_redirects`](./public/_redirects) est déjà présent pour assurer le routage SPA sans erreur 404 lors du rafraîchissement des pages.

### Option B : Déploiement automatisé via GitHub Actions
Utilisez le workflow [`.github/workflows/deploy-cloudflare.yml`](./.github/workflows/deploy-cloudflare.yml).  
Ajoutez simplement dans vos GitHub Secrets :
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

---

## ▲ Déploiement sur Vercel (Alternative)

### Option A : Connexion Git Directe
1. Rendez-vous sur [Vercel](https://vercel.com/) et cliquez sur **Add New** > **Project**.
2. Importez le dépôt `JitBay/Ecom_gung`.
3. Vercel détecte automatiquement le fichier [`vercel.json`](./vercel.json) et le preset Vite.
4. Renseignez la variable d'environnement `VITE_SHOPIFY_STORE_DOMAIN`.
5. Cliquez sur **Deploy**.

### Option B : Workflow GitHub Actions
Le workflow [`.github/workflows/deploy-vercel.yml`](./.github/workflows/deploy-vercel.yml) est disponible si vous préférez piloter vos déploiements Vercel depuis GitHub Actions.

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
├── vercel.json                 # Configuration SPA pour hébergement Vercel
├── vite.config.js              # Configuration Vite 5
└── package.json                # Dépendances et scripts de build
```

---

## 🌐 Pages & Navigation

| URL | Description |
|---|---|
| `/` | Page d'accueil (Hero, Best-Sellers, Avis Vidéo, Avis Clients réels, FAQ) |
| `/products/vela-sculpt-sans-manches` | Modèle phare Débardeur Sans Manches avec sélecteur Black Or et achat Shopify |
| `/products/vela-sculpt-demi-manches` | Modèle Demi-Manches (t-shirt classique) |
| `/products/vela-sculpt-manches-longues` | Modèle Manches Longues (maintien intégral) |
| `/collections/all` | Catalogue complet des modèles |
| `/pages/guide-tailles` | Guide interactif des tailles |
| `/pages/garantie` | Garantie 30 Jours Satisfait ou Remboursé |
| `/pages/suivi-commande` | Portail de suivi de colis |
| `/pages/contact` | Support et contact client |
