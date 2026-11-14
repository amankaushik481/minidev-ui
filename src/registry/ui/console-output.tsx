"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A monospace log pane for console or build output, with warn and error lines tagged in text and colour.
 *
 * Use for build logs, function logs and dev-tool panels. It is a keyboard-scrollable `role="log"` region.
 * For an interactive shell look use TerminalWindow; for a thrown error with frames use StackTrace.
 *
 * @example
 * <ConsoleOutput lines={[{ text: "ready on :3000" }, { level: "warn", text: "deprecated API" }, { level: "error", text: "fetch failed" }]} />
 */
type ConsoleOutputProps = {
  /** Lines oldest first. `level` defaults to "log". */
  lines?: ConsoleLine[]
  /** Accessible name for the log region. Defaults to "Console". */
  label?: string
  className?: string
}

type ConsoleLine = { level?: "log" | "info" | "warn" | "error"; text: string }

const TAG = {
  info: "text-info",
  warn: "text-warning",
  error: "text-danger",
} as const

function ConsoleOutput({ lines = [], label = "Console", className }: ConsoleOutputProps) {
  return (
    <div
      data-slot="console-output"
      role="log"
      aria-label={label}
      tabIndex={0}
      className={cn(
        "max-h-64 overflow-auto rounded-xl border border-border bg-sunken p-3 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
    >
      {lines.map((l, i) => {
        const level = l.level && l.level !== "log" ? l.level : null
        return (
          <p key={i} data-level={l.level ?? "log"} className="flex gap-2 leading-relaxed text-fg">
            {level ? <span className={cn("shrink-0 font-medium", TAG[level])}>{level}</span> : null}
            <span className="min-w-0 break-words whitespace-pre-wrap">{l.text}</span>
          </p>
        )
      })}
    </div>
  )
}
export { ConsoleOutput }
export type { ConsoleOutputProps, ConsoleLine as ConsoleOutputLine }
