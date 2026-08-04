import { useEffect, useState } from 'react'

function readValue(key, initialValue) {
  if (typeof window === 'undefined') return initialValue
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  } catch {
    return initialValue
  }
}

// Small localStorage-backed useState. Falls back to plain in-memory state
// (and warns once) if storage is unavailable — private browsing, quota, etc.
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readValue(key, initialValue))

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.warn(`useLocalStorage: could not persist "${key}"`, err)
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
