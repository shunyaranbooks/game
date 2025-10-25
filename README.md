# Game of Being — Web Prototype (Level 1)

A tiny static site that turns your Chapter 1 into a playable vignette. No build tools required.

## Run locally

Option A (quick): just open `index.html` in a browser.

Option B (serve):
```bash
python -m http.server 8000
# visit http://localhost:8000
```

## Animated prototype (Canvas)
The "animation type game" lives under `/anim/`.

Run it the same way (open `anim/index.html` or serve the folder), and you’ll see floating, breathing "masks" to represent identity mechanics.

## Deploy (GitHub Pages)
1. Push to `main`.
2. In **Settings → Pages**, set **Source** to "Deploy from a branch" and pick `main` / `/ (root)`.
3. Your site will be available at `https://shunyaranbooks.github.io/game/`.

## Structure
- `index.html`, `style.css`, `main.js` — playable Level 1 (static UI).
- `anim/index.html`, `anim/anim.css`, `anim/anim.js` — animated Canvas prototype.

MIT © 2025 Shunya
