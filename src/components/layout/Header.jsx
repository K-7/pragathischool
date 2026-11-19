import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BRAND, NAV, TAGLINE } from '../../data/site.js'
import Logo from '../ui/Logo.jsx'
import Icon from '../ui/Icon.jsx'
import MobileMenu from './MobileMenu.jsx'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  /**
   * Only the home page has a hero the header floats over, and that hero is a
   * dark photograph on mobile but ivory on desktop — so the transparent state
   * needs light text below `lg` and dark text above it. Every other page (and
   * the scrolled state) is solid ivory with dark text throughout.
   */
  const overHero = pathname === '/' && !scrolled

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          overHero
            ? 'border-b border-transparent bg-transparent lg:bg-ivory/0'
            : 'border-b border-gold/25 bg-ivory/95 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label={`${BRAND} — home`}>
            <Logo
              variant="roundel"
              loading="eager"
              className="h-11 w-11 shrink-0 sm:h-12 sm:w-12"
            />
            <span className="leading-none">
              <span
                className={`block font-display text-lg font-normal tracking-[0.14em] uppercase sm:text-xl ${
                  overHero ? 'text-white lg:text-navy' : 'text-navy'
                }`}
              >
                Pragathi
              </span>
              <span
                className={`mt-1 block font-body text-[0.5rem] tracking-[0.34em] uppercase sm:text-[0.5625rem] ${
                  overHero ? 'text-gold-soft lg:text-gold-deep' : 'text-gold-deep'
                }`}
              >
                {TAGLINE}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative font-body text-[0.75rem] tracking-[0.22em] uppercase transition-colors duration-300 ${
                    isActive
                      ? 'text-gold-deep'
                      : 'text-navy hover:text-gold-deep'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}

            <Link
              to="/contact"
              className="border border-navy bg-navy px-6 py-3 font-body text-[0.6875rem] tracking-[0.2em] text-white uppercase transition-all duration-300 hover:bg-navy-soft"
            >
              Admissions
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className={`-mr-2 flex h-11 w-11 items-center justify-center lg:hidden ${
              overHero ? 'text-white' : 'text-navy'
            }`}
          >
            <Icon name="menu" className="text-xl" />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
