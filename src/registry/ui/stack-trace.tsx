"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A scrollable, monospaced error stack in the danger tone, preserving line breaks and indentation.
 *
 * Use it in error pages, logs and AI tool-call failures. For general code use CodeBlock; for an
 * error summary with retry use ServerErrorState.
 *
 * @example
 * <StackTrace stack={error.stack ?? String(error)} />
 */
type StackTraceProps = {
  /** The raw stack text, e.g. `error.stack`. */
  stack: string
  /** Accessible name for the scroll region. */
  label?: string
  className?: string
}

function StackTrace({ stack, label = "Stack trace", className }: StackTraceProps) {
  return (
    // focusable so keyboard users can scroll long traces
    <pre
      data-slot="stack-trace"
      role="region"
      aria-label={label}
      tabIndex={0}
      className={cn(
        "overflow-auto rounded-xl border border-danger/30 bg-danger/5 p-3 font-mono text-xs leading-relaxed text-danger outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
    >
      {stack}
    </pre>
  )
}
export { StackTrace }
export type { StackTraceProps }
