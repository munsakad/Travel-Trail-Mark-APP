import { Link, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import DestinationImage from '../../components/DestinationImage/DestinationImage.jsx'
import NotFound from '../NotFound/NotFound.jsx'
import './DestinationDetail.css'

function DestinationDetail({ destinations, favorites, onToggleFavorite }) {
  const { id } = useParams()
  const destination = destinations.find((d) => d.id === id)

  if (!destination) {
    return <NotFound />
  }

  const { name, country, coords, blurb, overview, highlights, days, price, image } = destination
  const isFavorite = favorites.includes(id)

  return (
    <>
      <Navbar />
      <main>
        <section className="dest-detail">
          <div className="container">
            <Link to="/#destinations" className="dest-detail__back">
              ← All destinations
            </Link>

            <div className="dest-detail__layout">
              <div className="dest-detail__image-wrap">
                <DestinationImage src={image} name={name} country={country} />
                <button
                  className={`dest-detail__fav ${isFavorite ? 'is-active' : ''}`}
                  onClick={() => onToggleFavorite(id)}
                  aria-pressed={isFavorite}
                  aria-label={isFavorite ? `Remove ${name} from saved trips` : `Save ${name}`}
                >
                  <HeartIcon filled={isFavorite} />
                  <span>{isFavorite ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              <div className="dest-detail__body">
                <p className="eyebrow">{coords}</p>
                <h1 className="dest-detail__title">{name}</h1>
                <p className="dest-detail__country">{country}</p>

                <div className="dest-detail__meta">
                  <span>{days} days</span>
                  <span className="dest-detail__dot">·</span>
                  <span>from ${price.toLocaleString()}</span>
                </div>

                <p className="dest-detail__blurb">{blurb}</p>
                <p className="dest-detail__overview">{overview}</p>

                <h2 className="dest-detail__highlights-heading">Route highlights</h2>
                <ul className="dest-detail__highlights">
                  {highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>

                <Link to="/#newsletter" className="btn btn--primary dest-detail__cta">
                  Get notified about this route
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 21s-7.5-4.6-10-9.1C.6 8.4 2 4.8 5.6 4c2-.5 3.9.3 5 1.9C11.7 4.3 13.6 3.5 15.6 4c3.6.8 5 4.4 3.6 7.9C20.5 16.4 12 21 12 21z" />
    </svg>
  )
}

export default DestinationDetail
