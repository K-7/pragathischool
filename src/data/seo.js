import { BRAND, SITE_URL, ADDRESS_LINE, PHONE_E164, EMAIL, isPhoneConfigured } from './site.js'

export const seo = {
  '/': {
    title: `${BRAND}, Virajpet — LKG to 10th School in Kodagu`,
    description:
      'Pragathi School in Virajpet, Kodagu: a caring school for LKG to Class 10 with strong academics, sports, arts and a safe campus. Admissions open.',
  },
  '/about': {
    title: `About Us — ${BRAND}, Virajpet`,
    description:
      'Our story, vision and mission. Pragathi School has served families in Virajpet taluk, Kodagu, from LKG to Class 10.',
  },
  '/academics': {
    title: `Academics — LKG to Class 10 | ${BRAND}`,
    description:
      'Pre-primary, primary, middle and high school at Pragathi School, Virajpet. A clear path from LKG to the Class 10 board examination.',
  },
  '/campus': {
    title: `Campus & Life — Facilities and Activities | ${BRAND}`,
    description:
      'Classrooms, library, labs, playground, sports, arts and safe transport at Pragathi School, Virajpet, Kodagu.',
  },
  '/gallery': {
    title: `Photo Gallery — Campus, Events & Annual Day | ${BRAND}`,
    description:
      'Photographs from Pragathi School, Virajpet: the campus, classrooms, sports, events and Annual Day.',
  },
  '/contact': {
    title: `Contact & Admissions | ${BRAND}`,
    description: `Enquire about admission at Pragathi School, ${ADDRESS_LINE}. Visit, call or send an enquiry.`,
  },
  '/404': {
    title: `Page Not Found — ${BRAND}`,
    description: 'The page you were looking for could not be found.',
  },
}

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`

/** EducationalOrganization structured data, rendered once on the home page. */
export const schoolJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: BRAND,
  description: seo['/'].description,
  url: SITE_URL,
  image: DEFAULT_OG_IMAGE,
  email: EMAIL,
  ...(isPhoneConfigured() ? { telephone: PHONE_E164 } : {}),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Virajpet',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  areaServed: { '@type': 'AdministrativeArea', name: 'Kodagu, Karnataka' },
})
