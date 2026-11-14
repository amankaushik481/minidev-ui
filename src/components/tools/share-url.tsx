"use client"
import * as React from "react"
import { CopyButton } from "@/registry/ui/copy-button"

/**
 * Shareable tool state in the query string. `load` runs once on mount with the
 * current params; after that `values` are mirrored back with replaceState
 * (debounced, Safari throws past ~100 calls in 10s). Defaults give a clean URL.
 */
const noop = () => () => {}

export function useShareUrl(values: Record<string, string>, load: (p: URLSearchParams) => void): string {
  const qs = new URLSearchParams(values).toString()
  const [defaults] = React.useState(qs)
  const loaded = React.useRef(false)
  const base = React.useSyncExternalStore(noop, () => window.location.origin + window.location.pathname, () => "")
  React.useEffect(() => {
    load(new URLSearchParams(window.location.search))
    loaded.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  React.useEffect(() => {
    if (!loaded.current) return
    const t = setTimeout(() => {
      const path = window.location.pathname + (qs === defaults ? "" : `?${qs}`) + window.location.hash
      window.history.replaceState(null, "", path)
    }, 300)
    return () => clearTimeout(t)
  }, [qs, defaults])
  return base ? (qs === defaults ? base : `${base}?${qs}`) : ""
}

/** "Copy link" for the current tool state. */
export function ShareLink({ href }: { href: string }) {
  return (
    <CopyButton value={href} disabled={!href} label="Copy link" copiedLabel="Link copied" variant="outline" size="sm" />
  )
}
