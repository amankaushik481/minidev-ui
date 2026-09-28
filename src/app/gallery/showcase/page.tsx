"use client"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"
import { HeroClientPitch } from "@/registry/premium/hero-client-pitch"
import { ProductOsMock } from "@/registry/premium/product-os-mock"
import { FreePremiumCompare } from "@/registry/premium/free-premium-compare"
import { MetricTickerBoard } from "@/registry/premium/metric-ticker-board"
import { LiveComponentRail } from "@/registry/premium/live-component-rail"
import { ScrollChapterStory } from "@/registry/premium/scroll-chapter-story"
import { SplitProofPanel } from "@/registry/premium/split-proof-panel"
import { TypographicMarquee } from "@/registry/premium/typographic-marquee"
import { FaqAccordionMotion } from "@/registry/premium/faq-accordion-motion"
import { StackRevealStory } from "@/registry/premium/stack-reveal-story"

export default function Page() {
  return (
    <GalleryPage title="Showcase kit" premium description="A walkthrough page: pitch hero, living product mock and scroll chapters.">
      <GallerySection title="Pitch hero">
        <div className="w-full"><HeroClientPitch /></div>
      </GallerySection>
      <GallerySection title="Metrics">
        <div className="w-full"><MetricTickerBoard /></div>
      </GallerySection>
      <GallerySection title="Live rail + OS">
        <div className="w-full space-y-8">
          <LiveComponentRail />
          <ProductOsMock />
        </div>
      </GallerySection>
      <GallerySection title="Compare + chapters">
        <div className="w-full space-y-12">
          <SplitProofPanel />
          <div className="grid w-full gap-10 lg:grid-cols-2"><TypographicMarquee /><StackRevealStory /></div>
          <FaqAccordionMotion />
          <FreePremiumCompare />
          <ScrollChapterStory />
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
