import styled from 'styled-components'
import { motion } from 'framer-motion'
import { TESTIMONIALS } from '../data/content'
import { fadeUp, scaleIn, staggerContainer, revealViewport } from '../animations/variants'

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.bg.sidebar};
`

const Inner = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[12]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`

const Eyebrow = styled.span`
  color: ${({ theme }) => theme.colors.accent.warning};
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

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing[6]};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin: 0 auto;
  }
`

const Card = styled(motion.figure)`
  margin: 0;
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`

const Quote = styled.blockquote`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: 1.7;

  &::before {
    content: '“';
    color: ${({ theme }) => theme.colors.accent.primary};
    font-size: 40px;
    line-height: 0;
    margin-right: ${({ theme }) => theme.spacing[1]};
    vertical-align: -0.3em;
  }
`

const Person = styled.figcaption`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.accent.primary};
`

const Meta = styled.div`
  display: flex;
  flex-direction: column;
`

const Name = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`

const Role = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function TestimonialsSection() {
  return (
    <Section>
      <Inner>
        <Header
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <Eyebrow>Confían en nosotros</Eyebrow>
          <Title>Equipos mineros que ya operan mejor</Title>
        </Header>

        <Grid
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} variants={scaleIn}>
              <Quote>{t.quote}</Quote>
              <Person>
                <Avatar aria-hidden>{initials(t.name)}</Avatar>
                <Meta>
                  <Name>{t.name}</Name>
                  <Role>
                    {t.role} · {t.company}
                  </Role>
                </Meta>
              </Person>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  )
}
