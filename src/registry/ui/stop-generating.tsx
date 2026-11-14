"use client"
import * as React from "react"
import { SquareIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * An outline button with a stop square that cancels an in-flight AI response.
 *
 * Show it only while a response streams, next to the StreamingMessage or in the composer;
 * wire `onClick` to your AbortController. AiComposer swaps its send button for a stop button itself.
 *
 * @example
 * {isStreaming ? <StopGenerating onClick={() => controller.abort()} /> : null}
 */
type StopGeneratingProps = {
  /** Called when pressed; abort the request here. */
  onClick?: () => void
  /** Button text. */
  label?: string
  className?: string
}

function StopGenerating({ onClick, label = "Stop generating", className }: StopGeneratingProps) {
  return (
    <Button
      data-slot="stop-generating"
      type="button"
      variant="outline"
      size="sm"
      className={cn(className)}
      onClick={onClick}
    >
      <SquareIcon className="size-3.5 fill-current" aria-hidden />
      {label}
    </Button>
  )
}
export { StopGenerating }
export type { StopGeneratingProps }
