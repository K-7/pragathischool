/**
 * Single source of truth for school identity and contact details.
 *
 * Every phone-derived thing — tel: links, wa.me links, the WhatsApp button,
 * the footer and the JSON-LD — reads from the constants below. While the
 * number is still the placeholder, isPhoneConfigured() is false and the UI
 * renders no dead links.
 */

export const BRAND = 'Pragathi School'
export const TAGLINE = 'Nurturing minds in the heart of Kodagu'

// TODO(client): the school's real number. Digits only after the country code
// in WHATSAPP; keep all three in step.
export const PHONE_E164 = '+91XXXXXXXXXX'
export const PHONE_DISPLAY = '+91 XXXXX XXXXX'
export const WHATSAPP = '91XXXXXXXXXX'

// TODO(client): confirm the school's real email address.
export const EMAIL = 'info@pragathischoolvirajpet.com'
export const SITE_URL = 'https://www.pragathischoolvirajpet.com'
export const SITE_DISPLAY = 'www.pragathischoolvirajpet.com'

export const ADDRESS = {
  locality: 'Virajpet',
  region: 'Kodagu, Karnataka',
  country: 'India',
  countryCode: 'IN',
}

// TODO(client): add the street address and PIN code.
export const ADDRESS_LINE = 'Virajpet, Kodagu, Karnataka'

// TODO(client): replace with the school's Google Maps share link.
export const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Pragathi+School+Virajpet'

/** True once a real number replaces the placeholder above. */
export const isPhoneConfigured = () => !/x/i.test(PHONE_E164)

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Academics', to: '/academics' },
  { label: 'Campus', to: '/campus' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

export const CLASS_OPTIONS = [
  'LKG',
  'UKG',
  ...Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`),
]
