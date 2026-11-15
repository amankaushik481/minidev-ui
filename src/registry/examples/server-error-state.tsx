"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { ServerErrorState } from "@/registry/ui/server-error-state"
import type { Example } from "./types"

function ExportPanel() {
  const [failed, setFailed] = React.useState(true)
  if (!failed) {
    return (
      <div className="flex w-full max-w-md items-center justify-between rounded-2xl border border-border bg-surface p-6 text-sm text-fg">
        Export ready: ledger-2026-10.csv
        <Button variant="outline" size="sm" onClick={() => setFailed(true)}>Fail again</Button>
      </div>
    )
  }
  return (
    <ServerErrorState
      className="w-full max-w-md"
      title="The export failed on our side"
      description="Retry in a moment. If it fails again, send support the request id."
      requestId="req_3b91f0aa"
      onRetry={() => setFailed(false)}
    />
  )
}

export const examples: Example[] = [
  {
    title: "Retry and a request id for support",
    description: "Pass the id from your error response; Copy request id puts it on the clipboard (HTTPS or localhost only).",
    code: `function ExportPanel() {
  const [failed, setFailed] = React.useState(true)
  if (!failed) {
    return (
      <div className="flex w-full max-w-md items-center justify-between rounded-2xl border border-border bg-surface p-6 text-sm text-fg">
        Export ready: ledger-2026-10.csv
        <Button variant="outline" size="sm" onClick={() => setFailed(true)}>Fail again</Button>
      </div>
    )
  }
  return (
    <ServerErrorState
      className="w-full max-w-md"
      title="The export failed on our side"
      description="Retry in a moment. If it fails again, send support the request id."
      requestId="req_3b91f0aa"
      onRetry={() => setFailed(false)}
    />
  )
}`,
    node: <ExportPanel />,
  },
  {
    title: "Maintenance, no request id",
    description: "requestId defaults to a sample value, so pass an empty string to hide the id and its button. Leave out onRetry and the Retry button goes too.",
    code: `<ServerErrorState
  className="w-full max-w-md"
  code={503}
  title="Lumen is down for maintenance"
  description="We are upgrading the database. It should be back by 02:00 UTC."
  requestId=""
/>`,
    node: (
      <ServerErrorState
        className="w-full max-w-md"
        code={503}
        title="Lumen is down for maintenance"
        description="We are upgrading the database. It should be back by 02:00 UTC."
        requestId=""
      />
    ),
  },
]
