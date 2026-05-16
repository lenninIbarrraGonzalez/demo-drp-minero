import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import styled, { useTheme } from 'styled-components'
import type { ProductionMonth } from '../types'

interface ProductionChartProps {
  data: ProductionMonth[]
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
`

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing[4]} 0;
`

const ChartWrapper = styled.div`
  width: 100%;
  height: 240px;
`

export function ProductionChart({ data }: ProductionChartProps) {
  const theme = useTheme()

  const formatMonth = (month: string) => {
    const [, m] = month.split('-')
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    return months[parseInt(m, 10) - 1] ?? m
  }

  const formatTons = (value: number) =>
    value.toLocaleString('es-CL', { maximumFractionDigits: 0 })

  return (
    <Container>
      <Title>Producción mensual (toneladas)</Title>
      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: 8, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} vertical={false} />
            <XAxis
              dataKey="month"
              tickFormatter={formatMonth}
              tick={{ fill: theme.colors.text.secondary, fontSize: 11 }}
              axisLine={{ stroke: theme.colors.border }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatTons}
              tick={{ fill: theme.colors.text.secondary, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={70}
            />
            <Tooltip
              contentStyle={{
                background: theme.colors.bg.hover,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.borderRadius.md,
                color: theme.colors.text.primary,
              }}
              formatter={(value, name) => [
                formatTons(Number(value)) + ' t',
                name === 'production' ? 'Real' : 'Objetivo',
              ]}
              labelFormatter={(label) => formatMonth(String(label))}
            />
            <Legend
              formatter={(value) => (value === 'production' ? 'Real' : 'Objetivo')}
              wrapperStyle={{ color: theme.colors.text.secondary, fontSize: 12 }}
            />
            <Bar dataKey="production" fill={theme.colors.accent.primary} radius={[4, 4, 0, 0]} />
            <Bar dataKey="target" fill={theme.colors.accent.info} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </Container>
  )
}
