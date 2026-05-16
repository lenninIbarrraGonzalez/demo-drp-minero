import { describe, it, expect, afterEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { useAuthStore } from '@/features/auth/store/authStore'
import { renderWithProviders } from '../../../utils/renderWithProviders'

describe('LoginForm', () => {
  afterEach(() => {
    useAuthStore.setState({ user: null, token: null })
  })

  it('renderiza el campo correo electrónico', () => {
    renderWithProviders(<LoginForm />)
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
  })

  it('renderiza el campo contraseña', () => {
    renderWithProviders(<LoginForm />)
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
  })

  it('renderiza el botón de iniciar sesión', () => {
    renderWithProviders(<LoginForm />)
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  it('muestra errores required al hacer submit con campos vacíos', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginForm />)

    await user.clear(screen.getByLabelText(/correo electrónico/i))
    await user.clear(screen.getByLabelText(/contraseña/i))
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    expect(await screen.findByText(/el correo es requerido/i)).toBeInTheDocument()
    expect(await screen.findByText(/la contraseña es requerida/i)).toBeInTheDocument()
  })

  it('muestra error de formato de email inválido', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginForm />)

    await user.clear(screen.getByLabelText(/correo electrónico/i))
    await user.type(screen.getByLabelText(/correo electrónico/i), 'notanemail')
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    expect(await screen.findByText(/formato de correo inválido/i)).toBeInTheDocument()
  })

  it('muestra error de contraseña demasiado corta', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginForm />)

    await user.clear(screen.getByLabelText(/contraseña/i))
    await user.type(screen.getByLabelText(/contraseña/i), 'abc')
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    expect(await screen.findByText(/mínimo 6 caracteres/i)).toBeInTheDocument()
  })

  it('muestra mensaje de error de la API en credenciales inválidas', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginForm />)

    await user.clear(screen.getByLabelText(/correo electrónico/i))
    await user.type(screen.getByLabelText(/correo electrónico/i), 'wrong@erp.com')
    await user.clear(screen.getByLabelText(/contraseña/i))
    await user.type(screen.getByLabelText(/contraseña/i), 'wrongpass')
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/credenciales inválidas/i)
    })
  })
})
