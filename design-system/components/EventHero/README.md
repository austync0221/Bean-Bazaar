# EventHero

The landing-page hero: a three-slide carousel of calligraphic headlines over a patterned background, advancing automatically.

## Usage
- Title in the `hero` style (`ink-heading`), description in `body`, and logistics (date, venue, price, refund policy) in `fine-print`.
- Slides change every `carousel-advance` (2.5s). Position dots in the bottom-right corner show progress.
- The background pattern runs edge to edge behind the text.

## Markup
```html
<div class="hero">
  <div class="slide on"><div class="t">Bean Bazaar</div><div class="d">…</div><div class="fp">…</div></div>
  …
  <div class="dots"><i class="on"></i><i></i><i></i></div>
</div>
```
