import { http, HttpResponse } from 'msw'
import type { PaginatedResponse } from '@/shared/types/api'
import type { Equipment, EquipmentStatus, CreateEquipmentDto, UpdateEquipmentDto } from '@/features/equipment/types'
import { EQUIPMENT_TYPES } from '@/features/equipment/types'

const EQUIPMENT_NAMES = [
  'Excavadora CAT 390', 'Camión Komatsu 930E', 'Perforadora Sandvik DT1132i',
  'Cargador WA600', 'Bulldozer D11T', 'Grúa P&H 4100C',
  'Compresor Atlas Copco', 'Bomba Warman 10/8', 'Excavadora Liebherr R 9400',
  'Camión Caterpillar 797F',
]

const STATUSES: EquipmentStatus[] = ['operativo', 'mantenimiento', 'fuera_de_servicio']

const MINE_IDS = ['mine-001', 'mine-002', 'mine-003']

function seedDate(i: number): string {
  const d = new Date('2026-01-01')
  d.setDate(d.getDate() - i * 7)
  return d.toISOString().split('T')[0]
}

function generateInitialEquipment(): Equipment[] {
  return Array.from({ length: 30 }, (_, i) => ({
    id: `equip-${String(i + 1).padStart(3, '0')}`,
    name: EQUIPMENT_NAMES[i % EQUIPMENT_NAMES.length] + (i >= EQUIPMENT_NAMES.length ? ` ${Math.floor(i / EQUIPMENT_NAMES.length) + 1}` : ''),
    type: EQUIPMENT_TYPES[i % EQUIPMENT_TYPES.length],
    serialNumber: `SN-${2024 + (i % 3)}-${String(i + 1).padStart(4, '0')}`,
    status: STATUSES[i % 3],
    mineId: MINE_IDS[i % 3],
    lastMaintenanceDate: seedDate(i),
  }))
}

let equipmentStore: Equipment[] = generateInitialEquipment()

export function resetEquipmentStore() {
  equipmentStore = generateInitialEquipment()
}

export const equipmentHandlers = [
  http.get('/api/equipment', ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') ?? '1', 10)
    const pageSize = parseInt(url.searchParams.get('pageSize') ?? '10', 10)
    const status = url.searchParams.get('status') as EquipmentStatus | null
    const search = url.searchParams.get('search')?.toLowerCase() ?? ''

    let items = [...equipmentStore]

    if (status) {
      items = items.filter((e) => e.status === status)
    }
    if (search) {
      items = items.filter(
        (e) =>
          e.name.toLowerCase().includes(search) ||
          e.serialNumber.toLowerCase().includes(search)
      )
    }

    const total = items.length
    const start = (page - 1) * pageSize
    const data = items.slice(start, start + pageSize)

    const response: PaginatedResponse<Equipment> = { data, total, page, pageSize }
    return HttpResponse.json(response, { status: 200 })
  }),

  http.post('/api/equipment', async ({ request }) => {
    const dto = (await request.json()) as CreateEquipmentDto
    const newItem: Equipment = {
      id: `equip-${Date.now()}`,
      ...dto,
    }
    equipmentStore.unshift(newItem)
    return HttpResponse.json(newItem, { status: 201 })
  }),

  http.patch('/api/equipment/:id', async ({ params, request }) => {
    const { id } = params as { id: string }
    const dto = (await request.json()) as UpdateEquipmentDto
    const idx = equipmentStore.findIndex((e) => e.id === id)
    if (idx === -1) {
      return HttpResponse.json({ message: 'Equipo no encontrado' }, { status: 404 })
    }
    equipmentStore[idx] = { ...equipmentStore[idx], ...dto }
    return HttpResponse.json(equipmentStore[idx], { status: 200 })
  }),

  http.delete('/api/equipment/:id', ({ params }) => {
    const { id } = params as { id: string }
    equipmentStore = equipmentStore.filter((e) => e.id !== id)
    return HttpResponse.json({}, { status: 200 })
  }),
]
