import { Link, useLocation } from 'react-router-dom'
import './Header.css'

export function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className={`header ${isHome ? 'header--home' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <span className="header__logo-icon" aria-hidden="true">
            CM
          </span>
          CineMemorável
        </Link>

        <nav className="header__nav" aria-label="Menu principal">
          <Link to="/">Filmes</Link>
          <span className="header__nav-muted">Séries</span>
          <span className="header__nav-muted">Pessoas</span>
          <Link to="/favoritos">Favoritos</Link>
        </nav>

        <div className="header__actions">
          <span className="header__lang">PT</span>
          <button type="button" className="header__login">
            Entrar
          </button>
          <button type="button" className="header__join">
            Junte-se ao CineMemorável
          </button>
        </div>
      </div>
    </header>
  )
}
