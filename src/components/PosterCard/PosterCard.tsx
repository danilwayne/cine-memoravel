import { Link } from 'react-router-dom'
import type { Movie } from '../../types/movie'
import { useFavorites } from '../../context/FavoritesContext'
import { getPosterUrl } from '../../utils/images'
import './PosterCard.css'

interface PosterCardProps {
  movie: Movie
}

function formatDate(date: string) {
  if (!date) return 'Data indisponível'

  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date

  return parsed.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function PosterCard({ movie }: PosterCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites()

  return (
    <article className="poster-card">
      <div className="poster-card__media">
        <Link to={`/filme/${movie.id}`}>
          <img
            src={getPosterUrl(movie.poster_path)}
            alt={`Pôster do filme ${movie.title}`}
            loading="lazy"
          />
        </Link>

        <button
          type="button"
          className="poster-card__menu"
          aria-label={
            isFavorite(movie.id)
              ? `Remover ${movie.title} dos favoritos`
              : `Adicionar ${movie.title} aos favoritos`
          }
          onClick={() => toggleFavorite(movie)}
        >
          <span aria-hidden="true">⋯</span>
        </button>
      </div>

      <div className="poster-card__info">
        <h3>
          <Link to={`/filme/${movie.id}`}>{movie.title}</Link>
        </h3>
        <p>{formatDate(movie.release_date)}</p>
      </div>
    </article>
  )
}
