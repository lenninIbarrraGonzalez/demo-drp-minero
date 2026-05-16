export type ShiftStatus = 'completado' | 'en_progreso' | 'cancelado'
export type ShiftType = 'dia' | 'noche'

export const SHIFT_STATUS_LABELS: Record<ShiftStatus, string> = {
  completado: 'Completado',
  en_progreso: 'En progreso',
  cancelado: 'Cancelado',
}

export const SHIFT_TYPE_LABELS: Record<ShiftType, string> = {
  dia: 'Día',
  noche: 'Noche',
}

export interface Shift {
  id: string
  mineId: string
  date: string
  type: ShiftType
  status: ShiftStatus
  operator: string
  equipment: string
  production: number
}

export interface ShiftParams {
  mineId: string
  page: number
  pageSize: number
  status?: ShiftStatus
  type?: ShiftType
  search?: string
}
