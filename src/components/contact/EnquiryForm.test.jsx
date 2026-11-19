import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../test/render.jsx'
import EnquiryForm from './EnquiryForm.jsx'

let openSpy

beforeEach(() => {
  openSpy = vi.spyOn(window, 'open').mockReturnValue({})
})

afterEach(() => {
  vi.restoreAllMocks()
})

/** The composed enquiry URL passed to window.open, decoded. */
const composedUrl = () => decodeURIComponent(openSpy.mock.calls[0][0])

async function fillValid(user) {
  await user.type(screen.getByLabelText(/your name/i), 'Ganapathy Muthanna')
  await user.type(screen.getByLabelText(/^phone/i), '9876543210')
}

describe('EnquiryForm', () => {
  it('blocks submission and reports errors when required fields are empty', async () => {
    const user = userEvent.setup()
    renderWithRouter(<EnquiryForm />)

    await user.click(screen.getByRole('button', { name: /send/i }))

    expect(openSpy).not.toHaveBeenCalled()
    expect(screen.getAllByRole('alert').length).toBeGreaterThanOrEqual(2)
  })

  it('surfaces the specific error for an invalid phone number', async () => {
    const user = userEvent.setup()
    renderWithRouter(<EnquiryForm />)

    await user.type(screen.getByLabelText(/your name/i), 'Bopanna')
    await user.type(screen.getByLabelText(/^phone/i), '12345')
    await user.click(screen.getByRole('button', { name: /send/i }))

    expect(openSpy).not.toHaveBeenCalled()
    expect(screen.getByText(/valid indian mobile number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^phone/i)).toHaveAttribute('aria-invalid', 'true')
  })

  it('moves focus to the first invalid field on submit', async () => {
    const user = userEvent.setup()
    renderWithRouter(<EnquiryForm />)

    await user.click(screen.getByRole('button', { name: /send/i }))
    expect(screen.getByLabelText(/your name/i)).toHaveFocus()
  })

  it('clears a field error as soon as the user corrects it', async () => {
    const user = userEvent.setup()
    renderWithRouter(<EnquiryForm />)

    await user.click(screen.getByRole('button', { name: /send/i }))
    expect(screen.getByText(/tell us your name/i)).toBeInTheDocument()

    await user.type(screen.getByLabelText(/your name/i), 'Kaveri')
    expect(screen.queryByText(/tell us your name/i)).not.toBeInTheDocument()
  })

  it('opens a composed mailto enquiry containing every entered detail', async () => {
    const user = userEvent.setup()
    renderWithRouter(<EnquiryForm />)

    await fillValid(user)
    await user.type(screen.getByLabelText(/child/i), 'Aarav')
    await user.selectOptions(screen.getByLabelText(/class/i), 'Class 3')
    await user.type(screen.getByLabelText(/anything else/i), 'Please call after 5 pm')
    await user.click(screen.getByRole('button', { name: /send/i }))

    expect(openSpy).toHaveBeenCalledOnce()
    const url = composedUrl()
    expect(url.startsWith('mailto:')).toBe(true)
    expect(url).toContain('Ganapathy Muthanna')
    expect(url).toContain('9876543210')
    expect(url).toContain('Aarav')
    expect(url).toContain('Class 3')
    expect(url).toContain('Please call after 5 pm')
  })

  it('offers no WhatsApp option while the phone is a placeholder', () => {
    renderWithRouter(<EnquiryForm />)
    expect(screen.queryByRole('button', { name: /whatsapp/i })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send by email/i })).toBeInTheDocument()
  })

  it('ties each error to its field with aria-describedby', async () => {
    const user = userEvent.setup()
    renderWithRouter(<EnquiryForm />)
    await user.click(screen.getByRole('button', { name: /send/i }))
    const name = screen.getByLabelText(/your name/i)
    expect(name).toHaveAttribute('aria-describedby', 'parentName-error')
    expect(document.getElementById('parentName-error')).toHaveTextContent(/tell us your name/i)
  })

  it('falls back to same-tab navigation when a popup blocker returns null', async () => {
    const user = userEvent.setup()
    openSpy.mockReturnValue(null)

    // jsdom refuses assignment to window.location.href, so intercept it.
    const original = Object.getOwnPropertyDescriptor(window, 'location')
    let assigned = ''
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        ...window.location,
        set href(value) {
          assigned = value
        },
        get href() {
          return assigned
        },
      },
    })

    renderWithRouter(<EnquiryForm />)
    await fillValid(user)
    await user.click(screen.getByRole('button', { name: /send/i }))

    expect(assigned).toContain('Ganapathy%20Muthanna')

    if (original) Object.defineProperty(window, 'location', original)
  })

  it('confirms to the user once the enquiry has been handed off', async () => {
    const user = userEvent.setup()
    renderWithRouter(<EnquiryForm />)

    expect(screen.queryByRole('status')).not.toBeInTheDocument()

    await fillValid(user)
    await user.click(screen.getByRole('button', { name: /send/i }))

    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
