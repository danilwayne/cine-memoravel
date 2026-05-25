import type { Movie } from '../types/movie'

const FAVORITES_KEY = 'cine-memoravel:favorites'

export function getFavoritesFromStorage(): Movie[] {
  const data = localStorage.getItem(FAVORITES_KEY)
  return data ? (JSON.parse(data) as Movie[]) : []
}

export function saveFavoritesToStorage(movies: Movie[]): void {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(movies))
}
