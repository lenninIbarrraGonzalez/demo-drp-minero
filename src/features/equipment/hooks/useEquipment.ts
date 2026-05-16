import { useQuery } from '@tanstack/react-query'
import { equipmentService } from '../services/equipmentService'
import { useEquipmentFiltersStore } from '../store/equipmentFiltersStore'
import type { PaginatedResponse, ApiError } from '@/shared/types/api'
import type { Equipment } from '../types'

export function useEquipment() {
  const page = useEquipmentFiltersStore((s) => s.page)
  const pageSize = useEquipmentFiltersStore((s) => s.pageSize)
  const status = useEquipmentFiltersStore((s) => s.status)
  const search = useEquipmentFiltersStore((s) => s.search)

  return useQuery<PaginatedResponse<Equipment>, ApiError>({
    queryKey: ['equipment', page, pageSize, status, search],
    queryFn: () =>
      equipmentService.getEquipment({
        page,
        pageSize,
        status: status || undefined,
        search: search || undefined,
      }),
    staleTime: 5 * 60 * 1000,
  })
}
