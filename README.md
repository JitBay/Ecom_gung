# Vela Labs — Men's Ergonomic Compression Storefront

Boutique e-commerce moderne et haute performance développée en **React 18 + Vite**, conçue pour la marque **Vela Labs** (t-shirts et débardeurs de compression ergonomique pour homme). Le projet est optimisé pour une conversion e-commerce maximale (style Shopify haut de gamme), avec lecteur vidéo intégré, avis clients vérifiés et support bilingue (FR / EN).

---

## 📋 Table des Matières / Table of Contents

1. [Prérequis / Prerequisites](#-prérequis--prerequisites)
2. [Option 1 : Installation et Démarrage SANS Docker (Node.js)](#-option-1--installation-et-démarrage-sans-docker-nodejs)
3. [Option 2 : Installation et Démarrage AVEC Docker](#-option-2--installation-et-démarrage-avec-docker)
   - [Méthode A : Docker Compose (Recommandée)](#méthode-a--docker-compose-recommandée)
   - [Méthode B : Docker CLI (Direct)](#méthode-b--docker-cli-direct)
   - [Méthode C : Docker en Mode Développement (Live Reload)](#méthode-c--docker-en-mode-développement-live-reload)
4. [Pages & Routes Disponibles](#-pages--routes-disponibles)
5. [Structure du Projet](#-structure-du-projet)
6. [Commandes Utiles](#-commandes-utiles)
7. [Intégration & Déploiement Continu (CI/CD GitHub Actions)](#-intégration--déploiement-continu-cicd-github-actions)

---

## ⚙️ Prérequis / Prerequisites

### Pour exécuter sans Docker :
- **Node.js** : version 18+ ou 20+ recommandée ([Télécharger Node.js](https://nodejs.org/))
- **npm** : version 9+ (inclus avec Node.js)

### Pour exécuter avec Docker :
- **Docker Engine** : version 24+ ([Installer Docker Desktop](https://www.docker.com/products/docker-desktop/))
- **Docker Compose** : version 2+ (inclus avec Docker Desktop ou plugin `docker compose`)

---

## 💻 Option 1 : Installation et Démarrage SANS Docker (Node.js)

### 1. Cloner le projet (si ce n'est pas déjà fait)
```bash
git clone https://github.com/JitBay/Ecom_gung.git
cd Ecom_gung
```

### 2. Installer les dépendances
Installez les packages nécessaires listés dans `package.json` :
```bash
npm install
```

### 3. Lancer en mode Développement
Démarrez le serveur de développement Vite avec rechargement à chaud (HMR) :
```bash
npm run dev
```
👉 L'application est disponible sur : **[http://localhost:5173](http://localhost:5173)**

### 4. Compiler pour la Production (Build)
Pour générer le bundle de production optimisé et minifié dans le dossier `dist/` :
```bash
npm run build
```

### 5. Prévisualiser le Build de Production
Pour tester en local le bundle de production avant déploiement :
```bash
npm run preview
```
👉 La prévisualisation est accessible sur : **[http://localhost:4173](http://localhost:4173)**

---

## 🐳 Option 2 : Installation et Démarrage AVEC Docker

L'application est conteneurisée grâce à un `Dockerfile` multi-stage :
- **Étape 1 (`builder`)** : compilation de l'application via `node:20-alpine`.
- **Étape 2 (`runner`)** : distribution des fichiers statiques optimisés via un serveur `nginx:1.27-alpine` haute performance avec gestion du streaming vidéo (byte-range requests) et routage SPA.

---

### Méthode A : Docker Compose (Recommandée)

Cette méthode permet de construire et lancer le conteneur en une seule commande.

#### 1. Démarrer le conteneur
```bash
docker compose up --build
```
*Pour lancer le conteneur en tâche de fond (arrière-plan / detached) :*
```bash
docker compose up -d --build
```

#### 2. Accéder à l'application
Ouvrez votre navigateur sur : **[http://localhost:8080](http://localhost:8080)**

#### 3. Voir les logs du conteneur
```bash
docker compose logs -f
```

#### 4. Arrêter l'application
```bash
docker compose down
```

---

### Méthode B : Docker CLI (Direct)

Si vous préférez utiliser directement les commandes `docker` :

#### 1. Construire l'image Docker
```bash
docker build -t vela-labs-app .
```

#### 2. Démarrer le conteneur
```bash
docker run -d -p 8080:80 --name vela-labs vela-labs-app
```
👉 Accédez à l'application sur : **[http://localhost:8080](http://localhost:8080)**

#### 3. Arrêter et supprimer le conteneur
```bash
docker stop vela-labs
docker rm vela-labs
```

---

### Méthode C : Docker en Mode Développement (Live Reload)

Si vous souhaitez développer à l'intérieur de Docker sans installer Node.js sur votre machine hôte :

```bash
docker compose -f docker-compose.dev.yml up
```
👉 Le serveur de développement est exposé sur : **[http://localhost:5173](http://localhost:5173)** (avec synchronisation automatique de vos fichiers de code).

---

## 🌐 Pages & Routes Disponibles

| URL | Description |
|---|---|
| `/` | Page d'accueil (Hero, Best-Sellers, Avis Vidéo, Avis Clients vérifiés, FAQ) |
| `/products/vela-sculpt-sans-manches` | Fiche produit Débardeur Sans Manches (modèle phare avec vidéo hero et sélection Black Or) |
| `/products/vela-sculpt-demi-manches` | Fiche produit Demi-Manches (t-shirt classique) |
| `/products/vela-sculpt-manches-longues` | Fiche produit Manches Longues (maintien intégral) |
| `/collections/all` | Catalogue complet avec tiroir de filtres |
| `/pages/guide-des-tailles` | Guide interactif des tailles |
| `/pages/garantie-30-jours` | Détails de la Garantie 30 Jours Satisfait ou Remboursé |
| `/pages/suivi-de-commande` | Portail de suivi de colis |
| `/pages/contact` | Formulaire et support client |

---

## 📁 Structure du Projet

```text
├── Dockerfile                  # Configuration multi-stage Docker (Node build + Nginx runner)
├── docker-compose.yml          # Déploiement production conteneurisé (port 8080)
├── docker-compose.dev.yml      # Environnement de développement sous Docker (port 5173)
├── nginx.conf                  # Configuration Nginx (routage SPA, gzip, streaming vidéo)
├── .dockerignore               # Fichiers exclus du build Docker pour builds rapides
├── package.json                # Dépendances et scripts npm
├── vite.config.js              # Configuration du bundler Vite
├── public/
│   ├── images/                 # Photographies produits, textile et bannières
│   ├── reviews/                # Avis clients : photos et vidéos (7.mp4, 8.mp4, 9.mp4)
│   └── videos/                 # Vidéos du site (sleevless.mp4, video-banner.mp4, etc.)
└── src/
    ├── components/
    │   ├── collection/         # Cartes produits, tiroir de filtres
    │   ├── layout/             # Header bilingue, Footer, Tiroir panier
    │   ├── product/            # Configurateur de pack, sélecteur de couleurs, galerie
    │   ├── sections/           # Hero, CameraRolls, VideoTestimonials, CustomerReviews
    │   └── ui/                 # Modales, étoiles de notation, accordéons, icônes
    ├── context/                # LanguageContext (sélecteur FR / EN)
    ├── data/                   # Catalogue, avis clients réels (reviews.js), traductions
    ├── pages/                  # HomePage, ProductPage, CollectionPage, Pages légales
    └── styles/                 # global.css (variables CSS, typographies, palette)
```

---

## 🛠️ Commandes Utiles

| Commande | Action |
|---|---|
| `npm run dev` | Lance le serveur local Vite en mode développement |
| `npm run build` | Compile le projet pour la production dans `dist/` |
| `npm run preview` | Prévisualise en local le résultat de production |
| `docker compose up --build` | Construit et démarre le conteneur de production |
| `docker compose down` | Arrête et supprime les conteneurs Docker |
| `docker compose logs -f` | Suit les logs de requêtes Nginx en direct |

---

## 🔒 Configuration Nginx & Optimisations de Production

Le conteneur de production intègre une configuration Nginx sur mesure dans [`nginx.conf`](./nginx.conf) :
- **Routage SPA (Single Page Application)** : redirection de toutes les routes inconnues vers `/index.html` pour éviter les erreurs 404 lors du rechargement de page avec React Router.
- **Streaming Vidéo HTTP 206** : gestion des requêtes partielles (`Accept-Ranges: bytes`) pour les fichiers `.mp4` et `.mov`, permettant un démarrage immédiat des vidéos sans bloquer le téléchargement.
- **Compression Gzip** : activée sur tous les fichiers texte, CSS, JavaScript et JSON pour réduire la bande passante jusqu'à 70%.
- **Cache-Control Immuable** : mise en cache à long terme (`1 an`) des assets avec hachage pour des temps de chargement ultra-rapides.

---

## 🚀 Intégration & Déploiement Continu (CI/CD GitHub Actions)

Le projet intègre une suite de workflows automatisés dans `.github/workflows/` :

| Workflow | Fichier | Déclenchement | Description |
|---|---|---|---|
| **CI Pipeline** | [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) | Push & PR (`main`, `feature/**`) | Valide le build sur **Node.js 18 et 20**, met en cache les dépendances npm, et vérifie la génération du bundle statique (`dist/index.html`). |
| **Docker CI/CD** | [`.github/workflows/docker-publish.yml`](./.github/workflows/docker-publish.yml) | Push `main` ou tags `v*.*.*` | Compile l'image de production avec **Docker Buildx + QEMU**, met en cache les couches via `type=gha`, et publie l'image sur **GitHub Container Registry (GHCR)** (`ghcr.io/jitbay/ecom_gung`). |
| **CD Deployment** | [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) | Après build Docker ou manuel (`workflow_dispatch`) | Déploie automatiquement l'image Docker sur un **VPS via SSH** (ou déclenche un **Webhook** PaaS tel que Coolify / Portainer). |
| **GitHub Pages** | [`.github/workflows/deploy-github-pages.yml`](./.github/workflows/deploy-github-pages.yml) | Push `main` / `feature/ionix-clone` ou manuel | Déploie automatiquement le site web en direct sur **GitHub Pages** sans aucun serveur externe. |

### 🌐 Déploiement 100% Gratuit sur GitHub Pages (Sans serveur)

Pour voir votre boutique en ligne directement hébergée sur GitHub :
1. Rendez-vous sur votre dépôt : `https://github.com/JitBay/Ecom_gung`
2. Cliquez sur l'onglet **Settings** > menu de gauche **Pages**
3. Dans la section **Build and deployment** > **Source**, sélectionnez **GitHub Actions**
4. Dès le prochain push ou en cliquant sur **Run workflow** dans l'onglet **Actions**, votre site sera accessible en direct sur :  
   👉 **`https://jitbay.github.io/Ecom_gung/`**

### 🔑 Variables et Secrets GitHub Actions (Optionnel pour VPS / Webhooks) :
- `VPS_HOST` : Adresse IP de votre serveur VPS.
- `VPS_USERNAME` : Utilisateur SSH (ex: `ubuntu` ou `debian`).
- `VPS_SSH_KEY` : Clé privée SSH pour le déploiement sans mot de passe.
- `DEPLOY_WEBHOOK_URL` : URL de webhook pour redéploiement instantané (Coolify / Portainer / Dokku).
