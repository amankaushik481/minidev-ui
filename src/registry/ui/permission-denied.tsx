"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * PermissionDenied — a centred panel explaining that the user lacks access, with buttons to request it or go elsewhere.
 *
 * Say which role is needed in `description`. Pass `actions` with real handlers (the
 * defaults are inert placeholders). For a missing page use NotFoundState; for a
 * single locked control use PermissionChip or a disabled button with a Tooltip.
 *
 * @example
 * <PermissionDenied
 *   description="You need the Billing admin role to view invoices."
 *   actions={<Button size="sm" onClick={requestAccess}>Request access</Button>}
 * />
 */
type PermissionDeniedProps = {
  /** Heading text. */
  title?: React.ReactNode
  /** Which permission is missing and who can grant it. */
  description?: React.ReactNode
  /** Buttons. Defaults to inert "Request access" and "Switch workspace" buttons. */
  actions?: React.ReactNode
  className?: string
}

function PermissionDenied({
  title = "Permission denied",
  description = "You need admin on this workspace to open billing and seat controls.",
  actions,
  className,
}: PermissionDeniedProps) {
  return (
    <div data-slot="permission-denied" className={cn("rounded-2xl border border-border bg-surface p-6 text-center shadow-highlight", className)}>
      <h3 className="text-lg font-medium tracking-[-0.014em] text-balance text-fg">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-pretty text-fg-muted">{description}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {actions ?? (
          <>
            <Button size="sm">Request access</Button>
            <Button size="sm" variant="outline">Switch workspace</Button>
          </>
        )}
      </div>
    </div>
  )
}
export { PermissionDenied }
export type { PermissionDeniedProps }
