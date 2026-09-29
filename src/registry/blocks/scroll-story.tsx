"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CheckIcon, DatabaseIcon, MessageSquareIcon, ZapIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/*
 * ScrollStory: steps on one side, a pinned visual on the other that swaps
 * as each step reaches the middle of the screen. A rail fills with progress.
 * On small screens each step shows its own visual inline.
 */

type Step = { kicker?: string; title: string; body: string; visual?: React.ReactNode }

type ScrollStoryProps = {
  eyebrow?: string
  title?: React.ReactNode
  steps?: Step[]
  className?: string
}

function Panel({ icon: Icon, label, rows }: { icon: typeof ZapIcon; label: string; rows: [string, string][] }) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-raised p-5 shadow-overlay">
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg bg-accent text-on-accent shadow-ink">
          <Icon className="size-4" />
        </span>
        <p className="text-[13.5px] font-medium text-fg">{label}</p>
      </div>
      <ul className="mt-4 space-y-2">
        {rows.map(([a, b], i) => (
          <li key={a} className="flex animate-[rise-in_400ms_var(--ease-hairline)_both] items-center justify-between rounded-lg bg-sunken px-3 py-2.5 text-[13px]" style={{ animationDelay: `${i * 90}ms` }}>
            <span className="flex items-center gap-2 text-fg">
              <CheckIcon className="size-3.5 text-success" strokeWidth={3} />
              {a}
            </span>
            <span className="font-mono text-[11.5px] text-fg-muted">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const STEPS: Step[] = [
  { kicker: "01 · Connect", title: "Point it at your tools.", body: "Stripe, your database, the CRM. Read-only keys, two clicks each. Nothing to install.", visual: <Panel icon={DatabaseIcon} label="Sources connected" rows={[["Stripe", "12,480 events"], ["Postgres", "38 tables"], ["HubSpot", "2,104 deals"]]} /> },
  { kicker: "02 · Learn", title: "It learns what normal looks like.", body: "Lumen builds a baseline for every metric, by weekday and season, so it knows a real spike from a Monday.", visual: <Panel icon={ZapIcon} label="Baselines ready" rows={[["MRR", "±2.1% normal"], ["Refunds", "±6.8% normal"], ["Churn", "±0.3% normal"]]} /> },
  { kicker: "03 · Tell", title: "It tells you when it matters.", body: "An alert in Slack with the number, the reason, and a suggested next step. You reply to act.", visual: <Panel icon={MessageSquareIcon} label="#finance · Lumen" rows={[["Refunds +220%", "Sun 14:02"], ["Cause: batch #4411", "found"], ["Draft reply sent", "you"]]} /> },
]

function ScrollStory({ eyebrow = "How it works", title = "Live in an afternoon.", steps = STEPS, className }: ScrollStoryProps) {
  const [active, setActive] = React.useState(0)
  const refs = React.useRef<(HTMLDivElement | null)[]>([])
  const reduce = useReducedMotion()

  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        })
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [steps.length])

  return (
    <section data-slot="scroll-story" className={cn("mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8", className)}>
      <div className="max-w-2xl">
        {eyebrow ? <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">{eyebrow}</p> : null}
        <h2 className="mt-3 text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance text-fg sm:text-5xl">{title}</h2>
      </div>
      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          {/* rail */}
          <div aria-hidden className="absolute top-2 bottom-2 left-[11px] hidden w-px bg-border lg:block">
            <motion.div
              className="w-full origin-top bg-accent"
              animate={{ height: `${((active + 1) / steps.length) * 100}%` }}
              transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.12, duration: 0.7 }}
            />
          </div>
          {steps.map((s, i) => (
            <div
              key={s.title}
              ref={(el) => {
                refs.current[i] = el
              }}
              data-index={i}
              className="relative flex min-h-[60vh] flex-col justify-center py-8 lg:pl-12"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute top-1/2 left-1.5 hidden size-[11px] -translate-y-1/2 rounded-full border-2 transition-colors duration-300 lg:block",
                  i <= active ? "border-accent bg-accent" : "border-border-strong bg-bg"
                )}
              />
              <p className={cn("font-mono text-[11.5px] transition-colors duration-300", i === active ? "text-accent-fg" : "text-fg-subtle")}>{s.kicker}</p>
              <h3 className={cn("mt-2 text-2xl leading-8 font-medium tracking-[-0.03em] transition-colors duration-300 sm:text-3xl", i === active ? "text-fg" : "text-fg-subtle")}>{s.title}</h3>
              <p className="mt-3 max-w-md text-[15px] leading-[1.65] text-fg-muted">{s.body}</p>
              <div className="mt-6 lg:hidden">{s.visual}</div>
            </div>
          ))}
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-[20vh] grid h-[60vh] place-items-center rounded-3xl border border-border bg-sunken/50 bg-dots p-8 [--grid-size:18px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, filter: "blur(6px)", transition: { duration: 0.16 } }}
                transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
                className="grid w-full place-items-center"
              >
                {steps[active]?.visual}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export { ScrollStory }
export type { ScrollStoryProps, Step }
