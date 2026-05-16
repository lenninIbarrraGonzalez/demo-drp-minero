import axios from 'axios'

const fredClient = axios.create({
  baseURL: 'https://api.stlouisfed.org/fred',
  timeout: 10000,
})

const API_KEY = import.meta.env.VITE_FRED_API_KEY ?? 'demo'

export interface FredObservation {
  date: string
  value: number
}

interface FredResponse {
  observations: { date: string; value: string }[]
}

export const fredService = {
  async getMiningProductionIndex(): Promise<FredObservation[]> {
    const { data } = await fredClient.get<FredResponse>('/series/observations', {
      params: {
        series_id: 'IPG212S',
        api_key: API_KEY,
        file_type: 'json',
        limit: 12,
        sort_order: 'desc',
      },
    })

    return data.observations
      .filter((obs) => obs.value !== '.')
      .map((obs) => ({
        date: obs.date,
        value: parseFloat(obs.value),
      }))
      .reverse()
  },
}
