"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Text that screen readers announce but sighted users never see (Tailwind `sr-only`), e.g. a label for an icon-only control.
 *
 * Accepts every `<span>` prop, so it can carry an `id` for `aria-describedby`. Prefer `aria-label` on the control when the text is short. Use `SkipLink` for a skip-to-content link that appears on focus.
 *
 * @example
 * <button><TrashIcon aria-hidden /><VisuallyHidden>Delete invoice INV-2041</VisuallyHidden></button>
 */
type VisuallyHiddenProps = React.ComponentProps<"span">

function VisuallyHidden({ className, ...props }: VisuallyHiddenProps) {
  return <span data-slot="visually-hidden" className={cn("sr-only", className)} {...props} />
}
export { VisuallyHidden }
export type { VisuallyHiddenProps }
