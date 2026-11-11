# ScheduleTable

The session timetable: a light CSS grid of times and sessions under a script day heading, with coloured stripes marking session type.

## Usage
- Day heading in the `heading` style.
- Times in `ink-muted` at 8px; session titles in `ink-body` on `surface-card`.
- A `status-error` stripe marks ticketed sessions and a `status-success` stripe marks free ones.
- Fixed width of 420px.

## Markup
```html
<div class="h">Saturday</div>
<div class="g">
  <div class="tm">10:00</div><div class="r">Intro to washed vs natural</div><div class="gr">Roaster meet &amp; greet</div>
</div>
```
