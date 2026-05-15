import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '@/features/auth/store/authStore'

const MOCK_USER = {
  id: 'usr-001',
  name: 'Admin Minero',
  email: 'admin@erp.com',
  role: 'admin' as const,
}

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, token: null })
  })

  it('tiene estado inicial correcto', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
  })

  it('login actualiza user y token', () => {
    useAuthStore.getState().login(MOCK_USER, 'test-token')

    const state = useAuthStore.getState()
    expect(state.user).toEqual(MOCK_USER)
    expect(state.token).toBe('test-token')
  })

  it('logout resetea user y token', () => {
    useAuthStore.getState().login(MOCK_USER, 'test-token')
    useAuthStore.getState().logout()

    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
  })

  it('getState permite acceso sin hooks de React', () => {
    expect(typeof useAuthStore.getState().login).toBe('function')
    expect(typeof useAuthStore.getState().logout).toBe('function')
  })
})
