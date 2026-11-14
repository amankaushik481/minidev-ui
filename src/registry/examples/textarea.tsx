"use client"
import * as React from "react"
import { Textarea } from "@/registry/ui/textarea"
import { FormField } from "@/registry/ui/form-field"
import type { Example } from "./types"

function CharacterLimitDemo() {
  const limit = 240
  const [note, setNote] = React.useState("Priya confirmed the PO number. Ship INV-2041 once finance signs off.")
  const left = limit - note.length
  const countId = React.useId()
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={limit} aria-label="Internal note" aria-describedby={countId} />
      <p id={countId} className={left < 20 ? "text-right text-xs text-danger tabular-nums" : "text-right text-xs text-fg-muted tabular-nums"}>
        {left} characters left
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "With form field",
    description: "FormField supplies the label and hint; share the id so the label focuses the textarea.",
    code: `<FormField id="hold-note" label="Internal note" description="Visible to your team only.">
  <Textarea id="hold-note" placeholder="Why is this invoice on hold?" />
</FormField>`,
    node: (
      <div className="w-full max-w-sm">
        <FormField id="hold-note" label="Internal note" description="Visible to your team only.">
          <Textarea id="hold-note" placeholder="Why is this invoice on hold?" />
        </FormField>
      </div>
    ),
  },
  {
    title: "Character limit",
    description: "Native maxLength stops typing at the limit; link the counter with aria-describedby so screen readers hear how much room is left.",
    code: `function CharacterLimitDemo() {
  const limit = 240
  const [note, setNote] = React.useState("Priya confirmed the PO number. Ship INV-2041 once finance signs off.")
  const left = limit - note.length
  const countId = React.useId()
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={limit} aria-label="Internal note" aria-describedby={countId} />
      <p id={countId} className={left < 20 ? "text-right text-xs text-danger tabular-nums" : "text-right text-xs text-fg-muted tabular-nums"}>
        {left} characters left
      </p>
    </div>
  )
}`,
    node: <CharacterLimitDemo />,
  },
  {
    title: "Auto growing",
    description: "autoResize grows the field with its content up to a cap, using CSS field-sizing; rows sets the starting height.",
    code: `<Textarea rows={1} autoResize placeholder="Reply to Maya Chen" aria-label="Reply" className="w-full max-w-sm" />`,
    node: <Textarea rows={1} autoResize placeholder="Reply to Maya Chen" aria-label="Reply" className="w-full max-w-sm" />,
  },
  {
    title: "Disabled and invalid",
    description: "Disabled sinks the field into the surface; aria-invalid turns the border red and FormField shows the message.",
    code: `<Textarea disabled defaultValue="Locked after the invoice was sent." aria-label="Disabled" />
<FormField id="refund-reason" label="Reason for refund" error="Add a sentence or two so finance can approve it.">
  <Textarea id="refund-reason" aria-invalid defaultValue="n/a" />
</FormField>`,
    node: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Textarea disabled defaultValue="Locked after the invoice was sent." aria-label="Disabled" />
        <FormField id="refund-reason" label="Reason for refund" error="Add a sentence or two so finance can approve it.">
          <Textarea id="refund-reason" aria-invalid defaultValue="n/a" />
        </FormField>
      </div>
    ),
  },
]
