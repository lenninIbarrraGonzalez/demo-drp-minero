import apiClient from '@/shared/services/apiClient'
import type { ApiResponse } from '@/shared/types/api'
import type { AuthResponse, LoginCredentials } from '../types'

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      credentials
    )
    return response.data.data
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  },
}
