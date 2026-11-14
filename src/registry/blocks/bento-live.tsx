"use client"
import * as React from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { BellIcon, CheckIcon, SparklesIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { NumberRoll } from "@/registry/ui/number-roll"

/**
 * BentoLive — a product feature grid where every tile runs a small live piece of the product (a ticking metric, a typed answer, alerts) instead of a screenshot.
 *
 * Use as the main "features" section of a landing page, with 4–6 tiles on a 6-column grid. Live tiles only tick while
 * on screen and sit still under reduced motion. Tiles rise in once as the grid enters view and lift on hover. For a
 * text-only grid use FeatureGrid; for a premium animated bento use FeatureBentoMotion.
 *
 * @example
 * <BentoLive items={[{ title: "Live MRR", body: "Every metric is live.", visual: <MyChart />, span: 4, tall: true }]} />
 */
type BentoItem = {
  /** Tile heading (rendered as h3). Also the React key, so keep it unique. */
  title: string
  /** One sentence under the heading. */
  body: string
  /** The live demo in the top of the tile. */
  visual?: React.ReactNode
  /** Column span on large screens, out of 6. Spans of 4+ also take both columns on tablets. */
  span?: 2 | 3 | 4 | 6
  /** Span two rows on large screens. */
  tall?: boolean
}

type BentoLiveProps = {
  /** Small mono label above the title. Empty string hides it. */
  eyebrow?: string
  /** Section heading (rendered as h2). */
  title?: React.ReactNode
  description?: React.ReactNode
  /** Tiles in order. Defaults to five live Lumen tiles. */
  items?: BentoItem[]
  className?: string
}

/* ── default visuals ───────────────────────────────────────────────────── */
function LiveMetric() {
  const [v, setV] = React.useState(48290)
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const reduce = useReducedMotion()
  React.useEffect(() => {
    // Tick only while visible; reduced motion keeps the number still.
    if (!inView || reduce) return
    const t = setInterval(() => setV((x) => x + Math.round(40 + Math.random() * 300)), 2400)
    return () => clearInterval(t)
  }, [inView, reduce])
  const bars = [38, 52, 44, 61, 58, 72, 66, 84, 78, 92]
  return (
    <div ref={ref} className="w-full">
      <p className="text-[12px] text-fg-muted">MRR, live</p>
      <p className="mt-1 text-[40px] leading-[44px] font-medium tracking-[-0.04em] text-fg">
        <NumberRoll value={v} trend format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} />
      </p>
      <div aria-hidden className="mt-5 flex h-24 items-end gap-1.5">
        {bars.map((h, i) => (
          <span key={i} className={cn("flex-1 rounded-t-md", i === bars.length - 1 ? "bg-accent" : "bg-accent/20")} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  )
}

function LiveAsk() {
  const answer = "Churn rose 0.4% after the price change on the Starter plan. 31 accounts, mostly monthly. Want me to draft a win-back email?"
  const [n, setN] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.6 })
  const reduce = useReducedMotion()
  React.useEffect(() => {
    if (!inView || reduce) return
    // Retype from the start each time the tile comes back into view.
    let i = 0
    const t = setInterval(() => {
      i = Math.min(answer.length, i + 2)
      setN(i)
      if (i >= answer.length) clearInterval(t)
    }, 28)
    return () => clearInterval(t)
  }, [inView, reduce])
  const shown = reduce ? answer.length : n
  return (
    <div ref={ref} className="w-full space-y-3">
      <span className="sr-only">Question: Why did churn go up this week? Answer: {answer}</span>
      <div aria-hidden className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-sunken px-3.5 py-2 text-[13px] text-fg">
        Why did churn go up this week?
      </div>
      <div aria-hidden className="flex gap-2.5">
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
          <SparklesIcon aria-hidden className="size-3.5" />
        </span>
        <p className="min-h-[60px] text-[13px] leading-[1.55] text-fg">
          {answer.slice(0, shown)}
          {shown < answer.length ? <span className="ml-0.5 inline-block h-[1em] w-px translate-y-[2px] animate-[caret-blink_1s_steps(1)_infinite] bg-fg motion-reduce:animate-none" /> : null}
        </p>
      </div>
    </div>
  )
}

function LiveAlerts() {
  const items = [
    { t: "Stripe payout landed", d: "$12,400 · 2m ago", tone: "bg-success" },
    { t: "Trial ending: Acme", d: "3 days left · 12 seats", tone: "bg-warning" },
    { t: "Anomaly in refunds", d: "+220% vs last week", tone: "bg-danger" },
  ]
  return (
    <div className="w-full space-y-2">
      {items.map((it, i) => (
        <div key={it.t} className="flex items-center gap-3 rounded-xl border border-border bg-raised px-3 py-2.5 shadow-raised" style={{ marginLeft: i * 10, opacity: 1 - i * 0.12 }}>
          <span aria-hidden className={cn("size-2 shrink-0 rounded-full", it.tone)} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-medium text-fg">{it.t}</p>
            <p className="truncate text-[11.5px] text-fg-muted">{it.d}</p>
          </div>
          <BellIcon aria-hidden className="size-3.5 text-fg-subtle" />
        </div>
      ))}
    </div>
  )
}

function LiveSources() {
  const names = ["Stripe", "HubSpot", "Postgres", "Slack", "Sheets", "Linear"]
  return (
    <div className="relative mx-auto grid size-52 place-items-center">
      <span aria-hidden className="absolute inset-0 rounded-full border border-dashed border-border-strong" />
      <span aria-hidden className="absolute inset-8 rounded-full border border-border" />
      <span aria-hidden className="relative z-10 grid size-14 place-items-center rounded-2xl bg-ink text-on-ink shadow-ink">
        <SparklesIcon className="size-5" />
      </span>
      <div className="absolute inset-0 animate-[spin_40s_linear_infinite] motion-reduce:animate-none">
        {names.map((n, i) => {
          const a = (i / names.length) * Math.PI * 2
          return (
            <span
              key={n}
              className="absolute grid h-7 place-items-center rounded-full border border-border bg-raised px-2.5 text-[11px] font-medium whitespace-nowrap text-fg shadow-key"
              style={{ left: `calc(50% + ${Math.cos(a) * 104}px)`, top: `calc(50% + ${Math.sin(a) * 104}px)`, transform: "translate(-50%,-50%)" }}
            >
              <span className="inline-block animate-[spin_40s_linear_infinite_reverse] motion-reduce:animate-none">{n}</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}

function LiveChecks() {
  const rows = ["Row-level permissions", "SSO and SCIM", "Audit log on every answer", "EU or US data residency"]
  return (
    <ul className="w-full space-y-2.5">
      {rows.map((r) => (
        <li key={r} className="flex items-center gap-2.5 text-[13px] text-fg">
          <span className="grid size-5 place-items-center rounded-full bg-accent-soft text-accent-fg">
            <CheckIcon aria-hidden className="size-3" strokeWidth={3} />
          </span>
          {r}
        </li>
      ))}
    </ul>
  )
}

const DEFAULT_ITEMS: BentoItem[] = [
  { title: "Numbers that move when the business does", body: "Every metric is live. No refresh button, no stale Monday report.", visual: <LiveMetric />, span: 4, tall: true },
  { title: "Ask in plain English", body: "Lumen reads your data and answers with the reason, not just the number.", visual: <LiveAsk />, span: 2, tall: true },
  { title: "Alerts that matter", body: "Payouts, trials, anomalies. Ranked by money at stake.", visual: <LiveAlerts />, span: 2 },
  { title: "Plugs into what you run", body: "Two-click connections to the tools your team already pays for.", visual: <LiveSources />, span: 2 },
  { title: "Enterprise from day one", body: "The controls your security review asks about, already on.", visual: <LiveChecks />, span: 2 },
]

const SPAN: Record<number, string> = { 2: "lg:col-span-2", 3: "lg:col-span-3", 4: "lg:col-span-4", 6: "lg:col-span-6" }

function BentoLive({
  eyebrow = "Product",
  title = "Everything your finance team checks, checked for them.",
  description,
  items = DEFAULT_ITEMS,
  className,
}: BentoLiveProps) {
  const reduce = useReducedMotion()
  const titleId = React.useId()
  return (
    <section data-slot="bento-live" aria-labelledby={titleId} className={cn("mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8", className)}>
      <div className="max-w-2xl">
        {eyebrow ? <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">{eyebrow}</p> : null}
        <h2 id={titleId} className="mt-3 text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance text-fg sm:text-5xl">{title}</h2>
        {description ? <p className="mt-4 text-[1.0625rem] leading-[1.65] text-fg-muted">{description}</p> : null}
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:auto-rows-[minmax(260px,auto)] lg:grid-cols-6">
        {items.map((it, i) => (
          <motion.article
            key={it.title}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.2, 0, 0, 1] }}
            className={cn(
              "group/tile relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-raised",
              "transition-[translate,box-shadow] duration-300 ease-hairline hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0",
              SPAN[it.span ?? 2],
              it.tall && "lg:row-span-2",
              (it.span ?? 2) >= 4 && "sm:col-span-2"
            )}
          >
            <div className="flex flex-1 items-center p-6 sm:p-7">{it.visual}</div>
            <div className="border-t border-border px-6 py-5 sm:px-7">
              <h3 className="text-[15px] font-medium tracking-[-0.01em] text-fg">{it.title}</h3>
              <p className="mt-1 text-[13.5px] leading-[1.55] text-fg-muted">{it.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export { BentoLive }
export type { BentoLiveProps, BentoItem }
