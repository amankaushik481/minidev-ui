"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Progress } from "@/registry/ui/progress"

function TokenUsageMeter({
  used = 128_400,
  limit = 200_000,
  className,
}: {
  used?: number
  limit?: number
  className?: string
}) {
  const id = React.useId()
  const pct = Math.min(100, Math.round((used / limit) * 100))
  return (
    <div data-slot="token-usage-meter" className={cn("space-y-2 rounded-xl border border-border bg-surface p-4 shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]", className)}>
      <div className="flex justify-between text-sm">
        <span className="font-medium text-fg" id={id}>Token usage</span>
        <span className="font-mono tabular-nums text-fg-muted">{used.toLocaleString()} / {limit.toLocaleString()}</span>
      </div>
      <Progress value={pct} aria-labelledby={id} />
      <p className="text-xs text-fg-muted">{pct}% of monthly budget · resets on the 1st</p>
    </div>
  )
}
export { TokenUsageMeter }
