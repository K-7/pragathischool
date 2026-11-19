import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen, within } from '@testing-library/react'
import { renderWithRouter } from '../../test/render.jsx'
import Header from './Header.jsx'
import { NAV } from '../../data/site.js'

describe('Header', () => {
  it('renders a link for every nav entry', () => {
    renderWithRouter(<Header />)
    const nav = screen.getByRole('navigation', { name: 'Primary' })

    NAV.forEach(({ label, to }) => {
      expect(within(nav).getByRole('link', { name: label })).toHaveAttribute('href', to)
    })
  })

  it('drives the nav from data rather than hardcoded markup', () => {
    renderWithRouter(<Header />)
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    // NAV entries plus the "Admissions" call to action.
    expect(within(nav).getAllByRole('link')).toHaveLength(NAV.length + 1)
    expect(within(nav).getByRole('link', { name: 'Admissions' })).toHaveAttribute('href', '/contact')
  })

  it('opens and closes the mobile menu', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Header />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(screen.getByRole('dialog', { name: 'Menu' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close menu' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes the mobile menu on Escape', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Header />)

    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('offers a skip link as the first focusable element', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Header />)

    await user.tab()
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveFocus()
  })
})
