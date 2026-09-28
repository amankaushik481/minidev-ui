"use client"
import { SiteHeader, SiteFooter } from "@/components/site-chrome"
import { Hero } from "@/components/landing/hero"
import { Bento } from "@/components/landing/bento"
import { Craft } from "@/components/landing/craft"
import { CategoryIndex, FinalCta, InstallSection, ProofStrip } from "@/components/landing/sections"

export default function Home() {
  return (
    <div className="min-h-full overflow-x-hidden bg-bg text-fg">
      <SiteHeader />
      <main className="min-w-0">
        <Hero />
        <div className="mt-24 sm:mt-32">
          <ProofStrip />
        </div>
        <Bento />
        <Craft />
        <InstallSection />
        <CategoryIndex />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
