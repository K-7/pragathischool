import Reveal from './Reveal.jsx'
import RidgeDivider from './RidgeDivider.jsx'

/** Shared masthead for the inner pages. */
export default function PageHero({ kicker, title, lede }) {
  return (
    <>
      <section className="bg-ivory px-6 pt-36 pb-14 sm:px-8 lg:pt-44">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="kicker">{kicker}</p>

          <div className="mx-auto mt-5 h-px w-16 bg-gold" aria-hidden="true" />

          <h1 className="mt-8 font-display text-[2.5rem] leading-[1.05] font-light text-balance text-navy sm:text-6xl">
            {title}
          </h1>

          {lede && (
            <p className="mx-auto mt-7 max-w-2xl text-lg text-pretty text-slate">
              {lede}
            </p>
          )}
        </Reveal>
      </section>

      <RidgeDivider />
    </>
  )
}
