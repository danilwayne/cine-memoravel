import { Link } from 'react-router-dom'
import './Header.css'

export function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          CineMemorável
        </Link>

        <nav className="header__nav" aria-label="Menu principal">
          <Link to="/">Início</Link>
          <Link to="/favoritos">Favoritos</Link>
        </nav>
      </div>
    </header>
  )
}
