"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { NavMarketing } from "@/registry/ui/nav-marketing"
import { PricingToggle } from "@/registry/ui/pricing-toggle"
import { PricingMotion } from "@/registry/premium/pricing-motion"
import { FeatureComparison } from "@/registry/premium/feature-comparison"
import { FaqList } from "@/registry/ui/faq-list"
import { FooterMega } from "@/registry/ui/footer-mega"
import { CtaGlow } from "@/registry/premium/cta-glow"

function PricingPage({ className }: { className?: string }) {
  const [cadence, setCadence] = React.useState<"monthly" | "yearly">("yearly")
  const premiumPrice = cadence === "yearly" ? "$39" : "$49"
  return (
    <div data-slot="pricing-page" data-tier="premium" className={cn("bg-bg", className)}>
      <NavMarketing />
      <div className="mx-auto max-w-5xl space-y-12 px-6 py-16">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-medium tracking-[-0.026em] text-fg">Simple pricing</h1>
          <p className="text-sm text-fg-muted">Free forever for product UI. Premium for launch moments.</p>
          <PricingToggle value={cadence} onChange={setCadence} />
        </div>
        <PricingMotion
          plans={[
            { name: "Free", price: "$0", blurb: "MIT kit", features: ["All free UI", "Blocks", "Audit gate"] },
            { name: "Premium", price: premiumPrice, blurb: cadence === "yearly" ? "billed yearly" : "billed monthly", featured: true, features: ["Motion heroes", "Email templates", "Page kits"] },
            { name: "Studio", price: "$199", blurb: "teams", features: ["Seats", "Themes", "Support"] },
          ]}
        />
        <FeatureComparison
          rows={[
            { feature: "Primitives", free: true, premium: true },
            { feature: "Motion heroes", free: false, premium: true },
            { feature: "Email templates", free: false, premium: true },
            { feature: "Page kits", free: false, premium: true },
          ]}
        />
        <FaqList
          items={[
            { q: "Can I stay free?", a: "Yes. Free UI never soft-gates." },
            { q: "What is a page kit?", a: "Composable Premium templates for pricing, careers, blog, and sales." },
          ]}
        />
        <CtaGlow title="Pick the tier that matches the moment" />
      </div>
      <FooterMega
        columns={[
          { title: "Product", links: [{ label: "Gallery", href: "#" }, { label: "Docs", href: "#" }] },
          { title: "Company", links: [{ label: "Blog", href: "#" }, { label: "Careers", href: "#" }] },
          { title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }] },
        ]}
      />
    </div>
  )
}
export { PricingPage }
