import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FEATURES } from '../data/content'
import { fadeUp, scaleIn, staggerContainer, revealViewport } from '../animations/variants'

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.bg.primary};
`

const Inner = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`

const Header = styled(motion.div)`
  text-align: center;
  max-width: 640px;
  margin: 0 auto ${({ theme }) => theme.spacing[12]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`

const Eyebrow = styled.span`
  color: ${({ theme }) => theme.colors.accent.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: 1.6;
  margin: 0;
`

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing[6]};

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled(motion.article)`
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  transition: border-color 150ms ease, transform 150ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent.primary};
    transform: translateY(-4px);
  }
`

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: ${({ theme }) => theme.colors.bg.hover};
`

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

const CardText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`

export function FeaturesSection() {
  return (
    <Section id="features">
      <Inner>
        <Header
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <Eyebrow>Todo en un lugar</Eyebrow>
          <Title>Operá tu mina de punta a punta</Title>
          <Lead>
            Desde la planificación de turnos hasta el precio del litio: cada módulo conectado
            para que no pierdas de vista lo que importa.
          </Lead>
        </Header>

        <Grid
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {FEATURES.map((feature) => (
            <Card key={feature.title} variants={scaleIn}>
              <IconBox aria-hidden>{feature.icon}</IconBox>
              <CardTitle>{feature.title}</CardTitle>
              <CardText>{feature.description}</CardText>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  )
}
