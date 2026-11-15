"use client"
import * as React from "react"
import { AiComposer } from "@/registry/ui/ai-composer"
import type { Example } from "./types"

const MODELS = [
  { id: "orbit-mini", label: "Orbit Mini" },
  { id: "orbit-pro", label: "Orbit Pro" },
]

function StreamingComposer() {
  const [msg, setMsg] = React.useState("")
  const [model, setModel] = React.useState("orbit-pro")
  const [streaming, setStreaming] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  React.useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <AiComposer
      className="w-full max-w-lg"
      value={msg}
      onChange={setMsg}
      models={MODELS}
      model={model}
      onModelChange={setModel}
      streaming={streaming}
      onSubmit={() => {
        setMsg("")
        setStreaming(true)
        timer.current = setTimeout(() => setStreaming(false), 3000)
      }}
      onStop={() => {
        clearTimeout(timer.current)
        setStreaming(false)
      }}
      placeholder="Ask about this quarter's invoices…"
    />
  )
}

function StarterComposer() {
  const [sent, setSent] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <AiComposer
        models={MODELS}
        suggestions={["Which invoices are overdue?", "Draft a reminder to Northwind", "Compare Q2 and Q3 revenue"]}
        onSubmit={setSent}
      />
      <p className="text-xs text-fg-muted">{sent ? `Sent: ${sent}` : "Pick a suggestion or type, then press Enter."}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Send and stop",
    description: "Controlled text, a model choice and a streaming flag: the send button turns into Stop while the reply streams.",
    code: `const MODELS = [
  { id: "orbit-mini", label: "Orbit Mini" },
  { id: "orbit-pro", label: "Orbit Pro" },
]

function StreamingComposer() {
  const [msg, setMsg] = React.useState("")
  const [model, setModel] = React.useState("orbit-pro")
  const [streaming, setStreaming] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  React.useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <AiComposer
      className="w-full max-w-lg"
      value={msg}
      onChange={setMsg}
      models={MODELS}
      model={model}
      onModelChange={setModel}
      streaming={streaming}
      onSubmit={() => {
        setMsg("")
        setStreaming(true)
        timer.current = setTimeout(() => setStreaming(false), 3000)
      }}
      onStop={() => {
        clearTimeout(timer.current)
        setStreaming(false)
      }}
      placeholder="Ask about this quarter's invoices…"
    />
  )
}`,
    node: <StreamingComposer />,
  },
  {
    title: "Starter prompts",
    description: "Suggestions fill the input instead of sending, so people can edit them first. Uncontrolled, it clears itself after onSubmit.",
    code: `const MODELS = [
  { id: "orbit-mini", label: "Orbit Mini" },
  { id: "orbit-pro", label: "Orbit Pro" },
]

function StarterComposer() {
  const [sent, setSent] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <AiComposer
        models={MODELS}
        suggestions={["Which invoices are overdue?", "Draft a reminder to Northwind", "Compare Q2 and Q3 revenue"]}
        onSubmit={setSent}
      />
      <p className="text-xs text-fg-muted">{sent ? \`Sent: \${sent}\` : "Pick a suggestion or type, then press Enter."}</p>
    </div>
  )
}`,
    node: <StarterComposer />,
  },
]
