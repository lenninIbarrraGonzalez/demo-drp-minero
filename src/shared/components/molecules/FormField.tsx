import styled from 'styled-components'
import type { InputHTMLAttributes } from 'react'
import { Label } from '../atoms/Label'
import { Input } from '../atoms/Input'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  required?: boolean
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`

const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.accent.danger};
`

export function FormField({ label, error, required, id, ...inputProps }: FormFieldProps) {
  return (
    <Wrapper>
      <Label htmlFor={id} required={required}>{label}</Label>
      <Input
        id={id}
        error={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...inputProps}
      />
      {error && (
        <ErrorText id={`${id}-error`} role="alert">{error}</ErrorText>
      )}
    </Wrapper>
  )
}
