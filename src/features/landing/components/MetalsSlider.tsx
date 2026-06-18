import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { Badge } from '@/shared/components/atoms/Badge'
import { METAL_SLIDES } from '../data/content'
import { fadeUp, revealViewport } from '../animations/variants'

const AUTOPLAY_MS = 5000

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.bg.sidebar};
`

const Inner = styled.div`
  max-width: 900px;
  margin: 0 auto;
`

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`

const Eyebrow = styled.span`
  color: ${({ theme }) => theme.colors.accent.success};
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

const Viewport = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[8]};
  overflow: hidden;
  min-height: 280px;
  display: flex;
  align-items: center;
`

const Slide = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing[4]};
`

const Symbol = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

const MetalName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

const Price = styled.div`
  font-size: 40px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`

const Description = styled.p`
  max-width: 560px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: 1.6;
  margin: 0;
`

const NavButton = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $side }) => ($side === 'left' ? 'left: 12px;' : 'right: 12px;')}
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg.hover};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  cursor: pointer;
  transition: background 150ms ease, border-color 150ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent.primary};
    background: ${({ theme }) => theme.colors.bg.card};
  }
`

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[6]};
`

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '28px' : '10px')};
  height: 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: none;
  cursor: pointer;
  padding: 0;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.accent.primary : theme.colors.border};
  transition: width 200ms ease, background 200ms ease;
`

export function MetalsSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = METAL_SLIDES.length

  const goTo = useCallback((next: number) => setIndex((next + count) % count), [count])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused, count])

  const slide = METAL_SLIDES[index]

  return (
    <Section>
      <Inner>
        <Header
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <Eyebrow>Mercado de metales</Eyebrow>
          <Title>Cotizaciones que mueven tu producción</Title>
        </Header>

        <Viewport
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <NavButton
            $side="left"
            onClick={() => goTo(index - 1)}
            aria-label="Anterior"
          >
            ‹
          </NavButton>

          <AnimatePresence mode="wait">
            <Slide
              key={slide.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Symbol>{slide.symbol}</Symbol>
              <MetalName>{slide.name}</MetalName>
              <Price>{slide.price}</Price>
              <Badge variant={slide.trend}>{slide.change}</Badge>
              <Description>{slide.description}</Description>
            </Slide>
          </AnimatePresence>

          <NavButton
            $side="right"
            onClick={() => goTo(index + 1)}
            aria-label="Siguiente"
          >
            ›
          </NavButton>
        </Viewport>

        <Dots>
          {METAL_SLIDES.map((m, i) => (
            <Dot
              key={m.id}
              $active={i === index}
              onClick={() => goTo(i)}
              aria-label={`Ir a ${m.name}`}
              aria-current={i === index}
            />
          ))}
        </Dots>
      </Inner>
    </Section>
  )
}
