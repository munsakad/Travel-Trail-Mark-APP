import './ItineraryStep.css'

function ItineraryStep({ step, isLast }) {
  return (
    <li className="itin-step">
      <div className="itin-step__marker">
        <span className="itin-step__day">Day {step.day}</span>
        {!isLast && <span className="itin-step__line" aria-hidden="true" />}
      </div>
      <div className="itin-step__body">
        <h3>{step.title}</h3>
        <p>{step.detail}</p>
      </div>
    </li>
  )
}

export default ItineraryStep
