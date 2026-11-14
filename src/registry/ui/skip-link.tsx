"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A "Skip to content" link, visually hidden until it receives keyboard focus, then pinned top-left.
 *
 * Render it as the first focusable element in the layout. Its `href` must match the id of your
 * main landmark, e.g. `<main id="main" tabIndex={-1}>`, so focus lands there after the skip.
 *
 * @example
 * <body><SkipLink href="#main" /><Header /><main id="main" tabIndex={-1}>…</main></body>
 */
function SkipLink({ className, children = "Skip to content", href = "#main", ...props }: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="skip-link"
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]",
        "rounded-lg border border-border bg-raised px-3 py-2 text-sm font-medium text-fg shadow-lg outline-none",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}
export { SkipLink }
