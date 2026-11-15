"use client"
import { HeroAurora } from "@/registry/premium/hero-aurora"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Your own copy",
    description: "Every string is a prop, and both buttons take a click handler.",
    code: `<HeroAurora
  className="w-full"
  eyebrow="Lumen 2.0"
  title="Close your books every day"
  description="Bank feeds, invoices and payouts reconciled overnight, so month-end is a formality."
  primaryLabel="Start free trial"
  secondaryLabel="Book a demo"
  onPrimary={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
/>`,
    node: (
      <HeroAurora
        className="w-full"
        eyebrow="Lumen 2.0"
        title="Close your books every day"
        description="Bank feeds, invoices and payouts reconciled overnight, so month-end is a formality."
        primaryLabel="Start free trial"
        secondaryLabel="Book a demo"
        onPrimary={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
      />
    ),
  },
]
