import Reveal from './Reveal.jsx'

/**
 * Kicker + display heading + optional lede, with the gold hairline rule that
 * recurs across every section.
 */
export default function SectionHeading({
  kicker,
  title,
  lede,
  align = 'left',
  as: Tag = 'h2',
  invert = false,
  className = '',
}) {
  const centred = align === 'center'

  return (
    <Reveal className={`${centred ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      {kicker && (
        <p className={`kicker ${invert ? 'text-gold-soft' : ''}`}>{kicker}</p>
      )}

      <div
        className={`mt-5 h-px w-16 bg-gold ${centred ? 'mx-auto' : ''}`}
        aria-hidden="true"
      />

      <Tag
        className={`mt-6 font-display text-[2rem] leading-[1.08] font-light text-balance sm:text-[2.5rem] lg:text-[3rem] ${
          invert ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </Tag>

      {lede && (
        <p
          className={`mt-6 text-pretty ${
            invert ? 'text-white/75' : 'text-slate'
          } ${centred ? 'mx-auto' : ''}`}
        >
          {lede}
        </p>
      )}
    </Reveal>
  )
}
