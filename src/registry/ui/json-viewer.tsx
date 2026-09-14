"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function JsonViewer({
  value,
  className,
}: {
  value: unknown
  className?: string
}) {
  const text = React.useMemo(() => {
    try {
      return JSON.stringify(value, null, 2)
    } catch {
      return String(value)
    }
  }, [value])
  return (
    <pre
      data-slot="json-viewer"
      className={cn(
        "overflow-auto rounded-xl border border-border bg-sunken p-3 font-mono text-[12px] leading-relaxed text-fg",
        className
      )}
    >
      {text}
    </pre>
  )
}
export { JsonViewer }
