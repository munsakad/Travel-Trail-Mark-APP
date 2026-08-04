import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ErrorBoundary from './ErrorBoundary.jsx'

function Bomb() {
  throw new Error('boom')
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders children when nothing throws', () => {
    render(
      <ErrorBoundary>
        <p>All good</p>
      </ErrorBoundary>
    )
    expect(screen.getByText('All good')).toBeInTheDocument()
  })

  it('renders a fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    )
    expect(screen.getByText(/lost its signal/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /back to safety/i })).toBeInTheDocument()
  })
})
