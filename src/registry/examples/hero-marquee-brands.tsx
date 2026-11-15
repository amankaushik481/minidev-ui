"use client"
import { HeroMarqueeBrands } from "@/registry/premium/hero-marquee-brands"
import type { Example } from "./types"

const CUSTOMERS = ["Northwind", "Halcyon", "Fathom", "Meridian", "Quill", "Tessel", "Kestrel", "Foxglove"]

export const examples: Example[] = [
  {
    title: "Customer strip under the headline",
    description: "Pass your own names in brands; eight or more keep one copy of the row wider than the section, so the loop has no gap.",
    code: `const CUSTOMERS = ["Northwind", "Halcyon", "Fathom", "Meridian", "Quill", "Tessel", "Kestrel", "Foxglove"]

<HeroMarqueeBrands
  className="w-full"
  title="Finance teams close faster on Lumen"
  description="Reconciliation, approvals and payouts in one ledger."
  brands={CUSTOMERS}
/>`,
    node: (
      <HeroMarqueeBrands
        className="w-full"
        title="Finance teams close faster on Lumen"
        description="Reconciliation, approvals and payouts in one ledger."
        brands={CUSTOMERS}
      />
    ),
  },
  {
    title: "Short list, slower loop",
    description: "With only four names, repeat the array so the row is wide enough, and raise duration so the strip drifts instead of racing.",
    code: `<HeroMarqueeBrands
  className="w-full"
  title="Built with design partners"
  description="Four studios shaped the first release."
  brands={["Quill", "Tessel", "Fathom", "Halcyon", "Quill", "Tessel", "Fathom", "Halcyon"]}
  duration={48}
/>`,
    node: (
      <HeroMarqueeBrands
        className="w-full"
        title="Built with design partners"
        description="Four studios shaped the first release."
        brands={["Quill", "Tessel", "Fathom", "Halcyon", "Quill", "Tessel", "Fathom", "Halcyon"]}
        duration={48}
      />
    ),
  },
]
