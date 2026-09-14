"use client"
import { Button } from "@/registry/ui/button"
import { InlineAlert } from "@/registry/ui/inline-alert"
import { cn } from "@/lib/utils"

function RetryBlock({
  title = "Request failed",
  description = "Check your connection and try again.",
  onRetry,
  className,
}: {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}) {
  return (
    <div data-slot="retry-block" className={cn("space-y-3", className)}>
      <InlineAlert title={title} tone="danger">{description}</InlineAlert>
      <Button type="button" variant="outline" size="sm" onClick={onRetry}>Try again</Button>
    </div>
  )
}
export { RetryBlock }
