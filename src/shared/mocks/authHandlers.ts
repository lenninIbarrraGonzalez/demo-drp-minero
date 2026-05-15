import { http, HttpResponse } from 'msw'
import type { AuthResponse, LoginCredentials } from '@/features/auth/types'
import type { ApiResponse } from '@/shared/types/api'

const MOCK_USER = {
  id: 'usr-001',
  name: 'Admin Minero',
  email: 'admin@erp.com',
  role: 'admin' as const,
}

const VALID_CREDENTIALS = {
  email: 'admin@erp.com',
  password: 'password123',
}

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as LoginCredentials

    if (
      body.email !== VALID_CREDENTIALS.email ||
      body.password !== VALID_CREDENTIALS.password
    ) {
      return HttpResponse.json(
        { message: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    const responseBody: ApiResponse<AuthResponse> = {
      data: {
        user: MOCK_USER,
        token: 'mock-jwt-token-abc123',
      },
      message: 'Login exitoso',
    }

    return HttpResponse.json(responseBody, { status: 200 })
  }),

  http.post('/api/auth/logout', () => {
    return HttpResponse.json({ message: 'Logout exitoso' }, { status: 200 })
  }),
]
