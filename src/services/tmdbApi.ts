import type {
  Movie,
  MovieResponse,
  TrailerItem,
  VideosResponse,
} from '../types/movie'

const BASE_URL = 'https://api.themoviedb.org/3'
const RAW_TOKEN = import.meta.env.VITE_TMDB_TOKEN?.trim() ?? ''

function resolveAuth() {
  if (!RAW_TOKEN) {
    return { mode: 'missing' as const }
  }

  const jwtIndex = RAW_TOKEN.indexOf('eyJ')
  if (jwtIndex >= 0) {
    return { mode: 'bearer' as const, token: RAW_TOKEN.slice(jwtIndex) }
  }

  if (/^[a-f0-9]{32}$/i.test(RAW_TOKEN)) {
    return { mode: 'api_key' as const, token: RAW_TOKEN }
  }

  return { mode: 'bearer' as const, token: RAW_TOKEN }
}

const auth = resolveAuth()

function buildUrl(endpoint: string): string {
  const url = `${BASE_URL}${endpoint}`

  if (auth.mode === 'api_key') {
    const separator = endpoint.includes('?') ? '&' : '?'
    return `${url}${separator}api_key=${auth.token}`
  }

  return url
}

function buildHeaders(): HeadersInit {
  if (auth.mode === 'bearer') {
    return {
      accept: 'application/json',
      Authorization: `Bearer ${auth.token}`,
    }
  }

  return { accept: 'application/json' }
}

async function request<T>(endpoint: string): Promise<T> {
  if (auth.mode === 'missing') {
    throw new Error(
      'Token TMDB não configurado. Crie um arquivo .env com VITE_TMDB_TOKEN.',
    )
  }

  const response = await fetch(buildUrl(endpoint), {
    method: 'GET',
    headers: buildHeaders(),
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        'Token TMDB inválido. Use só o "API Read Access Token" (começa com eyJ) no .env.',
      )
    }

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

export async function getTrendingMovies(
  window: 'day' | 'week' = 'day',
): Promise<MovieResponse> {
  return request<MovieResponse>(
    `/trending/movie/${window}?language=pt-BR`,
  )
}

export async function getNowPlayingMovies(): Promise<MovieResponse> {
  return request<MovieResponse>('/movie/now_playing?language=pt-BR&page=1')
}

export async function getUpcomingMovies(): Promise<MovieResponse> {
  return request<MovieResponse>('/movie/upcoming?language=pt-BR&page=1')
}

export async function getTopRatedMovies(): Promise<MovieResponse> {
  return request<MovieResponse>('/movie/top_rated?language=pt-BR&page=1')
}

export async function getFreeMovies(): Promise<MovieResponse> {
  return request<MovieResponse>(
    '/discover/movie?language=pt-BR&watch_region=BR&with_watch_monetization_types=free&sort_by=popularity.desc&page=1',
  )
}

export async function getMovieVideos(movieId: number): Promise<VideosResponse> {
  return request<VideosResponse>(
    `/movie/${movieId}/videos?language=pt-BR`,
  )
}

export async function getTrailersFromMovies(
  movies: Movie[],
): Promise<TrailerItem[]> {
  const slice = movies.slice(0, 10)

  const results = await Promise.all(
    slice.map(async (movie) => {
      try {
        const videos = await getMovieVideos(movie.id)
        const trailer = videos.results.find(
          (item) => item.type === 'Trailer' && item.site === 'YouTube',
        )

        if (!trailer) return null

        return { movie, video: trailer }
      } catch {
        return null
      }
    }),
  )

  return results.filter((item): item is TrailerItem => item !== null)
}
