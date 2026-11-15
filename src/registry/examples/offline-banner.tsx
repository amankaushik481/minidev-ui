"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { OfflineBanner } from "@/registry/ui/offline-banner"
import type { Example } from "./types"

function subscribe(onChange: () => void) {
  window.addEventListener("online", onChange)
  window.addEventListener("offline", onChange)
  return () => {
    window.removeEventListener("online", onChange)
    window.removeEventListener("offline", onChange)
  }
}

// The server snapshot says online, so the first render matches the server HTML.
function useOnline() {
  return React.useSyncExternalStore(subscribe, () => navigator.onLine, () => true)
}

function ConnectionAware() {
  const online = useOnline()
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-surface">
      {!online ? <OfflineBanner /> : null}
      <p className="px-4 py-3 text-sm text-fg-muted">
        {online ? "Online. Turn off your network to see the banner appear." : "Edits are kept on this device."}
      </p>
    </div>
  )
}

function RetryDemo() {
  const [online, setOnline] = React.useState(false)
  if (online) {
    return <Button variant="outline" size="sm" onClick={() => setOnline(false)}>Go offline again</Button>
  }
  return <OfflineBanner className="w-full max-w-2xl rounded-xl border" onRetry={() => setOnline(true)} />
}

export const examples: Example[] = [
  {
    title: "Driven by navigator.onLine",
    description: "The banner does not watch the network itself; this hook does, through the online and offline events.",
    code: `function subscribe(onChange: () => void) {
  window.addEventListener("online", onChange)
  window.addEventListener("offline", onChange)
  return () => {
    window.removeEventListener("online", onChange)
    window.removeEventListener("offline", onChange)
  }
}

// The server snapshot says online, so the first render matches the server HTML.
function useOnline() {
  return React.useSyncExternalStore(subscribe, () => navigator.onLine, () => true)
}

function ConnectionAware() {
  const online = useOnline()
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-surface">
      {!online ? <OfflineBanner /> : null}
      <p className="px-4 py-3 text-sm text-fg-muted">
        {online ? "Online. Turn off your network to see the banner appear." : "Edits are kept on this device."}
      </p>
    </div>
  )
}`,
    node: <ConnectionAware />,
  },
  {
    title: "With Retry",
    description: "onRetry adds the button; reconnect or refetch there.",
    code: `function RetryDemo() {
  const [online, setOnline] = React.useState(false)
  if (online) {
    return <Button variant="outline" size="sm" onClick={() => setOnline(false)}>Go offline again</Button>
  }
  return <OfflineBanner className="w-full max-w-2xl rounded-xl border" onRetry={() => setOnline(true)} />
}`,
    node: <RetryDemo />,
  },
]
