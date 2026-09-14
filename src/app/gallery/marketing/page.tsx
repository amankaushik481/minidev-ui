"use client"
import { Hero } from "@/registry/ui/hero"
import { FeatureGrid } from "@/registry/ui/feature-grid"
import { Testimonial } from "@/registry/ui/testimonial"
import { CtaBanner } from "@/registry/ui/cta-banner"
import { NewsletterSignup } from "@/registry/ui/newsletter-signup"
import { StatsStrip } from "@/registry/ui/stats-strip"
import { FaqList } from "@/registry/ui/faq-list"
import { SocialProof } from "@/registry/ui/social-proof"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Marketing">
      <GallerySection title="Hero">
        <Hero title="Build with Hairline" description="A registry that looks intentional." primaryAction={{ label: "Get started" }} />
      </GallerySection>
      <GallerySection title="Social / stats">
        <SocialProof countLabel="2,400+ teams building with MiniDev" people={[{ name: "Ada" }, { name: "Lin" }, { name: "Kai" }, { name: "Noa" }]} />
        <StatsStrip stats={[{ label: "Uptime", value: "99.99%" }, { label: "Latency", value: "42ms" }, { label: "Regions", value: "12" }, { label: "NPS", value: "72" }]} />
      </GallerySection>
      <GallerySection title="Features / proof">
        <FeatureGrid features={[{ title: "Fast", description: "Ship UI without reinventing tokens." }, { title: "Accessible", description: "Audit-gated screenshots and axe." }, { title: "Composable", description: "Primitives that stack cleanly." }]} />
        <Testimonial quote="Finally a kit that doesn’t look like every other dashboard." name="Jordan Lee" role="Design Eng" />
        <CtaBanner title="Start composing" action={{ label: "Open gallery" }} />
        <NewsletterSignup />
        <FaqList items={[{ q: "Is it free?", a: "Yes — free React + Tailwind registry." }, { q: "Dark mode?", a: "Tokenized light and dark." }]} />
      </GallerySection>
    </GalleryPage>
  )
}
