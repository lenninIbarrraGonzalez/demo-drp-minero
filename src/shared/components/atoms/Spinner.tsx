import styled, { keyframes } from 'styled-components'

type SpinnerSize = 'sm' | 'md' | 'lg'

const sizes: Record<SpinnerSize, string> = {
  sm: '14px',
  md: '20px',
  lg: '32px',
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`

const Ring = styled.span<{ $size: SpinnerSize }>`
  display: inline-block;
  width: ${({ $size }) => sizes[$size]};
  height: ${({ $size }) => sizes[$size]};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.accent.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  animation: ${spin} 0.6s linear infinite;
  flex-shrink: 0;
`

interface SpinnerProps {
  size?: SpinnerSize
}

export function Spinner({ size = 'md' }: SpinnerProps) {
  return <Ring $size={size} role="status" aria-label="cargando" />
}
