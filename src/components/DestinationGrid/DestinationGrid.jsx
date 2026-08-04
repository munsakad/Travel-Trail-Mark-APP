import DestinationCard from '../DestinationCard/DestinationCard.jsx'
import './DestinationGrid.css'

/**
 * DestinationGrid — a middle layer with no state of its own. It receives
 * `destinations`, `favorites`, and `onToggleFavorite` from App (Section 3.
 * "Destinations" is a common assignment ask: props drilling through more
 * than one level) and passes each destination's own slice down to a card.
 */
function DestinationGrid({ destinations, favorites, onToggleFavorite }) {
  return (
    <div className="dest-grid">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          isFavorite={favorites.includes(destination.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

export default DestinationGrid
