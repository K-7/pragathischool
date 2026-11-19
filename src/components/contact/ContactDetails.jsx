import {
  BRAND,
  TAGLINE,
  MAP_URL,
  EMAIL,
  PHONE_DISPLAY,
  ADDRESS_LINE,
  SITE_DISPLAY,
  SITE_URL,
} from '../../data/site.js'
import { telHref, whatsappHref } from '../../lib/enquiry.js'
import Icon from '../ui/Icon.jsx'
import Logo from '../ui/Logo.jsx'

function Row({ icon, label, children }) {
  return (
    <li className="flex gap-5 border-b border-gold/20 py-6">
      <Icon name={icon} className="mt-1 w-5 shrink-0 text-gold" aria-hidden="true" />
      <div>
        <p className="font-body text-[0.625rem] tracking-[0.24em] text-gold-deep uppercase">
          {label}
        </p>
        <div className="mt-2 text-slate">{children}</div>
      </div>
    </li>
  )
}

export default function ContactDetails() {
  const tel = telHref()
  const wa = whatsappHref(`Hello ${BRAND}, I would like to enquire about admission.`)

  return (
    <div>
      <div className="flex items-center gap-4">
        <Logo variant="emblem" className="h-16 w-16 shrink-0" />
        <span className="leading-none">
          <span className="block font-display text-2xl tracking-[0.1em] text-navy uppercase">
            Pragathi
          </span>
          <span className="mt-1.5 block font-body text-[0.5625rem] tracking-[0.32em] text-gold-deep uppercase">
            {TAGLINE}
          </span>
        </span>
      </div>

      <ul className="mt-10 border-t border-gold/20">
        <Row icon="location" label="Visit">
          <address className="not-italic">{ADDRESS_LINE}</address>
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-[0.9375rem] text-gold-deep underline-offset-4 hover:underline"
          >
            Get directions
          </a>
        </Row>

        <Row icon="phone" label="Call">
          {tel ? (
            <a href={tel} className="transition-colors hover:text-gold-deep">
              {PHONE_DISPLAY}
            </a>
          ) : (
            <span className="text-slate/60">Phone number coming soon</span>
          )}
        </Row>

        <Row icon="envelope" label="Email">
          <a
            href={`mailto:${EMAIL}`}
            className="break-all transition-colors hover:text-gold-deep"
          >
            {EMAIL}
          </a>
        </Row>

        <Row icon="globe" label="Web">
          <a href={SITE_URL} className="break-all transition-colors hover:text-gold-deep">
            {SITE_DISPLAY}
          </a>
        </Row>
      </ul>

      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 inline-flex items-center gap-3 border border-gold px-8 py-4 font-body text-[0.8125rem] tracking-[0.18em] text-gold-deep uppercase transition-colors duration-300 hover:bg-gold hover:text-navy"
        >
          <Icon name="whatsapp" aria-hidden="true" />
          Chat on WhatsApp
        </a>
      )}

      <div className="arch mt-12 aspect-[4/3] w-full border border-gold/30">
        <iframe
          title="Pragathi School location — Virajpet, Kodagu"
          src="https://www.google.com/maps?q=Pragathi+School,+Virajpet,+Kodagu,+Karnataka&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full grayscale-[35%]"
        />
      </div>
    </div>
  )
}
