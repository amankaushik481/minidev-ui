"use client"
import * as React from "react"
import { StopGenerating } from "@/registry/ui/stop-generating"
import { StreamingMessage } from "@/registry/ui/streaming-message"
import { AgentTrace } from "@/registry/ui/agent-trace"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function StopDemo() {
  const words = "Here is the reminder for INV-2033. Hi Maya, a quick note that invoice INV-2033 for $3,150.00 was due on Oct 18. You can pay it from the link below.".split(" ")
  const [count, setCount] = React.useState(0)
  const [running, setRunning] = React.useState(false)
  const streaming = running && count < words.length
  React.useEffect(() => {
    if (!streaming) return
    const t = setTimeout(() => setCount((c) => c + 1), 120)
    return () => clearTimeout(t)
  }, [streaming, count])
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <StreamingMessage content={words.slice(0, count).join(" ") || "Press Draft to start."} streaming={streaming} />
      {streaming ? (
        <StopGenerating className="self-start" onClick={() => setRunning(false)} />
      ) : (
        <Button variant="outline" size="sm" className="self-start" onClick={() => { setCount(0); setRunning(true) }}>Draft reminder</Button>
      )}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Stop a streaming reply",
    description: "Render it only while streaming. Stopping keeps the text received so far.",
    code: `function StopDemo() {
  const words = "Here is the reminder for INV-2033. Hi Maya, a quick note that invoice INV-2033 for $3,150.00 was due on Oct 18. You can pay it from the link below.".split(" ")
  const [count, setCount] = React.useState(0)
  const [running, setRunning] = React.useState(false)
  const streaming = running && count < words.length
  React.useEffect(() => {
    if (!streaming) return
    const t = setTimeout(() => setCount((c) => c + 1), 120)
    return () => clearTimeout(t)
  }, [streaming, count])
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <StreamingMessage content={words.slice(0, count).join(" ") || "Press Draft to start."} streaming={streaming} />
      {streaming ? (
        <StopGenerating className="self-start" onClick={() => setRunning(false)} />
      ) : (
        <Button variant="outline" size="sm" className="self-start" onClick={() => { setCount(0); setRunning(true) }}>Draft reminder</Button>
      )}
    </div>
  )
}`,
    node: <StopDemo />,
  },
  {
    title: "Stop an agent run",
    description: "label renames the button for what is being stopped.",
    code: `<div className="flex w-full max-w-lg flex-col gap-3">
  <AgentTrace
    title="Reconcile October"
    steps={[
      { id: "1", name: "fetch_bank_transactions(oct)", status: "done", duration: "1.1s" },
      { id: "2", name: "match_invoices", status: "running" },
      { id: "3", name: "post_summary(#finance)", status: "pending" },
    ]}
  />
  <StopGenerating className="self-start" label="Stop agent" />
</div>`,
    node: (
      <div className="flex w-full max-w-lg flex-col gap-3">
        <AgentTrace
          title="Reconcile October"
          steps={[
            { id: "1", name: "fetch_bank_transactions(oct)", status: "done", duration: "1.1s" },
            { id: "2", name: "match_invoices", status: "running" },
            { id: "3", name: "post_summary(#finance)", status: "pending" },
          ]}
        />
        <StopGenerating className="self-start" label="Stop agent" />
      </div>
    ),
  },
]
