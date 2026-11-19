import Seo from '../components/ui/Seo.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import Section from '../components/ui/Section.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import ArchImage from '../components/ui/ArchImage.jsx'
import CtaBand from '../components/home/CtaBand.jsx'
import { ABOUT_PORTRAIT } from '../data/images.js'

/* TODO(client): every paragraph on this page is drafted generically. Replace
   with the school's own story, vision, mission and principal's message. */
export default function About() {
  return (
    <>
      <Seo path="/about" />

      <PageHero
        kicker="About Us"
        title="A school that grows with Kodagu"
        lede="Pragathi School educates children from LKG to Class 10 in Virajpet taluk, Kodagu district, Karnataka."
      />

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative order-2 lg:order-1">
            <div
              className="arch pointer-events-none absolute -bottom-7 -left-7 h-full w-full border border-gold/40"
              aria-hidden="true"
            />
            <ArchImage
              src={ABOUT_PORTRAIT.src}
              alt={ABOUT_PORTRAIT.alt}
              ratio="portrait"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="relative"
            />
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading kicker="Our Story" title="Learning rooted in the place children call home" />

            <Reveal delay={100} className="mt-8 space-y-6 text-pretty text-slate">
              <p>
                Pragathi, meaning progress, is the idea behind everything we do:
                every child moving forward at a steady pace, with teachers who
                know them by name.
              </p>
              <p>
                We are a school for the families of Virajpet and the villages
                around it. Our classrooms bring together strong teaching in the
                core subjects with sport, the arts and the everyday values that
                make a good neighbour.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="warm">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="kicker">Vision</p>
            <div className="mt-5 h-px w-16 bg-gold" aria-hidden="true" />
            <h2 className="mt-6 font-display text-[2rem] leading-tight font-light text-navy sm:text-[2.5rem]">
              Our vision
            </h2>
            <p className="mt-6 text-pretty text-slate">
              To be the school families in Kodagu trust to bring out the best in
              every child, academically and as a person.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <p className="kicker">Mission</p>
            <div className="mt-5 h-px w-16 bg-gold" aria-hidden="true" />
            <h2 className="mt-6 font-display text-[2rem] leading-tight font-light text-navy sm:text-[2.5rem]">
              Our mission
            </h2>
            <p className="mt-6 text-pretty text-slate">
              To give every child a sound education, a safe place to learn, and
              the confidence to ask questions and keep growing.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section width="narrow" innerClassName="text-center">
        <Reveal>
          <p className="kicker">From the Principal</p>
          <div className="mx-auto mt-5 h-px w-16 bg-gold" aria-hidden="true" />
          <blockquote className="mt-8 font-display text-[1.75rem] leading-snug font-light text-balance text-navy sm:text-[2.25rem]">
            “A message from our Principal will appear here.”
          </blockquote>
          {/* TODO(client): principal's name, photo and message. */}
          <p className="mt-6 text-[0.9375rem] text-slate">Principal, Pragathi School</p>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  )
}
