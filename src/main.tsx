import { Component, StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            fontFamily: 'system-ui, sans-serif',
            background: '#fbf7ec',
            color: '#0b1410',
            textAlign: 'center',
            padding: 24,
          }}
        >
          <div>
            <h1 style={{ color: '#16382c' }}>Parkin Pulse</h1>
            <p>Something failed to load. Try a hard refresh (Ctrl+Shift+R).</p>
            <pre style={{ fontSize: 12, whiteSpace: 'pre-wrap' }}>{String(this.state.error)}</pre>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)