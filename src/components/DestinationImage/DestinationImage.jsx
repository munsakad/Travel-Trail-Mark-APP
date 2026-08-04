import { useState } from 'react'
import './DestinationImage.css'

// Destination photos are hotlinked from Unsplash — fine for a demo, but a
// broken/expired URL shouldn't leave a blank box in a real deployment.
function DestinationImage({ src, name, country, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={`dest-image-fallback ${className}`} role="img" aria-label={`${name}, ${country}`}>
        <span>{name}</span>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={src}
      alt={`${name}, ${country}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default DestinationImage
