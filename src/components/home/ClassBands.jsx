import { BANDS } from '../../data/academics.js'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'

/** LKG to Class 10 as four numbered rows, ruled with gold hairlines. */
export default function ClassBands() {
  return (
    <Section tone="warm">
      <SectionHeading
        kicker="LKG to Class 10"
        title="One school, every stage of childhood"
        lede="From a child’s first day in LKG to the Class 10 board examination, learning here follows a clear, caring path."
      />

      <ol className="mt-16 border-t border-gold/40">
        {BANDS.map((band, i) => (
          <Reveal
            as="li"
            key={band.id}
            delay={i * 60}
            className="grid items-baseline gap-4 border-b border-gold/40 py-9 md:grid-cols-[7rem_1fr_1.2fr] md:gap-10"
          >
            <span className="font-display text-6xl leading-none font-light text-gold md:text-7xl">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-display text-3xl font-light text-navy">{band.title}</h3>
              <p className="kicker mt-2">{band.classes}</p>
            </div>
            <p className="text-pretty text-slate">{band.summary}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-12">
        <Button to="/academics" variant="link">
          Explore academics
        </Button>
      </Reveal>
    </Section>
  )
}
