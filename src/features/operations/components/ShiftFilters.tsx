import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Input } from '@/shared/components/atoms/Input'
import { Button } from '@/shared/components/atoms/Button'
import { Dropdown } from '@/shared/components/molecules/Dropdown'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useShiftsFiltersStore } from '../store/shiftsFiltersStore'
import type { ShiftStatus, ShiftType } from '../types'

const STATUS_OPTIONS = [
  { label: 'Todos los estados', value: '' },
  { label: 'Completado', value: 'completado' },
  { label: 'En progreso', value: 'en_progreso' },
  { label: 'Cancelado', value: 'cancelado' },
]

const TYPE_OPTIONS = [
  { label: 'Todos los turnos', value: '' },
  { label: 'Turno día', value: 'dia' },
  { label: 'Turno noche', value: 'noche' },
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
  max-width: 240px;
`

const SearchItem = styled.div`
  flex: 2;
  min-width: 220px;
`

export function ShiftFilters() {
  const { status, type, search, setStatus, setType, setSearch, resetFilters } =
    useShiftsFiltersStore()

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
          onChange={(e) => setStatus(e.target.value as ShiftStatus | '')}
          aria-label="Filtrar por estado"
        />
      </FilterItem>

      <FilterItem>
        <Dropdown
          options={TYPE_OPTIONS}
          value={type}
          onChange={(e) => setType(e.target.value as ShiftType | '')}
          aria-label="Filtrar por tipo de turno"
        />
      </FilterItem>

      <SearchItem>
        <Input
          placeholder="Buscar por operador o equipo..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          aria-label="Buscar turnos"
        />
      </SearchItem>

      <Button variant="ghost" size="sm" onClick={handleReset}>
        Limpiar filtros
      </Button>
    </FiltersBar>
  )
}
