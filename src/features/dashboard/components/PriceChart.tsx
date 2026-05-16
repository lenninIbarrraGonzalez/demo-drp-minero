import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import styled, { useTheme } from 'styled-components'
import { METAL_LABELS, type Metal, type PriceHistory } from '../types'

interface PriceChartProps {
  data: PriceHistory[]
  metal: Metal
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

export function PriceChart({ data, metal }: PriceChartProps) {
  const theme = useTheme()

  const formatDate = (date: string) => {
    const [, month, day] = date.split('-')
    return `${day}/${month}`
  }

  const formatPrice = (value: number) =>
    value.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

  return (
    <Container>
      <Title>Historial de precio — {METAL_LABELS[metal]}</Title>
      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 8, left: 8, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fill: theme.colors.text.secondary, fontSize: 11 }}
              axisLine={{ stroke: theme.colors.border }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tickFormatter={formatPrice}
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
              formatter={(value) => [formatPrice(Number(value)), 'Precio USD']}
              labelFormatter={(label) => formatDate(String(label))}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={theme.colors.accent.primary}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: theme.colors.accent.primary }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </Container>
  )
}
