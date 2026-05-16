import { http, HttpResponse } from 'msw'
import type { PaginatedResponse } from '@/shared/types/api'
import type { Shift, ShiftStatus, ShiftType } from '@/features/operations/types'

const OPERATORS = [
  'Carlos Mendoza', 'Ana Torres', 'Luis Herrera', 'María Quispe',
  'Jorge Salas', 'Rosa Flores', 'Pedro Mamani', 'Elena Vargas',
]

const EQUIPMENT = [
  'Excavadora CAT 390', 'Camión Komatsu 930E', 'Perforadora Sandvik',
  'Cargador WA600', 'Bulldozer D11', 'Grúa P&H 4100C',
]

const STATUSES: ShiftStatus[] = ['completado', 'en_progreso', 'cancelado']
const TYPES: ShiftType[] = ['dia', 'noche']

function generateShifts(mineId: string): Shift[] {
  const shifts: Shift[] = []
  const now = new Date()

  for (let i = 0; i < 50; i++) {
    const daysAgo = Math.floor(i / 2)
    const date = new Date(now)
    date.setDate(date.getDate() - daysAgo)
    const dateStr = date.toISOString().split('T')[0]

    shifts.push({
      id: `shift-${mineId}-${i + 1}`,
      mineId,
      date: dateStr,
      type: TYPES[i % 2],
      status: STATUSES[i % 3],
      operator: OPERATORS[i % OPERATORS.length],
      equipment: EQUIPMENT[i % EQUIPMENT.length],
      production: Math.round(800 + (i * 37 + 13) % 400),
    })
  }

  return shifts
}

export const operationsHandlers = [
  http.get('/api/shifts', ({ request }) => {
    const url = new URL(request.url)
    const mineId = url.searchParams.get('mineId') ?? 'mine-001'
    const page = parseInt(url.searchParams.get('page') ?? '1', 10)
    const pageSize = parseInt(url.searchParams.get('pageSize') ?? '10', 10)
    const status = url.searchParams.get('status') as ShiftStatus | null
    const type = url.searchParams.get('type') as ShiftType | null
    const search = url.searchParams.get('search')?.toLowerCase() ?? ''

    let shifts = generateShifts(mineId)

    if (status) {
      shifts = shifts.filter((s) => s.status === status)
    }
    if (type) {
      shifts = shifts.filter((s) => s.type === type)
    }
    if (search) {
      shifts = shifts.filter(
        (s) =>
          s.operator.toLowerCase().includes(search) ||
          s.equipment.toLowerCase().includes(search)
      )
    }

    const total = shifts.length
    const start = (page - 1) * pageSize
    const data = shifts.slice(start, start + pageSize)

    const response: PaginatedResponse<Shift> = { data, total, page, pageSize }
    return HttpResponse.json(response, { status: 200 })
  }),
]
