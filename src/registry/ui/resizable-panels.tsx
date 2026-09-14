"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function ResizablePanels({
  left,
  right,
  initial = 50,
  className,
}: {
  left: React.ReactNode
  right: React.ReactNode
  initial?: number
  className?: string
}) {
  const [pct, setPct] = React.useState(initial)
  const dragging = React.useRef(false)
  React.useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return
      const root = document.getElementById("resizable-root")
      if (!root) return
      const rect = root.getBoundingClientRect()
      setPct(Math.min(80, Math.max(20, ((e.clientX - rect.left) / rect.width) * 100)))
    }
    const onUp = () => { dragging.current = false }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [])
  return (
    <div id="resizable-root" data-slot="resizable-panels" className={cn("flex min-h-64 overflow-hidden rounded-xl border border-border", className)}>
      <div className="overflow-auto p-4" style={{ width: `${pct}%` }}>{left}</div>
      <div
        role="separator"
        aria-orientation="vertical"
        aria-valuenow={Math.round(pct)}
        aria-label="Resize panels"
        tabIndex={0}
        className="w-1 shrink-0 cursor-col-resize bg-border hover:bg-accent focus-visible:bg-accent outline-none"
        onPointerDown={() => { dragging.current = true }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPct((p) => Math.max(20, p - 2))
          if (e.key === "ArrowRight") setPct((p) => Math.min(80, p + 2))
        }}
      />
      <div className="min-w-0 flex-1 overflow-auto p-4">{right}</div>
    </div>
  )
}
export { ResizablePanels }
