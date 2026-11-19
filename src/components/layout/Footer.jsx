import { Link } from 'react-router-dom'
import {
  BRAND,
  TAGLINE,
  NAV,
  EMAIL,
  PHONE_DISPLAY,
  ADDRESS_LINE,
  SITE_DISPLAY,
  SITE_URL,
  isPhoneConfigured,
} from '../../data/site.js'
import { telHref } from '../../lib/enquiry.js'
import Logo from '../ui/Logo.jsx'
import Icon from '../ui/Icon.jsx'
import RidgeDivider from '../ui/RidgeDivider.jsx'

export default function Footer() {
  const tel = telHref()

  return (
    <footer className="bg-navy text-white">
      <RidgeDivider tone="light" className="opacity-60" />

      <div className="mx-auto max-w-7xl px-6 pt-8 pb-14 sm:px-8">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <Logo variant="roundel" className="h-14 w-14 shrink-0" />
              <span className="leading-none">
                <span className="block font-display text-2xl tracking-[0.12em] uppercase">
                  Pragathi
                </span>
                <span className="mt-1.5 block font-body text-[0.5625rem] tracking-[0.34em] text-gold-soft uppercase">
                  {TAGLINE}
                </span>
              </span>
            </div>

            <p className="mt-7 max-w-sm text-pretty text-white/70">
              A caring school for LKG to Class 10 in Virajpet, Kodagu —
              strong academics, active childhoods and a safe campus.
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="kicker text-gold-soft">Explore</h2>
            <ul className="mt-6 space-y-3">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-white/75 transition-colors hover:text-gold-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="kicker text-gold-soft">Contact</h2>
            <ul className="mt-6 space-y-4 text-white/75">
              <li className="flex gap-4">
                <Icon name="location" className="mt-1.5 w-4 shrink-0 text-gold" />
                <span>{ADDRESS_LINE}</span>
              </li>
              <li className="flex gap-4">
                <Icon name="phone" className="mt-1.5 w-4 shrink-0 text-gold" />
                {tel ? (
                  <a href={tel} className="transition-colors hover:text-gold-soft">
                    {PHONE_DISPLAY}
                  </a>
                ) : (
                  <span className="text-white/45">Phone number coming soon</span>
                )}
              </li>
              <li className="flex gap-4">
                <Icon name="envelope" className="mt-1.5 w-4 shrink-0 text-gold" />
                <a
                  href={`mailto:${EMAIL}`}
                  className="break-all transition-colors hover:text-gold-soft"
                >
                  {EMAIL}
                </a>
              </li>
              <li className="flex gap-4">
                <Icon name="globe" className="mt-1.5 w-4 shrink-0 text-gold" />
                <a
                  href={SITE_URL}
                  className="break-all transition-colors hover:text-gold-soft"
                >
                  {SITE_DISPLAY}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/12 pt-8 text-[0.8125rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND}. All rights reserved.
          </p>
          <p>{ADDRESS_LINE}</p>
        </div>
      </div>
    </footer>
  )
}
