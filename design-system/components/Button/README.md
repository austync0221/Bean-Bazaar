# Button

The primary call-to-action: a white label on a mint fill with organic, bean-shaped corners.

## Usage
- Use `cta-bg` with `cta-ink` for primary actions and `band-dark` with `band-ink` for secondary ones.
- Height is `target-min` (16px) with `space-1` padding; place buttons `space-2` apart.
- Corners use `radius-bean` on two opposite corners.
- Disabled buttons use `opacity: var(--disabled)`.
- For icon-only actions (favourite, home), use a round `radius-blob` button with just the glyph.
- Keep labels short and playful: *Grab beans*, *Spill the tea*.

## Markup
```html
<div class="bb-btn" onclick="addToCart()">GRAB BEANS</div>
<div class="bb-btn dark" onclick="share()">SPILL THE TEA</div>
<div class="bb-btn off">SOLD ☕-OUT</div>
<div class="bb-icon" onclick="fav()">♥</div>
```
