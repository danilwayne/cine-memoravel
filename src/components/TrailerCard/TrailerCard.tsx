import type { TrailerItem } from '../../types/movie'
import { getYoutubeThumb } from '../../utils/images'
import './TrailerCard.css'

interface TrailerCardProps {
  item: TrailerItem
}

export function TrailerCard({ item }: TrailerCardProps) {
  const { movie, video } = item
  const youtubeUrl = `https://www.youtube.com/watch?v=${video.key}`

  return (
    <article className="trailer-card">
      <a
        href={youtubeUrl}
        target="_blank"
        rel="noreferrer"
        className="trailer-card__thumb"
      >
        <img
          src={getYoutubeThumb(video.key)}
          alt={`Trailer de ${movie.title}`}
          loading="lazy"
        />
        <span className="trailer-card__play" aria-hidden="true">
          ▶
        </span>
      </a>

      <div className="trailer-card__info">
        <h3>{movie.title}</h3>
        <p>{video.name}</p>
      </div>
    </article>
  )
}
