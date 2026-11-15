"use client"
import * as React from "react"
import { ConsoleOutput, type ConsoleOutputLine } from "@/registry/ui/console-output"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

const STEPS: ConsoleOutputLine[] = [
  { level: "info", text: "Pulling invoices updated since 02:00" },
  { text: "Fetched 1,284 invoices in 3 pages" },
  { level: "warn", text: "INV-2041 has no tax region, defaulting to the workspace region" },
  { level: "error", text: "Ledger rejected INV-2077: account 4010 is closed" },
  { text: "Sync finished: 1,283 exported, 1 failed" },
]

function StreamDemo() {
  const [count, setCount] = React.useState(1)
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <ConsoleOutput label="Ledger sync log" lines={STEPS.slice(0, count)} />
      <Button size="sm" variant="outline" className="self-start" disabled={count >= STEPS.length} onClick={() => setCount((c) => c + 1)}>
        Next line
      </Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Build log",
    description: "Lines without a level are plain; warn, info and error lines start with the level as a word.",
    code: `<ConsoleOutput
  className="w-full max-w-lg"
  label="Build output"
  lines={[
    { text: "> next build" },
    { level: "info", text: "Creating an optimized production build" },
    { level: "warn", text: "Image in app/invoices/page.tsx has no width or height" },
    { text: "Compiled 214 pages in 41s" },
  ]}
/>`,
    node: (
      <ConsoleOutput
        className="w-full max-w-lg"
        label="Build output"
        lines={[
          { text: "> next build" },
          { level: "info", text: "Creating an optimized production build" },
          { level: "warn", text: "Image in app/invoices/page.tsx has no width or height" },
          { text: "Compiled 214 pages in 41s" },
        ]}
      />
    ),
  },
  {
    title: "Lines arriving over time",
    description: "role=\"log\" is a polite live region, so screen readers read each new line. The pane does not scroll itself.",
    code: `const STEPS: ConsoleOutputLine[] = [
  { level: "info", text: "Pulling invoices updated since 02:00" },
  { text: "Fetched 1,284 invoices in 3 pages" },
  { level: "warn", text: "INV-2041 has no tax region, defaulting to the workspace region" },
  { level: "error", text: "Ledger rejected INV-2077: account 4010 is closed" },
  { text: "Sync finished: 1,283 exported, 1 failed" },
]

function StreamDemo() {
  const [count, setCount] = React.useState(1)
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <ConsoleOutput label="Ledger sync log" lines={STEPS.slice(0, count)} />
      <Button size="sm" variant="outline" className="self-start" disabled={count >= STEPS.length} onClick={() => setCount((c) => c + 1)}>
        Next line
      </Button>
    </div>
  )
}`,
    node: <StreamDemo />,
  },
]
