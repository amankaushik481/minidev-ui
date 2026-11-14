"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "@/registry/ui/spinner"
import { Button } from "@/registry/ui/button"

/**
 * InfiniteScroll — a scrolling list that loads the next page when a sentinel near the end comes into view.
 *
 * It uses IntersectionObserver, never fires twice for the same page, shows a
 * loading row and an end-of-list message, keeps a real "Load more" button as
 * the accessible fallback, and offers Retry when a page fails. Use it for
 * feeds of unknown length. For thousands of rows already in memory use
 * VirtualList, and for numbered pages use Pagination.
 *
 * @example
 * <InfiniteScroll
 *   loadMore={async (page) => {
 *     const res = await fetch(`/api/orders?page=${page}`).then((r) => r.json())
 *     return { items: res.orders, hasMore: res.hasMore }
 *   }}
 *   renderItem={(order) => <OrderRow order={order} />}
 * />
 */
type InfiniteScrollProps<T> = {
  /** Fetch a page (0-based); return its items and whether more remain. Throw to show Retry. */
  loadMore?: (page: number) => Promise<{ items: T[]; hasMore: boolean }>
  /** Renders one item. Each is wrapped in an li. */
  renderItem?: (item: T, index: number) => React.ReactNode
  /** How far before the end to start loading, as a CSS margin. */
  rootMargin?: string
  /** Accessible name for the list. */
  label?: string
  className?: string
}

type DemoItem = { id: number; title: string }

const demoLoad = (page: number) =>
  new Promise<{ items: DemoItem[]; hasMore: boolean }>((r) =>
    setTimeout(() => r({ items: Array.from({ length: 8 }, (_, i) => ({ id: page * 8 + i + 1, title: `Order #${1040 + page * 8 + i}` })), hasMore: page < 3 }), 700),
  )

function InfiniteScroll<T = DemoItem>({ loadMore, renderItem, rootMargin = "240px", label = "Results", className }: InfiniteScrollProps<T>) {
  // Latest loader in a ref, so an inline loadMore does not re-create the observer on every render.
  const loader = loadMore ?? (demoLoad as unknown as (p: number) => Promise<{ items: T[]; hasMore: boolean }>)
  const load = React.useRef(loader)
  React.useEffect(() => {
    load.current = loader
  })
  const [items, setItems] = React.useState<T[]>([])
  const [page, setPage] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [hasMore, setHasMore] = React.useState(true)
  const [failed, setFailed] = React.useState(false)
  const sentinel = React.useRef<HTMLDivElement>(null)
  const busy = React.useRef(false)
  const scroller = React.useRef<HTMLDivElement>(null)

  const next = React.useCallback(async () => {
    if (busy.current || !hasMore) return
    busy.current = true
    setLoading(true)
    setFailed(false)
    try {
      const res = await load.current(page)
      setItems((prev) => [...prev, ...res.items])
      setHasMore(res.hasMore)
      setPage((p) => p + 1)
    } catch {
      setFailed(true)
    } finally {
      busy.current = false
      setLoading(false)
    }
  }, [page, hasMore])

  React.useEffect(() => {
    const el = sentinel.current
    if (!el) return
    // After a failure, wait for Retry instead of hammering the loader on every scroll.
    if (failed) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && next(), { root: scroller.current, rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [next, rootMargin, failed])

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
      <ul className="space-y-2" aria-busy={loading} aria-label={label}>
        {items.map((it, i) => (
          <li key={i}>{render(it, i)}</li>
        ))}
      </ul>
      <div ref={sentinel} aria-hidden className="h-px" />
      <div className="flex justify-center py-3 text-xs text-fg-muted" aria-live="polite">
        {loading ? (
          <span className="flex items-center gap-2"><Spinner className="size-3.5" /> Loading more</span>
        ) : failed ? (
          <span className="flex items-center gap-2">
            Could not load more.
            <Button size="sm" variant="outline" onClick={next}>Retry</Button>
          </span>
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
