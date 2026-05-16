export type EquipmentStatus = 'operativo' | 'mantenimiento' | 'fuera_de_servicio'

export const EQUIPMENT_STATUS_LABELS: Record<EquipmentStatus, string> = {
  operativo: 'Operativo',
  mantenimiento: 'En mantenimiento',
  fuera_de_servicio: 'Fuera de servicio',
}

export const EQUIPMENT_TYPES = [
  'Excavadora',
  'Camión',
  'Perforadora',
  'Cargador',
  'Bulldozer',
  'Grúa',
  'Compresor',
  'Bomba',
] as const

export interface Equipment {
  id: string
  name: string
  type: string
  serialNumber: string
  status: EquipmentStatus
  mineId: string
  lastMaintenanceDate: string
}

export interface CreateEquipmentDto {
  name: string
  type: string
  serialNumber: string
  status: EquipmentStatus
  mineId: string
  lastMaintenanceDate: string
}

export type UpdateEquipmentDto = Partial<CreateEquipmentDto>

export interface EquipmentParams {
  page: number
  pageSize: number
  search?: string
  status?: EquipmentStatus
}
