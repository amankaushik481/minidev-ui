"use client"
import { SaasLanding } from "@/registry/premium/saas-landing"
import { DocsMarketing } from "@/registry/premium/docs-marketing"
import { ChangelogMotion } from "@/registry/premium/changelog-motion"
import { ChangelogMarketing } from "@/registry/premium/changelog-marketing"
import { FeatureComparison } from "@/registry/premium/feature-comparison"
import { WaitlistHero } from "@/registry/premium/waitlist-hero"
import { ProductTour } from "@/registry/premium/product-tour"
import { PricingPage } from "@/registry/premium/pricing-page"
import { CareersPage } from "@/registry/premium/careers-page"
import { BlogHome } from "@/registry/premium/blog-home"
import { ContactSales } from "@/registry/premium/contact-sales"
import { AgencyPortfolio } from "@/registry/premium/agency-portfolio"
import { ProductLaunch } from "@/registry/premium/product-launch"
import { InvestorUpdate } from "@/registry/premium/investor-update"
import { BrandKitPage } from "@/registry/premium/brand-kit-page"
import { StatusMarketing } from "@/registry/premium/status-marketing"
import { PricingKinetic } from "@/registry/premium/pricing-kinetic"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Premium templates" premium>
      <GallerySection title="Brand kit">
        <div className="w-full overflow-hidden rounded-xl border border-border"><BrandKitPage /></div>
      </GallerySection>
      <GallerySection title="Pricing kinetic">
        <div className="w-full"><PricingKinetic /></div>
      </GallerySection>
      <GallerySection title="Status marketing">
        <div className="w-full"><StatusMarketing /></div>
      </GallerySection>
      <GallerySection title="Product launch kit">
        <div className="w-full overflow-hidden rounded-xl border border-border"><ProductLaunch /></div>
      </GallerySection>
      <GallerySection title="Investor update">
        <div className="w-full overflow-hidden rounded-xl border border-border"><InvestorUpdate /></div>
      </GallerySection>
      <GallerySection title="Waitlist">
        <div className="w-full"><WaitlistHero /></div>
      </GallerySection>
      <GallerySection title="SaaS landing">
        <div className="w-full"><SaasLanding /></div>
      </GallerySection>
      <GallerySection title="Pricing kit">
        <div className="w-full overflow-hidden rounded-xl border border-border"><PricingPage /></div>
      </GallerySection>
      <GallerySection title="Careers">
        <div className="w-full overflow-hidden rounded-xl border border-border"><CareersPage /></div>
      </GallerySection>
      <GallerySection title="Blog home">
        <div className="w-full overflow-hidden rounded-xl border border-border"><BlogHome /></div>
      </GallerySection>
      <GallerySection title="Contact sales">
        <div className="w-full overflow-hidden rounded-xl border border-border"><ContactSales /></div>
      </GallerySection>
      <GallerySection title="Agency portfolio">
        <div className="w-full overflow-hidden rounded-xl border border-border"><AgencyPortfolio /></div>
      </GallerySection>
      <GallerySection title="Docs marketing">
        <div className="w-full"><DocsMarketing /></div>
      </GallerySection>
      <GallerySection title="Changelog marketing">
        <div className="w-full"><ChangelogMarketing /></div>
      </GallerySection>
      <GallerySection title="Changelog motion">
        <div className="w-full">
          <ChangelogMotion entries={[
            { version: "v0.6.0", date: "Sep 14", title: "Premium elevation", tag: "Premium", items: ["Kinetic type", "Sticky story", "Launch kit"] },
            { version: "v0.5.0", date: "Sep 14", title: "Email + admin + page kits", tag: "Premium", items: ["Email templates", "Admin console", "Pricing / careers / blog"] },
            { version: "v0.4.0", date: "Sep 14", title: "Premium templates", tag: "Premium", items: ["SaaS landing", "Docs marketing", "Changelog motion"] },
          ]} />
        </div>
      </GallerySection>
      <GallerySection title="Compare / tour">
        <div className="w-full space-y-8">
          <FeatureComparison rows={[
            { feature: "UI primitives", free: true, premium: true },
            { feature: "Kinetic motion", free: false, premium: true },
            { feature: "Launch kits", free: false, premium: true },
            { feature: "Email kits", free: false, premium: true },
            { feature: "Seats", free: "1", premium: "Unlimited" },
          ]} />
          <ProductTour steps={[
            { title: "Install free kit", body: "Add Hairline primitives from the registry." },
            { title: "Compose product UI", body: "Dashboards, AI, billing — all free." },
            { title: "Drop Premium moments", body: "Heroes and templates when launch needs wow." },
          ]} />
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
