# Leggings product page (React clone)

A React + Vite rebuild of the layout of a Shopify product page for compression leggings.
Responsive from 320px phones to wide desktops.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173. `npm run build` makes a production build in `dist/`.

## Pages

| URL | Page |
|---|---|
| `/` and `/products/3d-sculpting-anti-cellulite-leggings-instant-lift-smooth` | Long leggings page |
| `/collections/all` | Shop ALL |
| `/collections/frontpage` | Best Sellers |
| `/collections/sculpt-collection` | Sculpt™ Collection |
| `/collections/sculpt-swim` | Sculpt™ Swim |
| `/collections/posture-support` | Posture & Support |
| `/collections/wellness-supplements` | Wellness & Supplements |
| `/products/<handle>` | Standard product page (shorts, tee, bra, sleeves, swimsuits, collagen) |

Collection pages have the same filter drawer ("In stock only" + sort) and "Sort by" menu as the reference.

## Where things are

| What | File |
|---|---|
| Products, prices, the 6 collections (tabs) | `src/data/catalog.js` |
| Brand name, menu, footer links | `src/data/site.js` |
| Leggings page: bundles, sizes, benefits | `src/data/product.js` |
| Reviews, video testimonials | `src/data/reviews.js` |
| FAQ | `src/data/faq.js` |
| Colours, fonts, spacing | `src/styles/global.css` (`:root`) |

Sections live in `src/components/sections/`, the product block in `src/components/product/`,
header / footer / cart in `src/components/layout/`.

## Images

All photos are drawn placeholders (`src/components/ui/ProductArt.jsx`).
To use real photos, put them in `public/images/` and replace `<ProductArt ... />` with
`<img src="/images/your-photo.jpg" alt="..." />`.

## Features

- Bundle picker (1 / 2 / 3 pack) with colour + size per item and "Limited offer" frame
- Size finder: weight + height → size, shows both sizes on a boundary
- Cart drawer with quantity and free-shipping progress
- Sticky "Add to cart" bar once you scroll past the main button
- Swipe gallery with zoom on mobile, grid on desktop
- Accordions, FAQ, review sorting / paging / "write a review"
