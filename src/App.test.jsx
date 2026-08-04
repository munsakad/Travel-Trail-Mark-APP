import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App.jsx'

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.history.pushState({}, '', '/')
  })

  it('renders the home page by default', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/off the marked trail/i)
  })

  it('navigates to a destination detail page and back', async () => {
    render(<App />)

    const [firstViewRoute] = screen.getAllByRole('link', { name: 'View route' })
    await userEvent.click(firstViewRoute)

    expect(await screen.findByRole('link', { name: '← All destinations' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('link', { name: '← All destinations' }))
    expect(await screen.findByText(/six routes we're running/i)).toBeInTheDocument()
  })

  it('shows a 404 page for an unknown route', () => {
    window.history.pushState({}, '', '/nope')
    render(<App />)
    expect(screen.getByText(/404/i)).toBeInTheDocument()
  })

  it('persists a favorited destination across remounts', async () => {
    const { unmount } = render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /^Save /i })[0])

    expect(JSON.parse(window.localStorage.getItem('trailmark:favorites'))).toHaveLength(1)

    unmount()
    render(<App />)
    expect(screen.getByText('1 saved')).toBeInTheDocument()
  })
})
