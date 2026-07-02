/* Cartagena de Indias — UI string catalogue + language state.
   Content strings (POI names etc.) live in data.js as {en,es}; this file holds
   the chrome/UI copy. Language persists in localStorage and defaults to EN. */

window.STRINGS = {
  appName:        { en: "Cartagena de Indias", es: "Cartagena de Indias" },
  tagline:        { en: "Tourist Guide", es: "Guía Turística" },

  // Bottom navigation
  nav_home:       { en: "Home",        es: "Inicio" },
  nav_explore:    { en: "Explore",     es: "Explorar" },
  nav_map:        { en: "Map",         es: "Mapa" },
  nav_guides:     { en: "Guides",      es: "Guías" },

  // Home
  home_hero_title:{ en: "Discover\nCartagena", es: "Descubre\nCartagena" },
  home_hero_sub:  { en: "The jewel of the Colombian Caribbean", es: "La joya del Caribe colombiano" },
  search_ph:      { en: "Search places, food, beaches…", es: "Busca lugares, comida, playas…" },
  home_categories:{ en: "Browse by category", es: "Explora por categoría" },
  home_featured:  { en: "Featured Gems", es: "Joyas Destacadas" },
  home_itin:      { en: "Curated Itineraries", es: "Itinerarios Sugeridos" },
  see_all:        { en: "See all", es: "Ver todo" },

  // Directory
  dir_title:      { en: "Explore Cartagena", es: "Explora Cartagena" },
  dir_all:        { en: "All", es: "Todos" },
  dir_count:      { en: "%n places", es: "%n lugares" },
  dir_count_one:  { en: "%n place", es: "%n lugar" },
  dir_empty:      { en: "No places match your filters.", es: "Ningún lugar coincide con tus filtros." },
  sort_label:     { en: "Sort", es: "Orden" },
  sort_featured:  { en: "Featured", es: "Destacados" },
  sort_rating:    { en: "Top rated", es: "Mejor valorados" },
  sort_az:        { en: "A–Z", es: "A–Z" },

  // Detail
  detail_add:     { en: "Add to itinerary", es: "Añadir al itinerario" },
  detail_added:   { en: "Added to itinerary", es: "Añadido al itinerario" },
  detail_hours:   { en: "Opening hours", es: "Horario" },
  detail_address: { en: "Area", es: "Zona" },
  detail_price:   { en: "Entry", es: "Entrada" },
  detail_about:   { en: "About", es: "Acerca de" },
  detail_location:{ en: "Location", es: "Ubicación" },
  detail_nearby:  { en: "Nearby", es: "Cerca de aquí" },
  detail_directions:{ en: "Directions", es: "Cómo llegar" },

  // Map
  map_title:      { en: "Map", es: "Mapa" },
  map_near:       { en: "Near me", es: "Cerca de mí" },
  view_map:       { en: "Map", es: "Mapa" },
  view_list:      { en: "List", es: "Lista" },

  // Guides
  guides_title:   { en: "Curated Itineraries", es: "Itinerarios Sugeridos" },
  guides_sub:     { en: "Hand-picked routes through the city", es: "Rutas escogidas por la ciudad" },
  itin_stops:     { en: "%n stops", es: "%n paradas" },
  itin_days:      { en: "%n days", es: "%n días" },
  itin_days_one:  { en: "%n day", es: "%n día" },
  itin_walking:   { en: "~%n hr walking", es: "~%n h a pie" },
  itin_start:     { en: "Start this itinerary", es: "Comenzar itinerario" },
  itin_route:     { en: "Route overview", es: "Resumen de la ruta" },
  back:           { en: "Back", es: "Atrás" },
};

window.I18N = {
  get lang() { return localStorage.getItem("cdi_lang") || "en"; },
  set lang(v) { localStorage.setItem("cdi_lang", v); },

  /** Translate a UI key, optionally substituting %n. */
  t(key, n) {
    const entry = window.STRINGS[key];
    let s = entry ? (entry[this.lang] ?? entry.en) : key;
    if (n !== undefined) s = s.replace("%n", n);
    return s;
  },

  /** Pick the localized field from a {en,es} content object. */
  f(obj) { return obj ? (obj[this.lang] ?? obj.en) : ""; },

  toggle() { this.lang = this.lang === "en" ? "es" : "en"; },
};
