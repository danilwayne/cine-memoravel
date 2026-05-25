import './SearchBar.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  variant?: 'default' | 'hero'
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  variant = 'default',
}: SearchBarProps) {
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onSubmit()
  }

  if (variant === 'hero') {
    return (
      <form className="search search--hero" onSubmit={handleSubmit}>
        <label htmlFor="movie-search" className="visually-hidden">
          Buscar por um filme, série ou pessoa
        </label>
        <input
          id="movie-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Buscar por um filme, série ou pessoa..."
        />
        <button type="submit">Buscar</button>
      </form>
    )
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <label htmlFor="movie-search-default" className="search__label">
        Qual filme você quer encontrar?
      </label>

      <div className="search__group">
        <input
          id="movie-search-default"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ex: Interestelar, Matrix, Batman..."
        />
        <button type="submit">Buscar</button>
      </div>
    </form>
  )
}
