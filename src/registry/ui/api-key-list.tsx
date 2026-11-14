"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Badge } from "@/registry/ui/badge"
import { cn } from "@/lib/utils"

/**
 * A card listing API keys by name with a masked preview, creation date, and create and rotate actions.
 *
 * Use on a developer settings page. Never pass full secrets: show a masked `preview` and reveal a
 * new key once, in a dialog, after `onCreate`. Prefer `CreateApiKey` or `SecretReveal` for the one-time reveal and
 * `DataTable` for large key inventories with scopes and last-used columns.
 *
 * @example
 * <ApiKeyList
 *   keys={[{ id: "k1", name: "Production", preview: "md_live_••••8f2a", created: "Aug 12" }]}
 *   onCreate={openCreateDialog}
 *   onRotate={(key) => rotate(key.id)}
 * />
 */
type Key = {
  /** Stable key; falls back to `name`. */
  id?: string
  /** Human label, e.g. "Production". */
  name: string
  /** Masked secret, e.g. "md_live_••••8f2a". Never the full key. */
  preview?: string
  /** Alias of `preview`, kept for older callers. */
  hint?: string
  /** Pre-formatted creation date, shown as a badge. */
  created?: string
}

type ApiKeyListProps = {
  /** Keys to list. Omit for sample data. */
  keys?: Key[]
  /** Heading of the card. */
  title?: React.ReactNode
  /** Called by "Create key". */
  onCreate?: () => void
  /** Called by a row's "Rotate" button with that key. */
  onRotate?: (key: Key) => void
  className?: string
}

const SAMPLE_KEYS: Key[] = [
  { id: "1", name: "Production", preview: "md_live_••••8f2a", created: "Aug 12" },
  { id: "2", name: "Staging", preview: "md_test_••••91c0", created: "Sep 1" },
]

function ApiKeyList({ keys, title = "API keys", onCreate, onRotate, className }: ApiKeyListProps) {
  const list = keys ?? SAMPLE_KEYS
  const headingId = React.useId()
  return (
    <section aria-labelledby={headingId} data-slot="api-key-list" className={cn("overflow-hidden rounded-2xl border border-border bg-surface shadow-highlight", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <h3 id={headingId} className="text-sm font-medium text-fg">{title}</h3>
        <Button type="button" size="sm" onClick={onCreate}>Create key</Button>
      </div>
      {list.length ? (
        <ul>
          {list.map((k) => (
            <li key={k.id ?? k.name} className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 last:border-b-0">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-fg">{k.name}</p>
                <p className="truncate font-mono text-xs text-fg-muted">{k.preview ?? k.hint}</p>
              </div>
              <div className="flex items-center gap-2">
                {k.created ? <Badge variant="outline" className="tabular-nums">{k.created}</Badge> : null}
                <Button type="button" size="sm" variant="outline" aria-label={`Rotate ${k.name} key`} onClick={() => onRotate?.(k)}>Rotate</Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-4 py-6 text-center text-sm text-fg-muted">No keys yet. Create one to call the API.</p>
      )}
    </section>
  )
}
export { ApiKeyList }
export type { ApiKeyListProps, Key as ApiKeyListItem }
