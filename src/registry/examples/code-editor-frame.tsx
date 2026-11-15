"use client"
import * as React from "react"
import { CodeEditorFrame } from "@/registry/ui/code-editor-frame"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function QueryDemo() {
  const [sql, setSql] = React.useState("select customer, sum(amount)\nfrom invoices\nwhere status = 'overdue'\ngroup by customer;")
  const [ran, setRan] = React.useState("")
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <CodeEditorFrame
        filename="overdue.sql"
        actions={
          <Button size="xs" variant="ghost" onClick={() => setRan("4 rows in 38ms")}>
            Run
          </Button>
        }
      >
        <textarea
          aria-label="SQL query"
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          rows={6}
          spellCheck={false}
          className="w-full resize-none bg-transparent outline-none"
        />
      </CodeEditorFrame>
      <p className="text-xs text-fg-muted tabular-nums" aria-live="polite">{ran}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Textarea with a Run button",
    description: "The frame is chrome only: put your editor inside and give it its own label. actions sit at the end of the tab bar.",
    code: `function QueryDemo() {
  const [sql, setSql] = React.useState("select customer, sum(amount)\\nfrom invoices\\nwhere status = 'overdue'\\ngroup by customer;")
  const [ran, setRan] = React.useState("")
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <CodeEditorFrame
        filename="overdue.sql"
        actions={
          <Button size="xs" variant="ghost" onClick={() => setRan("4 rows in 38ms")}>
            Run
          </Button>
        }
      >
        <textarea
          aria-label="SQL query"
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          rows={6}
          spellCheck={false}
          className="w-full resize-none bg-transparent outline-none"
        />
      </CodeEditorFrame>
      <p className="text-xs text-fg-muted tabular-nums" aria-live="polite">{ran}</p>
    </div>
  )
}`,
    node: <QueryDemo />,
  },
  {
    title: "Read-only output",
    description: "Without a filename or actions the tab bar is hidden and the frame has no role.",
    code: `<CodeEditorFrame className="w-full max-w-lg">
  <pre>{\`{
  "id": "inv_2041",
  "customer": "Northwind",
  "amount": 128000,
  "status": "open"
}\`}</pre>
</CodeEditorFrame>`,
    node: (
      <CodeEditorFrame className="w-full max-w-lg">
        <pre>{`{
  "id": "inv_2041",
  "customer": "Northwind",
  "amount": 128000,
  "status": "open"
}`}</pre>
      </CodeEditorFrame>
    ),
  },
]
