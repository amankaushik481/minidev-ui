"use client"
import * as React from "react"
import { CopyIcon, RefreshCwIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

function MessageActions({
  onCopy,
  onRetry,
  onGood,
  onBad,
  className,
}: {
  onCopy?: () => void
  onRetry?: () => void
  onGood?: () => void
  onBad?: () => void
  className?: string
}) {
  return (
    <div data-slot="message-actions" className={cn("flex items-center gap-0.5", className)}>
      <IconButton type="button" size="icon-sm" variant="ghost" aria-label="Copy" onClick={onCopy}><CopyIcon /></IconButton>
      <IconButton type="button" size="icon-sm" variant="ghost" aria-label="Retry" onClick={onRetry}><RefreshCwIcon /></IconButton>
      <IconButton type="button" size="icon-sm" variant="ghost" aria-label="Good response" onClick={onGood}><ThumbsUpIcon /></IconButton>
      <IconButton type="button" size="icon-sm" variant="ghost" aria-label="Bad response" onClick={onBad}><ThumbsDownIcon /></IconButton>
    </div>
  )
}
export { MessageActions }
