import { ArrowRightIcon, SparklesIcon } from "lucide-react"
import { ShimmerButton } from "@/registry/premium/shimmer-button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Tones",
    description: "Ink is the default hero button; accent uses the brand colour for a single page-level action.",
    code: `<ShimmerButton>Start free trial <ArrowRightIcon className="size-4" /></ShimmerButton>
<ShimmerButton tone="accent">Upgrade to Pro <SparklesIcon className="size-4" /></ShimmerButton>`,
    node: (
      <div className="flex flex-wrap items-center justify-center gap-4">
        <ShimmerButton>Start free trial <ArrowRightIcon className="size-4" /></ShimmerButton>
        <ShimmerButton tone="accent">Upgrade to Pro <SparklesIcon className="size-4" /></ShimmerButton>
      </div>
    ),
  },
  {
    title: "Sizes and speed",
    description: "default is 40px for toolbars and cards; lg is 48px for heroes. duration sets seconds per sweep.",
    code: `<ShimmerButton size="default" duration={2}>Book a demo</ShimmerButton>
<ShimmerButton size="lg" duration={4}>Book a demo</ShimmerButton>`,
    node: (
      <div className="flex flex-wrap items-center justify-center gap-4">
        <ShimmerButton size="default" duration={2}>Book a demo</ShimmerButton>
        <ShimmerButton size="lg" duration={4}>Book a demo</ShimmerButton>
      </div>
    ),
  },
  {
    title: "As a link",
    description: "Pass render with an anchor and the same face wraps a real link.",
    code: `<ShimmerButton render={<a href="#pricing" />}>
  See pricing <ArrowRightIcon className="size-4" />
</ShimmerButton>`,
    node: (
      <ShimmerButton render={<a href="#pricing" />}>
        See pricing <ArrowRightIcon className="size-4" />
      </ShimmerButton>
    ),
  },
]
