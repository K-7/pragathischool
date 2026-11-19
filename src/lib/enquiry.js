import { BRAND, EMAIL, WHATSAPP, PHONE_E164, isPhoneConfigured } from '../data/site.js'

/** Strips formatting from a typed phone number, preserving a leading '+'. */
export function normalisePhone(value = '') {
  const trimmed = String(value).trim()
  const plus = trimmed.startsWith('+') ? '+' : ''
  return plus + trimmed.replace(/[^\d]/g, '')
}

/**
 * Indian mobile numbers: ten digits beginning 6-9, optionally prefixed with
 * +91, 91, or a trunk 0.
 */
const PHONE_PATTERN = /^(?:\+?91|0)?[6-9]\d{9}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateEnquiry(fields = {}) {
  const { parentName = '', phone = '', email = '' } = fields
  const errors = {}

  if (parentName.trim().length < 2) {
    errors.parentName = 'Please tell us your name.'
  }

  const digits = normalisePhone(phone)
  if (!digits) {
    errors.phone = 'A phone number lets us call you back.'
  } else if (!PHONE_PATTERN.test(digits)) {
    errors.phone = 'That does not look like a valid Indian mobile number.'
  }

  if (email.trim() && !EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Please check this email address.'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}

/** Plain-text enquiry body, shared by both the WhatsApp and email paths. */
export function buildEnquiryMessage(fields = {}) {
  const { parentName, phone, email, childName, classApplying, message } = fields

  const field = (label, value) => {
    const text = String(value ?? '').trim()
    return text ? `${label}: ${text}` : null
  }

  const lines = [
    `New admission enquiry from the ${BRAND} website`,
    '',
    field('Parent', parentName),
    field('Phone', phone),
    field('Email', email),
    field('Child', childName),
    field('Class', classApplying),
  ].filter((line) => line !== null)

  const body = String(message ?? '').trim()
  if (body) lines.push('', 'Message:', body)

  return lines.join('\n')
}

export function buildWhatsAppUrl(fields = {}) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildEnquiryMessage(fields))}`
}

export function buildMailtoUrl(fields = {}) {
  const subject = fields.classApplying
    ? `Admission enquiry — ${fields.classApplying}`
    : 'Admission enquiry'
  return (
    `mailto:${EMAIL}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(buildEnquiryMessage(fields))}`
  )
}

/** null when no real number has been configured yet, so no dead links ship. */
export const telHref = () => (isPhoneConfigured() ? `tel:${PHONE_E164}` : null)

export const whatsappHref = (text = '') =>
  isPhoneConfigured()
    ? `https://wa.me/${WHATSAPP}${text ? `?text=${encodeURIComponent(text)}` : ''}`
    : null

/**
 * Opens a composed URL in a new tab, falling back to same-tab navigation when
 * a popup blocker refuses the window.
 */
export function openEnquiry(url) {
  if (typeof window === 'undefined') return false
  const opened = window.open(url, '_blank', 'noopener,noreferrer')
  if (!opened) window.location.href = url
  return true
}
