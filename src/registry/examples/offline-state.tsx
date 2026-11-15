"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { OfflineState } from "@/registry/ui/offline-state"
import type { Example } from "./types"

function RevenuePanel() {
  const [offline, setOffline] = React.useState(true)
  if (!offline) {
    return (
      <div className="flex w-full max-w-md items-center justify-between rounded-2xl border border-border bg-surface p-6 text-sm text-fg">
        Revenue chart loaded.
        <Button variant="outline" size="sm" onClick={() => setOffline(true)}>Go offline</Button>
      </div>
    )
  }
  return (
    <OfflineState
      className="w-full max-w-md"
      title="Revenue needs a connection"
      description="Figures come live from your bank feed. Invoices you draft now are saved on this device."
      onRetry={() => setOffline(false)}
    />
  )
}

export const examples: Example[] = [
  {
    title: "In place of a live panel",
    description: "Say what still works in description, and swap the real content back in when onRetry succeeds.",
    code: `function RevenuePanel() {
  const [offline, setOffline] = React.useState(true)
  if (!offline) {
    return (
      <div className="flex w-full max-w-md items-center justify-between rounded-2xl border border-border bg-surface p-6 text-sm text-fg">
        Revenue chart loaded.
        <Button variant="outline" size="sm" onClick={() => setOffline(true)}>Go offline</Button>
      </div>
    )
  }
  return (
    <OfflineState
      className="w-full max-w-md"
      title="Revenue needs a connection"
      description="Figures come live from your bank feed. Invoices you draft now are saved on this device."
      onRetry={() => setOffline(false)}
    />
  )
}`,
    node: <RevenuePanel />,
  },
  {
    title: "Sync paused",
    description: "retryLabel names what the button does in your product.",
    code: `<OfflineState
  className="w-full max-w-md"
  title="Sync paused"
  description="3 expense reports are waiting to upload. They will send when you reconnect."
  retryLabel="Try to sync now"
  onRetry={() => {}}
/>`,
    node: (
      <OfflineState
        className="w-full max-w-md"
        title="Sync paused"
        description="3 expense reports are waiting to upload. They will send when you reconnect."
        retryLabel="Try to sync now"
        onRetry={() => {}}
      />
    ),
  },
]
