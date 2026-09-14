"use client"
import { HeroAurora } from "@/registry/premium/hero-aurora"
import { HeroSplitShowcase } from "@/registry/premium/hero-split-showcase"
import { HeroTypedHeadline } from "@/registry/premium/hero-typed-headline"
import { HeroMarqueeBrands } from "@/registry/premium/hero-marquee-brands"
import { HeroBento } from "@/registry/premium/hero-bento"
import { HeroGradientMesh } from "@/registry/premium/hero-gradient-mesh"
import { HeroKineticType } from "@/registry/premium/hero-kinetic-type"
import { HeroEditorialSplit } from "@/registry/premium/hero-editorial-split"
import { AnimatedFeatureRow } from "@/registry/premium/animated-feature-row"
import { PricingMotion } from "@/registry/premium/pricing-motion"
import { CtaGlow } from "@/registry/premium/cta-glow"
import { LogoWallMotion } from "@/registry/premium/logo-wall-motion"
import { TestimonialCarousel } from "@/registry/premium/testimonial-carousel"
import { StatsCounter } from "@/registry/premium/stats-counter"
import { MagneticCta } from "@/registry/premium/magnetic-cta"
import { DeviceFrameStack } from "@/registry/premium/device-frame-stack"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Premium heroes & marketing" premium>
      <GallerySection title="Kinetic">
        <div className="w-full"><HeroKineticType /></div>
      </GallerySection>
      <GallerySection title="Editorial split">
        <div className="w-full"><HeroEditorialSplit /></div>
      </GallerySection>
      <GallerySection title="Aurora">
        <div className="w-full"><HeroAurora /></div>
      </GallerySection>
      <GallerySection title="Split + device stack">
        <div className="grid w-full gap-8 lg:grid-cols-2">
          <HeroSplitShowcase />
          <DeviceFrameStack />
        </div>
      </GallerySection>
      <GallerySection title="Typed headline">
        <div className="w-full"><HeroTypedHeadline /></div>
      </GallerySection>
      <GallerySection title="Marquee brands">
        <div className="w-full"><HeroMarqueeBrands /></div>
      </GallerySection>
      <GallerySection title="Bento">
        <div className="w-full"><HeroBento /></div>
      </GallerySection>
      <GallerySection title="Gradient mesh">
        <div className="w-full"><HeroGradientMesh /></div>
      </GallerySection>
      <GallerySection title="Features / pricing / CTA">
        <div className="w-full space-y-8">
          <AnimatedFeatureRow features={[
            { title: "Motion", description: "Framer Motion with reduced-motion respect." },
            { title: "Hairline", description: "Same tokens as the free kit." },
            { title: "Premium", description: "Launch-ready sections." },
          ]} />
          <PricingMotion plans={[
            { name: "Free", price: "$0", blurb: "Primitives forever", features: ["MIT components", "Galleries", "Audit gate"] },
            { name: "Pro", price: "$49", blurb: "For product teams", featured: true, features: ["Premium heroes", "Motion blocks", "Priority updates"] },
            { name: "Team", price: "$149", blurb: "Shared seats", features: ["Everything in Pro", "Seat management", "Support"] },
          ]} />
          <div className="grid grid-cols-3 gap-4">
            <StatsCounter value={400} label="Components+" />
            <StatsCounter value={50} label="Galleries" />
            <StatsCounter value={99} label="A11y score" />
          </div>
          <LogoWallMotion logos={["Acme", "Globex", "Initech", "Umbrella", "Stark", "Wayne", "Oscorp", "Cyberdyne"]} />
          <TestimonialCarousel items={[
            { quote: "The premium heroes actually feel designed.", name: "Sam Rivera", role: "Founder" },
            { quote: "We shipped a launch page in an afternoon.", name: "Lee Park", role: "Design Eng" },
            { quote: "Free kit for product, Premium for marketing.", name: "Ava Chen", role: "PM" },
          ]} />
          <CtaGlow title="Upgrade the moments that matter" description="Keep building free. Soft-gate Premium when the page needs to convert." />
          <div className="flex justify-center"><MagneticCta size="lg">Feel the CTA</MagneticCta></div>
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
