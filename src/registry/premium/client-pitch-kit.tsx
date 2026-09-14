"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { HeroClientPitch } from "@/registry/premium/hero-client-pitch"
import { ProductOsMock } from "@/registry/premium/product-os-mock"
import { FreePremiumCompare } from "@/registry/premium/free-premium-compare"
import { LiveComponentRail } from "@/registry/premium/live-component-rail"
import { ScrollChapterStory } from "@/registry/premium/scroll-chapter-story"
import { LogoWallMotion } from "@/registry/premium/logo-wall-motion"
import { TestimonialCarousel } from "@/registry/premium/testimonial-carousel"
import { MagneticCta } from "@/registry/premium/magnetic-cta"
import { BeforeAfterWipe } from "@/registry/premium/before-after-wipe"
import { SplitProofPanel } from "@/registry/premium/split-proof-panel"
import { TypographicMarquee } from "@/registry/premium/typographic-marquee"
import { StackRevealStory } from "@/registry/premium/stack-reveal-story"
import { FaqAccordionMotion } from "@/registry/premium/faq-accordion-motion"
import { MetricTickerBoard } from "@/registry/premium/metric-ticker-board"

function ClientPitchKit({ className }: { className?: string }) {
  return (
    <div
      data-slot="client-pitch-kit"
      data-tier="premium"
      className={cn("space-y-12 sm:space-y-16 lg:space-y-20", className)}
    >
      <HeroClientPitch />
      <MetricTickerBoard />
      <LiveComponentRail />
      <ProductOsMock />
      <SplitProofPanel />
      <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
        <div className="min-w-0 overflow-hidden">
          <TypographicMarquee />
        </div>
        <StackRevealStory />
      </div>
      <BeforeAfterWipe beforeLabel="Generic kit" afterLabel="MiniDev Hairline" />
      <FreePremiumCompare />
      <ScrollChapterStory />
      <LogoWallMotion />
      <FaqAccordionMotion />
      <TestimonialCarousel />
      <div className="flex justify-center py-6 sm:py-8">
        <MagneticCta size="lg" className="w-full max-w-sm sm:w-auto">
          Book a walkthrough
        </MagneticCta>
      </div>
    </div>
  )
}
export { ClientPitchKit }
