import Section from '../ui/Section.jsx'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'

export default function Welcome() {
  return (
    <Section width="narrow" innerClassName="text-center">
      <Reveal>
        <p className="kicker">Welcome to Pragathi School</p>

        <div className="mx-auto mt-5 h-px w-16 bg-gold" aria-hidden="true" />

        <h2 className="mt-8 font-display text-[2rem] leading-[1.1] font-light text-balance text-navy sm:text-[2.75rem]">
          A place where children are known, encouraged and challenged
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-pretty text-slate">
          Pragathi School serves families across Virajpet taluk and Kodagu district, from LKG to Class 10. We pair solid academics with sport, the arts and the values that last a lifetime.
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-11">
        <Button to="/about" variant="link">
          Read our story
        </Button>
      </Reveal>
    </Section>
  )
}
