import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Spinner } from '@/shared/components/atoms/Spinner'
import { Dropdown } from '@/shared/components/molecules/Dropdown'
import { useMetalPrices } from '../hooks/useMetalPrices'
import { usePriceHistory } from '../hooks/usePriceHistory'
import { useProduction } from '../hooks/useProduction'
import { useMineStore } from '../store/mineStore'
import { KPICard } from './KPICard'
import { PriceChart } from './PriceChart'
import { ProductionChart } from './ProductionChart'
import { METAL_LABELS, type Metal } from '../types'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[4]};
`

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

const MineSelector = styled.div`
  width: 260px;
`

const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`

const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.accent.danger};
  margin: 0;
  text-align: center;
`

const MetalTabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`

const MetalTab = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme, $active }) =>
    $active ? theme.colors.accent.primary : theme.colors.border};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.accent.primary + '22' : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.accent.primary : theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent.primary};
  }
`

export function DashboardPage() {
  const [selectedMetal, setSelectedMetal] = useState<Metal>('gold')
  const { mines, selectedMineId, selectMine } = useMineStore()

  const metalPrices = useMetalPrices()
  const priceHistory = usePriceHistory(selectedMetal, 30)
  const production = useProduction()

  const mineOptions = useMemo(
    () => mines.map((m) => ({ label: m.name, value: m.id })),
    [mines]
  )

  return (
    <Page>
      <TopBar>
        <PageTitle>Dashboard</PageTitle>
        <MineSelector>
          <Dropdown
            options={mineOptions}
            value={selectedMineId}
            onChange={(e) => selectMine(e.target.value)}
            aria-label="Seleccionar mina"
          />
        </MineSelector>
      </TopBar>

      {metalPrices.isLoading && (
        <LoadingWrapper><Spinner size="lg" /></LoadingWrapper>
      )}
      {metalPrices.isError && (
        <LoadingWrapper>
          <ErrorText>Error al cargar precios de metales</ErrorText>
        </LoadingWrapper>
      )}
      {metalPrices.data && (
        <KPIGrid>
          {metalPrices.data.map((mp) => (
            <KPICard
              key={mp.metal}
              metal={mp.metal}
              price={mp.price}
              change24h={mp.change24h}
              changePercent={mp.changePercent}
            />
          ))}
        </KPIGrid>
      )}

      <MetalTabs>
        {(['gold', 'copper', 'lithium'] as Metal[]).map((m) => (
          <MetalTab
            key={m}
            $active={selectedMetal === m}
            onClick={() => setSelectedMetal(m)}
          >
            {METAL_LABELS[m]}
          </MetalTab>
        ))}
      </MetalTabs>

      {priceHistory.isLoading && (
        <LoadingWrapper><Spinner size="lg" /></LoadingWrapper>
      )}
      {priceHistory.isError && (
        <LoadingWrapper>
          <ErrorText>Error al cargar historial de precios</ErrorText>
        </LoadingWrapper>
      )}
      {priceHistory.data && (
        <PriceChart data={priceHistory.data} metal={selectedMetal} />
      )}

      {production.isLoading && (
        <LoadingWrapper><Spinner size="lg" /></LoadingWrapper>
      )}
      {production.isError && (
        <LoadingWrapper>
          <ErrorText>Error al cargar datos de producción</ErrorText>
        </LoadingWrapper>
      )}
      {production.data && (
        <ProductionChart data={production.data} />
      )}
    </Page>
  )
}
