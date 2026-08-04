import Testimonial from './Testimonial.jsx'
import './TestimonialSection.css'

function TestimonialSection({ testimonials }) {
  return (
    <section id="testimonials" className="testimonial-section">
      <div className="container">
        <p className="eyebrow">Field notes</p>
        <h2 className="section-heading">What the last group said</h2>

        <div className="testimonial-section__grid">
          {testimonials.map((t) => (
            <Testimonial key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
