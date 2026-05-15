import { describe, it, expect } from 'vitest'
import { authService } from '@/features/auth/services/authService'

describe('authService', () => {
  describe('login', () => {
    it('retorna AuthResponse con credenciales válidas', async () => {
      const result = await authService.login({
        email: 'admin@erp.com',
        password: 'password123',
      })

      expect(result.user.id).toBe('usr-001')
      expect(result.user.email).toBe('admin@erp.com')
      expect(result.user.role).toBe('admin')
      expect(result.token).toBe('mock-jwt-token-abc123')
    })

    it('lanza ApiError con status 401 en credenciales inválidas', async () => {
      await expect(
        authService.login({ email: 'wrong@erp.com', password: 'wrongpass' })
      ).rejects.toMatchObject({
        status: 401,
        message: 'Credenciales inválidas',
      })
    })

    it('lanza ApiError con status 401 si solo la contraseña es incorrecta', async () => {
      await expect(
        authService.login({ email: 'admin@erp.com', password: 'badpassword' })
      ).rejects.toMatchObject({
        status: 401,
        message: 'Credenciales inválidas',
      })
    })
  })

  describe('logout', () => {
    it('resuelve sin error', async () => {
      await expect(authService.logout()).resolves.toBeUndefined()
    })
  })
})
