import { useEffect, useRef, useState } from 'react'
import Button from '../Button/Button.jsx'
import useLocalStorage from '../../hooks/useLocalStorage.js'
import './Newsletter.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Stand-in for network latency — there's no real email service behind this
// form, but the loading/duplicate/error states should behave like there is.
const FAKE_SUBMIT_DELAY_MS = 700

function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success
  const [error, setError] = useState('')
  const [subscribers, setSubscribers] = useLocalStorage('trailmark:subscribers', [])
  const mountedRef = useRef(true)

  useEffect(() => {
    // Re-arm on every mount, not just the first — StrictMode's dev-mode
    // mount/cleanup/remount cycle would otherwise leave this stuck at
    // false forever, since only the cleanup ran a second time.
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = email.trim().toLowerCase()

    if (!EMAIL_RE.test(trimmed)) {
      setError('Enter a valid email address.')
      return
    }

    if (subscribers.includes(trimmed)) {
      setError("That email's already on the list.")
      return
    }

    setError('')
    setStatus('loading')

    setTimeout(() => {
      if (!mountedRef.current) return
      setSubscribers((current) => [...current, trimmed])
      setStatus('success')
    }, FAKE_SUBMIT_DELAY_MS)
  }

  return (
    <section id="newsletter" className="newsletter">
      <div className="container newsletter__inner">
        <div>
          <p className="eyebrow" style={{ color: 'var(--color-ochre-light)' }}>
            Field dispatches
          </p>
          <h2 className="newsletter__heading">Get one new route in your inbox each month.</h2>
          <p className="newsletter__sub">No blasts, no upsells — just the next place we're mapping.</p>
        </div>

        {status === 'success' ? (
          <p className="newsletter__success" role="status">
            You're on the list — first dispatch goes out next month.
          </p>
        ) : (
          <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
            <div className="newsletter__field">
              <label htmlFor="newsletter-email" className="visually-hidden">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                disabled={status === 'loading'}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'newsletter-error' : undefined}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError('')
                }}
              />
              {error && (
                <p className="newsletter__error" id="newsletter-error" role="alert">
                  {error}
                </p>
              )}
            </div>
            <Button type="submit" variant="primary" disabled={status === 'loading'}>
              {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}

export default Newsletter
