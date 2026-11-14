"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Badge } from "@/registry/ui/badge"

const STEPS = [
  { title: "Inbox", detail: "12 open · 3 SLA risk", rows: ["Acme renewal", "Billing dispute", "Seat upgrade"] },
  { title: "Pipeline", detail: "Build #482 · green", rows: ["typecheck", "audit screenshots", "axe a11y"] },
  { title: "Agents", detail: "2 running", rows: ["thicken stubs", "premium heroes", "docs DX"] },
]

/**
 * A mock product window with a sidebar of workspaces that cycles on its own, each view rising in with its rows and KPI bars.
 * It auto-advances every few seconds to show the product breathing, pauses
 * while the pointer or keyboard focus is inside, and stops for good once the
 * visitor picks a view. Reduced motion never auto-advances and shows every
 * view in place.
 *
 * Use it as a hero visual for a product or platform page. Reach for
 * BrowserMockup or DeviceFrameStack to frame your own screenshot, and
 * ProductTour for a guided, visitor-driven walkthrough.
 *
 * @example
 * <ProductOsMock interval={3200} />
 */
type ProductOsMockProps = {
  /** Milliseconds each view stays before the next. */
  interval?: number
  className?: string
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function ProductOsMock({ interval = 2800, className }: ProductOsMockProps) {
  const reduce = useReducedMotion()
  const [active, setActive] = React.useState(0)
  // Hover or focus pauses the cycle; a click hands control to the visitor for good.
  const [paused, setPaused] = React.useState(false)
  const [manual, setManual] = React.useState(false)
  React.useEffect(() => {
    if (reduce || paused || manual) return
    const id = window.setInterval(() => setActive((v) => (v + 1) % STEPS.length), interval)
    return () => window.clearInterval(id)
  }, [reduce, paused, manual, interval])
  const step = STEPS[active]
  return (
    <section
      data-slot="product-os-mock"
      data-tier="premium"
      aria-label="Product preview"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false)
      }}
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-surface shadow-highlight",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <span aria-hidden className="contents">
          <span className="size-2.5 shrink-0 rounded-full bg-danger/80" />
          <span className="size-2.5 shrink-0 rounded-full bg-warning/80" />
          <span className="size-2.5 shrink-0 rounded-full bg-success/80" />
          </span>
          <p className="ml-1 truncate font-mono text-[10px] text-fg-muted sm:ml-2 sm:text-xs">
            minidev.os — live product surface
          </p>
        </div>
        <Badge variant="outline" className="shrink-0">Hairline</Badge>
      </div>
      <div className="grid gap-0 lg:grid-cols-[200px_1fr]">
        <aside className="border-b border-border bg-sunken p-3 lg:border-b-0 lg:border-r">
          <p className="px-2 text-[10px] font-medium uppercase tracking-[0.01em] text-fg-muted">Workspace</p>
          <ul className="mt-2 flex gap-1 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
            {STEPS.map((s, i) => (
              <li key={s.title} className="shrink-0 lg:w-full">
                <button
                  type="button"
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => {
                    setManual(true)
                    setActive(i)
                  }}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm outline-none transition-[background-color] duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent lg:w-full",
                    i === active ? "bg-surface text-fg shadow-highlight" : "text-fg-muted hover:text-fg"
                  )}
                >
                  {s.title}
                  {i === active ? <span aria-hidden className="ml-2 size-1.5 rounded-full bg-accent lg:ml-0" /> : null}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-lg font-medium tracking-[-0.014em] text-fg">{step.title}</h3>
              <p className="mt-1 text-sm text-fg-muted">{step.detail}</p>
            </div>
            <Button size="sm">New</Button>
          </div>
          <ul className="mt-5 space-y-2">
            {step.rows.map((row, i) => (
              <motion.li
                key={step.title + row}
                initial={reduce ? false : { y: 8 }}
                animate={{ y: 0 }}
                transition={reduce ? { duration: 0 } : { ...MORPH, delay: i * 0.05 }}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-bg px-3 py-2.5 shadow-highlight"
              >
                <span className="min-w-0 truncate text-sm text-fg">{row}</span>
                <span className="shrink-0 font-mono text-[11px] text-fg-muted">0{i + 1}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-5 grid grid-cols-3 gap-1.5 sm:gap-2">
            {[72, 91, 64].map((n, i) => (
              <div key={i} className="min-w-0 rounded-xl border border-border bg-sunken p-2 sm:p-3">
                <p className="text-[9px] uppercase tracking-[0.01em] text-fg-muted sm:text-[10px]">KPI</p>
                <p className="mt-1 text-base font-medium tabular-nums tracking-[-0.018em] text-fg sm:text-xl">{n}%</p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="h-full origin-left bg-accent"
                    style={{ width: `${n}%` }}
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={reduce ? { duration: 0 } : { ...MORPH, delay: 0.1 + i * 0.05 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export { ProductOsMock }
export type { ProductOsMockProps }
