"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/ui/alert-dialog"

/**
 * A ready-made "are you sure?" flow: a red trigger button that opens an alert dialog with Cancel and a destructive Confirm.
 *
 * Drop it in wherever one destructive action needs a confirmation step. Both buttons close the dialog; `onConfirm` runs on Confirm.
 * Focus starts inside, Escape cancels, and focus returns to the trigger. For custom layouts compose AlertDialog yourself;
 * for type-the-name confirmation use DeleteAccountConfirm; for a settings section use DangerZone.
 *
 * @example
 * <ConfirmDestructive triggerLabel="Delete invoice" title="Delete INV-2041?" description="This cannot be undone." confirmLabel="Delete" onConfirm={remove} />
 */
type ConfirmDestructiveProps = {
  /** Text of the red trigger button. Defaults to "Delete". */
  triggerLabel?: string
  /** Dialog title, phrased as the question. */
  title?: string
  /** The consequence, read when the dialog opens. */
  description?: string
  /** Confirm button text. Defaults to "Confirm"; prefer the verb, e.g. "Delete invoice". */
  confirmLabel?: string
  /** Cancel button text. Defaults to "Cancel". */
  cancelLabel?: string
  /** Runs when Confirm is pressed, before the dialog closes. */
  onConfirm?: () => void
  /** Controlled open state. */
  open?: boolean
  /** Called with the next open state. */
  onOpenChange?: (open: boolean) => void
}

function ConfirmDestructive({
  triggerLabel = "Delete",
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  open,
  onOpenChange,
}: ConfirmDestructiveProps) {
  return (
    <div data-slot="confirm-destructive">
      <AlertDialog open={open} onOpenChange={onOpenChange ? (o) => onOpenChange(o) : undefined}>
        <AlertDialogTrigger render={<Button variant="destructive" size="sm" />}>{triggerLabel}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
          <AlertDialogActions>
            <AlertDialogClose render={<Button variant="outline" />}>{cancelLabel}</AlertDialogClose>
            <AlertDialogClose render={<Button variant="destructive" />} onClick={onConfirm}>
              {confirmLabel}
            </AlertDialogClose>
          </AlertDialogActions>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
export { ConfirmDestructive }
export type { ConfirmDestructiveProps }
