import { Component } from 'react'
import './ErrorBoundary.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Trailmark crashed:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary">
          <div className="container error-boundary__inner">
            <p className="eyebrow">Something went wrong</p>
            <h1>The route lost its signal.</h1>
            <p className="error-boundary__detail">
              An unexpected error broke this page. Reloading usually fixes it.
            </p>
            <button
              className="btn btn--primary"
              onClick={() => {
                this.setState({ error: null })
                window.location.assign('/')
              }}
            >
              Back to safety
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
