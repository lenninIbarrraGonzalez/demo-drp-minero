import styled from 'styled-components'
import type { SelectHTMLAttributes } from 'react'

export interface DropdownOption {
  label: string
  value: string
}

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: DropdownOption[]
  error?: boolean
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledSelect = styled.select<{ $error?: boolean }>`
  appearance: none;
  background: ${({ theme }) => theme.colors.bg.hover};
  border: 1px solid ${({ theme, $error }) =>
    $error ? theme.colors.accent.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  outline: none;
  width: 100%;
  cursor: pointer;
  transition: border-color 150ms ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent.primary};
  }

  option {
    background: ${({ theme }) => theme.colors.bg.card};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Chevron = styled.span`
  position: absolute;
  right: ${({ theme }) => theme.spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.muted};
  pointer-events: none;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`

export function Dropdown({ options, error, ...props }: DropdownProps) {
  return (
    <Wrapper>
      <StyledSelect $error={error} {...props}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </StyledSelect>
      <Chevron aria-hidden="true">▾</Chevron>
    </Wrapper>
  )
}
