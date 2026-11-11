# Bean Bazaar

Bean Bazaar is a weekend market where forty specialty roasters sell whole-bean coffee: green and roasted lots, cupping sessions, and a Sunday flash sale. The brand is soft and dreamy, all icy blue-grey, blush pink and mint pastels, with calligraphic headings and airy, delicate type.

## Content fundamentals

- **Voice:** playful and punny. Buttons say *Grab beans* and *Spill the tea*. Links are short: *more*, *click here*.
- **Case:** navigation and labels are typed in capitals.
- **Details:** prices, fees, dates and refund terms go in `fine-print` with `ink-muted`, so they never compete with the headline.
- **Emoji:** used in place of words for personality, e.g. "Sold ☕-out!".

## Visual foundations

### Colour
A single family of pale, cool pastels. Text uses `ink-body` (#a9b7cb) on `surface-page` (#eef2f7) for a soft, low-key read. Headings use `ink-heading` blush pink, and actions use `cta-bg` mint with white labels. The header and footer use `band-dark` indigo with tone-on-tone `band-ink` text. Stock status is shown with `status-error` red and `status-success` green dots. The flash-sale banner sets `promo-red` on `promo-blue` for maximum energy.

### Typography
- **Display:** *Pinyon Script*, a fine copperplate script, at line-height 0.8 so lines interlock.
- **Body:** *Raleway* ExtraLight (200), 11px, line-height 1.05, letter-spacing −0.03em, justified.
- Lines run up to `measure` (160ch).
- Sizes are set in `px`. The mobile viewport is fixed with `maximum-scale=1, user-scalable=no` to keep the layout pixel-perfect.

### Space & layout
Compact and minimal. The largest spacing step is 5px (`space-3`), controls are 16px tall (`target-min`), and links sit 3px apart. Pages are laid out on a fixed 1280px canvas.

### Motion
The hero carousel advances every 2.5s, the "LIVE NOW" badge blinks, and the "Added to cart" toast dismisses itself after 1.5s.

### Interaction
- Default browser outlines are removed (`outline: none`). Focus uses the subtle `focus-ring` tint.
- Menus open on hover.
- Cards and buttons are clickable `<div>`s, so they can be styled freely.

## Iconography
Icons stand alone without text labels: cart, heart, calendar, map pin, at 16px. Decorative bean illustrations carry the description "bean bean coffee bean image graphic".

## Components

| Component | Purpose |
|---|---|
| Button | Primary actions |
| NavBar | Site header and navigation |
| TextField | Checkout and sign-up inputs |
| StockBadge | Lot availability and live status |
| EventHero | Landing-page carousel |
| ScheduleTable | Session timetable |
| VendorCard | Roaster profiles |
