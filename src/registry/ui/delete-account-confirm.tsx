"use client"
import * as React from "react"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
import { InlineAlert } from "@/registry/ui/inline-alert"
import { cn } from "@/lib/utils"

/**
 * DeleteAccountConfirm — a type-to-confirm block that keeps the delete button disabled until the phrase matches.
 *
 * Use inline on a settings page for irreversible account deletion. For a modal
 * confirmation use `AlertDialog` or `ConfirmDestructive`; for a group of risky
 * settings use `DangerZone`.
 *
 * @example
 * <DeleteAccountConfirm onConfirm={() => deleteAccount()} />
 */
type DeleteAccountConfirmProps = {
  /** Called when the phrase matches and the button is pressed. */
  onConfirm?: () => void
  /** The exact text the user must type. */
  confirmText?: string
  className?: string
}

function DeleteAccountConfirm({ className, onConfirm, confirmText = "DELETE" }: DeleteAccountConfirmProps) {
  const [text, setText] = React.useState("")
  const id = React.useId()
  const ok = text === confirmText
  return (
    <form
      data-slot="delete-account-confirm"
      className={cn("space-y-3", className)}
      onSubmit={(e) => {
        e.preventDefault()
        if (ok) onConfirm?.()
      }}
    >
      <InlineAlert tone="danger" title="Delete account">
        Type {confirmText} to confirm. This cannot be undone.
      </InlineAlert>
      <FormField id={id} label="Confirmation">
        <Input id={id} value={text} autoComplete="off" spellCheck={false} onChange={(e) => setText(e.target.value)} />
      </FormField>
      <Button type="submit" variant="destructive" disabled={!ok}>
        Delete account
      </Button>
    </form>
  )
}
export { DeleteAccountConfirm }
export type { DeleteAccountConfirmProps }
