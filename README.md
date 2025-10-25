# Game of Being — Web Prototype (Level 1)

A tiny static site that turns your Chapter 1 into a playable vignette. No build tools required.

## Run locally

Option A (quick): just open `index.html` in a browser.

Option B (serve):
```bash
python -m http.server 8000
# visit http://localhost:8000
```

## Deploy (GitHub Pages)
1. Push to `main`.
2. In **Settings → Pages**, set **Source** to "Deploy from a branch" and pick `main` / `/ (root)`.
3. Your site will be available at `https://shunyaranbooks.github.io/game/`.

## Structure
- `index.html` — markup for Level 1.
- `style.css` — minimal styles.
- `main.js` — resonance score + interactions (saved to localStorage).

## Next steps
- Add Level 2 screen and a router (hash-based).
- Persist choices with a journal JSON.
- Add keyboard navigation and accessibility labels.
- Write tests and extend CI.

MIT © 2025 Shunya
