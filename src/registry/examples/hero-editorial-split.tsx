"use client"
import { HeroEditorialSplit } from "@/registry/premium/hero-editorial-split"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Default",
    description: "Two columns from lg, one below; edit the copy and the DeviceFrameStack frame titles in the file.",
    code: `<HeroEditorialSplit className="w-full" />`,
    node: (
      <HeroEditorialSplit className="w-full" />
    ),
  },
]
