import { create } from 'zustand'
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

export const useEquipmentFiltersStore = create<EquipmentFiltersState>((set) => ({
  ...INITIAL_STATE,
  setPage: (page) => set({ page }),
  setStatus: (status) => set({ status, page: 1 }),
  setSearch: (search) => set({ search, page: 1 }),
  resetFilters: () => set(INITIAL_STATE),
}))
