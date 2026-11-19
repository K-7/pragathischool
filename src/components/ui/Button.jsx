import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

const BASE =
  'group inline-flex items-center justify-center gap-3 font-body text-[0.8125rem] uppercase tracking-[0.18em] ' +
  'transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50'

const VARIANTS = {
  // Solid navy — the primary action. 13.5:1 on white.
  primary: `${BASE} bg-navy px-8 py-4 text-white hover:bg-navy-soft`,
  // Outlined gold. Border uses --color-gold; the label uses gold-deep so the
  // text itself clears 4.8:1. See implementation.md §2.
  outline: `${BASE} border border-gold px-8 py-4 text-gold-deep hover:bg-gold hover:text-navy`,
  // Ghost on a dark ground.
  invert: `${BASE} border border-white/30 px-8 py-4 text-white hover:border-gold hover:text-gold-soft`,
  // Text-only with a travelling arrow.
  link: 'group inline-flex items-center gap-2 font-body text-[0.8125rem] uppercase tracking-[0.18em] text-gold-deep transition-colors duration-300 hover:text-navy',
}

export default function Button({
  as,
  to,
  href,
  variant = 'primary',
  icon,
  trailingArrow = variant === 'link',
  className = '',
  children,
  ...rest
}) {
  const classes = `${VARIANTS[variant]} ${className}`

  const content = (
    <>
      {icon && <Icon name={icon} className="text-[0.9em]" aria-hidden="true" />}
      <span>{children}</span>
      {trailingArrow && (
        <Icon
          name="arrowRight"
          aria-hidden="true"
          className="text-[0.85em] transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }

  const Tag = as || 'button'
  return (
    <Tag className={classes} {...rest}>
      {content}
    </Tag>
  )
}
