import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const links = [
  { label: 'Destinations', hash: 'destinations' },
  { label: 'Sample route', hash: 'itinerary' },
  { label: 'Field notes', hash: 'testimonials' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="Trailmark home">
          <CompassMark />
          <span>Trailmark</span>
        </Link>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {links.map((link) => (
            <Link key={link.hash} to={`/#${link.hash}`} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="navbar__cta">
            <Link to="/#newsletter" className="btn btn--primary" onClick={() => setOpen(false)}>
              Plan a trip
            </Link>
          </div>
        </nav>

        <button
          className="navbar__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

function CompassMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <circle cx="13" cy="13" r="11.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M13 6.5L15.3 11.5L20.5 13L15.3 14.5L13 19.5L10.7 14.5L5.5 13L10.7 11.5L13 6.5Z" fill="currentColor" />
    </svg>
  )
}

export default Navbar
