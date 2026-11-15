"use client"
import { HeroClientPitch } from "@/registry/premium/hero-client-pitch"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Default",
    description: "The headline, stats and the two Next.js links live in the file; edit them for your pitch.",
    code: `<HeroClientPitch className="w-full" />`,
    node: (
      <HeroClientPitch className="w-full" />
    ),
  },
]
