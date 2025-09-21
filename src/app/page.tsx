import HeroSection from '@/components/landing/HeroSection'
import ProblemsSection from '@/components/landing/ProblemsSection'
import TimeClaimedSection from '@/components/landing/TimeClaimedSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import DemoSection from '@/components/landing/DemoSection'
import CreatorMessageSection from '@/components/landing/CreatorMessageSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import CTASection from '@/components/landing/CTASection'
import Footer from '@/components/landing/Footer'
import StatsCounter from '@/components/landing/StatsCounter'
import Navigation from '@/components/landing/Navigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-beige">
      <Navigation />
      <StatsCounter />
      <HeroSection />
      <ProblemsSection />
      <TimeClaimedSection />
      <FeaturesSection />
      <DemoSection />
      <CreatorMessageSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
