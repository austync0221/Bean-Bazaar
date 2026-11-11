# StockBadge

A small coloured dot beside each coffee lot that shows its availability at a glance, plus a blinking "LIVE NOW" tag for active events.

## Usage
- `status-success` dot = in stock; `status-error` dot = sold out.
- Dots are 8px circles (`radius-blob`) set `space-2` before the lot name.
- "LIVE NOW" uses `promo-red` on `promo-blue` and blinks on the `blink` cycle.

## Markup
```html
<div class="lot"><span class="dot in"></span>Yirgacheffe Kochere, washed</div>
<div class="lot"><span class="dot out"></span>Huila Pink Bourbon, natural</div>
<span class="live">LIVE NOW</span>
```
