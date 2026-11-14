"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A layout primitive that centres its children horizontally and vertically in a narrow, text-centred column.
 *
 * Use for empty states, auth screens and single-message pages. For a page-width wrapper use Container; for a row of items use Cluster; for a vertical list use Stack.
 *
 * @example
 * <Center className="min-h-80"><EmptyState title="No invoices yet" /></Center>
 */
type CenterProps = React.ComponentProps<"div"> & {
  /** Max width of the column. Defaults to "lg" (32rem). */
  size?: "sm" | "md" | "lg" | "full"
}

const WIDTH = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", full: "max-w-none" } as const

function Center({ size = "lg", className, ...props }: CenterProps) {
  return (
    <div
      data-slot="center"
      className={cn("mx-auto flex w-full flex-col items-center justify-center text-center", WIDTH[size], className)}
      {...props}
    />
  )
}
export { Center }
export type { CenterProps }
