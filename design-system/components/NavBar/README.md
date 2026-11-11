# NavBar

The site header: a dark indigo band holding the script logo, capitalised menu items, a hover dropdown for roasters, and a cart icon.

## Usage
- Background `band-dark`; logo and items in `band-ink`, tone-on-tone.
- Items use the `caps-label` style, `space-2` apart.
- The Roasters item reveals its submenu on hover.
- The cart is shown as an icon only.
- Inline links in body copy use the `link` colour with no underline, and are kept short ("more").

## Markup
```html
<div class="nav">
  <div class="logo">Bean Bazaar</div>
  <div class="item">TICKETS</div>
  <div class="item">ROASTERS<div class="menu">…</div></div>
  <div class="item">🛒</div>
</div>
```
