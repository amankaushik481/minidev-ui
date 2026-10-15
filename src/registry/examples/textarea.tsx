"use client"
import * as React from "react"
import { Textarea } from "@/registry/ui/textarea"
import { FormField } from "@/registry/ui/form-field"
import type { Example } from "./types"

function CharacterLimitDemo() {
  const limit = 240
  const [note, setNote] = React.useState("Priya confirmed the PO number. Ship INV-2041 once finance signs off.")
  const left = limit - note.length
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Textarea value={note} onChange={(e) => setNote(e.target.value.slice(0, limit))} aria-label="Internal note" />
      <p className={left < 20 ? "text-right text-xs text-danger tabular-nums" : "text-right text-xs text-fg-muted tabular-nums"}>
        {left} characters left
      </p>
    </div>
  )
}

function AutoGrowDemo() {
  const ref = React.useRef<HTMLTextAreaElement>(null)
  const fit = () => {
    const el = ref.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = el.scrollHeight + "px"
  }
  return (
    <Textarea
      ref={ref}
      rows={1}
      onInput={fit}
      placeholder="Reply to Maya Chen"
      aria-label="Reply"
      className="w-full max-w-sm min-h-0 resize-none overflow-hidden"
    />
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
    description: "Trim the value in onChange and show how much room is left under the field.",
    code: `function CharacterLimitDemo() {
  const limit = 240
  const [note, setNote] = React.useState("Priya confirmed the PO number. Ship INV-2041 once finance signs off.")
  const left = limit - note.length
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Textarea value={note} onChange={(e) => setNote(e.target.value.slice(0, limit))} aria-label="Internal note" />
      <p className={left < 20 ? "text-right text-xs text-danger tabular-nums" : "text-right text-xs text-fg-muted tabular-nums"}>
        {left} characters left
      </p>
    </div>
  )
}`,
    node: <CharacterLimitDemo />,
  },
  {
    title: "Auto growing",
    description: "Start at one row and set the height from scrollHeight on every input.",
    code: `function AutoGrowDemo() {
  const ref = React.useRef<HTMLTextAreaElement>(null)
  const fit = () => {
    const el = ref.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = el.scrollHeight + "px"
  }
  return (
    <Textarea
      ref={ref}
      rows={1}
      onInput={fit}
      placeholder="Reply to Maya Chen"
      aria-label="Reply"
      className="w-full max-w-sm min-h-0 resize-none overflow-hidden"
    />
  )
}`,
    node: <AutoGrowDemo />,
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
