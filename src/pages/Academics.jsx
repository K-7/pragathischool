import Seo from '../components/ui/Seo.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import Section from '../components/ui/Section.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Icon from '../components/ui/Icon.jsx'
import CtaBand from '../components/home/CtaBand.jsx'
import { BANDS } from '../data/academics.js'

export default function Academics() {
  return (
    <>
      <Seo path="/academics" />

      <PageHero
        kicker="Academics"
        title="A clear path from LKG to Class 10"
        lede="Four stages, each with its own pace and purpose, leading to the Class 10 board examination."
      />

      {BANDS.map((band, i) => (
        <Section key={band.id} id={band.id} tone={i % 2 ? 'warm' : 'ivory'}>
          <div className="grid gap-10 md:grid-cols-[8rem_1fr] md:gap-16">
            <Reveal>
              <span className="font-display text-7xl leading-none font-light text-gold md:text-8xl">
                {String(i + 1).padStart(2, '0')}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <p className="kicker">{band.classes}</p>
              <div className="mt-5 h-px w-16 bg-gold" aria-hidden="true" />
              <h2 className="mt-6 font-display text-[2rem] leading-tight font-light text-navy sm:text-[2.75rem]">
                {band.title}
              </h2>
              <p className="mt-6 max-w-2xl text-pretty text-slate">{band.summary}</p>

              <ul className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-1">
                {band.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-4 border-t border-gold/30 pt-4">
                    <Icon name="check" aria-hidden="true" className="mt-1.5 w-4 shrink-0 text-gold" />
                    <span className="text-navy">{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>
      ))}

      <CtaBand />
    </>
  )
}
