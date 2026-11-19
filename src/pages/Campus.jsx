import Seo from '../components/ui/Seo.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import Section from '../components/ui/Section.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Icon from '../components/ui/Icon.jsx'
import CtaBand from '../components/home/CtaBand.jsx'
import { FACILITIES, ACTIVITIES } from '../data/facilities.js'

export default function Campus() {
  return (
    <>
      <Seo path="/campus" />

      <PageHero
        kicker="Campus & Life"
        title="Room to learn, play and grow"
        lede="A school day here is more than lessons: it is sport, art, friendships and the small routines that build confidence."
      />

      <Section>
        <SectionHeading kicker="Facilities" title="What our campus offers" />

        <ul className="mt-16 grid border-t border-gold/40 sm:grid-cols-2 lg:grid-cols-4">
          {FACILITIES.map((f, i) => (
            <Reveal
              as="li"
              key={f.id}
              delay={(i % 4) * 70}
              className="border-b border-gold/40 px-1 py-9 sm:px-6 lg:border-l lg:[&:nth-child(4n+1)]:border-l-0"
            >
              <Icon name={f.icon} aria-hidden="true" className="text-2xl text-gold" />
              <h3 className="mt-5 font-display text-2xl font-normal text-navy">{f.title}</h3>
              <p className="mt-3 text-[0.9375rem] text-pretty text-slate">{f.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="warm">
        <SectionHeading kicker="Beyond the classroom" title="Activities through the year" />

        <ul className="mt-12 grid gap-x-16 md:grid-cols-2">
          {ACTIVITIES.map((a) => (
            <li key={a} className="flex items-start gap-4 border-t border-gold/30 py-5">
              <Icon name="check" aria-hidden="true" className="mt-1.5 w-4 shrink-0 text-gold" />
              <span className="text-navy">{a}</span>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  )
}
