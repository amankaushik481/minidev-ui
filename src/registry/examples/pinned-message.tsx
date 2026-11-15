"use client"
import * as React from "react"
import { PinnedMessage } from "@/registry/ui/pinned-message"
import { MessageBubble } from "@/registry/ui/message-bubble"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function PinnedAboveThread() {
  const [pinned, setPinned] = React.useState(true)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {pinned ? (
        <PinnedMessage author="Maya Chen" body="Release freeze starts Friday at 18:00 UTC. Hotfixes only after that." onUnpin={() => setPinned(false)} />
      ) : (
        <Button variant="outline" size="sm" className="self-start" onClick={() => setPinned(true)}>Pin again</Button>
      )}
      <MessageBubble role="user">Is the billing fix going out before the freeze?</MessageBubble>
      <MessageBubble role="assistant">Yes, it ships in the Thursday release.</MessageBubble>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Above a thread, with unpin",
    description: "onUnpin shows the button; the component has no hidden state, so stop rendering it yourself.",
    code: `function PinnedAboveThread() {
  const [pinned, setPinned] = React.useState(true)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {pinned ? (
        <PinnedMessage author="Maya Chen" body="Release freeze starts Friday at 18:00 UTC. Hotfixes only after that." onUnpin={() => setPinned(false)} />
      ) : (
        <Button variant="outline" size="sm" className="self-start" onClick={() => setPinned(true)}>Pin again</Button>
      )}
      <MessageBubble role="user">Is the billing fix going out before the freeze?</MessageBubble>
      <MessageBubble role="assistant">Yes, it ships in the Thursday release.</MessageBubble>
    </div>
  )
}`,
    node: <PinnedAboveThread />,
  },
  {
    title: "Standing note",
    description: "Without onUnpin it is a read-only note, for channels where only admins manage pins.",
    code: `<PinnedMessage
  className="w-full max-w-md"
  author="Support leads"
  body="Refunds over $500 need a second approver. Tag @billing-oncall in the ticket."
/>`,
    node: (
      <PinnedMessage
        className="w-full max-w-md"
        author="Support leads"
        body="Refunds over $500 need a second approver. Tag @billing-oncall in the ticket."
      />
    ),
  },
]
