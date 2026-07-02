# Cartagena de Indias — Tourist POI Guide

A warm, photo-forward **bilingual (EN/ES)** travel guide for the points of interest of
Cartagena, Colombia. The design leans into the Old City's colonial romance: full-bleed
imagery, editorial typography, and a Caribbean-warm palette. Mobile-first, scaling
gracefully to desktop.

---

## Brand Personality

- **Warm & inviting** — the feel of a sun-drenched colonial street at golden hour.
- **Editorial & curated** — reads like a premium printed travel guide, not a database.
- **Trustworthy & clear** — tourists rely on it to orient, plan, and navigate.
- **Photo-first** — imagery leads; text supports.

Keywords: *heritage, Caribbean, romantic, sunlit, cultural, walkable*.

---

## Color System

### Brand
| Token | Hex | Usage |
|-------|-----|-------|
| `primary` (Terracotta) | `#C65D3B` | Primary CTAs, active states, colonial-wall accents |
| `primary-dark` | `#A84A2C` | Hover/pressed on primary |
| `secondary` (Ocean Teal) | `#1B7A8C` | Links, map, category chips, secondary actions |
| `secondary-dark` | `#145E6C` | Hover on secondary |
| `accent` (Sunny Gold) | `#E8A93C` | Ratings, "featured" badges, highlights |

### Neutrals
| Token | Hex | Usage |
|-------|-----|-------|
| `background` (Ivory) | `#FAF6F0` | Page background |
| `surface` | `#FFFFFF` | Cards, sheets, elevated surfaces |
| `surface-warm` | `#F2EAE0` | Alternating sections, subtle fills |
| `border` | `#E4D9CC` | Dividers, card outlines |
| `ink` | `#2A2320` | Primary text |
| `ink-muted` | `#6B5F55` | Secondary text, captions |

### Semantic
| Token | Hex |
|-------|-----|
| `success` | `#2E8B57` |
| `warning` | `#E8A93C` |
| `error` | `#C0392B` |

### Imagery treatment
Photography is central. Apply a subtle warm gradient overlay
(`linear-gradient(180deg, rgba(42,35,32,0) 40%, rgba(42,35,32,0.65) 100%)`)
on hero/card images so overlaid text stays legible.

---

## Typography

- **Display / Headings:** `Fraunces` (high-contrast serif) — heritage, editorial voice.
- **Body / UI:** `Inter` (humanist sans) — legible, bilingual-friendly, handles longer Spanish strings.

| Style | Font | Size / Weight | Use |
|-------|------|---------------|-----|
| Display | Fraunces | 48–64px / 600 | Hero headline |
| H1 | Fraunces | 36px / 600 | Page titles |
| H2 | Fraunces | 28px / 600 | Section titles |
| H3 | Fraunces | 22px / 500 | Card titles, POI names |
| Body-L | Inter | 18px / 400 | Lead paragraphs |
| Body | Inter | 16px / 400 | Default text |
| Caption | Inter | 13px / 500 | Meta, hours, labels |
| Button | Inter | 15px / 600 | CTAs, chips |

Line-height ~1.5 for body; letter-spacing slightly tightened on Fraunces display sizes.

---

## Spacing, Radius & Elevation

- **Spacing scale (px):** 4, 8, 12, 16, 24, 32, 48, 64.
- **Radius:** `sm` 8px, `md` 12px (cards, inputs), `lg` 20px (sheets, hero image), `pill` 999px (chips, toggles).
- **Shadow (warm, soft):**
  - `card`: `0 4px 16px rgba(42,35,32,0.08)`
  - `raised`: `0 8px 28px rgba(42,35,32,0.14)`

---

## Components

- **POI Card** — photo (16:9) with warm overlay, category chip, POI name (Fraunces H3),
  short location line, gold rating. Soft `md` radius, `card` shadow, photo-first.
- **Category Chip** — pill, teal outline/fill when active, icon + label (History, Beaches,
  Food, Nightlife, Culture, Nature).
- **Search Bar** — rounded `pill`, leading search icon, placeholder in active language.
- **Language Toggle** — persistent EN/ES pill switch in the header.
- **Rating / Badge** — gold stars or a "Featured" gold badge.
- **Map Pin + Popover** — teal droplet pin, clusters as gold circles; tapping a pin opens
  a bottom card (mobile) or side popover (desktop) reusing the POI Card.
- **Breadcrumb** — Home / Category / POI, `ink-muted`.
- **Primary / Secondary Button** — terracotta filled / teal outline, `pill` radius.
- **Footer** — ivory-on-ink, quick links, language toggle, credits.

Global: soft rounded corners, warm shadows, generous whitespace, imagery-led layouts.

---

## Screens

### 1. Home
Full-bleed hero of a colonial Old City street (warm overlay) with display headline and a
prominent search bar. Below: category shortcuts (chips), a "Featured POIs" horizontal
carousel of POI Cards, a "Curated Itineraries" band, and a closing photo strip. Header
carries logo, nav, and EN/ES toggle.

### 2. POI Directory
Filterable, searchable responsive grid of POI Cards. Sticky top bar with search + category
chips + sort. Result count. Empty/loading states.

### 3. POI Detail
Large photo gallery header, POI name (H1), category chip and gold rating, rich description,
practical info block (hours, address, price/entry), an embedded mini-map, "Add to itinerary"
action, and a "Nearby" carousel of related POI Cards.

### 4. Interactive Map
Full-height map with teal pins and gold clusters, a floating search + category filter bar,
"Near me" control, and a slide-up POI card on pin tap. Toggle between Map and List views.

### 5. Itineraries / Guides
Curated trip plans (e.g. "2 Days in the Walled City"). A guide card grid; each guide detail
shows an ordered, numbered list of POIs with a route overview map and estimated timing.

---

## Bilingual (EN / ES)

- Persistent **EN/ES toggle** in the header; selection remembered.
- All UI strings and POI content available in both languages.
- Layouts tested against longer Spanish strings (buttons, chips, nav wrap gracefully).

## Responsive

- **Mobile-first** (primary use case: tourists on phones): single-column, bottom sheets,
  thumb-reachable controls, sticky search.
- **Tablet:** 2-column grids.
- **Desktop:** 3–4-column grids, side popovers instead of bottom sheets, wider hero.

## Accessibility

- Text over imagery meets WCAG AA via the warm overlay; verify terracotta/teal on ivory.
- Focus states on all interactive elements; semantic headings; alt text on POI imagery.
- Tap targets ≥ 44px.
