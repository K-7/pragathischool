import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Logo from './Logo.jsx'

describe('Logo', () => {
  it('is decorative by default', () => {
    const { container } = render(<Logo />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('exposes an accessible name when given alt', () => {
    const { getByRole } = render(<Logo alt="Pragathi School" />)
    expect(getByRole('img', { name: 'Pragathi School' })).toBeInTheDocument()
  })

  it('does not leak img-only props onto the svg', () => {
    const { container } = render(<Logo variant="roundel" loading="eager" />)
    const svg = container.querySelector('svg')
    expect(svg).not.toHaveAttribute('loading')
    expect(svg).not.toHaveAttribute('variant')
  })
})
