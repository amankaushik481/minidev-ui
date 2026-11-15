"use client"
import * as React from "react"
import { NotebookCell } from "@/registry/ui/notebook-cell"
import type { Example } from "./types"

const RESULT = "plan     customers\nfree         1,204\npro            318\nstudio          41"

function RunnableCell() {
  const [running, setRunning] = React.useState(false)
  const [output, setOutput] = React.useState<string | null>(null)
  const run = () => {
    setRunning(true)
    setTimeout(() => {
      setOutput(RESULT)
      setRunning(false)
    }, 900)
  }
  return (
    <NotebookCell
      className="w-full max-w-xl"
      filename="plans.sql"
      code={"select plan, count(*) as customers\nfrom accounts\ngroup by plan;"}
      output={output}
      running={running}
      onRun={run}
    />
  )
}

export const examples: Example[] = [
  {
    title: "Run a query",
    description: "onRun is your code: set running while it works, then pass the result as output.",
    code: `const RESULT = "plan     customers\\nfree         1,204\\npro            318\\nstudio          41"

function RunnableCell() {
  const [running, setRunning] = React.useState(false)
  const [output, setOutput] = React.useState<string | null>(null)
  const run = () => {
    setRunning(true)
    setTimeout(() => {
      setOutput(RESULT)
      setRunning(false)
    }, 900)
  }
  return (
    <NotebookCell
      className="w-full max-w-xl"
      filename="plans.sql"
      code={"select plan, count(*) as customers\\nfrom accounts\\ngroup by plan;"}
      output={output}
      running={running}
      onRun={run}
    />
  )
}`,
    node: <RunnableCell />,
  },
  {
    title: "Saved result",
    description: "Pass output without onRun to show a finished cell, for example in a shared report.",
    code: `<NotebookCell
  className="w-full max-w-xl"
  filename="overdue.ts"
  code="await lumen.invoices.count({ status: 'overdue' })"
  output="3"
/>`,
    node: (
      <NotebookCell
        className="w-full max-w-xl"
        filename="overdue.ts"
        code="await lumen.invoices.count({ status: 'overdue' })"
        output="3"
      />
    ),
  },
]
