import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import DestinationsSection from './DestinationsSection.jsx'

const destinations = [
  {
    id: 'faroe',
    name: 'Faroe Islands',
    country: 'Denmark',
    coords: '62.0°N, 6.8°W',
    blurb: 'Sea cliffs and turf roofs.',
    days: 8,
    price: 2140,
    image: 'https://example.com/faroe.jpg',
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    country: 'India',
    coords: '34.2°N, 77.6°E',
    blurb: 'High-desert monasteries.',
    days: 11,
    price: 1890,
    image: 'https://example.com/ladakh.jpg',
  },
  {
    id: 'atacama',
    name: 'Atacama Desert',
    country: 'Chile',
    coords: '23.6°S, 68.3°W',
    blurb: 'Salt flats and geysers.',
    days: 6,
    price: 1650,
    image: 'https://example.com/atacama.jpg',
  },
]

function renderSection() {
  return render(
    <MemoryRouter>
      <DestinationsSection
        destinations={destinations}
        favorites={[]}
        onToggleFavorite={vi.fn()}
      />
    </MemoryRouter>
  )
}

describe('DestinationsSection', () => {
  it('renders every destination by default', () => {
    renderSection()
    expect(screen.getByText('Faroe Islands')).toBeInTheDocument()
    expect(screen.getByText('Ladakh')).toBeInTheDocument()
    expect(screen.getByText('Atacama Desert')).toBeInTheDocument()
  })

  it('filters by search text across name, country, and blurb', async () => {
    renderSection()
    await userEvent.type(screen.getByPlaceholderText(/search by name/i), 'salt flats')

    expect(screen.getByText('Atacama Desert')).toBeInTheDocument()
    expect(screen.queryByText('Faroe Islands')).not.toBeInTheDocument()
    expect(screen.queryByText('Ladakh')).not.toBeInTheDocument()
  })

  it('filters by selected country', async () => {
    renderSection()
    await userEvent.selectOptions(screen.getByLabelText(/filter by country/i), 'India')

    expect(screen.getByText('Ladakh')).toBeInTheDocument()
    expect(screen.queryByText('Faroe Islands')).not.toBeInTheDocument()
  })

  it('sorts by price low to high', async () => {
    renderSection()
    await userEvent.selectOptions(screen.getByLabelText(/sort destinations/i), 'price-asc')

    const names = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(names).toEqual(['Atacama Desert', 'Ladakh', 'Faroe Islands'])
  })

  it('shows an empty-state message when nothing matches', async () => {
    renderSection()
    await userEvent.type(screen.getByPlaceholderText(/search by name/i), 'atlantis')

    expect(screen.getByText(/no routes match/i)).toBeInTheDocument()
  })
})
