import { Component, type ErrorInfo, type ReactNode } from 'react'
import './ErrorBoundary.css'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Erro na aplicação:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary">
          <h1>Algo deu errado</h1>
          <p>{this.state.message}</p>
          <button type="button" onClick={() => window.location.reload()}>
            Recarregar página
          </button>
        </main>
      )
    }

    return this.props.children
  }
}
