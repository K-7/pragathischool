import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../test/render.jsx'
import ClassBands from './ClassBands.jsx'
import { BANDS } from '../../data/academics.js'

describe('ClassBands', () => {
  it('renders one heading per band with its class range', () => {
    renderWithRouter(<ClassBands />)
    BANDS.forEach((band) => {
      expect(screen.getByRole('heading', { name: band.title })).toBeInTheDocument()
      expect(screen.getByText(band.classes)).toBeInTheDocument()
    })
  })

  it('numbers the bands 01 to 04', () => {
    renderWithRouter(<ClassBands />)
    for (const n of ['01', '02', '03', '04']) expect(screen.getByText(n)).toBeInTheDocument()
  })
})
