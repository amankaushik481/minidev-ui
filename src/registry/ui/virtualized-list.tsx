"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
function VirtualizedList({
  count,
  itemHeight = 40,
  height = 320,
  renderItem,
  className,
}: {
  count: number
  itemHeight?: number
  height?: number
  renderItem: (index: number) => React.ReactNode
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = React.useState(0)
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - 5)
  const visible = Math.ceil(height / itemHeight) + 10
  const end = Math.min(count, start + visible)
  return (
    <div
      ref={ref}
      data-slot="virtualized-list"
      className={cn("overflow-auto rounded-xl border border-border", className)}
      style={{ height }}
      onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
    >
      <div style={{ height: count * itemHeight, position: "relative" }}>
        {Array.from({ length: end - start }, (_, i) => {
          const index = start + i
          return (
            <div key={index} style={{ position: "absolute", top: index * itemHeight, left: 0, right: 0, height: itemHeight }}>
              {renderItem(index)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export { VirtualizedList }
