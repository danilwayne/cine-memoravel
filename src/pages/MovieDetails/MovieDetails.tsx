import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Movie } from '../../types/movie'
import { getMovieDetails } from '../../services/tmdbApi'
import { useFavorites } from '../../context/FavoritesContext'
import './MovieDetails.css'

export function MovieDetails() {
  const { id } = useParams()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMovie() {
      if (!id) return

      try {
        const data = await getMovieDetails(id)
        setMovie(data)
      } finally {
        setLoading(false)
      }
    }

    loadMovie()
  }, [id])

  if (loading) return <main className="details">Carregando...</main>
  if (!movie) return <main className="details">Filme não encontrado.</main>

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/500x750?text=Sem+Imagem'

  return (
    <main className="details">
      <section className="details__content">
        <img src={imageUrl} alt={`Pôster do filme ${movie.title}`} />

        <div>
          <h1>{movie.title}</h1>
          <p className="details__rating">Nota: {movie.vote_average.toFixed(1)}</p>
          <p>{movie.overview || 'Sinopse não disponível.'}</p>

          <button type="button" onClick={() => toggleFavorite(movie)}>
            {isFavorite(movie.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          </button>
        </div>
      </section>
    </main>
  )
}
