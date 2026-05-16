import { http, HttpResponse } from 'msw'
import type { ProductionMonth } from '@/features/dashboard/types'
import type { ApiResponse } from '@/shared/types/api'

const BASE_PRICES: Record<string, number> = {
  XAU: 2034.5,
  XCU: 8512.0,
}

function generateProductionData(mineId: string): ProductionMonth[] {
  const baseProduction: Record<string, number> = {
    'mine-001': 12500,
    'mine-002': 9800,
    'mine-003': 15200,
  }
  const base = baseProduction[mineId] ?? 10000
  const months: ProductionMonth[] = []
  const now = new Date()

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const production = Math.round(base * (0.9 + Math.random() * 0.2))
    months.push({
      month,
      production,
      target: base,
      efficiency: Math.round((production / base) * 100),
    })
  }

  return months
}

export const dashboardHandlers = [
  http.get('https://api.metalpriceapi.com/v1/latest', () => {
    return HttpResponse.json({
      success: true,
      base: 'USD',
      timestamp: Math.floor(Date.now() / 1000),
      rates: {
        XAU: 1 / BASE_PRICES.XAU,
        XCU: 1 / BASE_PRICES.XCU,
      },
    })
  }),

  http.get('https://api.metalpriceapi.com/v1/timeframe', ({ request }) => {
    const url = new URL(request.url)
    const currencies = url.searchParams.get('currencies') ?? 'XAU'
    const currency = currencies.split(',')[0]
    const basePrice = BASE_PRICES[currency] ?? 2000

    const startDate = url.searchParams.get('start_date') ?? ''
    const endDate = url.searchParams.get('end_date') ?? ''
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 86400000)
    const end = endDate ? new Date(endDate) : new Date()
    const days = Math.ceil((end.getTime() - start.getTime()) / 86400000)

    const rates: Record<string, Record<string, number>> = {}
    for (let i = 0; i < days; i++) {
      const d = new Date(start)
      d.setDate(d.getDate() + i)
      const dateStr = d.toISOString().split('T')[0]
      const variation = (Math.random() - 0.5) * basePrice * 0.02
      rates[dateStr] = { [currency]: 1 / (basePrice + variation) }
    }

    return HttpResponse.json({ success: true, base: 'USD', rates })
  }),

  http.get('https://api.stlouisfed.org/fred/series/observations', () => {
    const observations = []
    const now = new Date()

    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      observations.push({
        date: date.toISOString().split('T')[0],
        value: String(Math.round(95 + Math.random() * 15)),
      })
    }

    return HttpResponse.json({
      realtime_start: '2024-01-01',
      realtime_end: '2024-12-31',
      observation_start: '2024-01-01',
      observation_end: '2024-12-31',
      units: 'Index 2017=100',
      output_type: 1,
      file_type: 'json',
      order_by: 'observation_date',
      sort_order: 'desc',
      count: 12,
      offset: 0,
      limit: 12,
      observations,
    })
  }),

  http.get('/api/production/:mineId', ({ params }) => {
    const mineId = params.mineId as string
    const data = generateProductionData(mineId)
    const response: ApiResponse<ProductionMonth[]> = { data }
    return HttpResponse.json(response, { status: 200 })
  }),
]
