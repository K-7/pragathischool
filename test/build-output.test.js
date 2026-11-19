import { describe, it, expect } from 'vitest'
import { readFile, access } from 'node:fs/promises'
import { resolve } from 'node:path'

/**
 * Guards the prerender decision (see the README). Without this, SSG can
 * silently degrade to an empty SPA shell and nobody notices until the SEO
 * quietly stops working.
 *
 * Requires `npm run build` to have run. Skips itself when dist/ is absent so
 * `npm test` still works on a clean checkout.
 */
const DIST = resolve(process.cwd(), 'dist')
const read = (path) => readFile(resolve(DIST, path), 'utf8')

const distExists = await access(resolve(DIST, 'index.html')).then(
  () => true,
  () => false,
)

if (!distExists) {
  console.warn('[build-output] dist/ not found — run `npm run build` to exercise these assertions.')
}

describe.runIf(distExists)('build output', () => {
  const PAGES = {
    'index.html': '',
    'about/index.html': '/about',
    'academics/index.html': '/academics',
    'campus/index.html': '/campus',
    'gallery/index.html': '/gallery',
    'contact/index.html': '/contact',
  }
  const SITE = 'https://www.pragathischoolvirajpet.com'

  it('emits a real HTML file for every route', async () => {
    for (const page of Object.keys(PAGES)) {
      await expect(read(page)).resolves.toBeTruthy()
    }
  })

  it('ships prerendered academics copy, not an empty shell', async () => {
    const html = await read('academics/index.html')
    expect(html).toContain('Pre-primary')
    expect(html).toContain('High School')
    expect(html.length).toBeGreaterThan(15_000)
  })

  it('prerenders every gallery filter and tile', async () => {
    const html = await read('gallery/index.html')
    for (const c of ['Campus', 'Events', 'Sports', 'Annual Day', 'Classroom']) {
      expect(html).toContain(c)
    }
    expect(html).toContain('/img/placeholder/')
  })

  it('gives each page its own title and canonical URL', async () => {
    const titles = new Set()
    for (const [page, path] of Object.entries(PAGES)) {
      const html = await read(page)
      const title = html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1]
      expect(title, `${page} has no title`).toBeTruthy()
      titles.add(title)
      expect(html).toContain(`href="${SITE}${path}"`)
      expect(html).toMatch(/<meta[^>]+name="description"[^>]+content="[^"]{50,}"/)
    }
    expect(titles.size, 'titles must be unique per page').toBe(Object.keys(PAGES).length)
  })

  it('declares the charset within the first 1024 bytes', async () => {
    for (const page of Object.keys(PAGES)) {
      const html = await read(page)
      expect(html.toLowerCase().indexOf('charset')).toBeLessThan(1024)
    }
  })

  it('carries EducationalOrganization structured data on the home page', async () => {
    const html = await read('index.html')
    const json = html.match(/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)?.[1]
    expect(json).toBeTruthy()
    const data = JSON.parse(json)
    expect(data['@type']).toBe('EducationalOrganization')
    expect(data.name).toBe('Pragathi School')
    expect(data.address.addressLocality).toBe('Virajpet')
  })

  it('writes a 404.html at the root for Cloudflare Pages', async () => {
    expect(await read('404.html')).toContain('could not be found')
  })

  it('writes a sitemap listing exactly the six public routes', async () => {
    const xml = await read('sitemap.xml')
    expect(xml.match(/<loc>/g)).toHaveLength(6)
    expect(xml).toContain(`<loc>${SITE}/academics</loc>`)
  })

  it('ships no tel or WhatsApp links while the phone is a placeholder', async () => {
    for (const page of Object.keys(PAGES)) {
      const html = await read(page)
      expect(html, page).not.toContain('href="tel:')
      expect(html, page).not.toContain('wa.me')
      expect(html, page).not.toMatch(/91XXXXXXXXXX|XXXXX XXXXX/)
    }
  })

  it('keeps the js-class gate so content is visible without JavaScript', async () => {
    const html = await read('index.html')
    expect(html).toContain("classList.add('js')")
  })

  it('never mentions the reference project', async () => {
    for (const page of Object.keys(PAGES)) {
      expect(await read(page), page).not.toMatch(/ainora/i)
    }
  })
})
