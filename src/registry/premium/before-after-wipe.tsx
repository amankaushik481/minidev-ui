"use client"
import * as React from "react"
import { ChevronsLeftRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A before and after comparison: drag the divider (or use the arrow keys) to wipe between two layers.
 *
 * The divider is a real range input under the hood, so it is keyboard and
 * screen reader operable (Arrow keys, Home, End, Page Up/Down). Pass any
 * content as `before` and `after` (screenshots, mockups, two renders of a
 * component); with neither it shows a sample dashboard. Works uncontrolled
 * (`defaultValue`) or controlled (`value` + `onValueChange`). Use it for
 * redesigns, filters and "with vs without" proof; for flipping between more
 * than two states use AnimatedTabs.
 *
 * @example
 * <BeforeAfterWipe
 *   beforeLabel="Before"
 *   afterLabel="After"
 *   before={<img src="/old.png" alt="" className="size-full object-cover" />}
 *   after={<img src="/new.png" alt="" className="size-full object-cover" />}
 * />
 */
type BeforeAfterWipeProps = {
  /** Content of the left (before) layer. */
  before?: React.ReactNode
  /** Content of the right (after) layer, revealed as the divider moves left. */
  after?: React.ReactNode
  /** Name of the before layer, shown on the sample and read to screen readers. */
  beforeLabel?: string
  /** Name of the after layer. */
  afterLabel?: string
  /** Divider position in percent (0 shows only after, 100 only before) when controlled. */
  value?: number
  /** Initial divider position in percent when uncontrolled. */
  defaultValue?: number
  /** Called with the new divider position in percent. */
  onValueChange?: (value: number) => void
  className?: string
}

function SampleLayer({ label, after }: { label: string; after?: boolean }) {
  return (
    <div className={cn("absolute inset-0 p-6", after ? "bg-bg" : "bg-sunken")}>
      <p className="text-xs font-medium text-fg-muted uppercase">{label}</p>
      <div className={cn("mt-4 grid grid-cols-3 gap-2", !after && "opacity-60")}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-16 rounded-lg border border-border bg-surface",
              after && "shadow-raised",
              after && i === 1 && "border-accent-line bg-accent-soft"
            )}
          />
        ))}
      </div>
    </div>
  )
}

function BeforeAfterWipe({
  before,
  after,
  beforeLabel = "Generic dashboard",
  afterLabel = "Redesigned",
  value,
  defaultValue = 50,
  onValueChange,
  className,
}: BeforeAfterWipeProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const pct = value ?? inner
  const ref = React.useRef<HTMLDivElement>(null)
  const dragging = React.useRef(false)

  const set = (next: number) => {
    const v = Math.min(100, Math.max(0, next))
    if (value === undefined) setInner(v)
    onValueChange?.(v)
  }
  const setFromClientX = (clientX: number) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    // Full travel, edge to edge, no inset dead zone.
    set(((clientX - r.left) / r.width) * 100)
  }

  return (
    <div
      ref={ref}
      data-slot="before-after-wipe"
      data-tier="premium"
      className={cn(
        // touch-pan-y: horizontal drags wipe, vertical swipes still scroll the page.
        "group relative aspect-[16/10] touch-pan-y overflow-hidden rounded-2xl border border-border bg-sunken select-none",
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
      <div className="absolute inset-0">{before ?? <SampleLayer label={beforeLabel} />}</div>
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pct}%)` }}>
        <div className="absolute inset-0 bg-bg">{after ?? <SampleLayer label={afterLabel} after />}</div>
      </div>
      <div className="absolute inset-y-0 z-10 w-px bg-accent" style={{ left: `${pct}%` }} aria-hidden>
        <div
          data-slot="before-after-wipe-thumb"
          className="absolute top-1/2 left-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-raised text-fg shadow-md group-has-[input:focus-visible]:ring-2 group-has-[input:focus-visible]:ring-accent group-has-[input:focus-visible]:ring-offset-2 group-has-[input:focus-visible]:ring-offset-bg"
        >
          <ChevronsLeftRightIcon className="size-4" />
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={pct}
        aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
        aria-valuetext={`${Math.round(pct)}% ${beforeLabel}, ${100 - Math.round(pct)}% ${afterLabel}`}
        className="absolute inset-0 z-20 cursor-ew-resize opacity-0"
        onChange={(e) => set(Number(e.target.value))}
      />
    </div>
  )
}
export { BeforeAfterWipe }
export type { BeforeAfterWipeProps }
