import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { describe, it, expect } from 'vitest'
import { KPICard } from '@/features/dashboard/components/KPICard'
import { theme } from '@/app/styles/theme'

const renderCard = (props: Parameters<typeof KPICard>[0]) =>
  render(
    <ThemeProvider theme={theme}>
      <KPICard {...props} />
    </ThemeProvider>
  )

describe('KPICard', () => {
  it('renderiza el nombre del metal en español', () => {
    renderCard({ metal: 'gold', price: 2034.5, change24h: 12.3, changePercent: 0.61 })
    expect(screen.getByText('Oro')).toBeInTheDocument()
  })

  it('renderiza el precio formateado', () => {
    renderCard({ metal: 'copper', price: 8512.0, change24h: -45.2, changePercent: -0.53 })
    expect(screen.getByTestId('kpi-card')).toBeInTheDocument()
    expect(screen.getByText(/8\.512/)).toBeInTheDocument()
  })

  it('muestra flecha ▲ cuando el delta es positivo', () => {
    renderCard({ metal: 'gold', price: 2034.5, change24h: 12.3, changePercent: 0.61 })
    expect(screen.getByText(/▲/)).toBeInTheDocument()
  })

  it('muestra flecha ▼ cuando el delta es negativo', () => {
    renderCard({ metal: 'copper', price: 8512.0, change24h: -45.2, changePercent: -0.53 })
    expect(screen.getByText(/▼/)).toBeInTheDocument()
  })

  it('muestra el porcentaje de cambio', () => {
    renderCard({ metal: 'lithium', price: 19850.0, change24h: 320.0, changePercent: 1.64 })
    expect(screen.getByText(/1\.64%/)).toBeInTheDocument()
  })

  it('renderiza el nombre correcto para cada metal', () => {
    const { rerender } = renderCard({
      metal: 'gold',
      price: 2000,
      change24h: 0,
      changePercent: 0,
    })
    expect(screen.getByText('Oro')).toBeInTheDocument()

    rerender(
      <ThemeProvider theme={theme}>
        <KPICard metal="copper" price={8000} change24h={0} changePercent={0} />
      </ThemeProvider>
    )
    expect(screen.getByText('Cobre')).toBeInTheDocument()

    rerender(
      <ThemeProvider theme={theme}>
        <KPICard metal="lithium" price={20000} change24h={0} changePercent={0} />
      </ThemeProvider>
    )
    expect(screen.getByText('Litio')).toBeInTheDocument()
  })
})
