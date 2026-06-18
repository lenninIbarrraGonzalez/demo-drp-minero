import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { animate, motion, useInView } from 'framer-motion'
import { STATS, type Stat } from '../data/content'
import { fadeUp, staggerContainer, revealViewport } from '../animations/variants'

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.bg.primary};
`

const Inner = styled(motion.div)`
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing[6]};

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const Item = styled(motion.div)`
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[6]};
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`

const Value = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent.primary};
`

const Label = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

function Counter({ stat, start }: { stat: Stat; start: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!start) return
    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(latest),
    })
    return () => controls.stop()
  }, [start, stat.value])

  const formatted = Math.round(display).toLocaleString('es-AR')

  return (
    <Value>
      {stat.prefix ?? ''}
      {formatted}
      {stat.suffix}
    </Value>
  )
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <Section>
      <Inner
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        {STATS.map((stat) => (
          <Item key={stat.label} variants={fadeUp}>
            <Counter stat={stat} start={inView} />
            <Label>{stat.label}</Label>
          </Item>
        ))}
      </Inner>
    </Section>
  )
}
