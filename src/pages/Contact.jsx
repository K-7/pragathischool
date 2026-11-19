import Seo from '../components/ui/Seo.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import Section from '../components/ui/Section.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import EnquiryForm from '../components/contact/EnquiryForm.jsx'
import ContactDetails from '../components/contact/ContactDetails.jsx'

export default function Contact() {
  return (
    <>
      <Seo path="/contact" />

      <PageHero
        kicker="Contact & Admissions"
        title="Enquire about admission"
        lede="Tell us which class you are looking at and how to reach you. The school office will get back to you about admission, fees and a campus visit."
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <Reveal>
            <h2 className="font-display text-[1.75rem] font-light text-navy sm:text-[2rem]">
              Send an enquiry
            </h2>
            <p className="mt-3 text-[0.9375rem] text-slate">
              Fields marked * are required.
            </p>

            <div className="mt-10">
              <EnquiryForm />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactDetails />
          </Reveal>
        </div>
      </Section>
    </>
  )
}
