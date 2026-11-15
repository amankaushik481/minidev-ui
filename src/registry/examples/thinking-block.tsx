"use client"
import * as React from "react"
import { ThinkingBlock } from "@/registry/ui/thinking-block"
import { MessageBubble } from "@/registry/ui/message-bubble"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function ThinkingLive() {
  const [done, setDone] = React.useState(false)
  React.useEffect(() => {
    if (done) return
    const t = setTimeout(() => setDone(true), 3000)
    return () => clearTimeout(t)
  }, [done])
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <ThinkingBlock label={done ? "Thought for 3s" : "Thinking…"} defaultOpen>
        Comparing September and October payouts, then checking which refunds landed after the cutoff.
      </ThinkingBlock>
      <Button variant="outline" size="sm" className="self-start" onClick={() => setDone(false)}>Restart</Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Above the answer",
    description: "Closed by default, so the reasoning stays out of the way until someone opens it.",
    code: `<div className="flex w-full max-w-md flex-col gap-2">
  <ThinkingBlock label="Thought for 6s">
    Looked up open invoices for Northwind. INV-2041 is not due until Oct 24; INV-2033 passed its due date on Oct 18,
    so only that one needs a reminder.
  </ThinkingBlock>
  <MessageBubble role="assistant">Only INV-2033 is overdue. Want me to draft the reminder?</MessageBubble>
</div>`,
    node: (
      <div className="flex w-full max-w-md flex-col gap-2">
        <ThinkingBlock label="Thought for 6s">
          Looked up open invoices for Northwind. INV-2041 is not due until Oct 24; INV-2033 passed its due date on Oct 18,
          so only that one needs a reminder.
        </ThinkingBlock>
        <MessageBubble role="assistant">Only INV-2033 is overdue. Want me to draft the reminder?</MessageBubble>
      </div>
    ),
  },
  {
    title: "Label while thinking",
    description: "Change label from Thinking… to the elapsed time when the model finishes.",
    code: `function ThinkingLive() {
  const [done, setDone] = React.useState(false)
  React.useEffect(() => {
    if (done) return
    const t = setTimeout(() => setDone(true), 3000)
    return () => clearTimeout(t)
  }, [done])
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <ThinkingBlock label={done ? "Thought for 3s" : "Thinking…"} defaultOpen>
        Comparing September and October payouts, then checking which refunds landed after the cutoff.
      </ThinkingBlock>
      <Button variant="outline" size="sm" className="self-start" onClick={() => setDone(false)}>Restart</Button>
    </div>
  )
}`,
    node: <ThinkingLive />,
  },
]
