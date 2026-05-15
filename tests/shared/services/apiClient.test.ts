import MockAdapter from 'axios-mock-adapter'
import apiClient from '@/shared/services/apiClient'

describe('apiClient', () => {
  let mock: MockAdapter

  beforeEach(() => { mock = new MockAdapter(apiClient) })
  afterEach(() => { mock.restore() })

  test('tiene Content-Type application/json configurado', () => {
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json')
  })

  test('tiene Accept application/json configurado', () => {
    expect(apiClient.defaults.headers['Accept']).toBe('application/json')
  })

  test('hace un GET exitoso', async () => {
    mock.onGet('/recursos').reply(200, { id: 1 })
    const response = await apiClient.get('/recursos')
    expect(response.data).toEqual({ id: 1 })
    expect(response.status).toBe(200)
  })

  test('rechaza con ApiError normalizado en error 401', async () => {
    mock.onGet('/protegido').reply(401, { message: 'No autorizado' })
    await expect(apiClient.get('/protegido')).rejects.toMatchObject({
      message: 'No autorizado',
      status: 401,
    })
  })

  test('rechaza con ApiError normalizado en error 500', async () => {
    mock.onGet('/error-servidor').reply(500, { message: 'Error interno' })
    await expect(apiClient.get('/error-servidor')).rejects.toMatchObject({
      message: 'Error interno',
      status: 500,
    })
  })

  test('usa /api como baseURL por defecto', () => {
    expect(apiClient.defaults.baseURL).toBe('/api')
  })
})
