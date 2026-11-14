import * as React from "react"
import { MoreHorizontalIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A "…" marker for collapsed middle levels in a breadcrumb trail.
 *
 * Decorative by default (hidden from screen readers). To let people open the hidden levels, wrap
 * it in a `DropdownMenuTrigger` and give that trigger `aria-label="Show more pages"`.
 *
 * @example
 * <BreadcrumbEllipsis />
 */
type BreadcrumbEllipsisProps = {
  className?: string
}

function BreadcrumbEllipsis({ className }: BreadcrumbEllipsisProps) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden
      className={cn("inline-flex size-6 items-center justify-center text-fg-muted", className)}
    >
      <MoreHorizontalIcon className="size-4" />
    </span>
  )
}
export { BreadcrumbEllipsis }
export type { BreadcrumbEllipsisProps }
