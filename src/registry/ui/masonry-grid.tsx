"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A masonry layout that keeps source order: a CSS grid with tiny rows where
 * each item spans as many rows as its measured height. Items flow left to
 * right, so keyboard and screen reader order match what you see, and the
 * column count follows the container width.
 */
type MasonryGridProps = {
  children?: React.ReactNode
  /** Minimum column width in pixels. */
  minColumnWidth?: number
  gap?: number
  className?: string
}

const ROW = 4
const DEMO = [180, 260, 140, 320, 200, 240, 160, 300, 220, 180, 280, 150]

function Item({ children, gap }: { children: React.ReactNode; gap: number }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [span, setSpan] = React.useState(1)
  React.useLayoutEffect(() => {
    const el = ref.current?.firstElementChild as HTMLElement | null
    if (!el) return
    const fit = () => setSpan(Math.ceil((el.getBoundingClientRect().height + gap) / (ROW + gap)))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [gap])
  return (
    <div ref={ref} style={{ gridRowEnd: `span ${span}` }}>
      {children}
    </div>
  )
}

function MasonryGrid({ children, minColumnWidth = 180, gap = 12, className }: MasonryGridProps) {
  const items = React.Children.toArray(
    children ??
      DEMO.map((h, i) => (
        <div key={i} className="grid place-items-center rounded-xl border border-border text-xs text-fg-subtle shadow-raised" style={{ height: h, background: `color-mix(in oklch, var(--accent) ${6 + (i % 4) * 5}%, var(--surface))` }}>
          {i + 1}
        </div>
      )),
  )
  return (
    <div
      data-slot="masonry-grid"
      className={cn("grid w-full items-start", className)}
      style={{ gridTemplateColumns: `repeat(auto-fill, minmax(min(${minColumnWidth}px, 100%), 1fr))`, gridAutoRows: ROW, columnGap: gap, rowGap: gap }}
    >
      {items.map((it, i) => (
        <Item key={i} gap={gap}>
          {it}
        </Item>
      ))}
    </div>
  )
}

export { MasonryGrid }
export type { MasonryGridProps }
