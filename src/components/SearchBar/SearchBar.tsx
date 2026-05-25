import './SearchBar.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
}

export function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <label htmlFor="movie-search" className="search__label">
        Qual filme você quer encontrar?
      </label>

      <div className="search__group">
        <input
          id="movie-search"
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
