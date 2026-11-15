"use client"
import * as React from "react"
import { RichTextToolbar, type RichTextAction } from "@/registry/ui/rich-text-toolbar"
import { Textarea } from "@/registry/ui/textarea"
import type { Example } from "./types"

function ActionLog() {
  const [last, setLast] = React.useState<string>("Nothing yet")
  return (
    <div className="flex flex-col gap-2">
      <RichTextToolbar onAction={(action: RichTextAction, pressed) => setLast(action + (pressed ? " on" : " off"))} />
      <p className="text-xs text-fg-muted">Last action: {last}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Wire up onAction",
    description: "Each press reports the action and its new pressed state; call your editor's command there.",
    code: `function ActionLog() {
  const [last, setLast] = React.useState<string>("Nothing yet")
  return (
    <div className="flex flex-col gap-2">
      <RichTextToolbar onAction={(action: RichTextAction, pressed) => setLast(action + (pressed ? " on" : " off"))} />
      <p className="text-xs text-fg-muted">Last action: {last}</p>
    </div>
  )
}`,
    node: <ActionLog />,
  },
  {
    title: "Above a note field",
    description: "Name the toolbar after what it formats when a page has more than one.",
    code: `<div className="flex w-full max-w-md flex-col gap-2">
  <RichTextToolbar aria-label="Customer note formatting" className="self-start" />
  <Textarea aria-label="Customer note" defaultValue="Northwind asked to move the renewal to March." rows={3} />
</div>`,
    node: (
      <div className="flex w-full max-w-md flex-col gap-2">
        <RichTextToolbar aria-label="Customer note formatting" className="self-start" />
        <Textarea aria-label="Customer note" defaultValue="Northwind asked to move the renewal to March." rows={3} />
      </div>
    ),
  },
]
