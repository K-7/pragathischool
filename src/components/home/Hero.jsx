import { Link } from 'react-router-dom'
import { HERO } from '../../data/images.js'
import { TAGLINE } from '../../data/site.js'
import ArchImage from '../ui/ArchImage.jsx'
import Icon from '../ui/Icon.jsx'

/**
 * Mobile: the photograph is the backdrop, text reversed out over a navy
 * scrim. Desktop: ivory ground with the photograph moved into the arch, which
 * is the treatment the rest of the site follows.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ivory">
      <div className="absolute inset-0 lg:hidden">
        <img
          src={HERO.src}
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/65 to-navy/90"
          aria-hidden="true"
        />
      </div>

      {/* Faint gold wash anchoring the desktop composition. */}
      <div
        className="absolute inset-y-0 right-0 hidden w-2/5 bg-gradient-to-l from-ivory-warm to-transparent lg:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pt-36 pb-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:pt-44 lg:pb-32">
        <div className="max-w-xl">
          <p className="kicker text-gold-soft lg:text-gold-deep">{TAGLINE}</p>

          <div className="mt-6 h-px w-20 bg-gold" aria-hidden="true" />

          <h1 className="mt-8 font-display text-[2.75rem] leading-[1.02] font-light text-balance text-white sm:text-6xl lg:text-[4.25rem] lg:text-navy">
            Where every child’s journey begins
          </h1>

          <p className="mt-7 max-w-lg text-lg text-pretty text-white/85 lg:text-slate">
            A caring school for LKG to Class 10 in Virajpet, Kodagu, with strong academics, active childhoods and a safe, supportive campus.
          </p>

          <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-gold px-9 py-4 font-body text-[0.8125rem] tracking-[0.18em] text-navy uppercase transition-colors duration-300 hover:bg-gold-soft lg:bg-navy lg:text-white lg:hover:bg-navy-soft"
            >
              Apply for Admission
              <Icon
                name="arrowRight"
                aria-hidden="true"
                className="text-[0.85em] transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/academics"
              className="inline-flex items-center justify-center border border-white/45 px-9 py-4 font-body text-[0.8125rem] tracking-[0.18em] text-white uppercase transition-colors duration-300 hover:border-gold hover:text-gold-soft lg:border-gold lg:text-gold-deep lg:hover:bg-gold lg:hover:text-navy"
            >
              Explore Academics
            </Link>
          </div>
        </div>

        <div className="hidden justify-end lg:flex">
          <div className="relative w-full max-w-md">
            {/* Offset hairline frame, echoing the arch behind the photograph. */}
            <div
              className="arch pointer-events-none absolute -top-7 -right-7 h-full w-full border border-gold/45"
              aria-hidden="true"
            />
            <ArchImage
              src={HERO.src}
              alt={HERO.alt}
              ratio="portrait"
              loading="eager"
              sizes="(min-width: 1024px) 28rem, 100vw"
              className="relative"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
