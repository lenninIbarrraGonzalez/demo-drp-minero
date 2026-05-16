export type Metal = 'gold' | 'copper' | 'lithium'

export const METAL_LABELS: Record<Metal, string> = {
  gold: 'Oro',
  copper: 'Cobre',
  lithium: 'Litio',
}

export const METAL_UNITS: Record<Metal, string> = {
  gold: 'USD/oz',
  copper: 'USD/t',
  lithium: 'USD/t',
}

export interface MetalPrice {
  metal: Metal
  price: number
  change24h: number
  changePercent: number
  timestamp: string
}

export interface PriceHistory {
  date: string
  price: number
}

export interface ProductionMonth {
  month: string
  production: number
  target: number
  efficiency: number
}

export interface Mine {
  id: string
  name: string
  location: string
}
