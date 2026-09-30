"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Tabs with a pill that slides between triggers and panels that cross
 * fade in the direction of travel. Follows the WAI-ARIA tabs pattern:
 * roving focus, Arrow keys, Home and End, and automatic activation.
 */
type Tab = { id: string; label: string; content: React.ReactNode }

type AnimatedTabsProps = {
  tabs?: Tab[]
  defaultValue?: string
  onValueChange?: (id: string) => void
  className?: string
}

const DEMO: Tab[] = [
  { id: "overview", label: "Overview", content: <p>Revenue is up 12.4% this month, driven by annual upgrades on the Team plan.</p> },
  { id: "activity", label: "Activity", content: <p>32 new signups, 4 upgrades and 1 cancellation in the last 24 hours.</p> },
  { id: "billing", label: "Billing", content: <p>Next invoice on Oct 14 for $1,280. Visa ending 4242 is the default method.</p> },
  { id: "settings", label: "Settings", content: <p>Workspace name, domain, SSO and the danger zone live here.</p> },
]

function AnimatedTabs({ tabs = DEMO, defaultValue, onValueChange, className }: AnimatedTabsProps) {
  const reduce = useReducedMotion()
  const id = React.useId()
  const [active, setActive] = React.useState(defaultValue ?? tabs[0]?.id)
  const [dir, setDir] = React.useState(1)
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const index = tabs.findIndex((t) => t.id === active)
  const select = (i: number, focus = false) => {
    const t = tabs[(i + tabs.length) % tabs.length]
    setDir(tabs.findIndex((x) => x.id === t.id) > index ? 1 : -1)
    setActive(t.id)
    onValueChange?.(t.id)
    if (focus) refs.current[(i + tabs.length) % tabs.length]?.focus()
  }
  const current = tabs[index]
  return (
    <div data-slot="animated-tabs" className={cn("w-full max-w-lg", className)}>
      <div
        role="tablist"
        aria-label="Sections"
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
                  className="absolute inset-0 rounded-lg border border-border bg-raised shadow-raised"
                  transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.2, duration: 0.45 }}
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
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -24, filter: "blur(4px)" }}
            transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
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
export type { AnimatedTabsProps }
