import './Leaderboard.css'

interface Leader {
  rank: number
  name: string
  avatar: string
  totalEdits: number
  weekEdits: number
}

const LEADERS: Leader[] = [
  { rank: 1, name: 'Shei', avatar: 'S', totalEdits: 1923847, weekEdits: 12847 },
  { rank: 2, name: 'raze464', avatar: 'R', totalEdits: 1654321, weekEdits: 9821 },
  { rank: 3, name: 'suzan', avatar: 'Z', totalEdits: 1432109, weekEdits: 7543 },
  { rank: 4, name: 'bayramova', avatar: 'B', totalEdits: 1209876, weekEdits: 6210 },
  { rank: 5, name: 'lilianedutra', avatar: 'L', totalEdits: 987654, weekEdits: 4987 },
  { rank: 6, name: 'Choisie', avatar: 'C', totalEdits: 876543, weekEdits: 4321 },
]

function formatNumber(value: number) {
  return value.toLocaleString('pt-BR')
}

function Bar({
  value,
  max,
  variant,
}: {
  value: number
  max: number
  variant: 'total' | 'week'
}) {
  const width = Math.max(8, Math.round((value / max) * 100))

  return (
    <div className="leaderboard__bar-track">
      <div
        className={`leaderboard__bar leaderboard__bar--${variant}`}
        style={{ width: `${width}%` }}
      />
    </div>
  )
}

export function Leaderboard() {
  const maxTotal = LEADERS[0].totalEdits
  const maxWeek = Math.max(...LEADERS.map((l) => l.weekEdits))

  return (
    <section className="leaderboard">
      <div className="leaderboard__legend">
        <span>
          <i className="leaderboard__dot leaderboard__dot--total" />
          Total de edições
        </span>
        <span>
          <i className="leaderboard__dot leaderboard__dot--week" />
          Edições nesta semana
        </span>
      </div>

      <div className="leaderboard__grid">
        {LEADERS.map((leader) => (
          <article key={leader.rank} className="leaderboard__item">
            <div className="leaderboard__user">
              <span className="leaderboard__avatar">{leader.avatar}</span>
              <strong>
                {leader.rank}. {leader.name}
              </strong>
            </div>

            <div className="leaderboard__stats">
              <div className="leaderboard__stat">
                <Bar value={leader.totalEdits} max={maxTotal} variant="total" />
                <span>{formatNumber(leader.totalEdits)}</span>
              </div>
              <div className="leaderboard__stat">
                <Bar value={leader.weekEdits} max={maxWeek} variant="week" />
                <span>{formatNumber(leader.weekEdits)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
