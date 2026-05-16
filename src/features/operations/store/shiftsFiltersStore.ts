import { create } from 'zustand'
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

export const useShiftsFiltersStore = create<ShiftsFiltersState>((set) => ({
  ...INITIAL_STATE,
  setPage: (page) => set({ page }),
  setStatus: (status) => set({ status, page: 1 }),
  setType: (type) => set({ type, page: 1 }),
  setSearch: (search) => set({ search, page: 1 }),
  resetFilters: () => set(INITIAL_STATE),
}))
