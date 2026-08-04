import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import DestinationDetail from './DestinationDetail.jsx'

const destinations = [
  {
    id: 'faroe',
    name: 'Faroe Islands',
    country: 'Denmark',
    coords: '62.0°N, 6.8°W',
    blurb: 'Sea cliffs and turf roofs.',
    overview: 'A long walk between eighteen islands.',
    highlights: ['Cliff-top path', 'Ferry crossing', 'Guesthouse stay'],
    days: 8,
    price: 2140,
    image: 'https://example.com/faroe.jpg',
  },
]

function renderAt(path, props = {}) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="/destinations/:id"
          element={
            <DestinationDetail destinations={destinations} favorites={[]} onToggleFavorite={vi.fn()} {...props} />
          }
        />
      </Routes>
    </MemoryRouter>
  )
}

describe('DestinationDetail', () => {
  it('renders the matching destination', () => {
    renderAt('/destinations/faroe')

    expect(screen.getByRole('heading', { name: 'Faroe Islands', level: 1 })).toBeInTheDocument()
    expect(screen.getByText('A long walk between eighteen islands.')).toBeInTheDocument()
    expect(screen.getByText('Cliff-top path')).toBeInTheDocument()
    expect(screen.getByText('8 days')).toBeInTheDocument()
  })

  it('falls back to a not-found page for an unknown id', () => {
    renderAt('/destinations/does-not-exist')
    expect(screen.getByText(/404/i)).toBeInTheDocument()
  })

  it('toggles favorite state when the save button is clicked', async () => {
    const onToggleFavorite = vi.fn()
    renderAt('/destinations/faroe', { onToggleFavorite })

    await userEvent.click(screen.getByRole('button', { name: 'Save Faroe Islands' }))
    expect(onToggleFavorite).toHaveBeenCalledWith('faroe')
  })
})
