import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useLogin } from '../hooks/useLogin'
import { FormField } from '@/shared/components/molecules/FormField'
import { Button } from '@/shared/components/atoms/Button'
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

const ApiErrorMessage = styled.div`
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.accent.danger};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.accent.danger};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
`

const DemoCredentials = styled.div`
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`

const DemoCredentialsTitle = styled.span`
  display: block;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.muted};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`

const DemoCredentialsCode = styled.code`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: monospace;
`

export function LoginForm() {
  const { mutate, isPending, error } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>()

  const onSubmit = (data: LoginCredentials) => mutate(data)

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <FormTitle>ERP Minero</FormTitle>
        <FormSubtitle>Inicia sesión para continuar</FormSubtitle>
      </div>

      {error && (
        <ApiErrorMessage role="alert">{error.message}</ApiErrorMessage>
      )}

      <FormField
        id="email"
        label="Correo electrónico"
        type="email"
        placeholder="admin@erp.com"
        error={errors.email?.message}
        {...register('email', {
          required: 'El correo es requerido',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Formato de correo inválido',
          },
        })}
      />

      <FormField
        id="password"
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password', {
          required: 'La contraseña es requerida',
          minLength: {
            value: 6,
            message: 'Mínimo 6 caracteres',
          },
        })}
      />

      <Button type="submit" isLoading={isPending} style={{ width: '100%' }}>
        Iniciar sesión
      </Button>

      <DemoCredentials>
        <DemoCredentialsTitle>Acceso demo</DemoCredentialsTitle>
        <span>Usuario: <DemoCredentialsCode>admin@erp.com</DemoCredentialsCode></span>
        <br />
        <span>Contraseña: <DemoCredentialsCode>password123</DemoCredentialsCode></span>
      </DemoCredentials>
    </FormContainer>
  )
}
