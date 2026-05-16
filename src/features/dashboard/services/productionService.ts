import apiClient from '@/shared/services/apiClient'
import type { ApiResponse } from '@/shared/types/api'
import type { ProductionMonth } from '../types'

export const productionService = {
  async getMonthlyProduction(mineId: string): Promise<ProductionMonth[]> {
    const response = await apiClient.get<ApiResponse<ProductionMonth[]>>(
      `/production/${mineId}`
    )
    return response.data.data
  },
}
