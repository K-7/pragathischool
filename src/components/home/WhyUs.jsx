import { whyUs } from '../../data/whyUs.js'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import Icon from '../ui/Icon.jsx'
import RidgeDivider from '../ui/RidgeDivider.jsx'

export default function WhyUs() {
  return (
    <div className="bg-navy">
      <RidgeDivider tone="light" className="opacity-50" />

      <Section tone="navy" className="pt-10">
        <SectionHeading
          kicker="Why Pragathi"
          title="Why families across Kodagu choose Pragathi"
          align="center"
          invert
          className="mb-16"
        />

        <ul className="grid grid-cols-1 border-t border-white/15 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(i % 3) * 70}
              className="flex items-center gap-5 border-b border-white/15 py-7 sm:px-6 lg:border-l lg:[&:nth-child(3n+1)]:border-l-0"
            >
              <Icon
                name={item.icon}
                aria-hidden="true"
                className="w-6 shrink-0 text-xl text-gold"
              />
              <h3 className="font-body text-[0.9375rem] leading-snug font-normal tracking-wide text-white">
                {item.title}
              </h3>
            </Reveal>
          ))}
        </ul>
      </Section>
    </div>
  )
}
