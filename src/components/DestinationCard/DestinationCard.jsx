import { Link } from 'react-router-dom'
import DestinationImage from '../DestinationImage/DestinationImage.jsx'
import './DestinationCard.css'

/**
 * DestinationCard — a pure presentational component. It owns no state;
 * `isFavorite` and `onToggleFavorite` are drilled down from App through
 * DestinationGrid, and this component just renders them / calls back up.
 */
function DestinationCard({ destination, isFavorite, onToggleFavorite }) {
  const { id, name, country, coords, blurb, days, price, image } = destination

  return (
    <article className="dest-card">
      <div className="dest-card__image-wrap">
        <DestinationImage src={image} name={name} country={country} />
        <button
          className={`dest-card__fav ${isFavorite ? 'is-active' : ''}`}
          onClick={() => onToggleFavorite(id)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Remove ${name} from saved trips` : `Save ${name}`}
        >
          <HeartIcon filled={isFavorite} />
        </button>
      </div>

      <div className="dest-card__body">
        <p className="eyebrow">{coords}</p>
        <h3 className="dest-card__title">{name}</h3>
        <p className="dest-card__country">{country}</p>
        <p className="dest-card__blurb">{blurb}</p>

        <div className="dest-card__meta">
          <span>{days} days</span>
          <span className="dest-card__dot">·</span>
          <span>from ${price.toLocaleString()}</span>
        </div>

        <Link to={`/destinations/${id}`} className="btn btn--outline">
          View route
        </Link>
      </div>
    </article>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 21s-7.5-4.6-10-9.1C.6 8.4 2 4.8 5.6 4c2-.5 3.9.3 5 1.9C11.7 4.3 13.6 3.5 15.6 4c3.6.8 5 4.4 3.6 7.9C20.5 16.4 12 21 12 21z" />
    </svg>
  )
}

export default DestinationCard
