"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * MasonryGrid — a masonry layout that keeps source order, for cards of uneven height.
 *
 * A CSS grid with tiny rows where each item spans as many rows as its measured
 * height. Items flow left to right, so keyboard and screen reader order match
 * what you see, and the column count follows the container width. Use it for
 * galleries, notes and testimonials; for equal-height cards use a plain grid.
 * Each child is measured, so pass one element per item (no fragments).
 * Other div props (aria-label, role, id) go on the grid element.
 *
 * @example
 * <MasonryGrid minColumnWidth={220} gap={16}>
 *   {posts.map((p) => <PostCard key={p.id} post={p} />)}
 * </MasonryGrid>
 */
type MasonryGridProps = {
  /** One element per tile. Keyed children keep their measured height when reordered. */
  children?: React.ReactNode
  /** Minimum column width in pixels. */
  minColumnWidth?: number
  /** Gap between tiles in pixels, both directions. Keep it on the 4px grid. */
  gap?: number
  /** Classes for the grid. */
  className?: string
} & Omit<React.ComponentProps<"div">, "children" | "className">

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

function MasonryGrid({ children, minColumnWidth = 180, gap = 12, className, style, ...props }: MasonryGridProps) {
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
      {...props}
      className={cn("grid w-full items-start", className)}
      style={{ ...style, gridTemplateColumns: `repeat(auto-fill, minmax(min(${minColumnWidth}px, 100%), 1fr))`, gridAutoRows: ROW, columnGap: gap, rowGap: gap }}
    >
      {items.map((it, i) => (
        <Item key={React.isValidElement(it) && it.key != null ? it.key : i} gap={gap}>
          {it}
        </Item>
      ))}
    </div>
  )
}

export { MasonryGrid }
export type { MasonryGridProps }
