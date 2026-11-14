"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A vertical flex column with a fixed gap from the 4px spacing scale.
 *
 * Use it to space sibling blocks evenly without margin utilities. For horizontal rows use
 * `flex gap-*` directly; for a page grid use CSS grid.
 *
 * @example
 * <Stack gap={4}><Heading /><Text /><Button>Continue</Button></Stack>
 */
type StackProps = React.ComponentProps<"div"> & {
  /** Gap in 4px steps: 1 = 4px, 3 = 12px, 8 = 32px. A `gap-*` class in className also works. */
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8
}

// static class names so Tailwind generates them
const GAP = { 1: "gap-1", 2: "gap-2", 3: "gap-3", 4: "gap-4", 5: "gap-5", 6: "gap-6", 8: "gap-8" } as const

function Stack({ className, gap = 3, ...props }: StackProps) {
  return <div data-slot="stack" className={cn("flex flex-col", GAP[gap], className)} {...props} />
}
export { Stack }
export type { StackProps }
