"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * NotFoundState — a centred 404 panel with a code, heading, explanation and recovery buttons.
 *
 * Use it in a Next.js not-found.tsx or when a record lookup returns nothing. Pass
 * `actions` with real links (the defaults are inert placeholders). For an empty list
 * use EmptyState; for a blocked page use PermissionDenied.
 *
 * @example
 * <NotFoundState
 *   description="That invoice was deleted or never existed."
 *   actions={<Button size="sm" render={<a href="/invoices" />}>Back to invoices</Button>}
 * />
 */
type NotFoundStateProps = {
  /** Small code above the heading. */
  code?: string
  /** Heading text. */
  title?: React.ReactNode
  /** One or two sentences on what happened and what to do next. */
  description?: React.ReactNode
  /** Recovery buttons. Defaults to inert "Go home" and "Open gallery" buttons. */
  actions?: React.ReactNode
  className?: string
}

function NotFoundState({
  code = "404",
  title = "Page not found",
  description = "That route is not in the registry. Try gallery search or jump back home.",
  actions,
  className,
}: NotFoundStateProps) {
  return (
    <div data-slot="not-found-state" className={cn("flex flex-col items-center rounded-2xl border border-border bg-surface px-6 py-14 text-center shadow-highlight", className)}>
      <p className="font-mono text-sm tabular-nums text-accent">{code}</p>
      <h2 className="mt-3 text-xl font-medium tracking-[-0.014em] text-balance text-fg">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-[1.55] text-pretty text-fg-muted">{description}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {actions ?? (
          <>
            <Button size="sm">Go home</Button>
            <Button size="sm" variant="outline">Open gallery</Button>
          </>
        )}
      </div>
    </div>
  )
}
export { NotFoundState }
export type { NotFoundStateProps }
