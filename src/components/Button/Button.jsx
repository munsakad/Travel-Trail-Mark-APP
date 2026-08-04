import './Button.css'

/**
 * Reusable Button — used across Navbar, Hero, DestinationCard, and Newsletter.
 * variant: 'primary' | 'outline' | 'ghost'
 */
function Button({
  children,
  variant = 'primary',
  as = 'button',
  href,
  onClick,
  type = 'button',
  ariaLabel,
  disabled = false,
}) {
  const className = `btn btn--${variant}`

  if (as === 'a') {
    return (
      <a className={className} href={href} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }

  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
