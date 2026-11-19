import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from '../ui/Icon.jsx'

/**
 * Modal image viewer. Traps focus, closes on Escape, and returns focus to the
 * tile that opened it.
 */
export default function Lightbox({ images, index, onClose, onNavigate }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const [failed, setFailed] = useState(false)

  const image = images[index]

  const next = useCallback(
    () => onNavigate((index + 1) % images.length),
    [index, images.length, onNavigate],
  )

  const prev = useCallback(
    () => onNavigate((index - 1 + images.length) % images.length),
    [index, images.length, onNavigate],
  )

  useEffect(() => setFailed(false), [index])

  useEffect(() => {
    const previouslyFocused = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') return onClose()
      if (event.key === 'ArrowRight') return next()
      if (event.key === 'ArrowLeft') return prev()
      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll('button')
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
  }, [onClose, next, prev])

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${images.length}: ${image.alt}`}
      className="fixed inset-0 z-[70] flex flex-col bg-navy/97 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <p className="font-body text-[0.6875rem] tracking-[0.24em] text-gold-soft uppercase">
          {image.category} · {index + 1} / {images.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-gold-soft"
        >
          <Icon name="close" className="text-2xl" />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center gap-2 px-3 pb-4 sm:gap-5 sm:px-8">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous image"
          className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/25 text-white/80 transition-colors hover:border-gold hover:text-gold-soft"
        >
          <Icon name="prev" />
        </button>

        <div className="flex min-h-0 flex-1 items-center justify-center">
          {failed ? (
            <div className="img-fallback flex aspect-[4/3] w-full max-w-3xl items-center justify-center">
              <span className="sr-only">{image.alt}</span>
            </div>
          ) : (
            <img
              src={image.src}
              alt={image.alt}
              onError={() => setFailed(true)}
              className="max-h-full max-w-full object-contain"
            />
          )}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/25 text-white/80 transition-colors hover:border-gold hover:text-gold-soft"
        >
          <Icon name="next" />
        </button>
      </div>

      <p className="px-6 pb-7 text-center text-sm text-balance text-white/60 sm:px-8">
        {image.alt}
      </p>
    </div>
  )
}
