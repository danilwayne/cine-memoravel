import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Movie } from '../types/movie'
import { getFavoritesFromStorage, saveFavoritesToStorage } from '../utils/storage'

interface FavoritesContextData {
  favorites: Movie[]
  toggleFavorite: (movie: Movie) => void
  isFavorite: (movieId: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextData | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([])

  useEffect(() => {
    setFavorites(getFavoritesFromStorage())
  }, [])

  useEffect(() => {
    saveFavoritesToStorage(favorites)
  }, [favorites])

  function toggleFavorite(movie: Movie) {
    const alreadyExists = favorites.some((item) => item.id === movie.id)

    if (alreadyExists) {
      setFavorites(favorites.filter((item) => item.id !== movie.id))
      return
    }

    setFavorites([...favorites, movie])
  }

  function isFavorite(movieId: number) {
    return favorites.some((movie) => movie.id === movieId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error('useFavorites precisa estar dentro de FavoritesProvider')
  }

  return context
}
