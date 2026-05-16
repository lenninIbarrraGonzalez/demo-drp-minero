import { describe, it, expect, beforeEach } from 'vitest'
import { equipmentService } from '@/features/equipment/services/equipmentService'
import { resetEquipmentStore } from '@/shared/mocks/equipmentHandlers'

describe('equipmentService', () => {
  beforeEach(() => {
    resetEquipmentStore()
  })

  describe('getEquipment', () => {
    it('retorna PaginatedResponse con la estructura correcta', async () => {
      const result = await equipmentService.getEquipment({ page: 1, pageSize: 10 })

      expect(result).toMatchObject({
        data: expect.any(Array),
        total: expect.any(Number),
        page: 1,
        pageSize: 10,
      })
    })

    it('cada equipo tiene todos los campos requeridos', async () => {
      const result = await equipmentService.getEquipment({ page: 1, pageSize: 10 })

      expect(result.data.length).toBeGreaterThan(0)

      for (const eq of result.data) {
        expect(eq).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          type: expect.any(String),
          serialNumber: expect.any(String),
          status: expect.stringMatching(/^(operativo|mantenimiento|fuera_de_servicio)$/),
          mineId: expect.any(String),
          lastMaintenanceDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
        })
      }
    })

    it('respeta el pageSize', async () => {
      const result = await equipmentService.getEquipment({ page: 1, pageSize: 5 })

      expect(result.data).toHaveLength(5)
      expect(result.pageSize).toBe(5)
    })

    it('la página 2 tiene datos distintos a la página 1', async () => {
      const page1 = await equipmentService.getEquipment({ page: 1, pageSize: 10 })
      const page2 = await equipmentService.getEquipment({ page: 2, pageSize: 10 })

      const ids1 = page1.data.map((e) => e.id)
      const ids2 = page2.data.map((e) => e.id)
      expect(ids1).not.toEqual(ids2)
    })

    it('filtrar por status devuelve solo equipos con ese estado', async () => {
      const result = await equipmentService.getEquipment({
        page: 1,
        pageSize: 30,
        status: 'operativo',
      })

      for (const eq of result.data) {
        expect(eq.status).toBe('operativo')
      }
    })
  })

  describe('createEquipment', () => {
    it('retorna el equipo creado con id generado', async () => {
      const dto = {
        name: 'Excavadora Nueva',
        type: 'Excavadora',
        serialNumber: 'SN-TEST-001',
        status: 'operativo' as const,
        mineId: 'mine-001',
        lastMaintenanceDate: '2026-05-01',
      }

      const result = await equipmentService.createEquipment(dto)

      expect(result).toMatchObject({
        id: expect.any(String),
        ...dto,
      })
      expect(result.id).toBeTruthy()
    })

    it('el equipo creado aparece en el listado', async () => {
      const dto = {
        name: 'Perforadora Especial',
        type: 'Perforadora',
        serialNumber: 'SN-SPEC-999',
        status: 'mantenimiento' as const,
        mineId: 'mine-002',
        lastMaintenanceDate: '2026-04-15',
      }

      await equipmentService.createEquipment(dto)

      const list = await equipmentService.getEquipment({ page: 1, pageSize: 50 })
      const found = list.data.find((e) => e.serialNumber === 'SN-SPEC-999')
      expect(found).toBeDefined()
      expect(found?.name).toBe('Perforadora Especial')
    })
  })

  describe('updateEquipment', () => {
    it('retorna el equipo con el campo modificado', async () => {
      const list = await equipmentService.getEquipment({ page: 1, pageSize: 5 })
      const first = list.data[0]

      const result = await equipmentService.updateEquipment(first.id, { status: 'fuera_de_servicio' })

      expect(result.id).toBe(first.id)
      expect(result.status).toBe('fuera_de_servicio')
    })
  })

  describe('deleteEquipment', () => {
    it('resuelve sin error', async () => {
      const list = await equipmentService.getEquipment({ page: 1, pageSize: 5 })
      const first = list.data[0]

      await expect(equipmentService.deleteEquipment(first.id)).resolves.toBeUndefined()
    })

    it('el equipo eliminado ya no aparece en el listado', async () => {
      const list = await equipmentService.getEquipment({ page: 1, pageSize: 5 })
      const first = list.data[0]

      await equipmentService.deleteEquipment(first.id)

      const listAfter = await equipmentService.getEquipment({ page: 1, pageSize: 50 })
      const found = listAfter.data.find((e) => e.id === first.id)
      expect(found).toBeUndefined()
    })
  })
})
