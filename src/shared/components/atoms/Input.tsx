import styled from 'styled-components'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const StyledInput = styled.input<{ $error?: boolean }>`
  background: ${({ theme }) => theme.colors.bg.hover};
  border: 1px solid ${({ theme, $error }) =>
    $error ? theme.colors.accent.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  outline: none;
  width: 100%;
  transition: border-color 150ms ease;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export function Input({ error, ...props }: InputProps) {
  return <StyledInput $error={error} {...props} />
}
