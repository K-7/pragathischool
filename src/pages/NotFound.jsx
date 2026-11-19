import Seo from '../components/ui/Seo.jsx'
import Button from '../components/ui/Button.jsx'
import Logo from '../components/ui/Logo.jsx'

export default function NotFound() {
  return (
    <>
      <Seo path="/404" />

      <section className="flex min-h-[70vh] items-center justify-center px-6 py-32 text-center">
        <div>
          <Logo alt="Pragathi School" className="mx-auto h-24 w-24" />

          <p className="kicker mt-10">Error 404</p>

          <div className="mx-auto mt-5 h-px w-16 bg-gold" aria-hidden="true" />

          <h1 className="mt-8 font-display text-[2.5rem] leading-tight font-light text-navy sm:text-5xl">
            This page could not be found
          </h1>

          <p className="mx-auto mt-6 max-w-md text-pretty text-slate">
            The page may have moved. Everything else is a click away.
          </p>

          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button to="/">Back to home</Button>
            <Button to="/contact" variant="outline" trailingArrow>
              Contact us
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
