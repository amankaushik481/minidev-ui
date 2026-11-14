import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A box that keeps a fixed width-to-height ratio, for images, video and embeds.
 *
 * Children should fill it absolutely (`absolute inset-0 size-full object-cover`). Uses the native
 * CSS `aspect-ratio`, so it works in server components and needs no JavaScript.
 *
 * @example
 * <AspectRatio ratio={16 / 9} className="rounded-xl bg-sunken">
 *   <img src="/cover.jpg" alt="" className="absolute inset-0 size-full object-cover" />
 * </AspectRatio>
 */
type AspectRatioProps = React.ComponentProps<"div"> & {
  /** Width divided by height: 16 / 9, 4 / 3, 1 for a square. */
  ratio?: number
}

function AspectRatio({ ratio = 16 / 9, className, style, ...props }: AspectRatioProps) {
  return (
    <div
      data-slot="aspect-ratio"
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: String(ratio), ...style }}
      {...props}
    />
  )
}
export { AspectRatio }
export type { AspectRatioProps }
