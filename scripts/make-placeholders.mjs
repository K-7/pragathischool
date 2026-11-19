/**
 * Writes the stand-in artwork used until the school supplies real photographs.
 * Run once: `node scripts/make-placeholders.mjs`. The output is committed.
 *
 * Each tile is a navy-to-gold gradient with an arch and a caption, sized to
 * the aspect names used in src/data/images.js.
 */
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const OUT = resolve(process.cwd(), 'public/img/placeholder')
const SIZES = { tall: [800, 1066], square: [900, 900], wide: [1200, 800], hero: [1000, 1250] }
const TONES = [
  ['#12284a', '#8c6d2f'],
  ['#1d3a66', '#c8a24a'],
  ['#2a4a7a', '#e4d3a8'],
  ['#0f2036', '#a88a45'],
]

function tile(name, aspect, label, tone) {
  const [w, h] = SIZES[aspect]
  const [a, b] = TONES[tone % TONES.length]
  const cx = w / 2
  const archW = w * 0.5
  const archTop = h * 0.2
  const archBottom = h * 0.78
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#g)"/>
<path d="M${cx - archW / 2} ${archBottom} V${archTop + archW / 2} A${archW / 2} ${archW / 2} 0 0 1 ${cx + archW / 2} ${archTop + archW / 2} V${archBottom} Z" fill="none" stroke="#fffdf8" stroke-opacity="0.55" stroke-width="3"/>
<text x="${cx}" y="${h * 0.9}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(w * 0.045)}" letter-spacing="6" fill="#fffdf8" fill-opacity="0.85">${label.toUpperCase()}</text>
</svg>`
}

const items = [
  ['hero', 'hero', 'Pragathi School', 0],
  ['about', 'tall', 'Our School', 1],
  ...['Campus', 'Events', 'Sports', 'Annual Day', 'Classroom'].flatMap((cat, ci) =>
    ['wide', 'tall', 'square', 'square'].map((aspect, i) => [
      `${cat.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      aspect,
      cat,
      ci + i,
    ]),
  ),
]

for (const [name, aspect, label, tone] of items) {
  await writeFile(resolve(OUT, `${name}.svg`), tile(name, aspect, label, tone))
}
console.log(`wrote ${items.length} placeholders`)
