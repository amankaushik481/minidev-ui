"use client"
import { LiveComponentRail } from "@/registry/premium/live-component-rail"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Proof on a design system page",
    description: "The cards hold working controls, so visitors can press, toggle and type before they install anything.",
    code: `<LiveComponentRail eyebrow="Try it here" title="The controls your product will use" />`,
    node: <LiveComponentRail eyebrow="Try it here" title="The controls your product will use" />,
  },
  {
    title: "Inside a narrow column",
    description: "The rail scrolls sideways inside any width; Tab to it, then use the arrow keys.",
    code: `<LiveComponentRail className="max-w-sm" eyebrow="Included on every plan" title="Same kit, free" />`,
    node: <LiveComponentRail className="max-w-sm" eyebrow="Included on every plan" title="Same kit, free" />,
  },
]
