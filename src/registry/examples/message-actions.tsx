"use client"
import * as React from "react"
import { MessageActions } from "@/registry/ui/message-actions"
import { MessageBubble } from "@/registry/ui/message-bubble"
import type { Example } from "./types"

function ReplyActions() {
  const reply = "INV-2033 is 6 days overdue. A reminder went to Maya Chen on Monday."
  const [vote, setVote] = React.useState<"good" | "bad" | null>(null)
  const [note, setNote] = React.useState("")
  return (
    <div className="w-full max-w-md space-y-1">
      <MessageBubble role="assistant">{reply}</MessageBubble>
      <div className="flex items-center gap-2">
        <MessageActions
          feedback={vote}
          onCopy={() => navigator.clipboard.writeText(reply).then(() => setNote("Copied"), () => setNote("Copy failed"))}
          onRetry={() => setNote("Regenerating…")}
          onGood={() => setVote((v) => (v === "good" ? null : "good"))}
          onBad={() => setVote((v) => (v === "bad" ? null : "bad"))}
        />
        <span aria-live="polite" className="text-xs text-fg-muted">{note}</span>
      </div>
    </div>
  )
}

function HoverActions() {
  const reply = "Halcyon Labs renews on Dec 1 at $18,000 a year, up from $15,600."
  return (
    <div className="group w-full max-w-md space-y-1">
      <MessageBubble role="assistant">{reply}</MessageBubble>
      <MessageActions
        onCopy={() => navigator.clipboard.writeText(reply)}
        className="opacity-0 transition-opacity duration-[70ms] group-hover:opacity-100 group-focus-within:opacity-100"
      />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Wired to a reply",
    description: "Copy writes to the clipboard in onCopy, and the vote lives in state so a second press clears it.",
    code: `function ReplyActions() {
  const reply = "INV-2033 is 6 days overdue. A reminder went to Maya Chen on Monday."
  const [vote, setVote] = React.useState<"good" | "bad" | null>(null)
  const [note, setNote] = React.useState("")
  return (
    <div className="w-full max-w-md space-y-1">
      <MessageBubble role="assistant">{reply}</MessageBubble>
      <div className="flex items-center gap-2">
        <MessageActions
          feedback={vote}
          onCopy={() => navigator.clipboard.writeText(reply).then(() => setNote("Copied"), () => setNote("Copy failed"))}
          onRetry={() => setNote("Regenerating…")}
          onGood={() => setVote((v) => (v === "good" ? null : "good"))}
          onBad={() => setVote((v) => (v === "bad" ? null : "bad"))}
        />
        <span aria-live="polite" className="text-xs text-fg-muted">{note}</span>
      </div>
    </div>
  )
}`,
    node: <ReplyActions />,
  },
  {
    title: "Shown on hover",
    description: "In a dense transcript, hide the row until the turn is hovered or something in it has keyboard focus. Only the handlers you pass get a button, so this row is Copy alone.",
    code: `function HoverActions() {
  const reply = "Halcyon Labs renews on Dec 1 at $18,000 a year, up from $15,600."
  return (
    <div className="group w-full max-w-md space-y-1">
      <MessageBubble role="assistant">{reply}</MessageBubble>
      <MessageActions
        onCopy={() => navigator.clipboard.writeText(reply)}
        className="opacity-0 transition-opacity duration-[70ms] group-hover:opacity-100 group-focus-within:opacity-100"
      />
    </div>
  )
}`,
    node: <HoverActions />,
  },
]
