"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
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
        "disabled:cursor-not-allowed disabled:bg-sunken disabled:text-fg-muted",
        "aria-invalid:border-danger aria-invalid:focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--danger)_14%,transparent)]",
        "read-only:bg-sunken",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
