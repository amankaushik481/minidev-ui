"use client"
import { HeroBento } from "@/registry/premium/hero-bento"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Default",
    description: "HeroBento takes only className; change the headline, button and tiles in the file.",
    code: `<HeroBento className="w-full" />`,
    node: (
      <HeroBento className="w-full" />
    ),
  },
]
