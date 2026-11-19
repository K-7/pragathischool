const TONES = {
  ivory: 'bg-ivory',
  warm: 'bg-ivory-warm',
  navy: 'bg-navy text-white',
}

const WIDTHS = {
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
  narrow: 'max-w-3xl',
  full: 'max-w-none',
}

export default function Section({
  id,
  tone = 'ivory',
  width = 'default',
  className = '',
  innerClassName = '',
  children,
  ...rest
}) {
  return (
    <section
      id={id}
      className={`${TONES[tone]} px-6 py-20 sm:px-8 md:py-28 lg:py-32 ${className}`}
      {...rest}
    >
      <div className={`mx-auto ${WIDTHS[width]} ${innerClassName}`}>{children}</div>
    </section>
  )
}
