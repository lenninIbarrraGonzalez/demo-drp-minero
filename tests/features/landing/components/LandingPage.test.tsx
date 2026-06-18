import { describe, it, expect, beforeEach, beforeAll, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { LandingPage } from '@/features/landing/components/LandingPage'
import { useAuthStore } from '@/features/auth/store/authStore'
import { renderWithProviders } from '../../../utils/renderWithProviders'

// framer-motion (whileInView / useInView) usa IntersectionObserver, ausente en jsdom.
beforeAll(() => {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
  vi.stubGlobal('IntersectionObserver', IO)
})

describe('LandingPage', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, token: null })
  })

  it('renderiza el título del hero', () => {
    renderWithProviders(<LandingPage />)
    expect(screen.getByRole('heading', { name: /gestión minera/i })).toBeInTheDocument()
  })

  it('embebe el formulario de login en el hero', () => {
    renderWithProviders(<LandingPage />)
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  it('renderiza secciones de contenido (features y footer)', () => {
    renderWithProviders(<LandingPage />)
    expect(screen.getByText(/operá tu mina de punta a punta/i)).toBeInTheDocument()
    expect(screen.getByText(/demo con fines demostrativos/i)).toBeInTheDocument()
  })

  it('redirige al dashboard si el usuario ya está autenticado', () => {
    useAuthStore.setState({
      user: { id: '1', name: 'Admin', email: 'admin@erp.com', role: 'admin' },
      token: 'tok',
    })
    renderWithProviders(<LandingPage />)
    expect(screen.queryByLabelText(/correo electrónico/i)).not.toBeInTheDocument()
  })
})
