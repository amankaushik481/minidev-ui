"use client"
import { TemplateFooter, TemplateShell } from "@/components/templates/template-bar"
import { LumenApp } from "@/components/showcase/lumen-app"
import { FloatingNav } from "@/registry/blocks/floating-nav"
import { HeroSpotlight } from "@/registry/blocks/hero-spotlight"
import { BentoLive } from "@/registry/blocks/bento-live"
import { ScrollStory } from "@/registry/blocks/scroll-story"
import { SocialProofWall } from "@/registry/blocks/social-proof-wall"
import { PricingPlans } from "@/registry/blocks/pricing-plans"
import { FaqSection } from "@/registry/blocks/faq-section"
import { CtaBand } from "@/registry/blocks/cta-band"

export default function LumenTemplate() {
  return (
    <TemplateShell name="Lumen" kind="AI SaaS" material="glass" className="tpl-lumen">
      <FloatingNav />
      <main>
        <HeroSpotlight
          visual={
            <div className="relative mx-auto max-w-6xl">
              <div aria-hidden className="absolute -inset-x-10 -top-10 -bottom-20 -z-10 rounded-[48px] bg-[radial-gradient(ellipse_at_50%_20%,var(--accent-soft),transparent_70%)]" />
              <LumenApp className="h-[600px] shadow-overlay sm:h-[680px]" />
            </div>
          }
        />
        <div id="product" className="scroll-mt-24">
          <BentoLive />
        </div>
        <div id="how" className="scroll-mt-24">
          <ScrollStory />
        </div>
        <div id="customers" className="scroll-mt-24">
          <SocialProofWall />
        </div>
        <div id="pricing" className="scroll-mt-24">
          <PricingPlans />
        </div>
        <div id="faq" className="scroll-mt-24">
          <FaqSection />
        </div>
        <CtaBand />
      </main>
      <TemplateFooter
        brand={
          <span className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em] text-fg">
            <span className="grid size-7 place-items-center rounded-lg bg-ink text-[13px] text-on-ink shadow-ink">L</span>
            Lumen
          </span>
        }
        note="The AI analyst for finance teams. Sample template by MiniDev; Lumen is a fictional product."
      />
    </TemplateShell>
  )
}
