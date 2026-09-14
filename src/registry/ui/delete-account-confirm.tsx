"use client"
import * as React from "react"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
import { InlineAlert } from "@/registry/ui/inline-alert"
import { cn } from "@/lib/utils"
function DeleteAccountConfirm({ className, onConfirm }: { className?: string; onConfirm?: () => void }) {
  const [text, setText] = React.useState("")
  return (
    <div data-slot="delete-account-confirm" className={cn("space-y-3", className)}>
      <InlineAlert tone="danger" title="Delete account">
        Type DELETE to confirm. This cannot be undone.
      </InlineAlert>
      <FormField id="del-confirm" label="Confirmation">
        <Input id="del-confirm" value={text} onChange={(e) => setText(e.target.value)} />
      </FormField>
      <Button variant="destructive" disabled={text !== "DELETE"} onClick={onConfirm}>
        Delete account
      </Button>
    </div>
  )
}
export { DeleteAccountConfirm }
