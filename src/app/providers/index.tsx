import { BrowserRouter } from 'react-router-dom'
import { QueryProvider } from './QueryProvider'
import { ThemeProvider } from './ThemeProvider'

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <QueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryProvider>
  </BrowserRouter>
)
