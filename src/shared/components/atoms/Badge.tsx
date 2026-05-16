import styled, { css } from 'styled-components'
import type { ReactNode } from 'react'

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info'
type AccentKey = 'success' | 'warning' | 'danger' | 'info'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
}

const tinted = (key: AccentKey): ReturnType<typeof css> => css`
  background: ${({ theme }) => theme.colors.accent[key]}22;
  color: ${({ theme }) => theme.colors.accent[key]};
`

const variantMap: Record<BadgeVariant, ReturnType<typeof css>> = {
  default: css`
    background: ${({ theme }) => theme.colors.bg.hover};
    color: ${({ theme }) => theme.colors.text.secondary};
  `,
  success: tinted('success'),
  warning: tinted('warning'),
  danger:  tinted('danger'),
  info:    tinted('info'),
}

const StyledBadge = styled.span<{ $variant: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  white-space: nowrap;
  ${({ $variant }) => variantMap[$variant]}
`

export function Badge({ variant = 'default', children }: BadgeProps) {
  return <StyledBadge $variant={variant}>{children}</StyledBadge>
}
