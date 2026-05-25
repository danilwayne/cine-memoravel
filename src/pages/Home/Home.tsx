import { useCallback, useEffect, useState } from 'react'
import type { Movie, TrailerItem } from '../../types/movie'
import {
  getFreeMovies,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrailersFromMovies,
  getTrendingMovies,
  getUpcomingMovies,
  searchMovies,
} from '../../services/tmdbApi'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { SectionHeader } from '../../components/SectionHeader/SectionHeader'
import { HorizontalScroll } from '../../components/HorizontalScroll/HorizontalScroll'
import { PosterCard } from '../../components/PosterCard/PosterCard'
import { TrailerCard } from '../../components/TrailerCard/TrailerCard'
import { Leaderboard } from '../../components/Leaderboard/Leaderboard'
import { getBackdropUrl } from '../../utils/images'
import './Home.css'

type TrendingTab = 'day' | 'week'
type TrailerTab = 'popular' | 'streaming' | 'tv' | 'rent' | 'cinemas'
type PopularTab = 'streaming' | 'tv' | 'rent' | 'cinemas'
type FreeTab = 'movies' | 'tv'

export function Home() {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null)
  const [searchLoading, setSearchLoading] = useState(false)
  const [error, setError] = useState('')

  const [heroBackdrop, setHeroBackdrop] = useState<string | null>(null)

  const [trendingTab, setTrendingTab] = useState<TrendingTab>('day')
  const [trending, setTrending] = useState<Movie[]>([])

  const [trailerTab, setTrailerTab] = useState<TrailerTab>('popular')
  const [trailers, setTrailers] = useState<TrailerItem[]>([])
  const [trailersLoading, setTrailersLoading] = useState(true)

  const [popularTab, setPopularTab] = useState<PopularTab>('streaming')
  const [popular, setPopular] = useState<Movie[]>([])

  const [freeTab, setFreeTab] = useState<FreeTab>('movies')
  const [freeMovies, setFreeMovies] = useState<Movie[]>([])

  const [pageLoading, setPageLoading] = useState(true)

  const loadTrailers = useCallback(async (movies: Movie[]) => {
    setTrailersLoading(true)
    const items = await getTrailersFromMovies(movies)
    setTrailers(items)
    setTrailersLoading(false)
  }, [])

  const loadPopularSection = useCallback(async (tab: PopularTab) => {
    let data: Movie[] = []

    switch (tab) {
      case 'cinemas':
        data = (await getNowPlayingMovies()).results
        break
      case 'rent':
        data = (await getUpcomingMovies()).results
        break
      case 'tv':
        data = (await getTopRatedMovies()).results
        break
      default:
        data = (await getPopularMovies()).results
    }

    setPopular(data)
    return data
  }, [])

  useEffect(() => {
    async function loadInitial() {
      try {
        setPageLoading(true)
        setError('')

        const [trendingData, popularData, freeData] = await Promise.all([
          getTrendingMovies('day'),
          loadPopularSection('streaming'),
          getFreeMovies(),
        ])

        setTrending(trendingData.results)
        setFreeMovies(freeData.results)

        if (trendingData.results[0]?.backdrop_path) {
          setHeroBackdrop(trendingData.results[0].backdrop_path)
        }

        await loadTrailers(popularData)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Não foi possível carregar o conteúdo.',
        )
      } finally {
        setPageLoading(false)
      }
    }

    loadInitial()
  }, [loadPopularSection, loadTrailers])

  useEffect(() => {
    async function loadTrending() {
      try {
        const data = await getTrendingMovies(trendingTab)
        setTrending(data.results)
      } catch {
        /* mantém lista anterior */
      }
    }

    if (!searchResults) {
      loadTrending()
    }
  }, [trendingTab, searchResults])

  useEffect(() => {
    if (searchResults) return

    async function loadPopular() {
      try {
        const data = await loadPopularSection(popularTab)
        if (trailerTab === popularTab || trailerTab === 'popular') {
          await loadTrailers(data)
        }
      } catch {
        /* mantém lista anterior */
      }
    }

    loadPopular()
  }, [popularTab, searchResults, loadPopularSection, loadTrailers, trailerTab])

  useEffect(() => {
    if (searchResults) return

    async function loadTrailersByTab() {
      try {
        let movies: Movie[] = popular

        if (trailerTab === 'popular') {
          movies = (await getPopularMovies()).results
        } else if (trailerTab === 'cinemas') {
          movies = (await getNowPlayingMovies()).results
        } else if (trailerTab === 'rent') {
          movies = (await getUpcomingMovies()).results
        } else if (trailerTab === 'tv') {
          movies = (await getTopRatedMovies()).results
        } else {
          movies = (await getPopularMovies()).results
        }

        await loadTrailers(movies)
      } catch {
        setTrailers([])
        setTrailersLoading(false)
      }
    }

    loadTrailersByTab()
  }, [trailerTab, searchResults, popular, loadTrailers])

  useEffect(() => {
    if (searchResults) return

    async function loadFree() {
      try {
        if (freeTab === 'movies') {
          const data = await getFreeMovies()
          setFreeMovies(data.results)
        } else {
          const data = await getTopRatedMovies()
          setFreeMovies(data.results)
        }
      } catch {
        /* mantém lista anterior */
      }
    }

    loadFree()
  }, [freeTab, searchResults])

  async function handleSearch() {
    if (!search.trim()) {
      setSearchResults(null)
      return
    }

    try {
      setSearchLoading(true)
      setError('')
      const data = await searchMovies(search)
      setSearchResults(data.results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar filmes.')
    } finally {
      setSearchLoading(false)
    }
  }

  const heroStyle = heroBackdrop
    ? {
        backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 0.82) 0%, rgba(3, 37, 65, 0.55) 100%), url(${getBackdropUrl(heroBackdrop)})`,
      }
    : undefined

  return (
    <div className="home">
      <section className="home__hero" style={heroStyle}>
        <div className="home__hero-content">
          <h1>Bem-Vindo(a).</h1>
          <p>
            Milhões de Filmes, Séries e Pessoas para Descobrir. Explore já.
          </p>
          <SearchBar
            variant="hero"
            value={search}
            onChange={setSearch}
            onSubmit={handleSearch}
          />
        </div>
      </section>

      <div className="home__body">
        {error && <p className="home__error">{error}</p>}

        {searchResults !== null ? (
          <section className="home__section">
            <SectionHeader title={`Resultados para "${search}"`} />
            {searchLoading && <p className="home__loading">Buscando...</p>}
            {!searchLoading && searchResults.length === 0 && (
              <p>Nenhum filme encontrado.</p>
            )}
            <HorizontalScroll>
              {searchResults.map((movie) => (
                <PosterCard key={movie.id} movie={movie} />
              ))}
            </HorizontalScroll>
          </section>
        ) : (
          <>
            {pageLoading && (
              <p className="home__loading">Carregando conteúdo...</p>
            )}

            <section className="home__section">
              <SectionHeader
                title="Tendências"
                tabs={[
                  { id: 'day', label: 'Hoje' },
                  { id: 'week', label: 'Nesta Semana' },
                ]}
                activeTab={trendingTab}
                onTabChange={(id) => setTrendingTab(id as TrendingTab)}
              />
              <HorizontalScroll>
                {trending.map((movie) => (
                  <PosterCard key={movie.id} movie={movie} />
                ))}
              </HorizontalScroll>
            </section>

            <section className="home__section home__section--dark">
              <SectionHeader
                title="Últimos Trailers"
                variant="dark"
                tabs={[
                  { id: 'popular', label: 'Popular' },
                  { id: 'streaming', label: 'Streaming' },
                  { id: 'tv', label: 'Na TV' },
                  { id: 'rent', label: 'Para Alugar' },
                  { id: 'cinemas', label: 'Nos Cinemas' },
                ]}
                activeTab={trailerTab}
                onTabChange={(id) => setTrailerTab(id as TrailerTab)}
              />
              {trailersLoading && (
                <p className="home__loading home__loading--dark">
                  Carregando trailers...
                </p>
              )}
              <HorizontalScroll>
                {trailers.map((item) => (
                  <TrailerCard key={`${item.movie.id}-${item.video.key}`} item={item} />
                ))}
              </HorizontalScroll>
            </section>

            <section className="home__section">
              <SectionHeader
                title="Os Mais Populares"
                tabs={[
                  { id: 'streaming', label: 'Streaming' },
                  { id: 'tv', label: 'Na TV' },
                  { id: 'rent', label: 'Para Alugar' },
                  { id: 'cinemas', label: 'Nos Cinemas' },
                ]}
                activeTab={popularTab}
                onTabChange={(id) => setPopularTab(id as PopularTab)}
              />
              <HorizontalScroll>
                {popular.map((movie) => (
                  <PosterCard key={movie.id} movie={movie} />
                ))}
              </HorizontalScroll>
            </section>

            <section className="home__section">
              <SectionHeader
                title="Grátis para Assistir"
                tabs={[
                  { id: 'movies', label: 'Filmes' },
                  { id: 'tv', label: 'TV' },
                ]}
                activeTab={freeTab}
                onTabChange={(id) => setFreeTab(id as FreeTab)}
              />
              <HorizontalScroll>
                {freeMovies.map((movie) => (
                  <PosterCard key={movie.id} movie={movie} />
                ))}
              </HorizontalScroll>
            </section>

            <section className="home__section">
              <SectionHeader title="Líderes" />
              <Leaderboard />
            </section>
          </>
        )}
      </div>
    </div>
  )
}
