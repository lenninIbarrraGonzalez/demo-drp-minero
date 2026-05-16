import { useQuery } from '@tanstack/react-query'
import { productionService } from '../services/productionService'
import { useMineStore } from '../store/mineStore'
import type { ProductionMonth } from '../types'
import type { ApiError } from '@/shared/types/api'

export function useProduction() {
  const selectedMineId = useMineStore((state) => state.selectedMineId)

  return useQuery<ProductionMonth[], ApiError>({
    queryKey: ['production', selectedMineId],
    queryFn: () => productionService.getMonthlyProduction(selectedMineId),
    staleTime: 10 * 60 * 1000,
  })
}
