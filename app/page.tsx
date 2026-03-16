import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { SocialProofBar } from "@/components/sections/social-proof-bar"
import { Features } from "@/components/sections/features"
import { Pricing } from "@/components/sections/pricing"
import { MidPageCTA } from "@/components/sections/mid-page-cta"
import { Testimonials } from "@/components/sections/testimonials"
import { FAQ } from "@/components/sections/faq"
import { TrustBadges } from "@/components/sections/trust-badges"
import { Footer } from "@/components/sections/footer"
import { Toaster } from "@/components/ui/sonner"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProofBar />
        <Features />
        <Pricing />
        <MidPageCTA />
        <Testimonials />
        <FAQ />
        <TrustBadges />
      </main>
      <Footer />
      <Toaster position="top-center" />
    </>
  )
}
