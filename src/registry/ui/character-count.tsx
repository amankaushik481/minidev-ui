"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function CharacterCount({
  value = 0,
  max,
  className,
}: {
  value?: number
  max: number
  className?: string
}) {
  const over = value > max
  return (
    <p
      data-slot="character-count"
      aria-live="polite"
      className={cn(
        "text-xs tabular-nums",
        over ? "text-danger" : "text-fg-muted",
        className
      )}
    >
      {value}/{max}
    </p>
  )
}
export { CharacterCount }
