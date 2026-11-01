"use client"
import * as React from "react"
import { GlobeIcon } from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { PromptInput } from "@/registry/ui/prompt-input"
import type { Example } from "./types"

function ControlledDemo() {
  const [value, setValue] = React.useState("")
  const [sent, setSent] = React.useState<string[]>([])
  const submit = () => {
    setSent((s) => [...s, value.trim()])
    setValue("")
  }
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {sent.length ? (
        <ul className="space-y-1 text-sm text-fg-muted">
          {sent.map((m, i) => <li key={i}>Sent: <span className="text-fg">{m}</span></li>)}
        </ul>
      ) : null}
      <PromptInput value={value} onChange={setValue} onSubmit={submit} placeholder="Ask about your invoices" />
    </div>
  )
}

function ToolbarDemo() {
  const [value, setValue] = React.useState("")
  const [web, setWeb] = React.useState(false)
  return (
    <PromptInput
      className="w-full max-w-md"
      value={value}
      onChange={setValue}
      placeholder="Message Lumen"
      toolbar={
        <>
          <Badge variant="secondary">Lumen 2</Badge>
          <Button
            variant={web ? "soft" : "ghost"}
            size="xs"
            aria-pressed={web}
            onClick={() => setWeb((w) => !w)}
          >
            <GlobeIcon /> Web search
          </Button>
        </>
      }
    />
  )
}

export const examples: Example[] = [
  {
    title: "Controlled composer",
    description: "Enter submits and Shift+Enter adds a line; clear the value in onSubmit once the message is on its way.",
    code: `function ControlledDemo() {
  const [value, setValue] = React.useState("")
  const [sent, setSent] = React.useState<string[]>([])
  const submit = () => {
    setSent((s) => [...s, value.trim()])
    setValue("")
  }
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {sent.length ? (
        <ul className="space-y-1 text-sm text-fg-muted">
          {sent.map((m, i) => <li key={i}>Sent: <span className="text-fg">{m}</span></li>)}
        </ul>
      ) : null}
      <PromptInput value={value} onChange={setValue} onSubmit={submit} placeholder="Ask about your invoices" />
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "With toolbar",
    description: "The toolbar slot sits next to the attach button; a model badge and a toggle button are typical contents.",
    code: `function ToolbarDemo() {
  const [value, setValue] = React.useState("")
  const [web, setWeb] = React.useState(false)
  return (
    <PromptInput
      className="w-full max-w-md"
      value={value}
      onChange={setValue}
      placeholder="Message Lumen"
      toolbar={
        <>
          <Badge variant="secondary">Lumen 2</Badge>
          <Button
            variant={web ? "soft" : "ghost"}
            size="xs"
            aria-pressed={web}
            onClick={() => setWeb((w) => !w)}
          >
            <GlobeIcon /> Web search
          </Button>
        </>
      }
    />
  )
}`,
    node: <ToolbarDemo />,
  },
  {
    title: "Disabled while waiting",
    description: "Disable the composer while a reply streams so a second message cannot be sent early.",
    code: `<PromptInput className="w-full max-w-md" value="Send the overdue reminder to Northwind" disabled placeholder="Waiting for reply" />`,
    node: <PromptInput className="w-full max-w-md" value="Send the overdue reminder to Northwind" disabled placeholder="Waiting for reply" />,
  },
]
