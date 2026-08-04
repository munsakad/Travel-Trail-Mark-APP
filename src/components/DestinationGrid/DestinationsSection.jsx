import { useMemo, useState } from 'react'
import DestinationGrid from './DestinationGrid.jsx'
import './DestinationsSection.css'

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured order' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'days-asc', label: 'Duration: shortest first' },
  { value: 'name-asc', label: 'Name: A to Z' },
]

function sortDestinations(list, sortBy) {
  const sorted = [...list]
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'days-asc':
      return sorted.sort((a, b) => a.days - b.days)
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sorted
  }
}

function DestinationsSection({ destinations, favorites, onToggleFavorite }) {
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  const countries = useMemo(
    () => [...new Set(destinations.map((d) => d.country))].sort(),
    [destinations]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matches = destinations.filter((d) => {
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.blurb.toLowerCase().includes(q)
      const matchesCountry = country === 'all' || d.country === country
      return matchesQuery && matchesCountry
    })
    return sortDestinations(matches, sortBy)
  }, [destinations, query, country, sortBy])

  return (
    <section id="destinations" className="destinations-section">
      <div className="container">
        <p className="eyebrow">{favorites.length} saved</p>
        <h2 className="section-heading">Six routes we're running this season</h2>
        <p className="section-sub">
          Each one capped at eight travelers, led by a guide who lives there — not flown in for
          the season.
        </p>

        <div className="dest-filters">
          <label className="visually-hidden" htmlFor="dest-search">
            Search destinations
          </label>
          <input
            id="dest-search"
            type="search"
            className="dest-filters__search"
            placeholder="Search by name, country, or terrain…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <label className="visually-hidden" htmlFor="dest-country">
            Filter by country
          </label>
          <select
            id="dest-country"
            className="dest-filters__select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="all">All countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <label className="visually-hidden" htmlFor="dest-sort">
            Sort destinations
          </label>
          <select
            id="dest-sort"
            className="dest-filters__select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="dest-filters__empty">
            No routes match "{query}" — try a different search or clear the country filter.
          </p>
        ) : (
          <DestinationGrid
            destinations={filtered}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </div>
    </section>
  )
}

export default DestinationsSection
