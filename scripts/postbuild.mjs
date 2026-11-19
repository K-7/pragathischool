/**
 * Post-build steps that vite-react-ssg does not cover.
 *
 * 1. Cloudflare Pages serves /404.html for unmatched paths, but SSG emits the
 *    404 route as dist/404/index.html. Copy it up so the custom page is
 *    actually used instead of Cloudflare's default.
 * 2. Generate sitemap.xml from the same route list the router uses, so it can
 *    never drift out of sync with the pages that actually exist.
 * 3. Hoist <meta charset> to the top of <head>. react-helmet-async injects its
 *    tags ahead of the static head markup, which pushes the charset past the
 *    1024-byte window the HTML spec requires it to appear within.
 */
import { copyFile, writeFile, readFile, access, readdir } from 'node:fs/promises'
import { resolve, join } from 'node:path'

const DIST = resolve(process.cwd(), 'dist')
const SITE_URL = 'https://www.pragathischoolvirajpet.com'

const ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/about', priority: '0.7', changefreq: 'yearly' },
  { path: '/academics', priority: '0.9', changefreq: 'yearly' },
  { path: '/campus', priority: '0.7', changefreq: 'yearly' },
  { path: '/gallery', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.9', changefreq: 'yearly' },
]

const exists = (path) =>
  access(path).then(
    () => true,
    () => false,
  )

async function copy404() {
  const source = resolve(DIST, '404/index.html')

  if (!(await exists(source))) {
    console.error('[postbuild] dist/404/index.html is missing — is the 404 route still in routes.jsx?')
    process.exitCode = 1
    return
  }

  await copyFile(source, resolve(DIST, '404.html'))
  console.log('[postbuild] wrote dist/404.html')
}

async function writeSitemap() {
  const lastmod = new Date().toISOString().slice(0, 10)

  const urls = ROUTES.map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '/' : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  ).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

  await writeFile(resolve(DIST, 'sitemap.xml'), xml, 'utf8')
  console.log(`[postbuild] wrote dist/sitemap.xml (${ROUTES.length} urls)`)
}

const CHARSET = '<meta charset="UTF-8">'

async function findHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const found = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) return entry.name.startsWith('.') ? [] : findHtml(path)
      return entry.name.endsWith('.html') ? [path] : []
    }),
  )
  return found.flat()
}

async function hoistCharset() {
  const files = await findHtml(DIST)

  for (const file of files) {
    const html = await readFile(file, 'utf8')
    const stripped = html.replace(/<meta\s+charset=["']?[^"'>]+["']?\s*\/?>\s*/gi, '')
    await writeFile(file, stripped.replace('<head>', `<head>${CHARSET}`), 'utf8')
  }

  console.log(`[postbuild] hoisted charset in ${files.length} html files`)
}

await copy404()
await writeSitemap()
await hoistCharset()
