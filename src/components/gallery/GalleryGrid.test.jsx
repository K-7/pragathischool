import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

vi.mock('../../data/images.js', () => ({
  CATEGORIES: ['All', 'Campus', 'Sports', 'Events'],
  gallery: [
    { id: 'c1', src: '/c1.jpg', alt: 'Campus one', category: 'Campus', aspect: 'wide' },
    { id: 'c2', src: '/c2.jpg', alt: 'Campus two', category: 'Campus', aspect: 'tall' },
    { id: 's1', src: '/s1.jpg', alt: 'Sports one', category: 'Sports', aspect: 'square' },
  ],
}))

const { default: GalleryGrid } = await import('./GalleryGrid.jsx')

const tiles = () => screen.getAllByRole('button', { name: /^Open image:/ })

describe('GalleryGrid', () => {
  it('filters by category and marks the active filter', async () => {
    const user = userEvent.setup()
    render(<GalleryGrid />)
    expect(tiles()).toHaveLength(3)

    await user.click(screen.getByRole('button', { name: 'Sports' }))
    expect(tiles()).toHaveLength(1)
    expect(screen.getByRole('button', { name: 'Sports' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('shows an empty state for a category with no photos', async () => {
    const user = userEvent.setup()
    render(<GalleryGrid />)
    await user.click(screen.getByRole('button', { name: 'Events' }))
    expect(screen.getByText('No photos in this category yet.')).toBeInTheDocument()
    expect(screen.queryAllByRole('button', { name: /^Open image:/ })).toHaveLength(0)
  })

  it('opens a lightbox, navigates with arrows, and wraps', async () => {
    const user = userEvent.setup()
    render(<GalleryGrid />)

    await user.click(tiles()[0])
    expect(screen.getByRole('dialog')).toHaveAccessibleName(/Image 1 of 3: Campus one/)

    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('dialog')).toHaveAccessibleName(/Image 2 of 3: Campus two/)

    await user.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(screen.getByRole('dialog')).toHaveAccessibleName(/Image 3 of 3: Sports one/)
  })

  it('closes on Escape and returns focus to the tile that opened it', async () => {
    const user = userEvent.setup()
    render(<GalleryGrid />)
    const tile = tiles()[1]

    await user.click(tile)
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(tile).toHaveFocus()
  })
})
