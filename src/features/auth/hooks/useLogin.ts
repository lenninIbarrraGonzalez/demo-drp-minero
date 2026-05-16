import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { useAuthStore } from '../store/authStore'
import { ROUTES } from '@/app/router/routes'
import type { AuthResponse, LoginCredentials } from '../types'
import type { ApiError } from '@/shared/types/api'

export function useLogin() {
  const navigate = useNavigate()

  return useMutation<AuthResponse, ApiError, LoginCredentials>({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: ({ user, token }) => {
      useAuthStore.getState().login(user, token)
      navigate(ROUTES.DASHBOARD, { replace: true })
    },
  })
}
