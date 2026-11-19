import { useState } from 'react'
import { CLASS_OPTIONS, isPhoneConfigured } from '../../data/site.js'
import {
  validateEnquiry,
  buildWhatsAppUrl,
  buildMailtoUrl,
  openEnquiry,
} from '../../lib/enquiry.js'
import Icon from '../ui/Icon.jsx'

const EMPTY = {
  parentName: '',
  phone: '',
  email: '',
  childName: '',
  classApplying: '',
  message: '',
}

const inputClass =
  'w-full border-0 border-b border-gold/40 bg-transparent px-0 py-3 text-ink placeholder:text-slate/45 ' +
  'transition-colors focus:border-gold-deep focus:outline-none'

function Field({ id, label, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-body text-[0.6875rem] tracking-[0.22em] text-gold-deep uppercase"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-[#9B2C2C]">
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Composes the enquiry into a prefilled WhatsApp message (or an email when no
 * phone number is configured). There is no backend.
 */
export default function EnquiryForm() {
  const [fields, setFields] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const viaWhatsApp = isPhoneConfigured()

  const update = (key) => (event) => {
    setFields((prev) => ({ ...prev, [key]: event.target.value }))
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  const blur = (key) => () => {
    const { errors: next } = validateEnquiry(fields)
    setErrors((prev) => ({ ...prev, [key]: next[key] }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const { valid, errors: next } = validateEnquiry(fields)
    setErrors(next)

    if (!valid) {
      const firstInvalid = Object.keys(next)[0]
      document.getElementById(firstInvalid)?.focus()
      return
    }

    openEnquiry(viaWhatsApp ? buildWhatsAppUrl(fields) : buildMailtoUrl(fields))
    setSent(true)
  }

  const errorProps = (key) =>
    errors[key]
      ? { 'aria-invalid': true, 'aria-describedby': `${key}-error` }
      : {}

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-9">
      <div className="grid gap-9 sm:grid-cols-2">
        <Field id="parentName" label="Your name *" error={errors.parentName}>
          <input
            id="parentName"
            name="parentName"
            type="text"
            autoComplete="name"
            value={fields.parentName}
            onChange={update('parentName')}
            onBlur={blur('parentName')}
            placeholder="Parent or guardian"
            className={inputClass}
            {...errorProps('parentName')}
          />
        </Field>

        <Field id="phone" label="Phone *" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={update('phone')}
            onBlur={blur('phone')}
            placeholder="98765 43210"
            className={inputClass}
            {...errorProps('phone')}
          />
        </Field>

        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={update('email')}
            onBlur={blur('email')}
            placeholder="you@example.com"
            className={inputClass}
            {...errorProps('email')}
          />
        </Field>

        <Field id="childName" label="Child’s name">
          <input
            id="childName"
            name="childName"
            type="text"
            value={fields.childName}
            onChange={update('childName')}
            className={inputClass}
          />
        </Field>

        <Field id="classApplying" label="Class applying for">
          <select
            id="classApplying"
            name="classApplying"
            value={fields.classApplying}
            onChange={update('classApplying')}
            className={`${inputClass} appearance-none`}
          >
            <option value="">Select…</option>
            {CLASS_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Anything else you would like to ask?">
        <textarea
          id="message"
          name="message"
          rows={4}
          value={fields.message}
          onChange={update('message')}
          placeholder="Admission process, fees, transport, a campus visit…"
          className={`${inputClass} resize-none`}
        />
      </Field>

      <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-3 bg-navy px-9 py-4 font-body text-[0.8125rem] tracking-[0.18em] text-white uppercase transition-colors duration-300 hover:bg-navy-soft"
        >
          <Icon name={viaWhatsApp ? 'whatsapp' : 'envelope'} aria-hidden="true" />
          {viaWhatsApp ? 'Send via WhatsApp' : 'Send by email'}
        </button>

        <p className="text-sm text-slate/80">
          {viaWhatsApp
            ? 'Opens WhatsApp with your details filled in.'
            : 'Opens your email app with your details filled in.'}
        </p>
      </div>

      {sent && (
        <p
          role="status"
          className="flex items-start gap-3 border border-gold/40 bg-ivory-warm px-6 py-5 text-[0.9375rem] text-slate"
        >
          <Icon name="check" className="mt-1 shrink-0 text-gold" aria-hidden="true" />
          <span>
            Your enquiry is ready to send. If nothing opened, check that pop-ups
            are allowed — or reach us on the details alongside.
          </span>
        </p>
      )}
    </form>
  )
}
