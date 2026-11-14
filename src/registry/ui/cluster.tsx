"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A layout primitive that lays children out in a wrapping row with an even gap, like tags, buttons or badges.
 *
 * Use for horizontal groups that should wrap on narrow screens. For a vertical list use Stack; for centring use Center;
 * for page width use Container. `gap` is in 4px steps, so `gap={2}` is 8px.
 *
 * @example
 * <Cluster gap={2} justify="end"><Button variant="ghost">Cancel</Button><Button>Save</Button></Cluster>
 */
type ClusterProps = React.ComponentProps<"div"> & {
  /** Space between items in 4px steps (2 = 8px). Defaults to 2. */
  gap?: number
  /** Cross-axis alignment. Defaults to "center". */
  align?: "start" | "center" | "end" | "baseline" | "stretch"
  /** Main-axis distribution. Defaults to "start". */
  justify?: "start" | "center" | "end" | "between"
}

const ALIGN = { start: "items-start", center: "items-center", end: "items-end", baseline: "items-baseline", stretch: "items-stretch" } as const
const JUSTIFY = { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between" } as const

function Cluster({ className, gap = 2, align = "center", justify = "start", style, ...props }: ClusterProps) {
  return (
    <div
      data-slot="cluster"
      className={cn("flex flex-wrap", ALIGN[align], JUSTIFY[justify], className)}
      style={{ gap: gap * 4, ...style }}
      {...props}
    />
  )
}
export { Cluster }
export type { ClusterProps }
