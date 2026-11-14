import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Heading — a semantic h1 to h6 with the kit's size, weight and tracking for each level.
 *
 * Use it for in-app section and page headings. For a page title with actions
 * use PageHeader, for a section intro with eyebrow and description use
 * SectionHeader, and for marketing headlines use Hero.
 *
 * @example
 * <Heading as="h3">Billing</Heading>
 */
const sizes = {
  h1: "text-3xl tracking-[-0.022em] font-medium",
  h2: "text-2xl tracking-[-0.018em] font-medium",
  h3: "text-lg tracking-[-0.008em] font-medium",
  h4: "text-base tracking-[0] font-medium",
  h5: "text-sm tracking-[0.005em] font-medium",
  h6: "text-xs tracking-[0.01em] font-medium uppercase text-fg-muted",
} as const

type HeadingLevel = keyof typeof sizes

type HeadingProps = React.ComponentProps<"h2"> & {
  /** Which heading element to render; the level also sets the size. Pick by document outline, restyle with className. */
  as?: HeadingLevel
}

function Heading({ as: Comp = "h2", className, ...props }: HeadingProps) {
  return <Comp data-slot="heading" className={cn("text-balance text-fg", sizes[Comp], className)} {...props} />
}
export { Heading }
export type { HeadingProps, HeadingLevel }
