"use client"
import { RefreshCwIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

function RegenerateBar({
  onRegenerate,
  onEdit,
  className,
}: {
  onRegenerate?: () => void
  onEdit?: () => void
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
      <span className="text-xs text-fg-muted">Not quite right?</span>
      <div className="flex gap-2">
        {onEdit ? (
          <Button type="button" size="sm" variant="ghost" onClick={onEdit}>Edit prompt</Button>
        ) : null}
        <Button type="button" size="sm" variant="outline" onClick={onRegenerate}>
          <RefreshCwIcon className="size-3.5" aria-hidden />
          Regenerate
        </Button>
      </div>
    </div>
  )
}
export { RegenerateBar }
