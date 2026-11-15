"use client"
import { HeroTypedHeadline } from "@/registry/premium/hero-typed-headline"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "One product, several audiences",
    description: "Screen readers and search get one sentence: \"Invoicing for freelancers, agencies, studios and startups\".",
    code: `<HeroTypedHeadline
  className="w-full"
  prefix="Invoicing for"
  words={["freelancers", "agencies", "studios", "startups"]}
/>`,
    node: (
      <HeroTypedHeadline
        className="w-full"
        prefix="Invoicing for"
        words={["freelancers", "agencies", "studios", "startups"]}
      />
    ),
  },
  {
    title: "Slower rotation for longer words",
    description: "Raise interval when the words are phrases, so each one is on screen long enough to read.",
    code: `<HeroTypedHeadline
  className="w-full"
  prefix="Reports for"
  words={["the board", "investors", "month-end"]}
  interval={3200}
/>`,
    node: (
      <HeroTypedHeadline
        className="w-full"
        prefix="Reports for"
        words={["the board", "investors", "month-end"]}
        interval={3200}
      />
    ),
  },
]
