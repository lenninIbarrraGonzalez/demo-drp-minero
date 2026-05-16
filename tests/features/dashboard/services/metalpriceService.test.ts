import { describe, it, expect } from 'vitest'
import { metalpriceService } from '@/features/dashboard/services/metalpriceService'

describe('metalpriceService', () => {
  describe('getCurrentPrices', () => {
    it('retorna un array con 3 metales', async () => {
      const result = await metalpriceService.getCurrentPrices()

      expect(result).toHaveLength(3)
      expect(result.map((m) => m.metal)).toEqual(
        expect.arrayContaining(['gold', 'copper', 'lithium'])
      )
    })

    it('cada elemento tiene la estructura MetalPrice completa', async () => {
      const result = await metalpriceService.getCurrentPrices()

      for (const mp of result) {
        expect(mp).toMatchObject({
          metal: expect.stringMatching(/^(gold|copper|lithium)$/),
          price: expect.any(Number),
          change24h: expect.any(Number),
          changePercent: expect.any(Number),
          timestamp: expect.any(String),
        })
        expect(mp.price).toBeGreaterThan(0)
      }
    })

    it('el precio del oro es mayor que 0', async () => {
      const result = await metalpriceService.getCurrentPrices()
      const gold = result.find((m) => m.metal === 'gold')

      expect(gold).toBeDefined()
      expect(gold!.price).toBeGreaterThan(0)
    })
  })

  describe('getHistoricalPrices', () => {
    it('retorna un array de PriceHistory con 30 entradas para gold', async () => {
      const result = await metalpriceService.getHistoricalPrices('gold', 30)

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
    })

    it('cada elemento tiene date y price', async () => {
      const result = await metalpriceService.getHistoricalPrices('gold', 30)

      for (const entry of result) {
        expect(entry).toMatchObject({
          date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
          price: expect.any(Number),
        })
        expect(entry.price).toBeGreaterThan(0)
      }
    })

    it('las fechas están ordenadas de más antigua a más reciente', async () => {
      const result = await metalpriceService.getHistoricalPrices('gold', 10)

      for (let i = 1; i < result.length; i++) {
        expect(result[i].date >= result[i - 1].date).toBe(true)
      }
    })
  })
})
