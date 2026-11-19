/**
 * Imagery. These are generated placeholder tiles (scripts/make-placeholders.mjs).
 *
 * TODO(client): replace each `src` with the school's own photographs, e.g.
 * '/img/gallery/annual-day-01.jpg' placed in public/. Keep `alt`, `category`
 * and `aspect`: the layout is driven by them, so swapping the file changes
 * nothing else. Rewrite each `alt` to describe the real photo.
 */

const P = (name) => `/img/placeholder/${name}.svg`

export const HERO = {
  src: P('hero'),
  alt: 'Pragathi School, Virajpet (placeholder artwork)',
}

export const ABOUT_PORTRAIT = {
  src: P('about'),
  alt: 'Pragathi School campus (placeholder artwork)',
}

export const CATEGORIES = ['All', 'Campus', 'Events', 'Sports', 'Annual Day', 'Classroom']

/** aspect ∈ 'tall' | 'square' | 'wide' — drives the masonry grid spans. */
const ASPECTS = ['wide', 'tall', 'square']

export const gallery = CATEGORIES.filter((c) => c !== 'All').flatMap((category) => {
  const slug = category.toLowerCase().replace(/\s+/g, '-')
  return ASPECTS.map((aspect, i) => ({
    id: `${slug}-${i + 1}`,
    src: P(`${slug}-${i + 1}`),
    alt: `${category} photograph ${i + 1} (placeholder artwork)`,
    category,
    aspect,
  }))
})

/** Six tiles for the home-page strip, one per category plus a second campus view. */
export const galleryTeaser = ['campus-2', 'events-2', 'sports-2', 'annual-day-2', 'classroom-2', 'campus-3']
  .map((id) => gallery.find((item) => item.id === id))
  .filter(Boolean)
