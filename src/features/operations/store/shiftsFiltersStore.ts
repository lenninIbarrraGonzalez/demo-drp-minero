import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { ShiftStatus, ShiftType } from '../types'

interface ShiftsFiltersState {
  page: number
  pageSize: number
  status: ShiftStatus | ''
  type: ShiftType | ''
  search: string
  setPage: (page: number) => void
  setStatus: (status: ShiftStatus | '') => void
  setType: (type: ShiftType | '') => void
  setSearch: (search: string) => void
  resetFilters: () => void
}

const INITIAL_STATE = {
  page: 1,
  pageSize: 10,
  status: '' as ShiftStatus | '',
  type: '' as ShiftType | '',
  search: '',
}

export const useShiftsFiltersStore = create<ShiftsFiltersState>()(
  devtools(
    (set) => ({
      ...INITIAL_STATE,
      setPage: (page) => set({ page }, false, 'shifts/setPage'),
      setStatus: (status) => set({ status, page: 1 }, false, 'shifts/setStatus'),
      setType: (type) => set({ type, page: 1 }, false, 'shifts/setType'),
      setSearch: (search) => set({ search, page: 1 }, false, 'shifts/setSearch'),
      resetFilters: () => set(INITIAL_STATE, false, 'shifts/resetFilters'),
    }),
    { name: 'ShiftsFiltersStore' }
  )
)
