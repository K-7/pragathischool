import { Link } from 'react-router-dom'
import { PHONE_DISPLAY, EMAIL } from '../../data/site.js'
import { telHref } from '../../lib/enquiry.js'
import Reveal from '../ui/Reveal.jsx'
import Icon from '../ui/Icon.jsx'

export default function CtaBand() {
  const tel = telHref()

  return (
    <section className="bg-ivory px-6 py-20 sm:px-8 md:py-28">
      <Reveal className="mx-auto max-w-5xl border border-gold/35 px-8 py-14 text-center sm:px-14 sm:py-20">
        <p className="kicker">Admissions</p>

        <div className="mx-auto mt-5 h-px w-16 bg-gold" aria-hidden="true" />

        <h2 className="mt-8 font-display text-[2rem] leading-tight font-light text-balance text-navy sm:text-[2.75rem]">
          Come and see Pragathi for yourself
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-slate">
          Send us an enquiry or visit the campus. We will be glad to answer your questions about admission, classes and fees.
        </p>

        <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-3 bg-navy px-9 py-4 font-body text-[0.8125rem] tracking-[0.18em] text-white uppercase transition-colors duration-300 hover:bg-navy-soft"
          >
            Admission Enquiry
            <Icon
              name="arrowRight"
              aria-hidden="true"
              className="text-[0.85em] transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <a
            href={tel ?? `mailto:${EMAIL}`}
            className="inline-flex items-center justify-center gap-3 border border-gold px-9 py-4 font-body text-[0.8125rem] tracking-[0.18em] text-gold-deep uppercase transition-colors duration-300 hover:bg-gold hover:text-navy"
          >
            <Icon name={tel ? 'phone' : 'envelope'} aria-hidden="true" className="text-[0.9em]" />
            {tel ? PHONE_DISPLAY : 'Email us'}
          </a>
        </div>
      </Reveal>
    </section>
  )
}
