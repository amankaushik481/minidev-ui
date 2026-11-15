"use client"
import { HeroGradientMesh } from "@/registry/premium/hero-gradient-mesh"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Launch moment",
    description: "It stays dark inside a light page, so it can mark one launch section without a theme switch.",
    code: `<HeroGradientMesh
  className="w-full"
  title="Lumen for teams is live"
  description="Shared inboxes, roles for finance and support, and one bill for the whole workspace."
  primaryLabel="Upgrade your workspace"
  secondaryLabel="Read the announcement"
/>`,
    node: (
      <HeroGradientMesh
        className="w-full"
        title="Lumen for teams is live"
        description="Shared inboxes, roles for finance and support, and one bill for the whole workspace."
        primaryLabel="Upgrade your workspace"
        secondaryLabel="Read the announcement"
      />
    ),
  },
]
