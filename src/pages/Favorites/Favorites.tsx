import { PosterCard } from '../../components/PosterCard/PosterCard'
import { useFavorites } from '../../context/FavoritesContext'
import { HorizontalScroll } from '../../components/HorizontalScroll/HorizontalScroll'
import './Favorites.css'

export function Favorites() {
  const { favorites } = useFavorites()

  return (
    <main className="favorites">
      <h1>Meus favoritos</h1>

      {favorites.length === 0 && (
        <p className="favorites__empty">Você ainda não adicionou filmes favoritos.</p>
      )}

      {favorites.length > 0 && (
        <HorizontalScroll>
          {favorites.map((movie) => (
            <PosterCard key={movie.id} movie={movie} />
          ))}
        </HorizontalScroll>
      )}
    </main>
  )
}
