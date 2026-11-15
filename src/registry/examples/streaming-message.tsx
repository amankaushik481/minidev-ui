"use client"
import * as React from "react"
import { StreamingMessage } from "@/registry/ui/streaming-message"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function LiveReply() {
  const words = "Two tests fail because the fixture still uses the old invoice shape. Rename amount to amount_cents in fixtures/invoice.json and both pass.".split(" ")
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    if (count >= words.length) return
    const t = setTimeout(() => setCount((c) => c + 1), 80)
    return () => clearTimeout(t)
  }, [count, words.length])
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <StreamingMessage content={words.slice(0, count).join(" ")} streaming={count < words.length} />
      <Button variant="outline" size="sm" className="self-start" onClick={() => setCount(0)}>Replay</Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Live stream",
    description: "Pass the text received so far and set streaming to false at the end, which removes the caret and aria-busy.",
    code: `function LiveReply() {
  const words = "Two tests fail because the fixture still uses the old invoice shape. Rename amount to amount_cents in fixtures/invoice.json and both pass.".split(" ")
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    if (count >= words.length) return
    const t = setTimeout(() => setCount((c) => c + 1), 80)
    return () => clearTimeout(t)
  }, [count, words.length])
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <StreamingMessage content={words.slice(0, count).join(" ")} streaming={count < words.length} />
      <Button variant="outline" size="sm" className="self-start" onClick={() => setCount(0)}>Replay</Button>
    </div>
  )
}`,
    node: <LiveReply />,
  },
  {
    title: "Finished message",
    description: "streaming defaults to true, so pass false once the reply is complete.",
    code: `<StreamingMessage
  className="w-full max-w-md"
  streaming={false}
  content="Done. Both tests pass after renaming amount to amount_cents in the fixture."
/>`,
    node: (
      <StreamingMessage
        className="w-full max-w-md"
        streaming={false}
        content="Done. Both tests pass after renaming amount to amount_cents in the fixture."
      />
    ),
  },
]
