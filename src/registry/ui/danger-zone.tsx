"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ConfirmDestructive } from "@/registry/ui/confirm-destructive"

/**
 * A red-outlined settings section for one irreversible action, whose button asks for confirmation before `onConfirm` runs.
 *
 * Put it last on a settings page (delete workspace, delete project, transfer ownership). Pass `children` to replace the built-in
 * confirm button with your own actions, such as DeleteAccountConfirm for type-the-name confirmation.
 *
 * @example
 * <DangerZone
 *   description="Delete Northwind and all of its invoices. This cannot be undone."
 *   actionLabel="Delete workspace"
 *   onConfirm={deleteWorkspace}
 * />
 */
type DangerZoneProps = {
  /** Section heading. Defaults to "Danger zone". */
  title?: string
  /** What the action destroys. */
  description?: string
  /** Button and confirm text. Defaults to "Delete workspace". */
  actionLabel?: string
  /** Runs after the person confirms in the dialog. */
  onConfirm?: () => void
  /** Replaces the built-in confirm button. */
  children?: React.ReactNode
  className?: string
}

function DangerZone({
  title = "Danger zone",
  description = "Delete this workspace and every registry fork tied to it. This cannot be undone.",
  actionLabel = "Delete workspace",
  onConfirm,
  children,
  className,
}: DangerZoneProps) {
  const id = React.useId()
  return (
    <section
      data-slot="danger-zone"
      aria-labelledby={id}
      className={cn("rounded-xl border border-danger/35 bg-surface p-4 shadow-highlight", className)}
    >
      <h3 id={id} className="text-sm font-medium text-danger">
        {title}
      </h3>
      <p className="mt-1 text-sm text-fg-muted">{description}</p>
      <div className="mt-4">
        {children ?? (
          <ConfirmDestructive
            triggerLabel={actionLabel}
            title={`${actionLabel}?`}
            description={description}
            confirmLabel={actionLabel}
            onConfirm={onConfirm}
          />
        )}
      </div>
    </section>
  )
}
export { DangerZone }
export type { DangerZoneProps }
