import { useEffect, useState } from 'react'
import type { Movie } from '../../types/movie'
import { getPopularMovies, searchMovies } from '../../services/tmdbApi'
import { MovieCard } from '../../components/MovieCard/MovieCard'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import './Home.css'

export function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadPopularMovies()
  }, [])

  async function loadPopularMovies() {
    try {
      setLoading(true)
      setError('')
      const data = await getPopularMovies()
      setMovies(data.results)
    } catch {
      setError('Não foi possível carregar os filmes.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSearch() {
    if (!search.trim()) {
      loadPopularMovies()
      return
    }

    try {
      setLoading(true)
      setError('')
      const data = await searchMovies(search)
      setMovies(data.results)
    } catch {
      setError('Erro ao buscar filmes.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="home">
      <section className="home__hero">
        <h1>Encontre o filme certo sem perder horas procurando</h1>
        <p>
          Busque filmes, salve favoritos e descubra recomendações para assistir melhor.
        </p>
      </section>

      <SearchBar value={search} onChange={setSearch} onSubmit={handleSearch} />

      {loading && <p>Carregando filmes...</p>}
      {error && <p className="home__error">{error}</p>}

      <section className="home__grid" aria-label="Lista de filmes">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </main>
  )
}
