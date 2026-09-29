"use client"
import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRightIcon, BellIcon, CheckIcon, CopyIcon, MousePointer2Icon, RulerIcon, SearchIcon, SparklesIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { SITE } from "@/lib/site"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { Button } from "@/registry/ui/button"
import { Kbd } from "@/registry/ui/kbd"
import { useBlueprint } from "@/components/blueprint/blueprint"
import { MaterialSwitcher } from "@/registry/ui/light-provider"
import { LightField } from "@/registry/premium/light-field"
import { NumberRoll } from "@/registry/ui/number-roll"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { Switch } from "@/registry/ui/switch"
import { StatusBadge } from "@/registry/ui/status-badge"

export const COUNTS = {
  total: COMPONENT_INDEX.length,
  ui: COMPONENT_INDEX.filter((c) => c.kind === "ui").length,
  blocks: COMPONENT_INDEX.filter((c) => c.kind === "block").length,
  motion: COMPONENT_INDEX.filter((c) => c.kind === "premium").length,
}

export function InstallPill({ className }: { className?: string }) {
  const cmd = `npm i ${SITE.npmPackage}`
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try { await navigator.clipboard.writeText(cmd) } catch {}
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      aria-label={copied ? "Copied install command" : `Copy install command: ${cmd}`}
      className={cn(
        "group/pill inline-flex h-11 items-center gap-3 rounded-[0.625rem] border border-border bg-surface pr-2 pl-4 font-mono text-[13px] text-fg shadow-key outline-none",
        "transition-[border-color,background-color] duration-[140ms] ease-hairline hover:border-border-strong",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
    >
      <span className="text-fg-subtle select-none">$</span>
      <span>{cmd}</span>
      <span className={cn("grid size-7 place-items-center rounded-md transition-colors", copied ? "bg-success/12 text-success" : "text-fg-subtle group-hover/pill:bg-sunken group-hover/pill:text-fg")}>
        {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
      </span>
    </button>
  )
}

const rise = (reduce: boolean | null, delay: number) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12, filter: "blur(4px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: { duration: 0.7, delay, ease: [0.2, 0, 0, 1] as const },
      }

/* Parallax toward the light: nearer things (higher depth) move more. */
const depth = (d: number): React.CSSProperties => ({
  transform: `translate3d(calc(var(--sx) * ${-d * 3}px), calc(var(--sy) * ${-d * 3}px), 0)`,
})

function Float({ d, className, children, delay = 0 }: { d: number; className?: string; children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay: 0.35 + delay, ease: [0.2, 0, 0, 1] }}
      className={className}
    >
      <div style={depth(d)} className="will-change-transform">
        {children}
      </div>
    </motion.div>
  )
}

const SERIES = [22, 30, 27, 36, 48, 42, 55, 51, 64, 60, 72, 80]
function MiniChart() {
  const w = 300
  const h = 90
  const pts = SERIES.map((v, i) => [(i / (SERIES.length - 1)) * w, h - (v / 90) * h] as const)
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ")
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-24 w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="hero-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill="url(#hero-fill)" />
      <path d={d} fill="none" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  )
}

function Stage() {
  const [period, setPeriod] = React.useState("yearly")
  const [rev, setRev] = React.useState(48290)
  React.useEffect(() => {
    const t = setInterval(() => setRev((x) => x + Math.round(60 + Math.random() * 380)), 3200)
    return () => clearInterval(t)
  }, [])
  const yearly = period === "yearly"
  return (
    <div className="relative mx-auto mt-12 max-w-6xl sm:mt-14">
      <div className="mb-8 flex flex-col items-center gap-3">
        <MaterialSwitcher size="lg" className="hidden sm:inline-flex" />
        <MaterialSwitcher className="sm:hidden" />
        <p className="flex items-center gap-2 text-[12.5px] text-fg-subtle">
          <MousePointer2Icon className="size-3.5" />
          <span className="hidden sm:inline">Move your cursor, it is the light. Then switch the material.</span>
          <span className="sm:hidden">The light drifts on its own. Switch the material.</span>
        </p>
      </div>
      {/* Colour behind the glass, so there is something to refract. */}
      <div aria-hidden className="only-glass pointer-events-none absolute inset-x-0 top-24 bottom-0 -z-10">
        <div style={depth(-6)} className="absolute top-[8%] left-[6%] size-[340px] rounded-full bg-accent opacity-55 blur-[90px]" />
        <div style={depth(-4)} className="absolute top-[30%] left-[42%] size-[300px] rounded-full bg-info opacity-45 blur-[90px]" />
        <div style={depth(-7)} className="absolute top-[4%] right-[4%] size-[320px] rounded-full bg-accent-2 opacity-50 blur-[90px]" />
      </div>
    <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[1fr_1.25fr_1fr] lg:gap-6">
      {/* left */}
      <div className="flex flex-col gap-5 lg:pt-16">
        <Float d={3} delay={0.05}>
          <div className="rounded-2xl border border-border bg-surface p-4 shadow-raised">
            <div className="flex items-center justify-between">
              <SegmentedControl
                size="sm"
                aria-label="Billing period"
                value={period}
                onChange={setPeriod}
                options={[
                  { value: "monthly", label: "Monthly" },
                  { value: "yearly", label: "Yearly", badge: "-20%" },
                ]}
              />
            </div>
            <div className="mt-4 rounded-xl bg-ink p-4 text-on-ink shadow-ink">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-medium">Team</p>
                <span className="rounded-full bg-on-ink/15 px-2 py-0.5 text-[10.5px] font-medium">Most picked</span>
              </div>
              <p className="mt-2 flex items-baseline gap-1">
                <span className="text-[40px] leading-[44px] font-medium tracking-[-0.04em]">
                  <NumberRoll value={yearly ? 24 : 30} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} />
                </span>
                <span className="text-[12.5px] opacity-65">/ seat / mo</span>
              </p>
              <button type="button" className="mt-4 h-9 w-full rounded-lg bg-on-ink text-[13px] font-medium text-ink outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent">
                Start 14-day trial
              </button>
            </div>
          </div>
        </Float>
        <Float d={1} delay={0.15}>
          <div className="rounded-2xl border border-border bg-surface p-4 shadow-raised">
            <p className="text-[13px] font-medium text-fg">Notifications</p>
            <div className="mt-3 space-y-3">
              {[
                ["Payment received", true],
                ["Weekly digest", true],
                ["Product updates", false],
              ].map(([l, on]) => (
                <label key={l as string} className="flex items-center justify-between gap-3 text-[13px] text-fg-muted">
                  {l}
                  <Switch defaultChecked={on as boolean} aria-label={l as string} />
                </label>
              ))}
            </div>
          </div>
        </Float>
      </div>

      {/* center */}
      <div className="flex flex-col gap-5 sm:col-span-2 sm:row-start-1 lg:col-span-1 lg:col-start-2">
        <Float d={2}>
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-raised">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[12.5px] text-fg-muted">Revenue, last 30 days</p>
                <p className="mt-1 text-[34px] leading-10 font-medium tracking-[-0.035em] text-fg">
                  <NumberRoll value={rev} trend format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} />
                </p>
              </div>
              <StatusBadge tone="success">+12.4%</StatusBadge>
            </div>
            <div className="mt-4">
              <MiniChart />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4">
              {[
                ["Customers", "1,391"],
                ["Churn", "2.1%"],
                ["ARPU", "$34.70"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[11.5px] text-fg-subtle">{k}</p>
                  <p className="mt-0.5 text-[15px] font-medium text-fg tabular-nums">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </Float>
        <Float d={5} delay={0.25} className="lg:-mt-2 lg:ml-10">
          <div role="status" className="flex items-start gap-3 rounded-2xl border border-border bg-raised p-3.5 shadow-overlay">
            <span className="mt-px grid size-6 shrink-0 place-items-center rounded-full bg-success text-white">
              <CheckIcon className="size-3.5" strokeWidth={2.5} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-fg">Northwind Labs paid $12,400</p>
              <p className="text-[12px] text-fg-muted">INV-2041 settled to your Stripe balance.</p>
            </div>
            <span className="font-mono text-[10.5px] text-fg-subtle">now</span>
          </div>
        </Float>
      </div>

      {/* right */}
      <div className="flex flex-col gap-5 lg:pt-8">
        <Float d={2} delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-border bg-raised shadow-overlay">
            <div className="flex h-11 items-center gap-2.5 border-b border-border px-3.5 text-[13px] text-fg-subtle">
              <SearchIcon className="size-4" /> Ask Lumen or search
              <Kbd className="ml-auto">⌘K</Kbd>
            </div>
            <div className="p-1.5">
              {[
                { i: SparklesIcon, l: "Summarize this month", k: "↵", on: true },
                { i: BellIcon, l: "Remind unpaid customers", k: "R" },
                { i: ArrowRightIcon, l: "Go to Invoices", k: "G I" },
              ].map(({ i: I, l, k, on }) => (
                <div key={l} className={cn("flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-[13px]", on ? "bg-sunken text-fg" : "text-fg-muted")}>
                  <I className={cn("size-4", on && "text-accent-fg")} />
                  {l}
                  <span className="ml-auto font-mono text-[10.5px] text-fg-subtle">{k}</span>
                </div>
              ))}
            </div>
          </div>
        </Float>
        <Float d={4} delay={0.2}>
          <div className="rounded-2xl border border-border bg-surface p-4 shadow-raised">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-medium text-fg">Team</p>
              <span className="text-[12px] text-fg-muted">6 of 10 seats</span>
            </div>
            <div className="mt-3 flex -space-x-2">
              {["AK", "JL", "SR", "MW", "PT", "DN"].map((a, i) => (
                <span key={a} className="grid size-8 place-items-center rounded-full border-2 border-surface bg-sunken text-[10.5px] font-medium text-fg-muted" style={{ zIndex: 10 - i }}>
                  {a}
                </span>
              ))}
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-sunken">
              <div className="h-full w-[60%] rounded-full bg-accent" />
            </div>
            <Button size="sm" variant="outline" className="mt-4 w-full">
              Invite teammates
            </Button>
          </div>
        </Float>
      </div>
    </div>
    </div>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const { toggle } = useBlueprint()
  return (
    <section className="relative isolate overflow-hidden pb-8">
      {/* The light, visible on the page itself */}
      <div aria-hidden className="absolute inset-0 -z-10 [mask-image:linear-gradient(black_62%,transparent)]">
        <LightField />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-50 [--grid-size:56px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black_20%,transparent_75%)]" />

      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.div {...rise(reduce, 0)}>
            <button
              type="button"
              onClick={toggle}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface py-1 pr-3 pl-1 text-[12.5px] text-fg-muted shadow-xs outline-none transition-colors hover:border-border-strong hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-on-accent">
                <RulerIcon className="size-3" /> New
              </span>
              <span className="sm:hidden">Blueprint mode. Tap to try</span>
              <span className="hidden sm:inline-flex sm:items-center sm:gap-1">
                Blueprint mode: hold <Kbd className="h-4.5 min-w-4.5 text-[10px]">⌥</Kbd> anywhere, or click here
              </span>
              <ArrowRightIcon className="size-3.5 transition-transform duration-200 ease-hairline group-hover:translate-x-0.5" />
            </button>
          </motion.div>

          <motion.h1
            {...rise(reduce, 0.08)}
            className="mt-7 text-[2.6rem] leading-[1.02] font-medium tracking-[-0.045em] text-balance sm:text-6xl sm:leading-[0.98] lg:text-[5rem] lg:leading-[0.95] lg:tracking-[-0.055em]"
          >
            <span className="text-fg-subtle">Every UI kit is flat.</span>
            <br />
            <span className="text-lit">This one is lit.</span>
          </motion.h1>

          <motion.p {...rise(reduce, 0.16)} className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.6] text-pretty text-fg-muted sm:text-lg">
            One light crosses the page and all {COUNTS.total} components catch it: shadows swing, glass frosts, metal glints. Pick a
            material and the whole kit changes with it. Free, MIT, React&nbsp;+&nbsp;Tailwind.
          </motion.p>

          <motion.div {...rise(reduce, 0.24)} className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button size="lg" render={<Link href="/gallery" />}>
              Browse components
              <ArrowRightIcon />
            </Button>
            <InstallPill />
          </motion.div>
        </div>

        <Stage />
      </div>
    </section>
  )
}
