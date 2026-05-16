import styled from 'styled-components'
import type { LabelHTMLAttributes } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

const StyledLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.accent.danger};
  margin-left: ${({ theme }) => theme.spacing[1]};
`

export function Label({ required, children, ...props }: LabelProps) {
  return (
    <StyledLabel {...props}>
      {children}
      {required && <RequiredMark aria-hidden="true">*</RequiredMark>}
    </StyledLabel>
  )
}
