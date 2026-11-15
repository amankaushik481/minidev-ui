"use client"
import * as React from "react"
import { StreamingCursor } from "@/registry/ui/streaming-cursor"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function TypedSummary() {
  const text = "Three customers account for 61% of overdue revenue: Northwind, Halcyon Labs and Bright Path."
  const [n, setN] = React.useState(0)
  React.useEffect(() => {
    if (n >= text.length) return
    const t = setTimeout(() => setN((c) => c + 2), 30)
    return () => clearTimeout(t)
  }, [n, text.length])
  const done = n >= text.length
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <p aria-busy={!done} className="text-sm leading-[1.6] text-fg">
        {text.slice(0, n)}
        {done ? null : <StreamingCursor />}
      </p>
      <Button variant="outline" size="sm" className="self-start" onClick={() => setN(0)}>Replay</Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "After your own text",
    description: "Append the caret while tokens arrive and drop it when the text is complete.",
    code: `function TypedSummary() {
  const text = "Three customers account for 61% of overdue revenue: Northwind, Halcyon Labs and Bright Path."
  const [n, setN] = React.useState(0)
  React.useEffect(() => {
    if (n >= text.length) return
    const t = setTimeout(() => setN((c) => c + 2), 30)
    return () => clearTimeout(t)
  }, [n, text.length])
  const done = n >= text.length
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <p aria-busy={!done} className="text-sm leading-[1.6] text-fg">
        {text.slice(0, n)}
        {done ? null : <StreamingCursor />}
      </p>
      <Button variant="outline" size="sm" className="self-start" onClick={() => setN(0)}>Replay</Button>
    </div>
  )
}`,
    node: <TypedSummary />,
  },
  {
    title: "Terminal output",
    description: "The caret takes the text's height, so it also fits mono log lines.",
    code: `<pre className="w-full max-w-md rounded-xl border border-border bg-sunken p-3 font-mono text-xs leading-[1.7] text-fg-muted">
  {"$ npm run migrate\\nApplying 0042_invoice_reminders… done\\nApplying 0043_payout_index"}
  <StreamingCursor />
</pre>`,
    node: (
      <pre className="w-full max-w-md rounded-xl border border-border bg-sunken p-3 font-mono text-xs leading-[1.7] text-fg-muted">
        {"$ npm run migrate\nApplying 0042_invoice_reminders… done\nApplying 0043_payout_index"}
        <StreamingCursor />
      </pre>
    ),
  },
]
