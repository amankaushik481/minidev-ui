"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { ErrorState } from "@/registry/ui/error-state"
import type { Example } from "./types"

function ReportsPanel() {
  const [failed, setFailed] = React.useState(true)
  if (failed) {
    return (
      <ErrorState
        className="w-full max-w-md"
        title="Couldn't load reports"
        description="The reports service did not answer. Nothing was lost."
        onRetry={() => setFailed(false)}
      />
    )
  }
  return (
    <div className="flex w-full max-w-md items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg">
      3 reports loaded.
      <Button variant="outline" size="sm" onClick={() => setFailed(true)}>Fail again</Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Failed fetch with retry",
    description: "onRetry adds the button; swap the panel back to your content when the refetch succeeds.",
    code: `function ReportsPanel() {
  const [failed, setFailed] = React.useState(true)
  if (failed) {
    return (
      <ErrorState
        className="w-full max-w-md"
        title="Couldn't load reports"
        description="The reports service did not answer. Nothing was lost."
        onRetry={() => setFailed(false)}
      />
    )
  }
  return (
    <div className="flex w-full max-w-md items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg">
      3 reports loaded.
      <Button variant="outline" size="sm" onClick={() => setFailed(true)}>Fail again</Button>
    </div>
  )
}`,
    node: <ReportsPanel />,
  },
  {
    title: "A failure retrying won't fix",
    description: "Leave out onRetry and say what to do instead in the description.",
    code: `<ErrorState
  className="w-full max-w-md"
  title="This export has expired"
  description="Exports are kept for 7 days. Start a new one from Reports, Export."
/>`,
    node: (
      <ErrorState
        className="w-full max-w-md"
        title="This export has expired"
        description="Exports are kept for 7 days. Start a new one from Reports, Export."
      />
    ),
  },
]
