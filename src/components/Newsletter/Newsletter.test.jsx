import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import Newsletter from './Newsletter.jsx'

describe('Newsletter', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('shows a validation error for an invalid email and does not submit', async () => {
    const user = userEvent.setup()
    render(<Newsletter />)

    await user.type(screen.getByLabelText(/email address/i), 'not-an-email')
    await user.click(screen.getByRole('button', { name: 'Subscribe' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/valid email/i)
  })

  it('submits successfully for a valid, new email', async () => {
    const user = userEvent.setup()
    render(<Newsletter />)

    await user.type(screen.getByLabelText(/email address/i), 'traveler@example.com')
    await user.click(screen.getByRole('button', { name: 'Subscribe' }))

    expect(screen.getByRole('button', { name: /subscribing/i })).toBeDisabled()

    expect(await screen.findByRole('status', {}, { timeout: 3000 })).toHaveTextContent(
      /you're on the list/i
    )
    expect(JSON.parse(window.localStorage.getItem('trailmark:subscribers'))).toEqual([
      'traveler@example.com',
    ])
  })

  it('rejects an email that has already subscribed', async () => {
    window.localStorage.setItem('trailmark:subscribers', JSON.stringify(['already@example.com']))
    const user = userEvent.setup()
    render(<Newsletter />)

    await user.type(screen.getByLabelText(/email address/i), 'already@example.com')
    await user.click(screen.getByRole('button', { name: 'Subscribe' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/already on the list/i)
  })
})
