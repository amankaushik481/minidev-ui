"use client"
import { SiteHeader, SiteFooter } from "@/components/site-chrome"
import { Hero } from "@/components/landing/hero"
import { Exploded } from "@/components/landing/exploded"
import { BlueprintCallout, Physics } from "@/components/landing/physics"
import { Materials } from "@/components/landing/materials"
import { Bento } from "@/components/landing/bento"
import { Craft } from "@/components/landing/craft"
import { CategoryIndex, FinalCta, InstallSection, ProofStrip } from "@/components/landing/sections"

export default function Home() {
  return (
    <div className="min-h-full overflow-x-clip bg-bg text-fg">
      <SiteHeader />
      <main className="min-w-0">
        <Hero />
        <Materials />
        <Exploded />
        <ProofStrip />
        <Physics />
        <Bento />
        <BlueprintCallout />
        <Craft />
        <InstallSection />
        <CategoryIndex />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
