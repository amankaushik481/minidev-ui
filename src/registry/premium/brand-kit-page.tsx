"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { HeroPosterType } from "@/registry/premium/hero-poster-type"
import { TypographicMarquee } from "@/registry/premium/typographic-marquee"
import { GridReveal } from "@/registry/premium/grid-reveal"
import { CardTilt } from "@/registry/premium/card-tilt"
import { TextScramble } from "@/registry/premium/text-scramble"
import { MorphPrice } from "@/registry/premium/morph-price"
import { MagneticCta } from "@/registry/premium/magnetic-cta"

function BrandKitPage({ className }: { className?: string }) {
  return (
    <div data-slot="brand-kit-page" data-tier="premium" className={cn("space-y-16 bg-bg py-8", className)}>
      <HeroPosterType />
      <TypographicMarquee />
      <div className="mx-auto grid max-w-5xl gap-6 px-6 lg:grid-cols-2">
        <CardTilt title="Violet 285" body="Accent locked. No invented blues." />
        <CardTilt title="Geist only" body="Inter never ships from this kit." />
      </div>
      <div className="mx-auto max-w-5xl space-y-8 px-6">
        <TextScramble text="DESIGN.md IS LAW" />
        <GridReveal />
        <div className="grid gap-6 lg:grid-cols-2">
          <MorphPrice />
          <div className="flex items-center justify-center rounded-2xl border border-border bg-surface p-8">
            <MagneticCta size="lg">Steal this energy</MagneticCta>
          </div>
        </div>
      </div>
    </div>
  )
}
export { BrandKitPage }
