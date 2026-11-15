"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * A 500 error panel: status code, a plain-language headline, a retry button and a copyable request id for support.
 *
 * Use it where a server call failed and the user can retry. For a missing page use NotFoundState;
 * for an empty list use EmptyState; for an inline field error use FormField `error`.
 *
 * @example
 * <ServerErrorState onRetry={() => refetch()} requestId={error.requestId} />
 */
type ServerErrorStateProps = {
  /** Headline. */
  title?: React.ReactNode
  /** One line on what happened and what to do next. */
  description?: React.ReactNode
  /** Status code shown above the headline. */
  code?: string | number
  /** Called by the Retry button. Without it, no Retry button renders. */
  onRetry?: () => void
  /** Request id shown in mono and copied by the "Copy request id" button. Defaults to a sample id; pass "" to hide both. */
  requestId?: string
  className?: string
}

function ServerErrorState({
  title = "Something broke on our side",
  description = "The request failed on our server. Retry, or copy the request id for support.",
  code = 500,
  onRetry,
  requestId = "req_8f2c41d0",
  className,
}: ServerErrorStateProps) {
  const [copied, setCopied] = React.useState(false)
  React.useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(t)
  }, [copied])
  const copy = () => {
    if (!requestId) return
    navigator.clipboard?.writeText(requestId).then(() => setCopied(true), () => {})
  }
  return (
    <div data-slot="server-error-state" className={cn("rounded-2xl border border-danger/30 bg-surface p-6 shadow-highlight", className)}>
      <p className="font-mono text-xs tabular-nums text-danger">{code}</p>
      <h3 className="mt-2 text-lg font-medium tracking-[-0.014em] text-balance text-fg">{title}</h3>
      <p className="mt-2 text-sm text-pretty text-fg-muted">{description}</p>
      {requestId ? <p className="mt-2 font-mono text-xs text-fg-subtle">{requestId}</p> : null}
      <div className="mt-4 flex flex-wrap gap-2">
        {onRetry ? <Button size="sm" onClick={onRetry}>Retry</Button> : null}
        {requestId ? (
          <Button size="sm" variant="outline" onClick={copy}>
            {copied ? "Copied" : "Copy request id"}
          </Button>
        ) : null}
      </div>
      <span className="sr-only" role="status">{copied ? "Request id copied" : ""}</span>
    </div>
  )
}
export { ServerErrorState }
export type { ServerErrorStateProps }
