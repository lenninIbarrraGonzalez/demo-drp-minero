import styled from 'styled-components'
import { motion } from 'framer-motion'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { Badge } from '@/shared/components/atoms/Badge'
import { fadeUp, staggerContainer } from '../animations/variants'

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[6]};
  background: radial-gradient(
      1200px 600px at 15% -10%,
      ${({ theme }) => theme.colors.accent.primary}26,
      transparent 60%
    ),
    radial-gradient(
      900px 500px at 100% 0%,
      ${({ theme }) => theme.colors.accent.info}1f,
      transparent 55%
    ),
    ${({ theme }) => theme.colors.bg.primary};
`

const Inner = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[16]};

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[12]};
  }
`

const Copy = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};

  @media (max-width: 920px) {
    order: 2;
    text-align: center;
    align-items: center;
  }
`

const Title = styled(motion.h1)`
  font-size: 52px;
  line-height: 1.1;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;

  span {
    color: ${({ theme }) => theme.colors.accent.primary};
  }

  @media (max-width: 920px) {
    font-size: 40px;
  }
`

const Subtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
  max-width: 520px;
`

const Bullets = styled(motion.ul)`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};

  @media (max-width: 920px) {
    align-items: center;
  }
`

const Bullet = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background: ${({ theme }) => theme.colors.accent.success};
    flex-shrink: 0;
  }
`

const LoginCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[8]};
  width: 100%;
  max-width: 440px;
  justify-self: end;
  box-shadow: 0 24px 60px -20px ${({ theme }) => theme.colors.accent.primary}40;

  @media (max-width: 920px) {
    order: 1;
    justify-self: center;
  }
`

const BULLETS = [
  'Datos de mercado en tiempo real',
  'Operaciones y flota centralizadas',
  'Listo para usar — sin instalación',
]

export function HeroSection() {
  return (
    <Section>
      <Inner>
        <Copy variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeUp}>
            <Badge variant="info">Demo interactiva</Badge>
          </motion.div>
          <Title variants={fadeUp}>
            Gestión minera <span>en tiempo real</span>
          </Title>
          <Subtitle variants={fadeUp}>
            Unificá turnos, equipos y cotizaciones de metales en una sola plataforma.
            Tomá decisiones con datos vivos de oro, cobre y litio.
          </Subtitle>
          <Bullets variants={fadeUp}>
            {BULLETS.map((b) => (
              <Bullet key={b}>{b}</Bullet>
            ))}
          </Bullets>
        </Copy>

        <LoginCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <LoginForm />
        </LoginCard>
      </Inner>
    </Section>
  )
}
