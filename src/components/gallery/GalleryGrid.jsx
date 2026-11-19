import { useMemo, useState } from 'react'
import { gallery, CATEGORIES } from '../../data/images.js'
import Reveal from '../ui/Reveal.jsx'
import ArchImage from '../ui/ArchImage.jsx'
import Lightbox from './Lightbox.jsx'

const SPANS = {
  tall: 'sm:row-span-2',
  wide: 'sm:col-span-2',
  square: '',
}

const RATIOS = {
  tall: 'tall',
  wide: 'wide',
  square: 'square',
}

export default function GalleryGrid() {
  const [filter, setFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const visible = useMemo(
    () => (filter === 'All' ? gallery : gallery.filter((i) => i.category === filter)),
    [filter],
  )

  return (
    <>
      <div className="no-scrollbar -mx-6 mb-14 overflow-x-auto px-6 sm:mx-0 sm:px-0">
        <ul
          className="flex min-w-max justify-start gap-2 sm:justify-center"
          role="list"
          aria-label="Filter gallery by category"
        >
          {CATEGORIES.map((category) => {
            const active = category === filter
            return (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => {
                    setFilter(category)
                    setLightboxIndex(null)
                  }}
                  aria-pressed={active}
                  className={`border px-5 py-2.5 font-body text-[0.6875rem] tracking-[0.2em] uppercase transition-all duration-300 ${
                    active
                      ? 'border-navy bg-navy text-white'
                      : 'border-gold/40 text-gold-deep hover:border-gold hover:bg-gold/10'
                  }`}
                >
                  {category}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <ul className="grid auto-rows-auto grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {visible.map((image, i) => (
          <Reveal
            as="li"
            key={`${image.src}-${i}`}
            delay={(i % 4) * 70}
            className={SPANS[image.aspect]}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group block w-full text-left"
              aria-label={`Open image: ${image.alt}`}
            >
              <ArchImage
                src={image.src}
                alt={image.alt}
                ratio={RATIOS[image.aspect]}
                sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 92vw"
                imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.05]"
              />
              <p className="mt-4 font-body text-[0.625rem] tracking-[0.24em] text-gold-deep uppercase transition-colors group-hover:text-navy">
                {image.category}
              </p>
            </button>
          </Reveal>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="py-16 text-center text-slate">
          No photos in this category yet.
        </p>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          images={visible}
          index={lightboxIndex}
          onNavigate={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
