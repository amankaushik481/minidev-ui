"use client"
import Link from "next/link"
import { SiteHeader, SiteFooter } from "@/components/site-chrome"
import { HeroClientPitch } from "@/registry/premium/hero-client-pitch"
import { ProductOsMock } from "@/registry/premium/product-os-mock"
import { LiveComponentRail } from "@/registry/premium/live-component-rail"
import { FreePremiumCompare } from "@/registry/premium/free-premium-compare"
import { MetricTickerBoard } from "@/registry/premium/metric-ticker-board"
import { BeforeAfterWipe } from "@/registry/premium/before-after-wipe"
import { FeatureBentoMotion } from "@/registry/premium/feature-bento-motion"
import { LogoWallMotion } from "@/registry/premium/logo-wall-motion"
import { TestimonialCarousel } from "@/registry/premium/testimonial-carousel"
import { MagneticCta } from "@/registry/premium/magnetic-cta"
import { SplitProofPanel } from "@/registry/premium/split-proof-panel"
import { TypographicMarquee } from "@/registry/premium/typographic-marquee"
import { StackRevealStory } from "@/registry/premium/stack-reveal-story"
import { FaqAccordionMotion } from "@/registry/premium/faq-accordion-motion"
import { Button } from "@/registry/ui/button"

export default function Home() {
  return (
    <div className="min-h-full bg-bg text-fg">
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-6xl space-y-20 px-6 py-12 pb-28">
          <HeroClientPitch />
          <MetricTickerBoard />
          <LiveComponentRail />
          <section className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.01em] text-fg-muted">Product surface</p>
                <h2 className="mt-1 text-2xl font-medium tracking-[-0.018em]">A living OS mock — not a static landing blob</h2>
              </div>
              <Button variant="outline" size="sm" render={<Link href="/showcase" />}>Full showcase</Button>
            </div>
            <ProductOsMock />
          </section>
          <BeforeAfterWipe beforeLabel="Generic kit" afterLabel="MiniDev Hairline" />
          <FeatureBentoMotion />
          <SplitProofPanel />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start"><TypographicMarquee /><StackRevealStory /></div>
          <FreePremiumCompare />
          <LogoWallMotion />
          <section className="space-y-4"><h2 className="text-2xl font-medium tracking-[-0.018em]">Questions clients ask</h2><FaqAccordionMotion /></section>
          <TestimonialCarousel />
          <section className="rounded-2xl border border-border bg-surface px-6 py-12 text-center shadow-[inset_0_1px_0_oklch(1_0_0/0.55)] sm:px-12">
            <h2 className="text-3xl font-medium tracking-[-0.022em]">Ready when the client opens the tab</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-[1.55] text-fg-muted">
              Walk the gallery, drop into docs, or run the client showcase. Same craft bar we use to ship.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <MagneticCta size="lg" render={<Link href="/showcase" />}>Open showcase</MagneticCta>
              <Button size="lg" variant="outline" render={<Link href="/docs" />}>Read docs</Button>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
