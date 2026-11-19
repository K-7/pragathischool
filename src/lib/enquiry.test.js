import { describe, it, expect } from 'vitest'
import {
  validateEnquiry,
  buildEnquiryMessage,
  buildWhatsAppUrl,
  buildMailtoUrl,
  normalisePhone,
  telHref,
  whatsappHref,
} from './enquiry.js'
import { EMAIL } from '../data/site.js'

const valid = {
  parentName: 'Ganapathy Muthanna',
  phone: '9876543210',
  email: '',
  childName: 'Aarav',
  classApplying: 'Class 3',
  message: '',
}

describe('normalisePhone', () => {
  it('strips spaces, dashes and brackets', () => {
    expect(normalisePhone(' 98765-43210 ')).toBe('9876543210')
    expect(normalisePhone('(987) 654 3210')).toBe('9876543210')
  })

  it('keeps a leading plus', () => {
    expect(normalisePhone('+91 98765 43210')).toBe('+919876543210')
  })
})

describe('validateEnquiry', () => {
  it('accepts a complete, valid enquiry', () => {
    const { valid: ok, errors } = validateEnquiry(valid)
    expect(errors).toEqual({})
    expect(ok).toBe(true)
  })

  it('requires a parent name of at least two characters', () => {
    for (const parentName of ['', 'A', '   ']) {
      expect(validateEnquiry({ ...valid, parentName }).errors.parentName).toBeTruthy()
    }
  })

  it('requires a phone number', () => {
    expect(validateEnquiry({ ...valid, phone: '' }).errors.phone).toBeTruthy()
  })

  it.each(['9876543210', '+919876543210', '919876543210', '098765 43210', '+91 98765-43210'])(
    'accepts phone %s',
    (phone) => {
      expect(validateEnquiry({ ...valid, phone }).errors.phone).toBeUndefined()
    },
  )

  it.each(['12345', '5876543210', '98765432', '98765432101234'])('rejects phone %s', (phone) => {
    expect(validateEnquiry({ ...valid, phone }).errors.phone).toBeTruthy()
  })

  it('treats email as optional but validates it when present', () => {
    expect(validateEnquiry({ ...valid, email: '' }).errors.email).toBeUndefined()
    expect(validateEnquiry({ ...valid, email: 'a@b.co' }).errors.email).toBeUndefined()
    expect(validateEnquiry({ ...valid, email: 'not-an-email' }).errors.email).toBeTruthy()
  })
})

describe('message builders', () => {
  it('omits empty fields', () => {
    const text = buildEnquiryMessage({ parentName: 'Asha', phone: '9876543210' })
    expect(text).toContain('Parent: Asha')
    expect(text).not.toContain('Child:')
    expect(text).not.toContain('Email:')
  })

  it('round-trips Kannada, emoji and newlines through the WhatsApp URL', () => {
    const message = 'ಮಗು 😀\nsecond line'
    const url = buildWhatsAppUrl({ ...valid, message })
    const text = decodeURIComponent(new URL(url).searchParams.get('text'))
    expect(text).toContain(message)
  })

  it('still builds a mailto URL for a 2000-character message', () => {
    const message = 'x'.repeat(2000)
    const url = buildMailtoUrl({ ...valid, message })
    expect(url.startsWith(`mailto:${EMAIL}?subject=`)).toBe(true)
    expect(url).toContain(encodeURIComponent(message))
  })

  it('puts the class in the mailto subject', () => {
    expect(decodeURIComponent(buildMailtoUrl(valid))).toContain('Admission enquiry — Class 3')
    expect(decodeURIComponent(buildMailtoUrl({ ...valid, classApplying: '' }))).toContain(
      'subject=Admission enquiry&',
    )
  })
})

describe('placeholder phone', () => {
  it('yields no tel or WhatsApp links', () => {
    expect(telHref()).toBeNull()
    expect(whatsappHref()).toBeNull()
    expect(whatsappHref('hello')).toBeNull()
  })
})
