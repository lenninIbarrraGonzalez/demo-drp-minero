import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { EquipmentStatus } from '../types'

interface EquipmentFiltersState {
  page: number
  pageSize: number
  status: EquipmentStatus | ''
  search: string
  setPage: (page: number) => void
  setStatus: (status: EquipmentStatus | '') => void
  setSearch: (search: string) => void
  resetFilters: () => void
}

const INITIAL_STATE = {
  page: 1,
  pageSize: 10,
  status: '' as EquipmentStatus | '',
  search: '',
}

export const useEquipmentFiltersStore = create<EquipmentFiltersState>()(
  devtools(
    (set) => ({
      ...INITIAL_STATE,
      setPage: (page) => set({ page }, false, 'equipment/setPage'),
      setStatus: (status) => set({ status, page: 1 }, false, 'equipment/setStatus'),
      setSearch: (search) => set({ search, page: 1 }, false, 'equipment/setSearch'),
      resetFilters: () => set(INITIAL_STATE, false, 'equipment/resetFilters'),
    }),
    { name: 'EquipmentFiltersStore' }
  )
)
