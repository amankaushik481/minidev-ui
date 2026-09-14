"use client"
import * as React from "react"
import { BlogCard } from "@/registry/ui/blog-card"
import { CaseStudyCard } from "@/registry/ui/case-study-card"
import { PricingToggle } from "@/registry/ui/pricing-toggle"
import { FooterMega } from "@/registry/ui/footer-mega"
import { PressQuote } from "@/registry/ui/press-quote"
import { NavMarketing } from "@/registry/ui/nav-marketing"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  const [cadence, setCadence] = React.useState<"monthly" | "yearly">("yearly")
  return (
    <GalleryPage title="Marketing sections">
      <GallerySection title="Nav">
        <div className="w-full overflow-hidden rounded-xl border border-border"><NavMarketing /></div>
      </GallerySection>
      <GallerySection title="Cards & proof">
        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <BlogCard tag="Design" title="Why Hairline beats blur" excerpt="Borders and highlights, not soft shadows everywhere." date={new Date().toISOString()} />
            <CaseStudyCard company="Acme" title="Cut design QA time in half" result="52%" delta={52} />
            <PressQuote quote="The rare kit that looks intentional in screenshots." source="Design Weekly" />
          </div>
          <PricingToggle value={cadence} onChange={setCadence} />
        </div>
      </GallerySection>
      <GallerySection title="Footer">
        <div className="w-full overflow-hidden rounded-xl border border-border">
          <FooterMega
            columns={[
              { title: "Product", links: [{ label: "Gallery", href: "#" }, { label: "Docs", href: "#" }] },
              { title: "Company", links: [{ label: "Blog", href: "#" }, { label: "Careers", href: "#" }] },
              { title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }] },
            ]}
          />
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
