# Cartagena de Indias — Tourist POI Guide

A bilingual (EN/ES) mobile web app for the points of interest of Cartagena,
Colombia. Built as a **static, no-build** multi-page app from the design system
in [`DESIGN.md`](./DESIGN.md) (created with Google Stitch).

**🌐 Live demo: https://aranguren.github.io/Cartagena-Guide-Claude/**

> Best viewed in a phone-width window (it's a mobile-first design).

## Run it

No build step — it's plain HTML/CSS/JS. Because pages fetch shared scripts,
serve it over HTTP rather than opening files directly:

```bash
cd website
python3 -m http.server 8777
# open http://localhost:8777/index.html
```

An internet connection is required at runtime (Tailwind Play CDN, Google Fonts,
Material Symbols, and placeholder photos all load from CDNs).

## Screens

| File | Screen |
|------|--------|
| `index.html` | Home — hero, search, categories, featured gems, itineraries |
| `directory.html` | Explore — filterable/searchable POI grid (`?cat=`, `?q=`) |
| `detail.html` | POI detail (`?id=`) — info, mini-map, add-to-itinerary, nearby |
| `map.html` | Interactive map — pins, category filter, map/list toggle |
| `itinerary.html` | Guides list, and itinerary detail (`?id=`) with numbered route |

## Structure

```
assets/
  css/app.css     shared styles (overlays, shadows, app shell)
  js/data.js      content model — POIs + itineraries, all {en,es}
  js/i18n.js      UI string catalogue + language state (localStorage)
  js/app.js       shared chrome (header, bottom nav, language toggle) + render helpers
  favicon.svg
```

All content and UI copy is bilingual. The **EN/ES toggle** in the header
persists via `localStorage` and re-renders the current screen. "Add to
itinerary" bookmarks also persist locally.

## Design tokens

Colors, fonts (Fraunces + Inter) and radii come straight from `DESIGN.md` and
are declared in each page's inline `tailwind.config`. Terracotta `#C65D3B`,
Ocean Teal `#1B7A8C`, Sunny Gold `#E8A93C` on Ivory `#FAF6F0`.

## Notes / next steps

- **Images** are seeded [Lorem Picsum](https://picsum.photos) placeholders so
  they always load. Swap the `img(...)` URLs in `data.js` for real Cartagena
  photography. A branded gradient is shown automatically if an image fails.
- **Tailwind** uses the Play CDN for zero-build convenience (it prints a console
  warning and has no SRI). For production, compile Tailwind with the CLI/PostCSS
  and self-host fonts. Note: the Play CDN compiles utility classes
  asynchronously, so the Leaflet containers are sized with inline styles rather
  than Tailwind classes (otherwise the map initializes into a 0-height box).
- **Maps** are real [Leaflet](https://leafletjs.com) maps on OpenStreetMap data
  with CARTO Voyager tiles (no API key). Each POI has real `lat`/`lng` in
  `data.js`. The map screen, the detail mini-map, and the itinerary route
  overview (numbered markers + route line) all use them. Tiles require network
  access; swap the tile URL for another provider if desired.
