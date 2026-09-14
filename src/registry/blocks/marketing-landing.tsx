"use client"
import * as React from "react"
import { Hero } from "@/registry/ui/hero"
import { LogoCloud } from "@/registry/ui/logo-cloud"
import { FeatureGrid } from "@/registry/ui/feature-grid"
import { CtaBanner } from "@/registry/ui/cta-banner"
import { StatsStrip } from "@/registry/ui/stats-strip"

function MarketingLanding() {
  return (
    <div data-slot="marketing-landing" className="space-y-16 py-10">
      <Hero
        eyebrow="MiniDev UI"
        title="Ship product UI that looks intentional"
        description="Hairline components for dashboards, AI surfaces, billing, and marketing."
        primaryAction={{ label: "Browse gallery" }}
        secondaryAction={{ label: "View docs" }}
      />
      <LogoCloud logos={[{ name: "Acme" }, { name: "Globex" }, { name: "Initech" }, { name: "Umbrella" }]} />
      <StatsStrip stats={[{ label: "Components", value: "300+" }, { label: "Blocks", value: "30+" }, { label: "A11y", value: "Pass" }, { label: "Themes", value: "2" }]} />
      <FeatureGrid
        features={[
          { title: "Hairline", description: "Structure from 1px borders and highlights." },
          { title: "Tokens first", description: "Semantic OKLCH colors only." },
          { title: "Audit gate", description: "Screenshots + axe before ship." },
        ]}
      />
      <CtaBanner title="Ready to compose?" description="Install from the MiniDev registry." action={{ label: "Get started" }} />
    </div>
  )
}
export { MarketingLanding }
