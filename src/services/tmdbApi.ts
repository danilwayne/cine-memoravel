import type { Movie, MovieResponse } from '../types/movie'

const BASE_URL = 'https://api.themoviedb.org/3'
const TOKEN = import.meta.env.VITE_TMDB_TOKEN

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
}

async function request<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, options)

  if (!response.ok) {
    throw new Error('Erro ao buscar dados da TMDB API')
  }

  return response.json()
}

export async function getPopularMovies(): Promise<MovieResponse> {
  return request<MovieResponse>('/movie/popular?language=pt-BR&page=1')
}

export async function searchMovies(query: string): Promise<MovieResponse> {
  return request<MovieResponse>(
    `/search/movie?query=${encodeURIComponent(query)}&language=pt-BR&page=1`,
  )
}

export async function getMovieDetails(id: string): Promise<Movie> {
  return request<Movie>(`/movie/${id}?language=pt-BR`)
}
