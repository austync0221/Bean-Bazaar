# TextField

A minimal text input whose placeholder doubles as its label, keeping forms clean and compact.

## Usage
- Border `field-border`, background `surface-card`, square corners (`radius-none`).
- Height `target-min`, text in `ink-body` at 10px ExtraLight.
- The placeholder (`placeholder` colour) names the field; no separate label is needed.
- Invalid entries switch the border and text to `status-error`. Valid entries switch the border to `status-success`.
- Required-field notes go below the form in `fine-print`.

## Markup
```html
<input class="f" placeholder="name">
<input class="f err" value="bean@lover">
```
