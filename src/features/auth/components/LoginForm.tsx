import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useLogin } from '../hooks/useLogin'
import type { LoginCredentials } from '../types'

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
`

const FormTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`

const FormSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`

const FieldLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const FieldInput = styled.input<{ $hasError?: boolean }>`
  background: ${({ theme }) => theme.colors.bg.hover};
  border: 1px solid ${({ theme, $hasError }) =>
    $hasError ? theme.colors.accent.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
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
`

const FieldError = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.accent.danger};
`

const ApiErrorMessage = styled.div`
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.accent.danger};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.accent.danger};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
`

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.accent.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  width: 100%;
  transition: opacity 150ms ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

export function LoginForm() {
  const { mutate, isPending, error } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>()

  return (
    <FormContainer onSubmit={handleSubmit(mutate)} noValidate>
      <div>
        <FormTitle>ERP Minero</FormTitle>
        <FormSubtitle>Inicia sesión para continuar</FormSubtitle>
      </div>

      {error && (
        <ApiErrorMessage role="alert">{error.message}</ApiErrorMessage>
      )}

      <FieldWrapper>
        <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
        <FieldInput
          id="email"
          type="email"
          placeholder="admin@erp.com"
          $hasError={!!errors.email}
          {...register('email', {
            required: 'El correo es requerido',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Formato de correo inválido',
            },
          })}
        />
        {errors.email && (
          <FieldError role="alert">{errors.email.message}</FieldError>
        )}
      </FieldWrapper>

      <FieldWrapper>
        <FieldLabel htmlFor="password">Contraseña</FieldLabel>
        <FieldInput
          id="password"
          type="password"
          placeholder="••••••••"
          $hasError={!!errors.password}
          {...register('password', {
            required: 'La contraseña es requerida',
            minLength: {
              value: 6,
              message: 'Mínimo 6 caracteres',
            },
          })}
        />
        {errors.password && (
          <FieldError role="alert">{errors.password.message}</FieldError>
        )}
      </FieldWrapper>

      <SubmitButton type="submit" disabled={isPending}>
        {isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </SubmitButton>
    </FormContainer>
  )
}
