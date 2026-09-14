"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-24 w-full rounded-lg border border-border bg-surface px-3 py-2",
        "text-sm tracking-[0.005em] text-fg shadow-[inset_0_1px_0_oklch(1_0_0/0.5)]",
        "outline-none placeholder:text-fg-subtle",
        "transition-[color,background-color,border-color,box-shadow] duration-[70ms]",
        "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-sunken",
        "aria-invalid:border-danger",
        "read-only:bg-sunken",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
