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

function ProductOsMock({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const [active, setActive] = React.useState(0)
  React.useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setActive((v) => (v + 1) % STEPS.length), 2800)
    return () => window.clearInterval(id)
  }, [reduce])
  const step = STEPS[active]
  return (
    <section
      data-slot="product-os-mock"
      data-tier="premium"
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-surface shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-danger/80" />
          <span className="size-2.5 rounded-full bg-warning/80" />
          <span className="size-2.5 rounded-full bg-success/80" />
          <p className="ml-2 font-mono text-xs text-fg-muted">minidev.os — live product surface</p>
        </div>
        <Badge variant="outline">Hairline</Badge>
      </div>
      <div className="grid gap-0 lg:grid-cols-[200px_1fr]">
        <aside className="border-b border-border bg-sunken p-3 lg:border-b-0 lg:border-r">
          <p className="px-2 text-[10px] font-medium uppercase tracking-[0.01em] text-fg-muted">Workspace</p>
          <ul className="mt-2 space-y-1">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm outline-none transition-[background-color] duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent",
                    i === active ? "bg-surface text-fg shadow-[inset_0_1px_0_oklch(1_0_0/0.5)]" : "text-fg-muted hover:text-fg"
                  )}
                >
                  {s.title}
                  {i === active ? <span className="size-1.5 rounded-full bg-accent" /> : null}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
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
                transition={{ delay: i * 0.05, duration: 0.2, ease: [0.2, 0, 0, 1] }}
                className="flex items-center justify-between rounded-xl border border-border bg-bg px-3 py-2.5 shadow-[inset_0_1px_0_oklch(1_0_0/0.5)]"
              >
                <span className="text-sm text-fg">{row}</span>
                <span className="font-mono text-[11px] text-fg-muted">0{i + 1}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[72, 91, 64].map((n, i) => (
              <div key={i} className="rounded-xl border border-border bg-sunken p-3">
                <p className="text-[10px] uppercase tracking-[0.01em] text-fg-muted">KPI</p>
                <p className="mt-1 text-xl font-medium tabular-nums tracking-[-0.018em] text-fg">{n}%</p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="h-full bg-accent"
                    initial={reduce ? false : { width: 0 }}
                    animate={{ width: `${n}%` }}
                    transition={{ duration: 0.45, delay: 0.1 + i * 0.05 }}
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
