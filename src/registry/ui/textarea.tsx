"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A multi-line text field styled like `Input`: hairline border, accent focus halo, invalid and read-only states.
 *
 * Accepts every `<textarea>` prop. Set `autoResize` to grow with the content. Use `PromptInput` for chat composers and `MarkdownEditor` for formatted text.
 *
 * @example
 * <Textarea id="note" placeholder="Add a note to the customer" rows={4} autoResize aria-invalid={!!error} />
 */
type TextareaProps = React.ComponentProps<"textarea"> & {
  /** Grow with the content (CSS `field-sizing: content`); `rows` sets the minimum height. Browsers without support keep a fixed height. */
  autoResize?: boolean
}

function Textarea({ className, autoResize, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-24 w-full rounded-lg border border-border bg-surface px-3 py-2.5",
        "text-sm leading-[1.55] text-fg shadow-xs",
        "outline-none placeholder:text-fg-subtle",
        "transition-[border-color,box-shadow] duration-[140ms] ease-hairline",
        "hover:border-border-strong",
        "focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]",
        "disabled:cursor-not-allowed disabled:bg-sunken disabled:text-fg-muted disabled:shadow-none",
        "aria-invalid:border-danger aria-invalid:focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--danger)_14%,transparent)]",
        "read-only:bg-sunken read-only:focus-visible:shadow-none",
        autoResize && "field-sizing-content max-h-96 resize-none",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
export type { TextareaProps }
