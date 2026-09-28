"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function BeforeAfterWipe({
  beforeLabel = "Generic dashboard",
  afterLabel = "Redesigned",
  className,
}: {
  beforeLabel?: string
  afterLabel?: string
  className?: string
}) {
  const [pct, setPct] = React.useState(50)
  const ref = React.useRef<HTMLDivElement>(null)
  const dragging = React.useRef(false)

  const setFromClientX = (clientX: number) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const next = ((clientX - r.left) / r.width) * 100
    // Full travel — edge to edge, no fake inset dead zone
    setPct(Math.min(100, Math.max(0, next)))
  }

  return (
    <div
      ref={ref}
      data-slot="before-after-wipe"
      data-tier="premium"
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-sunken select-none",
        className
      )}
      onPointerDown={(e) => {
        dragging.current = true
        ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
        setFromClientX(e.clientX)
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return
        setFromClientX(e.clientX)
      }}
      onPointerUp={() => {
        dragging.current = false
      }}
      onPointerCancel={() => {
        dragging.current = false
      }}
    >
      <div className="absolute inset-0 p-6">
        <p className="text-xs font-medium uppercase text-fg-muted">{beforeLabel}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 opacity-60">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 rounded-lg border border-border bg-surface" />
          ))}
        </div>
      </div>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
      >
        <div className="absolute inset-0 bg-bg p-6">
          <p className="text-xs font-medium uppercase text-fg-muted">{afterLabel}</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-16 rounded-lg border border-border bg-surface shadow-highlight",
                  i === 1 && "border-accent/40 bg-accent/10"
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className="absolute inset-y-0 z-10 w-px bg-accent"
        style={{ left: `${pct}%` }}
        aria-hidden
      >
        <div className="absolute top-1/2 left-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-xs text-fg">
          ↔
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={0.1}
        value={pct}
        aria-label={`Compare: ${beforeLabel} versus ${afterLabel}. Position ${Math.round(pct)} percent.`}
        className="absolute inset-0 z-20 cursor-ew-resize opacity-0"
        onChange={(e) => setPct(Number(e.target.value))}
      />
    </div>
  )
}
export { BeforeAfterWipe }
