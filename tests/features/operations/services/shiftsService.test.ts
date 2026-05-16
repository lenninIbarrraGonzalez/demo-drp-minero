import { describe, it, expect } from 'vitest'
import { shiftsService } from '@/features/operations/services/shiftsService'

describe('shiftsService', () => {
  describe('getShifts', () => {
    it('retorna PaginatedResponse con la estructura correcta', async () => {
      const result = await shiftsService.getShifts({
        mineId: 'mine-001',
        page: 1,
        pageSize: 10,
      })

      expect(result).toMatchObject({
        data: expect.any(Array),
        total: expect.any(Number),
        page: 1,
        pageSize: 10,
      })
    })

    it('cada turno tiene todos los campos requeridos', async () => {
      const result = await shiftsService.getShifts({
        mineId: 'mine-001',
        page: 1,
        pageSize: 10,
      })

      expect(result.data.length).toBeGreaterThan(0)

      for (const shift of result.data) {
        expect(shift).toMatchObject({
          id: expect.any(String),
          mineId: 'mine-001',
          date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
          type: expect.stringMatching(/^(dia|noche)$/),
          status: expect.stringMatching(/^(completado|en_progreso|cancelado)$/),
          operator: expect.any(String),
          equipment: expect.any(String),
          production: expect.any(Number),
        })
      }
    })

    it('respeta el pageSize y retorna solo los turnos de esa página', async () => {
      const result = await shiftsService.getShifts({
        mineId: 'mine-001',
        page: 1,
        pageSize: 5,
      })

      expect(result.data).toHaveLength(5)
      expect(result.pageSize).toBe(5)
    })

    it('la página 2 tiene datos distintos a la página 1', async () => {
      const page1 = await shiftsService.getShifts({
        mineId: 'mine-001',
        page: 1,
        pageSize: 10,
      })
      const page2 = await shiftsService.getShifts({
        mineId: 'mine-001',
        page: 2,
        pageSize: 10,
      })

      const ids1 = page1.data.map((s) => s.id)
      const ids2 = page2.data.map((s) => s.id)
      expect(ids1).not.toEqual(ids2)
    })

    it('filtrar por status devuelve solo turnos con ese estado', async () => {
      const result = await shiftsService.getShifts({
        mineId: 'mine-001',
        page: 1,
        pageSize: 50,
        status: 'completado',
      })

      for (const shift of result.data) {
        expect(shift.status).toBe('completado')
      }
    })

    it('filtrar por tipo devuelve solo turnos de ese tipo', async () => {
      const result = await shiftsService.getShifts({
        mineId: 'mine-001',
        page: 1,
        pageSize: 50,
        type: 'noche',
      })

      for (const shift of result.data) {
        expect(shift.type).toBe('noche')
      }
    })
  })
})
