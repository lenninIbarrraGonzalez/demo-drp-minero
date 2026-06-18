import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Mine } from '../types'

const INITIAL_MINES: Mine[] = [
  { id: 'mine-001', name: 'Mina El Teniente', location: 'Rancagua, Chile' },
  { id: 'mine-002', name: 'Mina Escondida', location: 'Antofagasta, Chile' },
  { id: 'mine-003', name: 'Mina Cerro Verde', location: 'Arequipa, Perú' },
]

interface MineState {
  selectedMineId: string
  mines: Mine[]
  selectMine: (id: string) => void
}

export const useMineStore = create<MineState>()(
  devtools(
    (set) => ({
      selectedMineId: INITIAL_MINES[0].id,
      mines: INITIAL_MINES,
      selectMine: (id) => set({ selectedMineId: id }, false, 'mine/selectMine'),
    }),
    { name: 'MineStore' }
  )
)
