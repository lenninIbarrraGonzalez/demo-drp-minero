import styled, { css } from 'styled-components'
import type { ButtonHTMLAttributes } from 'react'
import { Spinner } from './Spinner'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

const sizeMap: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    gap: ${({ theme }) => theme.spacing[1]};
  `,
  md: css`
    padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    gap: ${({ theme }) => theme.spacing[2]};
  `,
  lg: css`
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    gap: ${({ theme }) => theme.spacing[2]};
  `,
}

const variantMap: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background: ${({ theme }) => theme.colors.accent.primary};
    color: ${({ theme }) => theme.colors.text.primary};
    border: none;
    &:hover:not(:disabled) { opacity: 0.85; }
  `,
  secondary: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text.primary};
    border: 1px solid ${({ theme }) => theme.colors.border};
    &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.bg.hover}; }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text.secondary};
    border: none;
    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.colors.text.primary};
      background: ${({ theme }) => theme.colors.bg.hover};
    }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.accent.danger};
    color: ${({ theme }) => theme.colors.text.primary};
    border: none;
    &:hover:not(:disabled) { opacity: 0.85; }
  `,
  success: css`
    background: ${({ theme }) => theme.colors.accent.success};
    color: ${({ theme }) => theme.colors.text.primary};
    border: none;
  `,
}

const StyledButton = styled.button<{ $variant: ButtonVariant; $size: ButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  cursor: pointer;
  transition: opacity 150ms ease, background 150ms ease, color 150ms ease;
  white-space: nowrap;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${({ $size }) => sizeMap[$size]}
  ${({ $variant }) => variantMap[$variant]}
`

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <StyledButton $variant={variant} $size={size} disabled={disabled || isLoading} {...props}>
      {isLoading && <Spinner size="sm" />}
      {children}
    </StyledButton>
  )
}
