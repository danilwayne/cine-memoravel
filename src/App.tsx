import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import { MovieDetails } from './pages/MovieDetails/MovieDetails'
import { Favorites } from './pages/Favorites/Favorites'
import { FavoritesProvider } from './context/FavoritesContext'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export function App() {
  return (
    <BrowserRouter basename={basename}>
      <FavoritesProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filme/:id" element={<MovieDetails />} />
          <Route path="/favoritos" element={<Favorites />} />
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  )
}
