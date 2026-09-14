"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type Line = { level?: "log" | "warn" | "error"; text: string }

function ConsoleOutput({ lines = [], className }: { lines?: Line[]; className?: string }) {
  return (
    <div
      data-slot="console-output"
      role="log"
      aria-label="Console"
      tabIndex={0}
      className={cn(
        "max-h-64 overflow-auto rounded-xl border border-border bg-sunken p-3 font-mono text-[12px]",
        className
      )}
    >
      {lines.map((l, i) => (
        <p key={i} className="flex gap-2 leading-relaxed text-fg">
          {l.level === "error" ? (
            <span className="shrink-0 font-medium text-fg">error</span>
          ) : l.level === "warn" ? (
            <span className="shrink-0 font-medium text-fg">warn</span>
          ) : null}
          <span className="text-fg">{l.level === "error" || l.level === "warn" ? l.text : l.text}</span>
        </p>
      ))}
    </div>
  )
}
export { ConsoleOutput }
