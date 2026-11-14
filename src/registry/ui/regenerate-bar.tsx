"use client"
import * as React from "react"
import { RefreshCwIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * RegenerateBar — a "Not quite right?" footer under an AI answer with Regenerate and an optional Edit prompt button.
 *
 * Use it at the end of an assistant message. For per-message copy, like and retry icons use a
 * message actions row instead.
 *
 * @example
 * <RegenerateBar onRegenerate={retry} onEdit={() => setEditing(true)} pending={isStreaming} />
 */
function RegenerateBar({
  onRegenerate,
  onEdit,
  label = "Not quite right?",
  pending = false,
  className,
}: {
  /** Fires when Regenerate is pressed. */
  onRegenerate?: () => void
  /** Shows an Edit prompt button when set. */
  onEdit?: () => void
  /** Muted prompt on the left. */
  label?: React.ReactNode
  /** True while a new answer streams: Regenerate is disabled and its icon spins. */
  pending?: boolean
  className?: string
}) {
  return (
    <div
      data-slot="regenerate-bar"
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3",
        className
      )}
    >
      <span className="text-xs text-fg-muted">{label}</span>
      <div className="flex gap-2">
        {onEdit ? (
          <Button type="button" size="sm" variant="ghost" onClick={onEdit}>Edit prompt</Button>
        ) : null}
        <Button type="button" size="sm" variant="outline" onClick={onRegenerate} disabled={pending} aria-busy={pending || undefined}>
          <RefreshCwIcon className={cn("size-3.5", pending && "animate-spin")} aria-hidden />
          Regenerate
        </Button>
      </div>
    </div>
  )
}
export { RegenerateBar }
