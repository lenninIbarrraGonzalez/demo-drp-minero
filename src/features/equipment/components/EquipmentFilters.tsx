import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Input } from '@/shared/components/atoms/Input'
import { Button } from '@/shared/components/atoms/Button'
import { Dropdown } from '@/shared/components/molecules/Dropdown'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useEquipmentFiltersStore } from '../store/equipmentFiltersStore'
import type { EquipmentStatus } from '../types'
import { EQUIPMENT_STATUS_LABELS } from '../types'

const STATUS_OPTIONS = [
  { label: 'Todos los estados', value: '' },
  ...Object.entries(EQUIPMENT_STATUS_LABELS).map(([value, label]) => ({ label, value })),
]

const FiltersBar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  flex-wrap: wrap;
  align-items: center;
`

const FilterItem = styled.div`
  flex: 1;
  min-width: 180px;
  max-width: 260px;
`

const SearchItem = styled.div`
  flex: 2;
  min-width: 220px;
`

export function EquipmentFilters() {
  const { status, search, setStatus, setSearch, resetFilters } = useEquipmentFiltersStore()

  const [inputValue, setInputValue] = useState(search)
  const debouncedSearch = useDebounce(inputValue, 300)

  useEffect(() => {
    setSearch(debouncedSearch)
  }, [debouncedSearch, setSearch])

  function handleReset() {
    setInputValue('')
    resetFilters()
  }

  return (
    <FiltersBar>
      <FilterItem>
        <Dropdown
          options={STATUS_OPTIONS}
          value={status}
          onChange={(e) => setStatus(e.target.value as EquipmentStatus | '')}
          aria-label="Filtrar por estado"
        />
      </FilterItem>

      <SearchItem>
        <Input
          placeholder="Buscar por nombre o número de serie..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          aria-label="Buscar equipos"
        />
      </SearchItem>

      <Button variant="ghost" size="sm" onClick={handleReset}>
        Limpiar filtros
      </Button>
    </FiltersBar>
  )
}
