import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Navbar from './Navbar.jsx'

function renderNavbar() {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  )
}

describe('Navbar', () => {
  it('renders primary nav links pointing at home-page sections', () => {
    renderNavbar()
    expect(screen.getByRole('link', { name: 'Destinations' })).toHaveAttribute(
      'href',
      '/#destinations'
    )
    expect(screen.getByRole('link', { name: 'Sample route' })).toHaveAttribute('href', '/#itinerary')
  })

  // The hamburger toggle is CSS-hidden (display: none) above the mobile
  // breakpoint, which is exactly the viewport jsdom simulates by default —
  // and per the accessible-name spec, a hidden element has no accessible
  // name, so `getByRole(..., { hidden: true })` still can't match it by
  // name. Query it directly instead; the real behavior is still exercised.
  it('toggles the mobile menu open and closed', async () => {
    const { container } = renderNavbar()
    const toggle = container.querySelector('.navbar__toggle')

    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveAttribute('aria-label', 'Close menu')
  })

  it('closes the mobile menu after a link is clicked', async () => {
    const { container } = renderNavbar()
    const toggle = container.querySelector('.navbar__toggle')

    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await userEvent.click(screen.getByRole('link', { name: 'Destinations' }))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
