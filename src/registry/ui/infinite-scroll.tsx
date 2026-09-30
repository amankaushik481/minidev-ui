"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "@/registry/ui/spinner"
import { Button } from "@/registry/ui/button"

/**
 * Loads more items when a sentinel near the end of the list scrolls into
 * view, using IntersectionObserver. It shows a loading row, an end of list
 * message and a real "Load more" button as the accessible fallback, and it
 * never fires twice for the same page.
 */
type InfiniteScrollProps<T> = {
  /** Fetch the next page; return the items and whether more remain. */
  loadMore?: (page: number) => Promise<{ items: T[]; hasMore: boolean }>
  renderItem?: (item: T, index: number) => React.ReactNode
  /** Start loading this many pixels before the end. */
  rootMargin?: string
  className?: string
}

type DemoItem = { id: number; title: string }

const demoLoad = (page: number) =>
  new Promise<{ items: DemoItem[]; hasMore: boolean }>((r) =>
    setTimeout(() => r({ items: Array.from({ length: 8 }, (_, i) => ({ id: page * 8 + i + 1, title: `Order #${1040 + page * 8 + i}` })), hasMore: page < 3 }), 700),
  )

function InfiniteScroll<T = DemoItem>({ loadMore, renderItem, rootMargin = "240px", className }: InfiniteScrollProps<T>) {
  const load = (loadMore ?? (demoLoad as unknown as (p: number) => Promise<{ items: T[]; hasMore: boolean }>))
  const [items, setItems] = React.useState<T[]>([])
  const [page, setPage] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [hasMore, setHasMore] = React.useState(true)
  const sentinel = React.useRef<HTMLDivElement>(null)
  const busy = React.useRef(false)
  const scroller = React.useRef<HTMLDivElement>(null)

  const next = React.useCallback(async () => {
    if (busy.current || !hasMore) return
    busy.current = true
    setLoading(true)
    try {
      const res = await load(page)
      setItems((prev) => [...prev, ...res.items])
      setHasMore(res.hasMore)
      setPage((p) => p + 1)
    } finally {
      busy.current = false
      setLoading(false)
    }
  }, [load, page, hasMore])

  React.useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && next(), { root: scroller.current, rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [next, rootMargin])

  const render =
    renderItem ??
    ((it: T) => {
      const d = it as unknown as DemoItem
      return (
        <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5 text-sm shadow-xs">
          <span className="text-fg">{d.title}</span>
          <span className="font-mono text-xs text-fg-subtle">#{d.id}</span>
        </div>
      )
    })

  return (
    <div ref={scroller} data-slot="infinite-scroll" className={cn("h-80 w-full max-w-sm overflow-y-auto rounded-2xl border border-border bg-sunken p-3", className)}>
      <ul className="space-y-2" aria-busy={loading}>
        {items.map((it, i) => (
          <li key={i}>{render(it, i)}</li>
        ))}
      </ul>
      <div ref={sentinel} aria-hidden className="h-px" />
      <div className="flex justify-center py-3 text-xs text-fg-muted" aria-live="polite">
        {loading ? (
          <span className="flex items-center gap-2"><Spinner className="size-3.5" /> Loading more</span>
        ) : hasMore ? (
          <Button size="sm" variant="ghost" onClick={next}>Load more</Button>
        ) : (
          <span>You have reached the end</span>
        )}
      </div>
    </div>
  )
}

export { InfiniteScroll }
export type { InfiniteScrollProps }
