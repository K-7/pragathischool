import { useReveal } from '../../lib/useReveal.js'

/**
 * Fade-and-rise on scroll. `delay` staggers items within a grid; keep it
 * under ~300ms so the last card never feels late.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
