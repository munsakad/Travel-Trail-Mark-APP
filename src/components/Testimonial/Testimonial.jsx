import './Testimonial.css'

function Testimonial({ testimonial }) {
  return (
    <figure className="testimonial">
      <blockquote>“{testimonial.quote}”</blockquote>
      <figcaption>
        <span className="testimonial__name">{testimonial.name}</span>
        <span className="testimonial__trip">{testimonial.trip}</span>
      </figcaption>
    </figure>
  )
}

export default Testimonial
