import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import { GlobalStyles } from '../styles/GlobalStyles'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <StyledThemeProvider theme={theme}>
    <GlobalStyles />
    {children}
  </StyledThemeProvider>
)
