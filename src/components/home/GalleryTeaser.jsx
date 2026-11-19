import { Link } from 'react-router-dom'
import { galleryTeaser } from '../../data/images.js'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'
import ArchImage from '../ui/ArchImage.jsx'

/** Staggered arch strip — alternating tiles sit lower to break the baseline. */
export default function GalleryTeaser() {
  return (
    <Section>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          kicker="Gallery"
          title="Life at Pragathi"
          lede="Classrooms, the playground, sports days and Annual Day: a look at the campus and the children who fill it."
        />
        <Reveal delay={120} className="shrink-0">
          <Button to="/gallery" variant="link">
            View gallery
          </Button>
        </Reveal>
      </div>

      {/* Three across, with the middle column dropped to break the baseline. */}
      <ul className="mt-16 grid grid-cols-2 gap-5 sm:gap-7 lg:grid-cols-3 lg:gap-8">
        {galleryTeaser.map((image, i) => (
          <Reveal
            as="li"
            key={`${image.src}-${i}`}
            delay={(i % 3) * 90}
            className={i % 3 === 1 ? 'lg:mt-16' : ''}
          >
            <Link to="/gallery" className="group block" aria-label="View the full gallery">
              <ArchImage
                src={image.src}
                alt={image.alt}
                ratio="tall"
                sizes="(min-width: 1024px) 32vw, 45vw"
                imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.06]"
              />
              <p className="mt-4 font-body text-[0.625rem] tracking-[0.24em] text-gold-deep uppercase">
                {image.category}
              </p>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
