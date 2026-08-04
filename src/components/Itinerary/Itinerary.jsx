import ItineraryStep from '../ItineraryStep/ItineraryStep.jsx'
import './Itinerary.css'

function Itinerary({ steps }) {
  return (
    <section id="itinerary" className="itinerary">
      <div className="container">
        <p className="eyebrow">Ladakh route, abridged</p>
        <h2 className="section-heading">A sample route, day by day</h2>
        <p className="section-sub">
          Every trip is built the same way: an easy first day, one long push, a real rest day, then
          the payoff. This is five days pulled from an eleven-day route.
        </p>

        <ol className="itinerary__list">
          {steps.map((step, i) => (
            <ItineraryStep key={step.day} step={step} isLast={i === steps.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Itinerary
