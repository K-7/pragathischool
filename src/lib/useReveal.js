import { useEffect, useRef } from 'react'

/**
 * Adds `is-visible` to the element once it scrolls into view, then stops
 * observing. Falls back to visible-immediately where IntersectionObserver is
 * unavailable (including during SSG), so content is never hidden by JS.
 */
export function useReveal({ threshold = 0.12, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (reduced || typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}
