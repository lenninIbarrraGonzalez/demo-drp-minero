import { useQuery } from '@tanstack/react-query'
import { shiftsService } from '../services/shiftsService'
import { useShiftsFiltersStore } from '../store/shiftsFiltersStore'
import { useMineStore } from '@/features/dashboard/store/mineStore'
import type { PaginatedResponse } from '@/shared/types/api'
import type { ApiError } from '@/shared/types/api'
import type { Shift } from '../types'

export function useShifts() {
  const page = useShiftsFiltersStore((s) => s.page)
  const pageSize = useShiftsFiltersStore((s) => s.pageSize)
  const status = useShiftsFiltersStore((s) => s.status)
  const type = useShiftsFiltersStore((s) => s.type)
  const search = useShiftsFiltersStore((s) => s.search)
  const selectedMineId = useMineStore((s) => s.selectedMineId)

  return useQuery<PaginatedResponse<Shift>, ApiError>({
    queryKey: ['shifts', selectedMineId, page, pageSize, status, type, search],
    queryFn: () =>
      shiftsService.getShifts({
        mineId: selectedMineId,
        page,
        pageSize,
        status: status || undefined,
        type: type || undefined,
        search: search || undefined,
      }),
    staleTime: 5 * 60 * 1000,
  })
}
