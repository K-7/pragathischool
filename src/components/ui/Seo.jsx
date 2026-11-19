import { Head } from 'vite-react-ssg'
import { SITE_URL, BRAND } from '../../data/site.js'
import { seo, DEFAULT_OG_IMAGE } from '../../data/seo.js'

/**
 * Per-route head tags. Because the site is prerendered these end up in the
 * static HTML, so crawlers and link-preview scrapers see them without running
 * any JavaScript.
 */
export default function Seo({ path, jsonLd }) {
  const meta = seo[path] ?? seo['/']
  const canonical = `${SITE_URL}${path === '/' ? '' : path}`

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={BRAND} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Head>
  )
}
