import { describe, it, expect, afterEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from '@/shared/components/organisms/Header'
import { useAuthStore } from '@/features/auth/store/authStore'
import { renderWithProviders } from '../../../utils/renderWithProviders'

const mockUser = {
  id: 'usr-001',
  name: 'Admin Usuario',
  email: 'admin@erp.com',
  role: 'admin' as const,
}

describe('Header', () => {
  afterEach(() => {
    useAuthStore.setState({ user: null, token: null })
  })

  it('renderiza el botón de cerrar sesión', () => {
    renderWithProviders(<Header />)
    expect(screen.getByRole('button', { name: /cerrar sesión/i })).toBeInTheDocument()
  })

  it('muestra el nombre del usuario cuando hay sesión activa', () => {
    useAuthStore.setState({ user: mockUser, token: 'token-test' })
    renderWithProviders(<Header />)
    expect(screen.getByText('Admin Usuario')).toBeInTheDocument()
  })

  it('no muestra nombre de usuario sin sesión', () => {
    renderWithProviders(<Header />)
    expect(screen.queryByText('Admin Usuario')).not.toBeInTheDocument()
  })

  it('limpia el store al hacer logout', async () => {
    const user = userEvent.setup()
    useAuthStore.setState({ user: mockUser, token: 'token-test' })
    renderWithProviders(<Header />)
    await user.click(screen.getByRole('button', { name: /cerrar sesión/i }))
    await waitFor(() => {
      expect(useAuthStore.getState().user).toBeNull()
      expect(useAuthStore.getState().token).toBeNull()
    })
  })
})
