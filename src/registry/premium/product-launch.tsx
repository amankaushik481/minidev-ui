"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ScrollProgressRail } from "@/registry/premium/scroll-progress-rail"
import { HeroKineticType } from "@/registry/premium/hero-kinetic-type"
import { DeviceFrameStack } from "@/registry/premium/device-frame-stack"
import { StickyFeatureStory } from "@/registry/premium/sticky-feature-story"
import { BeforeAfterWipe } from "@/registry/premium/before-after-wipe"
import { FlipStatBoard } from "@/registry/premium/flip-stat-board"
import { MarqueeQuotes } from "@/registry/premium/marquee-quotes"
import { LaunchCountdown } from "@/registry/premium/launch-countdown"
import { CommandWaitlist } from "@/registry/premium/command-waitlist"
import { CursorSpotlightPanel } from "@/registry/premium/cursor-spotlight-panel"
import { MagneticCta } from "@/registry/premium/magnetic-cta"
import { HorizontalProductRail } from "@/registry/premium/horizontal-product-rail"

function ProductLaunch({ className }: { className?: string }) {
  return (
    <div data-slot="product-launch" data-tier="premium" className={cn("bg-bg", className)}>
      <ScrollProgressRail labels={["Intro", "Story", "Proof", "Waitlist"]} />
      <div className="mx-auto max-w-5xl space-y-24 px-6 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <HeroKineticType
            lines={["Launch like", "you mean it."]}
            description="A Premium page kit built from kinetic type, sticky story, and magnetic CTAs — not free blocks with a fade."
          />
          <DeviceFrameStack />
        </div>
        <HorizontalProductRail ariaLabel="Launch product surfaces" />
        <StickyFeatureStory />
        <BeforeAfterWipe />
        <FlipStatBoard
          stats={[
            { value: 400, label: "Components" },
            { value: 98, label: "Audit score" },
            { value: 12, label: "Launch days saved" },
          ]}
        />
        <MarqueeQuotes />
        <CursorSpotlightPanel
          title="Same tokens. Different tier."
          body="Free ships the product. Premium owns the first screen — motion, density, and narrative."
        />
        <div className="flex flex-col items-center gap-8">
          <LaunchCountdown />
          <CommandWaitlist />
          <MagneticCta size="lg">Get early access</MagneticCta>
        </div>
      </div>
    </div>
  )
}
export { ProductLaunch }
