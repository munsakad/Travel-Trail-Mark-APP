import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Button from './Button.jsx'

describe('Button', () => {
  it('renders children and applies the variant class', () => {
    render(<Button variant="outline">Click me</Button>)
    const btn = screen.getByRole('button', { name: 'Click me' })
    expect(btn).toHaveClass('btn--outline')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Go</Button>)
    await userEvent.click(screen.getByRole('button', { name: 'Go' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled and unclickable when disabled is true', async () => {
    const onClick = vi.fn()
    render(
      <Button onClick={onClick} disabled>
        Go
      </Button>
    )
    const btn = screen.getByRole('button', { name: 'Go' })
    expect(btn).toBeDisabled()
    await userEvent.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders as a link when as="a"', () => {
    render(
      <Button as="a" href="/somewhere">
        Link button
      </Button>
    )
    const link = screen.getByRole('link', { name: 'Link button' })
    expect(link).toHaveAttribute('href', '/somewhere')
  })
})
