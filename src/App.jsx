import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx'
import Home from './pages/Home/Home.jsx'
import DestinationDetail from './pages/DestinationDetail/DestinationDetail.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import useLocalStorage from './hooks/useLocalStorage.js'

import destinations from './data/destinations.js'
import itinerary from './data/itinerary.js'
import testimonials from './data/testimonials.js'

function App() {
  // Persisted (not just in-memory) so a saved trip survives a page refresh.
  const [favorites, setFavorites] = useLocalStorage('trailmark:favorites', [])

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((f) => f !== id) : [...current, id]
    )
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                destinations={destinations}
                itinerary={itinerary}
                testimonials={testimonials}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/destinations/:id"
            element={
              <DestinationDetail
                destinations={destinations}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
