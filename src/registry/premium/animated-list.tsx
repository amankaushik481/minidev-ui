"use client"
import * as React from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react"
import { BellIcon, CircleDollarSignIcon, GitPullRequestIcon, UserPlusIcon, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A live activity feed where new items drop in at the top on a spring and older ones slide down and fall off the end.
 *
 * Use it for "happening now" sections, notification previews and activity
 * streams on marketing pages. Items cycle through `items` on a timer while
 * the list is on screen, and pause while the pointer or keyboard focus is on
 * it. Reduced motion shows the first `max` items, still. For a static list of
 * notifications use a plain list; for a one-off reveal use BlurFade.
 *
 * @example
 * <AnimatedList max={4} interval={2000} items={[{ title: "Payment received", detail: "Acme paid $2,400", time: "now" }]} />
 */
type ListItem = {
  /** Stable id; falls back to the title. */
  id?: string
  /** Lucide icon for the leading tile. Defaults to a bell. */
  icon?: LucideIcon
  title: string
  /** Secondary line, truncated to one line. */
  detail?: string
  /** Short timestamp shown on the right, e.g. "2m". */
  time?: string
}

type AnimatedListProps = {
  /** Items to cycle through, newest first. */
  items?: ListItem[]
  /** Milliseconds between arrivals. */
  interval?: number
  /** How many items to keep on screen. */
  max?: number
  className?: string
}

const SNAPPY = { type: "spring", bounce: 0.18, duration: 0.42 } as const

const DEFAULT: ListItem[] = [
  { icon: CircleDollarSignIcon, title: "Payment received", detail: "Acme paid invoice #1042 · $2,400", time: "now" },
  { icon: UserPlusIcon, title: "New signup", detail: "maya@northwind.io joined the Pro trial", time: "1m" },
  { icon: GitPullRequestIcon, title: "Deploy finished", detail: "main → production in 42s", time: "3m" },
  { icon: BellIcon, title: "Usage alert", detail: "API calls at 80% of the monthly quota", time: "5m" },
  { icon: CircleDollarSignIcon, title: "Plan upgraded", detail: "Globex moved to Team · +$96/mo", time: "8m" },
]

function AnimatedList({ items = DEFAULT, interval = 1800, max = 4, className }: AnimatedListProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLUListElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const [count, setCount] = React.useState(1)
  // Hover or focus holds the feed still so it can be read (WCAG 2.2.2).
  const [held, setHeld] = React.useState(false)
  React.useEffect(() => {
    if (reduce || !inView || held || !items.length) return
    const id = window.setInterval(() => setCount((c) => c + 1), interval)
    return () => window.clearInterval(id)
  }, [interval, reduce, inView, held, items.length])
  // Derived, not initial state: useReducedMotion is null on the first render.
  const total = reduce ? max : count
  if (!items.length) return null
  const shown = Array.from({ length: Math.min(total, max) }, (_, k) => {
    const n = total - 1 - k
    const it = items[n % items.length]
    return { ...it, key: `${it.id ?? it.title}-${n}` }
  })
  return (
    <ul
      ref={ref}
      data-slot="animated-list"
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
      className={cn("flex w-full max-w-sm flex-col gap-2.5", className)}
    >
      <AnimatePresence initial={false}>
        {shown.map((it) => {
          const Icon = it.icon ?? BellIcon
          return (
            <motion.li
              key={it.key}
              layout={!reduce}
              initial={{ opacity: 0, scale: 0.92, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: reduce ? 0 : 0.16, ease: [0.3, 0, 0.8, 0.15] } }}
              transition={reduce ? { duration: 0 } : SNAPPY}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3.5 shadow-raised"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-fg">
                <Icon className="size-[18px]" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-sm font-medium text-fg">{it.title}</span>
                  {it.time ? <span className="shrink-0 text-[11px] text-fg-subtle">{it.time}</span> : null}
                </span>
                {it.detail ? <span className="block truncate text-[12.5px] text-fg-muted">{it.detail}</span> : null}
              </span>
            </motion.li>
          )
        })}
      </AnimatePresence>
    </ul>
  )
}

export { AnimatedList }
export type { AnimatedListProps, ListItem as AnimatedListItem }
