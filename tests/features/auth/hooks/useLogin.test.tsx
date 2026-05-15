import { renderHook, act, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, afterEach } from 'vitest'
import type { ReactNode } from 'react'
import { useLogin } from '@/features/auth/hooks/useLogin'
import { useAuthStore } from '@/features/auth/store/authStore'
import { theme } from '@/app/styles/theme'
import { createTestQueryClient } from '../../../utils/renderWithProviders'

const createWrapper = () => {
  const queryClient = createTestQueryClient()

  return ({ children }: { children: ReactNode }) => (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </QueryClientProvider>
    </MemoryRouter>
  )
}

describe('useLogin', () => {
  afterEach(() => {
    useAuthStore.setState({ user: null, token: null })
  })

  it('inicia en estado idle', () => {
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() })

    expect(result.current.isPending).toBe(false)
    expect(result.current.isError).toBe(false)
    expect(result.current.isSuccess).toBe(false)
  })

  it('guarda usuario y token en el store on success', async () => {
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() })

    act(() => {
      result.current.mutate({ email: 'admin@erp.com', password: 'password123' })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const state = useAuthStore.getState()
    expect(state.user?.email).toBe('admin@erp.com')
    expect(state.token).toBe('mock-jwt-token-abc123')
  })

  it('expone error con status 401 en credenciales inválidas', async () => {
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() })

    act(() => {
      result.current.mutate({ email: 'wrong@erp.com', password: 'badpass' })
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.status).toBe(401)
    expect(result.current.error?.message).toBe('Credenciales inválidas')
  })

  it('no modifica el store on error', async () => {
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() })

    act(() => {
      result.current.mutate({ email: 'wrong@erp.com', password: 'badpass' })
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
  })
})
