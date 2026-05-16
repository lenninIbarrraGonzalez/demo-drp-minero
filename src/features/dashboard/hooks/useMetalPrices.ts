import { useQuery } from '@tanstack/react-query'
import { metalpriceService } from '../services/metalpriceService'
import type { MetalPrice } from '../types'
import type { ApiError } from '@/shared/types/api'

export function useMetalPrices() {
  return useQuery<MetalPrice[], ApiError>({
    queryKey: ['metalPrices'],
    queryFn: () => metalpriceService.getCurrentPrices(),
    staleTime: 5 * 60 * 1000,
  })
}
