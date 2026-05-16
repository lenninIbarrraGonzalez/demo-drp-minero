import { useQuery } from '@tanstack/react-query'
import { metalpriceService } from '../services/metalpriceService'
import type { Metal, PriceHistory } from '../types'
import type { ApiError } from '@/shared/types/api'

export function usePriceHistory(metal: Metal, days: number = 30) {
  return useQuery<PriceHistory[], ApiError>({
    queryKey: ['priceHistory', metal, days],
    queryFn: () => metalpriceService.getHistoricalPrices(metal, days),
    staleTime: 5 * 60 * 1000,
  })
}
