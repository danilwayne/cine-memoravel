import { Link } from 'react-router-dom'
import type { Movie } from '../../types/movie'
import { useFavorites } from '../../context/FavoritesContext'
import './MovieCard.css'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites()

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/500x750?text=Sem+Imagem'

  return (
    <article className="movie-card">
      <img src={imageUrl} alt={`Pôster do filme ${movie.title}`} />

      <div className="movie-card__content">
        <h3>{movie.title}</h3>
        <p>Nota: {movie.vote_average.toFixed(1)}</p>

        <div className="movie-card__actions">
          <Link to={`/filme/${movie.id}`}>Detalhes</Link>

          <button type="button" onClick={() => toggleFavorite(movie)}>
            {isFavorite(movie.id) ? 'Remover' : 'Favoritar'}
          </button>
        </div>
      </div>
    </article>
  )
}
