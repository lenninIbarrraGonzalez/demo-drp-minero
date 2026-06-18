import styled from 'styled-components'
import { FOOTER_LINKS, SOCIAL_ICONS } from '../data/content'

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.bg.primary};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[6]}
    ${({ theme }) => theme.spacing[8]};
`

const Inner = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`

const Top = styled.div`
  display: grid;
  grid-template-columns: 1.4fr repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing[8]};
  padding-bottom: ${({ theme }) => theme.spacing[12]};

  @media (max-width: 860px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`

const BrandName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};

  span {
    color: ${({ theme }) => theme.colors.accent.primary};
  }
`

const Tagline = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: 1.6;
  margin: 0;
  max-width: 280px;
`

const Socials = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
`

const SocialLink = styled.a`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: color 150ms ease, border-color 150ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    border-color: ${({ theme }) => theme.colors.accent.primary};
  }

  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`

const ColumnTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-decoration: none;
  transition: color 150ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

const Bottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: ${({ theme }) => theme.spacing[6]};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`

export function LandingFooter() {
  const year = new Date().getFullYear()

  return (
    <Footer>
      <Inner>
        <Top>
          <Brand>
            <BrandName>
              ERP <span>Minero</span>
            </BrandName>
            <Tagline>
              La plataforma para gestionar operaciones, equipos y mercado minero en
              tiempo real.
            </Tagline>
            <Socials>
              {SOCIAL_ICONS.map((icon) => (
                <SocialLink
                  key={icon}
                  href="#"
                  aria-label={icon.replace('-icon', '')}
                >
                  <svg aria-hidden focusable="false">
                    <use href={`/icons.svg#${icon}`} />
                  </svg>
                </SocialLink>
              ))}
            </Socials>
          </Brand>

          {FOOTER_LINKS.map((column) => (
            <Column key={column.title}>
              <ColumnTitle>{column.title}</ColumnTitle>
              {column.links.map((link) => (
                <FooterLink key={link} href="#">
                  {link}
                </FooterLink>
              ))}
            </Column>
          ))}
        </Top>

        <Bottom>
          <span>© {year} ERP Minero · Demo con fines demostrativos.</span>
          <span>Datos de mercado simulados.</span>
        </Bottom>
      </Inner>
    </Footer>
  )
}
