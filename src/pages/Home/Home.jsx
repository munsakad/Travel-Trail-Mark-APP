import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Hero from '../../components/Hero/Hero.jsx'
import DestinationsSection from '../../components/DestinationGrid/DestinationsSection.jsx'
import Itinerary from '../../components/Itinerary/Itinerary.jsx'
import TestimonialSection from '../../components/Testimonial/TestimonialSection.jsx'
import Newsletter from '../../components/Newsletter/Newsletter.jsx'
import Footer from '../../components/Footer/Footer.jsx'

// Runs on mount and whenever the hash changes (including navigation in from
// another page, e.g. Navbar's "/#destinations" links) and smooth-scrolls to
// the matching section, since client-side routing skips the browser's
// built-in hash-jump behavior.
function useScrollToHash() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [hash])
}

function Home({ destinations, itinerary, testimonials, favorites, onToggleFavorite }) {
  useScrollToHash()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DestinationsSection
          destinations={destinations}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
        <Itinerary steps={itinerary} />
        <TestimonialSection testimonials={testimonials} />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}

export default Home
