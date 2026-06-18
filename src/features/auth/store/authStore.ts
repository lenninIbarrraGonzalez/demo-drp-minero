import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { User } from '../types'

interface AuthState {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }, false, 'auth/login'),
      logout: () => set({ user: null, token: null }, false, 'auth/logout'),
    }),
    { name: 'AuthStore' }
  )
)
