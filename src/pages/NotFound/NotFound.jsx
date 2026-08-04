import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import './NotFound.css'

function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section className="not-found">
          <div className="container not-found__inner">
            <p className="eyebrow">404</p>
            <h1>This trail isn't mapped.</h1>
            <p className="not-found__detail">
              The page you're after doesn't exist — it may have been renamed, or the link was
              typed wrong.
            </p>
            <Link to="/" className="btn btn--primary">
              Back to Trailmark
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default NotFound
