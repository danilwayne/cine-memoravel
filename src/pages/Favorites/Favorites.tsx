import { MovieCard } from '../../components/MovieCard/MovieCard'
import { useFavorites } from '../../context/FavoritesContext'
import './Favorites.css'

export function Favorites() {
  const { favorites } = useFavorites()

  return (
    <main className="favorites">
      <h1>Meus favoritos</h1>

      {favorites.length === 0 && <p>Você ainda não adicionou filmes favoritos.</p>}

      <section className="favorites__grid">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </main>
  )
}
