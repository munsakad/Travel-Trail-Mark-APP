import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import DestinationImage from './DestinationImage.jsx'

describe('DestinationImage', () => {
  it('renders an img with the destination as alt text', () => {
    render(<DestinationImage src="https://example.com/photo.jpg" name="Faroe Islands" country="Denmark" />)
    const img = screen.getByRole('img', { name: 'Faroe Islands, Denmark' })
    expect(img.tagName).toBe('IMG')
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg')
  })

  it('swaps to a text fallback if the image fails to load', () => {
    const { container } = render(
      <DestinationImage src="https://example.com/broken.jpg" name="Faroe Islands" country="Denmark" />
    )
    fireEvent.error(screen.getByRole('img', { name: 'Faroe Islands, Denmark' }))

    expect(container.querySelector('img')).not.toBeInTheDocument()
    expect(screen.getByText('Faroe Islands')).toBeInTheDocument()
  })
})
