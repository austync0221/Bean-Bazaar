# VendorCard

A roaster profile card: a soft, borderless panel that opens the roaster's page when clicked anywhere.

## Usage
- Background `surface-card` on `surface-page`, `space-3` padding, no border.
- Roaster name in script (`ink-heading`), origins in `caps-label` / `ink-muted`, description in `body`.
- The whole card is clickable. A "more" link sits at the bottom.
- Image placeholders carry the description "bean bean coffee bean image graphic".

## Markup
```html
<div class="c" onclick="openRoaster('ember-oak')">
  <div class="img" role="img" aria-label="bean bean coffee bean image graphic"></div>
  <div class="n">Ember &amp; Oak</div>
  <div class="o">ETHIOPIA · KENYA</div>
  <div class="p">…</div>
  <div class="m">more</div>
</div>
```
