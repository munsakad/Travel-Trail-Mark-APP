import Button from '../Button/Button.jsx'
import './Hero.css'

const stats = [
  { value: '14', label: 'countries' },
  { value: '62', label: 'routes mapped' },
  { value: '8', label: 'avg. group size' },
]

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">Small-group expedition travel</p>
          <h1 className="hero__headline">
            Off the marked trail,
            <br />
            mapped for you.
          </h1>
          <p className="hero__sub">
            Trailmark builds routes to places most itineraries skip — planned with local guides,
            walked in groups of eight or fewer, and never rushed for the sake of a schedule.
          </p>
          <div className="hero__actions">
            <Button as="a" href="#destinations" variant="primary">
              See destinations
            </Button>
            <Button as="a" href="#itinerary" variant="outline">
              View a sample route
            </Button>
          </div>

          <dl className="hero__stats">
            {stats.map((s) => (
              <div className="hero__stat" key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero__map" aria-hidden="true">
          <RouteMap />
        </div>
      </div>
    </section>
  )
}

/**
 * Signature element — an animated dashed route connecting hand-placed pins,
 * drawn on load via stroke-dashoffset. Purely decorative (aria-hidden),
 * the real destination data lives in DestinationCard.
 */
function RouteMap() {
  return (
    <svg viewBox="0 0 420 460" className="route-map" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M60 400 C 110 340, 90 260, 150 230 S 240 210, 250 150 S 330 90, 360 60"
        stroke="var(--color-teal)"
        strokeWidth="2.5"
        strokeDasharray="7 8"
        fill="none"
        className="route-map__path"
      />
      {[
        { cx: 60, cy: 400, r: 6 },
        { cx: 150, cy: 230, r: 5 },
        { cx: 250, cy: 150, r: 5 },
        { cx: 360, cy: 60, r: 7 },
      ].map((pin, i) => (
        <g key={i} className="route-map__pin" style={{ animationDelay: `${0.6 + i * 0.35}s` }}>
          <circle cx={pin.cx} cy={pin.cy} r={pin.r} fill="var(--color-ochre)" stroke="var(--color-pine)" strokeWidth="1.5" />
        </g>
      ))}
      <text x="30" y="430" className="route-map__label">
        62.0°N
      </text>
      <text x="330" y="45" className="route-map__label">
        23.6°S
      </text>
    </svg>
  )
}

export default Hero
