import apiClient from '@/shared/services/apiClient'
import type { PaginatedResponse } from '@/shared/types/api'
import type { Shift, ShiftParams } from '../types'

export const shiftsService = {
  async getShifts(params: ShiftParams): Promise<PaginatedResponse<Shift>> {
    const response = await apiClient.get<PaginatedResponse<Shift>>('/shifts', { params })
    return response.data
  },
}
