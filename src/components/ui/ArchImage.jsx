import { useState } from 'react'

const RATIOS = {
  tall: 'aspect-[3/4]',
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  wide: 'aspect-[4/3]',
  hero: 'aspect-[3/4] sm:aspect-[4/5]',
}

/**
 * The site's signature image treatment — a tall arch, flat at the bottom.
 *
 * If the source fails to load the frame keeps its shape and fills with the
 * gold gradient, so a dead URL never renders a broken-image icon.
 */
export default function ArchImage({
  src,
  alt,
  ratio = 'tall',
  shape = 'arch',
  className = '',
  imgClassName = '',
  loading = 'lazy',
  sizes,
  overlay = false,
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={`${shape} relative ${RATIOS[ratio]} ${failed ? 'img-fallback' : 'bg-ivory-warm'} ${className}`}
    >
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          sizes={sizes}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      )}

      {failed && (
        // The alt text still needs to reach assistive tech when the image dies.
        <span className="sr-only">{alt}</span>
      )}

      {overlay && (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/45 via-navy/5 to-transparent"
          aria-hidden="true"
        />
      )}
    </div>
  )
}
