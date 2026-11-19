import { useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { NAV, TAGLINE, EMAIL, PHONE_DISPLAY, isPhoneConfigured } from '../../data/site.js'
import { telHref, whatsappHref } from '../../lib/enquiry.js'
import Icon from '../ui/Icon.jsx'
import Logo from '../ui/Logo.jsx'

export default function MobileMenu({ open, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  // Lock the page behind the overlay, move focus in, and restore it on close.
  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled])',
      )
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      previouslyFocused?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  const tel = telHref()
  const wa = whatsappHref()

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[60] flex flex-col bg-ivory lg:hidden"
    >
      <div className="flex items-center justify-between border-b border-gold/25 px-6 py-4">
        <span className="flex items-center gap-3">
          <Logo variant="roundel" className="h-11 w-11 shrink-0" />
          <span className="leading-none">
            <span className="block font-display text-lg tracking-[0.14em] text-navy uppercase">
              Pragathi
            </span>
            <span className="mt-1 block font-body text-[0.5rem] tracking-[0.34em] text-gold-deep uppercase">
              {TAGLINE}
            </span>
          </span>
        </span>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-mr-2 flex h-11 w-11 items-center justify-center text-navy"
        >
          <Icon name="close" className="text-2xl" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Mobile">
        <ul className="space-y-1">
          {NAV.map((item, i) => (
            <li key={item.to} className="border-b border-gold/15">
              <NavLink
                to={item.to}
                end={item.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-baseline gap-5 py-5 font-display text-3xl font-light transition-colors ${
                    isActive ? 'text-gold-deep' : 'text-navy'
                  }`
                }
              >
                <span className="font-body text-[0.625rem] tracking-[0.3em] text-gold-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          onClick={onClose}
          className="mt-10 flex w-full items-center justify-center bg-navy px-8 py-5 font-body text-[0.75rem] tracking-[0.2em] text-white uppercase"
        >
          Admissions
        </Link>

        <div className="mt-10 space-y-4 border-t border-gold/20 pt-8">
          {tel && (
            <a href={tel} className="flex items-center gap-4 text-slate">
              <Icon name="phone" className="w-4 text-gold-deep" />
              {PHONE_DISPLAY}
            </a>
          )}
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-slate"
            >
              <Icon name="whatsapp" className="w-4 text-gold-deep" />
              WhatsApp us
            </a>
          )}
          {!isPhoneConfigured() && (
            <p className="text-sm text-slate/70">Phone number coming soon.</p>
          )}
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 break-all text-slate">
            <Icon name="envelope" className="w-4 shrink-0 text-gold-deep" />
            {EMAIL}
          </a>
        </div>
      </nav>
    </div>
  )
}
