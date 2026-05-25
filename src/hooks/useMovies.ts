import { useState } from 'react'
import type { Movie } from '../types/movie'

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return { movies, setMovies, loading, setLoading, error, setError }
}
