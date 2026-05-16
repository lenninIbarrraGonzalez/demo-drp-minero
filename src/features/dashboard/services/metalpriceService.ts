import axios from 'axios'
import type { Metal, MetalPrice, PriceHistory } from '../types'

const metalpriceClient = axios.create({
  baseURL: 'https://api.metalpriceapi.com/v1',
  timeout: 10000,
})

const API_KEY = import.meta.env.VITE_METAL_API_KEY ?? 'demo'

const METAL_CURRENCY: Record<Metal, string> = {
  gold: 'XAU',
  copper: 'XCU',
  lithium: 'XCU', // lithium no disponible en free tier — se usa mock
}

interface LatestResponse {
  success: boolean
  base: string
  timestamp: number
  rates: Record<string, number>
}

interface TimeframeResponse {
  success: boolean
  base: string
  rates: Record<string, Record<string, number>>
}

const roundPrice = (rate: number): number =>
  Math.round((rate > 0 ? 1 / rate : 0) * 100) / 100

export const metalpriceService = {
  async getCurrentPrices(): Promise<MetalPrice[]> {
    const { data } = await metalpriceClient.get<LatestResponse>('/latest', {
      params: { api_key: API_KEY, base: 'USD', currencies: 'XAU,XCU' },
    })

    const timestamp = new Date(data.timestamp * 1000).toISOString()

    return [
      {
        metal: 'gold',
        price: roundPrice(data.rates['XAU'] ?? 0),
        change24h: 0,
        changePercent: 0,
        timestamp,
      },
      {
        metal: 'copper',
        price: roundPrice(data.rates['XCU'] ?? 0),
        change24h: 0,
        changePercent: 0,
        timestamp,
      },
      {
        metal: 'lithium',
        price: 19850.0,
        change24h: 320.0,
        changePercent: 1.64,
        timestamp,
      },
    ]
  },

  async getHistoricalPrices(metal: Metal, days: number): Promise<PriceHistory[]> {
    const currency = METAL_CURRENCY[metal]
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const format = (d: Date) => d.toISOString().split('T')[0]

    const { data } = await metalpriceClient.get<TimeframeResponse>('/timeframe', {
      params: {
        api_key: API_KEY,
        base: 'USD',
        currencies: currency,
        start_date: format(startDate),
        end_date: format(endDate),
      },
    })

    return Object.entries(data.rates)
      .map(([date, rates]) => ({ date, price: roundPrice(rates[currency] ?? 0) }))
      .sort((a, b) => a.date.localeCompare(b.date))
  },
}
