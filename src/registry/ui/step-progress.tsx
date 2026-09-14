"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
function StepProgress({ steps, current, className }: { steps: string[]; current: number; className?: string }) {
  return (
    <ol data-slot="step-progress" className={cn("flex w-full items-center gap-2", className)}>
      {steps.map((s, i) => {
        const done = i < current
        const active = i === current
        return (
          <li key={s} className="flex flex-1 flex-col gap-1">
            <div className={cn("h-1 rounded-full", done || active ? "bg-accent" : "bg-sunken")} />
            <span className={cn("text-[11px]", active ? "font-medium text-fg" : "text-fg-muted")}>{s}</span>
          </li>
        )
      })}
    </ol>
  )
}
export { StepProgress }
