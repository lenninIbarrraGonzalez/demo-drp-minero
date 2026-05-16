import styled from 'styled-components'
import { METAL_LABELS, METAL_UNITS, type Metal } from '../types'

interface KPICardProps {
  metal: Metal
  price: number
  change24h: number
  changePercent: number
}

const Card = styled.div`
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  min-width: 0;
`

const MetalName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const Price = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1;
`

const Unit = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  margin-left: ${({ theme }) => theme.spacing[1]};
`

const Delta = styled.div<{ $positive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme, $positive }) =>
    $positive ? theme.colors.accent.success : theme.colors.accent.danger};
`

export function KPICard({ metal, price, change24h, changePercent }: KPICardProps) {
  const isPositive = change24h >= 0
  const arrow = isPositive ? '▲' : '▼'
  const formattedPrice = price.toLocaleString('es-CL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const formattedChange = Math.abs(change24h).toLocaleString('es-CL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const formattedPercent = Math.abs(changePercent).toFixed(2)

  return (
    <Card data-testid="kpi-card">
      <MetalName>{METAL_LABELS[metal]}</MetalName>
      <div>
        <Price>{formattedPrice}</Price>
        <Unit>{METAL_UNITS[metal]}</Unit>
      </div>
      <Delta $positive={isPositive}>
        {arrow} {formattedChange} ({formattedPercent}%)
      </Delta>
    </Card>
  )
}
