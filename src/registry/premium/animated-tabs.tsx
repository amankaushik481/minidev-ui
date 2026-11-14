"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Tabs with a pill that slides between triggers and panels that cross-fade in the direction of travel.
 *
 * Follows the WAI-ARIA tabs pattern: roving focus, Arrow keys, Home and End,
 * automatic activation. Pass `tabs` as data (id, label, content). Works
 * uncontrolled (`defaultValue`) or controlled (`value` + `onValueChange`).
 * Use it for a marketing or overview panel with a few views; for app
 * navigation tabs built from parts use Tabs, and for a compact toggle
 * between options use SegmentedControl.
 *
 * @example
 * <AnimatedTabs
 *   label="Account"
 *   tabs={[
 *     { id: "overview", label: "Overview", content: <p>Revenue is up 12.4%.</p> },
 *     { id: "billing", label: "Billing", content: <p>Next invoice Oct 14.</p> },
 *   ]}
 * />
 */
type Tab = {
  /** Unique id, also the value reported by onValueChange. */
  id: string
  /** Trigger text. */
  label: string
  /** Panel content. */
  content: React.ReactNode
}

type AnimatedTabsProps = {
  tabs?: Tab[]
  /** Active tab id when controlled. */
  value?: string
  /** Initial tab id when uncontrolled. Defaults to the first tab. */
  defaultValue?: string
  /** Called with the new tab id on click or arrow key. */
  onValueChange?: (id: string) => void
  /** Accessible name of the tab list. */
  label?: string
  className?: string
}

const SNAPPY = { type: "spring", bounce: 0.18, duration: 0.42 } as const

const DEMO: Tab[] = [
  { id: "overview", label: "Overview", content: <p>Revenue is up 12.4% this month, driven by annual upgrades on the Team plan.</p> },
  { id: "activity", label: "Activity", content: <p>32 new signups, 4 upgrades and 1 cancellation in the last 24 hours.</p> },
  { id: "billing", label: "Billing", content: <p>Next invoice on Oct 14 for $1,280. Visa ending 4242 is the default method.</p> },
  { id: "settings", label: "Settings", content: <p>Workspace name, domain, SSO and the danger zone live here.</p> },
]

function AnimatedTabs({ tabs = DEMO, value, defaultValue, onValueChange, label = "Sections", className }: AnimatedTabsProps) {
  const reduce = useReducedMotion()
  const id = React.useId()
  const [inner, setInner] = React.useState(defaultValue ?? tabs[0]?.id)
  const [dir, setDir] = React.useState(1)
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const found = tabs.findIndex((t) => t.id === (value ?? inner))
  // An unknown id (tabs changed under us) falls back to the first tab instead of rendering nothing.
  const index = found === -1 ? 0 : found
  const active = tabs[index]?.id
  const select = (i: number, focus = false) => {
    const next = (i + tabs.length) % tabs.length
    const t = tabs[next]
    if (!t) return
    setDir(next > index ? 1 : -1)
    if (value === undefined) setInner(t.id)
    if (t.id !== active) onValueChange?.(t.id)
    if (focus) refs.current[next]?.focus()
  }
  const current = tabs[index]
  return (
    <div data-slot="animated-tabs" className={cn("w-full max-w-lg", className)}>
      <div
        role="tablist"
        aria-label={label}
        className="inline-flex gap-1 rounded-xl border border-border bg-sunken p-1"
        onKeyDown={(e) => {
          const k = e.key
          if (k === "ArrowRight") select(index + 1, true)
          else if (k === "ArrowLeft") select(index - 1, true)
          else if (k === "Home") select(0, true)
          else if (k === "End") select(tabs.length - 1, true)
          else return
          e.preventDefault()
        }}
      >
        {tabs.map((t, i) => {
          const on = t.id === active
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el
              }}
              role="tab"
              id={`${id}-tab-${t.id}`}
              aria-selected={on}
              aria-controls={`${id}-panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              className={cn("relative h-8 rounded-lg px-3.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent", on ? "text-fg" : "text-fg-muted hover:text-fg")}
            >
              {on ? (
                <motion.span
                  layoutId={`${id}-pill`}
                  data-slot="animated-tabs-thumb"
                  className="absolute inset-0 rounded-lg border border-border bg-raised shadow-raised"
                  transition={reduce ? { duration: 0 } : SNAPPY}
                />
              ) : null}
              <span className="relative">{t.label}</span>
            </button>
          )
        })}
      </div>
      <div className="relative mt-4 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.div
            key={current?.id}
            role="tabpanel"
            id={`${id}-panel-${current?.id}`}
            aria-labelledby={`${id}-tab-${current?.id}`}
            tabIndex={0}
            custom={dir}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 24, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            // Exit is quicker than entry, so the new panel never waits on the old one.
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, x: dir * -24, filter: "blur(4px)", transition: { duration: 0.16, ease: [0.3, 0, 0.8, 0.15] } }}
            transition={reduce ? { duration: 0 } : { duration: 0.24, ease: [0.2, 0, 0, 1] }}
            className="rounded-xl border border-border bg-surface p-5 text-sm leading-[1.6] text-fg-muted shadow-raised outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {current?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export { AnimatedTabs }
export type { AnimatedTabsProps, Tab as AnimatedTab }
