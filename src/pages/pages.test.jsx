import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test/render.jsx'
import About from './About.jsx'
import Academics from './Academics.jsx'
import Campus from './Campus.jsx'
import { BANDS } from '../data/academics.js'
import { FACILITIES } from '../data/facilities.js'

// Head tags need a provider that only exists in the SSG runtime; the build-output
// test covers them.
vi.mock('../components/ui/Seo.jsx', () => ({ default: () => null }))

describe('Academics page', () => {
  it('shows every class band and LKG', () => {
    renderWithRouter(<Academics />)
    BANDS.forEach((b) => {
      expect(screen.getAllByRole('heading', { name: b.title }).length).toBeGreaterThan(0)
    })
    expect(screen.getAllByText(/LKG/).length).toBeGreaterThan(0)
  })
})

describe('Campus page', () => {
  it('shows every facility', () => {
    renderWithRouter(<Campus />)
    FACILITIES.forEach((f) => {
      expect(screen.getByRole('heading', { name: f.title })).toBeInTheDocument()
    })
  })
})

describe('About page', () => {
  it('has a single h1 plus vision and mission headings', () => {
    renderWithRouter(<About />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { name: /vision/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /mission/i })).toBeInTheDocument()
  })
})
