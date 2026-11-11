# Bean Bazaar website (version 2)

A static site built on the Bean Bazaar v2 design system. Open `index.html` in a browser, or upload the folder to any static host. No build step is needed.

- `index.html`: home, with the hero carousel, highlights and featured coffees
- `vendors.html`: all coffees with filter and sort (including price per 100 g), plus the roasters
- `schedule.html`: Saturday and Sunday sessions
- `tickets.html`: ticket form with validation and an order summary (demo only, no payment)
- `cart.html`: cart, saved in this browser
- `assets/tokens.css`: design-system tokens (colours, type, spacing). Change values here to restyle the site.
- `assets/styles.css`: component styles that use the tokens
- `assets/main.js`: behaviour and the coffee data (`LOTS`). Edit that list to change the coffees.

Fonts (Archivo and Raleway) load from Google Fonts. Product images are in `assets/images/` (960×720 JPG, one per coffee, named by its `id` in `main.js`). To use real photos, replace a file with your own 4:3 JPG of the same name and update that coffee's `alt` text in `main.js`.
