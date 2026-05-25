const TMDB_IMAGE = 'https://image.tmdb.org/t/p'

export function getPosterUrl(path: string | null, size: 'w342' | 'w500' = 'w342'): string {
  return path
    ? `${TMDB_IMAGE}/${size}${path}`
    : 'https://placehold.co/342x513?text=Sem+Imagem'
}

export function getBackdropUrl(path: string | null, size: 'w780' | 'w1280' = 'w1280'): string {
  return path
    ? `${TMDB_IMAGE}/${size}${path}`
    : 'https://placehold.co/1280x720?text=CineMemoravel'
}

export function getYoutubeThumb(key: string): string {
  return `https://img.youtube.com/vi/${key}/hqdefault.jpg`
}
