"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
function CalendarMonth({ className, selected, onSelect }: { className?: string; selected?: number; onSelect?: (d: number) => void }) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1)
  return (
    <div data-slot="calendar-month" className={cn("w-72 rounded-xl border border-border p-3", className)}>
      <div className="mb-2 text-sm font-medium text-fg">September 2026</div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-fg-muted">
        {["S","M","T","W","T","F","S"].map((d) => <div key={d} className="py-1">{d}</div>)}
        {days.map((d) => (
          <button key={d} type="button" onClick={() => onSelect?.(d)} className={cn("h-8 rounded-lg text-fg hover:bg-sunken", selected === d && "bg-accent text-on-ink hover:bg-accent")}>{d}</button>
        ))}
      </div>
    </div>
  )
}
export { CalendarMonth }
