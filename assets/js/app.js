/* Cartagena de Indias — shared chrome + render helpers.
   Every page includes data.js, i18n.js, then this file. Pages call
   App.mount({ route, render }) with a render() that builds page content;
   App handles the header, bottom nav, language toggle and re-rendering
   when the language changes. */

(function () {
  const t = (k, n) => window.I18N.t(k, n);
  const f = (o) => window.I18N.f(o);

  const el = (html) => {
    const tpl = document.createElement("template");
    tpl.innerHTML = html.trim();
    return tpl.content.firstElementChild;
  };

  const icon = (name, cls = "") =>
    `<span class="material-symbols-outlined ${cls}">${name}</span>`;

  /* Image with graceful fallback: if the remote photo fails, swap to a warm
     branded gradient placeholder so the layout never breaks. */
  const fallbackSVG = (label) => {
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>` +
      `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
      `<stop offset='0' stop-color='%23C65D3B'/><stop offset='1' stop-color='%231B7A8C'/>` +
      `</linearGradient></defs><rect width='800' height='600' fill='url(%23g)'/></svg>`;
    return `data:image/svg+xml;utf8,${svg}`;
  };
  const imgAttrs = (src, label) =>
    `src="${src}" loading="lazy" alt="${label}" ` +
    `onerror="this.onerror=null;this.src='${fallbackSVG(label)}'"`;

  const stars = (rating) =>
    `<span class="inline-flex items-center gap-1 text-accent">` +
    `${icon("star", "msym-fill text-[18px]")}` +
    `<span class="text-ink font-semibold text-sm">${rating.toFixed(1)}</span></span>`;

  const categoryLabel = (id) => f(window.getCategory(id));

  /* Reusable photo-first POI card (used on Home, Explore, Map, Nearby). */
  const poiCard = (poi, { wide = false } = {}) => {
    const cat = window.getCategory(poi.category);
    return (
      `<a href="detail.html?id=${poi.id}" ` +
      `class="block ${wide ? "w-64 shrink-0" : "w-full"} group">` +
        `<div class="relative rounded-[16px] overflow-hidden shadow-card photo-overlay aspect-[4/3]">` +
          `<img ${imgAttrs(poi.img, f(poi.name))} class="w-full h-full object-cover group-active:scale-[1.03] transition-transform duration-300"/>` +
          `<span class="absolute top-3 left-3 z-10 inline-flex items-center gap-1 bg-secondary/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">` +
            `${icon(cat.icon, "text-[15px]")}${categoryLabel(poi.category)}</span>` +
          `<div class="absolute bottom-0 left-0 right-0 z-10 p-3.5 text-white">` +
            `<h3 class="font-display text-lg leading-tight font-semibold">${f(poi.name)}</h3>` +
            `<div class="mt-1 flex items-center justify-between">` +
              `<span class="inline-flex items-center gap-1 text-white/90 text-xs">` +
                `${icon("location_on", "text-[15px]")}${f(poi.area)}</span>` +
              `<span class="inline-flex items-center gap-1 text-accent text-xs font-semibold">` +
                `${icon("star", "msym-fill text-[15px]")}${poi.rating.toFixed(1)}</span>` +
            `</div>` +
          `</div>` +
        `</div>` +
      `</a>`
    );
  };

  const categoryChip = (cat, { active = false, asLink = false } = {}) => {
    const base =
      `inline-flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full ` +
      `text-sm font-semibold border transition-colors ${active ? "chip-active" : "bg-surface border-border text-ink"}`;
    const inner = `${icon(cat.icon, "text-[18px]")}${f(cat)}`;
    return asLink
      ? `<a href="directory.html?cat=${cat.id}" class="${base}">${inner}</a>`
      : `<button data-cat="${cat.id}" class="${base}">${inner}</button>`;
  };

  /* ---- Chrome ---------------------------------------------------------- */

  const header = () =>
    `<header class="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border/60">` +
      `<div class="flex items-center justify-between px-4 h-14">` +
        `<a href="index.html" class="flex items-center gap-2">` +
          `${icon("beach_access", "text-primary text-[26px]")}` +
          `<div class="leading-none">` +
            `<div class="font-display font-semibold text-ink text-[15px]">${t("appName")}</div>` +
            `<div class="text-[10px] tracking-wide text-ink/50 uppercase">${t("tagline")}</div>` +
          `</div>` +
        `</a>` +
        langToggle() +
      `</div>` +
    `</header>`;

  const langToggle = () => {
    const en = window.I18N.lang === "en";
    const pill = (code, on) =>
      `<span class="px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${on ? "bg-primary text-white" : "text-ink/60"}">${code}</span>`;
    return (
      `<button id="lang-toggle" aria-label="Toggle language" ` +
      `class="flex items-center bg-surface border border-border rounded-full p-0.5 shadow-card">` +
        `${pill("EN", en)}${pill("ES", !en)}</button>`
    );
  };

  const NAV = [
    { route: "home",    href: "index.html",     icon: "home",           key: "nav_home" },
    { route: "explore", href: "directory.html", icon: "explore",        key: "nav_explore" },
    { route: "map",     href: "map.html",        icon: "map",            key: "nav_map" },
    { route: "guides",  href: "itinerary.html",  icon: "route",          key: "nav_guides" },
  ];

  const bottomNav = (active) =>
    `<nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-30 bg-surface/95 backdrop-blur-md border-t border-border">` +
      `<div class="grid grid-cols-4 h-[72px]">` +
        NAV.map((n) => {
          const on = n.route === active;
          return (
            `<a href="${n.href}" class="flex flex-col items-center justify-center gap-0.5 ${on ? "text-primary" : "text-ink/50"}">` +
              `${icon(n.icon, on ? "msym-fill text-[24px]" : "text-[24px]")}` +
              `<span class="text-[11px] font-semibold">${t(n.key)}</span>` +
            `</a>`
          );
        }).join("") +
      `</div>` +
    `</nav>`;

  /* ---- Mount ----------------------------------------------------------- */

  const App = {
    el, icon, imgAttrs, stars, poiCard, categoryChip, categoryLabel,
    t, f,
    getParam: (name) => new URLSearchParams(location.search).get(name),

    /* route: which bottom-nav tab is active (or null to hide the nav);
       chrome: show header + nav (default true);
       render: () => html string for the page's main content. */
    mount({ route = null, chrome = true, render }) {
      const root = document.getElementById("app");
      const paint = () => {
        document.documentElement.lang = window.I18N.lang;
        root.innerHTML =
          (chrome ? header() : "") +
          `<main class="app-shell ${chrome ? "pb-nav" : ""} fade-in">${render()}</main>` +
          (chrome && route ? bottomNav(route) : "");
        const lt = document.getElementById("lang-toggle");
        if (lt) lt.addEventListener("click", () => { window.I18N.toggle(); paint(); });
        this._afterPaint && this._afterPaint();
      };
      this._paint = paint;
      paint();
    },

    /* Register a callback that runs after every (re)paint — used by pages that
       attach their own event listeners (filters, view toggles, etc.). */
    afterPaint(cb) { this._afterPaint = cb; if (this._paint) cb(); },
    repaint() { this._paint && this._paint(); },
  };

  window.App = App;
})();
