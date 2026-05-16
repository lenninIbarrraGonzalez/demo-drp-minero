import apiClient from '@/shared/services/apiClient'
import type { PaginatedResponse } from '@/shared/types/api'
import type { Equipment, EquipmentParams, CreateEquipmentDto, UpdateEquipmentDto } from '../types'

export const equipmentService = {
  async getEquipment(params: EquipmentParams): Promise<PaginatedResponse<Equipment>> {
    const response = await apiClient.get<PaginatedResponse<Equipment>>('/equipment', { params })
    return response.data
  },

  async createEquipment(dto: CreateEquipmentDto): Promise<Equipment> {
    const response = await apiClient.post<Equipment>('/equipment', dto)
    return response.data
  },

  async updateEquipment(id: string, dto: UpdateEquipmentDto): Promise<Equipment> {
    const response = await apiClient.patch<Equipment>(`/equipment/${id}`, dto)
    return response.data
  },

  async deleteEquipment(id: string): Promise<void> {
    await apiClient.delete(`/equipment/${id}`)
  },
}
