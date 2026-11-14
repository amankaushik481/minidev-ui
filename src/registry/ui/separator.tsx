"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "@/lib/utils"

/**
 * A 1px hairline that divides content, horizontally or vertically.
 *
 * Base UI Separator renders `role="separator"` with `aria-orientation`. For a purely
 * visual rule inside a list or menu use DropdownMenuSeparator; for a labelled break
 * ("or continue with") put text beside two Separators.
 *
 * @example
 * <Separator />
 * <div className="flex h-5 items-center gap-3">Docs<Separator orientation="vertical" />API</div>
 */
function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
