"use client"
import * as React from "react"
import { MessageBubble } from "@/registry/ui/message-bubble"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function StreamingBubble() {
  const words = "The October payout is $48,210.55. It lands on Nov 3 because the 1st is a Saturday.".split(" ")
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    if (count >= words.length) return
    const t = setTimeout(() => setCount((c) => c + 1), 90)
    return () => clearTimeout(t)
  }, [count, words.length])
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageBubble role="user">When does the October payout land?</MessageBubble>
      <MessageBubble role="assistant" streaming={count < words.length}>{words.slice(0, count).join(" ")}</MessageBubble>
      <Button variant="outline" size="sm" className="self-start" onClick={() => setCount(0)}>Replay</Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Three roles",
    description: "User turns sit right in a capsule, assistant turns are plain prose, and a system turn is a quiet divider.",
    code: `<div className="flex w-full max-w-md flex-col gap-3">
  <MessageBubble role="system">Tuesday, 10:02</MessageBubble>
  <MessageBubble role="user">How many seats does Halcyon Labs pay for?</MessageBubble>
  <MessageBubble role="assistant">
    <span className="sr-only">Assistant: </span>
    42 seats on the Team plan. Nine were added in October.
  </MessageBubble>
</div>`,
    node: (
      <div className="flex w-full max-w-md flex-col gap-3">
        <MessageBubble role="system">Tuesday, 10:02</MessageBubble>
        <MessageBubble role="user">How many seats does Halcyon Labs pay for?</MessageBubble>
        <MessageBubble role="assistant">
          <span className="sr-only">Assistant: </span>
          42 seats on the Team plan. Nine were added in October.
        </MessageBubble>
      </div>
    ),
  },
  {
    title: "Streaming reply",
    description: "streaming shows the caret and sets aria-busy until the last token arrives.",
    code: `function StreamingBubble() {
  const words = "The October payout is $48,210.55. It lands on Nov 3 because the 1st is a Saturday.".split(" ")
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    if (count >= words.length) return
    const t = setTimeout(() => setCount((c) => c + 1), 90)
    return () => clearTimeout(t)
  }, [count, words.length])
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageBubble role="user">When does the October payout land?</MessageBubble>
      <MessageBubble role="assistant" streaming={count < words.length}>{words.slice(0, count).join(" ")}</MessageBubble>
      <Button variant="outline" size="sm" className="self-start" onClick={() => setCount(0)}>Replay</Button>
    </div>
  )
}`,
    node: <StreamingBubble />,
  },
]
