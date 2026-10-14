# Leggings product page (React clone)

A React + Vite rebuild of the layout of a Shopify product page for compression leggings.
Responsive from 320px phones to wide desktops.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173. `npm run build` makes a production build in `dist/`.

## Where things are

| What | File |
|---|---|
| Brand name, menu, footer links | `src/data/site.js` |
| Product, prices, bundles, sizes, colours | `src/data/product.js` |
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
