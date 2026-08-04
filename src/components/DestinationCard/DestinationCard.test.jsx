import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import DestinationCard from './DestinationCard.jsx'

const destination = {
  id: 'faroe',
  name: 'Faroe Islands',
  country: 'Denmark',
  coords: '62.0°N, 6.8°W',
  blurb: 'Turf-roofed villages strung along sea cliffs.',
  days: 8,
  price: 2140,
  image: 'https://example.com/faroe.jpg',
}

function renderCard(props = {}) {
  return render(
    <MemoryRouter>
      <DestinationCard
        destination={destination}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
        {...props}
      />
    </MemoryRouter>
  )
}

describe('DestinationCard', () => {
  it('renders destination details', () => {
    renderCard()
    expect(screen.getByText('Faroe Islands')).toBeInTheDocument()
    expect(screen.getByText('Denmark')).toBeInTheDocument()
    expect(screen.getByText('8 days')).toBeInTheDocument()
    expect(screen.getByText('from $2,140')).toBeInTheDocument()
  })

  it('links "View route" to the destination detail page', () => {
    renderCard()
    const link = screen.getByRole('link', { name: 'View route' })
    expect(link).toHaveAttribute('href', '/destinations/faroe')
  })

  it('calls onToggleFavorite with the destination id when the heart is clicked', async () => {
    const onToggleFavorite = vi.fn()
    renderCard({ onToggleFavorite })
    await userEvent.click(screen.getByRole('button', { name: 'Save Faroe Islands' }))
    expect(onToggleFavorite).toHaveBeenCalledWith('faroe')
  })

  it('reflects favorite state in the toggle button label', () => {
    renderCard({ isFavorite: true })
    expect(
      screen.getByRole('button', { name: 'Remove Faroe Islands from saved trips' })
    ).toHaveAttribute('aria-pressed', 'true')
  })
})
