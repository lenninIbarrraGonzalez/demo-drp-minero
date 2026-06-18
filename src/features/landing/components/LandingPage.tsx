import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/authStore'
import { ROUTES } from '@/app/router/routes'
import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'
import { MetalsSlider } from './MetalsSlider'
import { StatsSection } from './StatsSection'
import { TestimonialsSection } from './TestimonialsSection'
import { LandingFooter } from './LandingFooter'

export function LandingPage() {
  const user = useAuthStore((state) => state.user)

  if (user) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <MetalsSlider />
      <StatsSection />
      <TestimonialsSection />
      <LandingFooter />
    </main>
  )
}
