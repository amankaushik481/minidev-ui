"use client"
import { cn } from "@/lib/utils"

function Stepper({
  steps = ["Details", "Members", "Billing"],
  current = 0,
  className,
}: {
  steps?: string[]
  current?: number
  className?: string
}) {
  return (
    <ol data-slot="stepper" className={cn("flex w-full items-center gap-2", className)}>
      {steps.map((s, i) => {
        const done = i < current
        const active = i === current
        return (
          <li key={s} className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div
              className={cn(
                "h-1 rounded-full",
                done || active ? "bg-accent" : "bg-border"
              )}
            />
            <span className={cn("truncate text-xs", active ? "font-medium text-fg" : "text-fg-muted")}>
              {i + 1}. {s}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
export { Stepper }
