"use client"
import * as React from "react"
import { ArrowRightIcon, BellIcon, CheckIcon, SearchIcon, SparklesIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Kbd } from "@/registry/ui/kbd"
import { NumberRoll } from "@/registry/ui/number-roll"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { Switch } from "@/registry/ui/switch"
import { StatusBadge } from "@/registry/ui/status-badge"

/*
 * The hero's live product cards. The server renders them into the page, and
 * this code (with the motion library behind NumberRoll, Switch and
 * SegmentedControl) loads only on the visitor's first input, or a few seconds
 * after load, so it never competes with the first paint (see LazySection).
 */

/* Parallax toward the light: nearer things (higher depth) move more. */
const depth = (d: number): React.CSSProperties => ({
  transform: `translate3d(calc(var(--sx) * ${-d * 3}px), calc(var(--sy) * ${-d * 3}px), 0)`,
})

/* Entrance is pure CSS (.hero-float in globals.css), so the stage paints before any JavaScript runs. */
function Float({ d, className, children, delay = 0 }: { d: number; className?: string; children: React.ReactNode; delay?: number }) {
  return (
      <div className={cn("hero-float", className)} style={{ animationDelay: `${0.35 + delay}s` }}>
        <div style={depth(d)} className="will-change-transform">
          {children}
        </div>
      </div>
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

  export function StageCards() {
    const [period, setPeriod] = React.useState("yearly")
    const [rev, setRev] = React.useState(48290)
    // These cards go live on the visitor's first input, so the revenue can start ticking right away.
    React.useEffect(() => {
      const t = window.setInterval(() => {
        if (!document.hidden) setRev((x) => x + Math.round(60 + Math.random() * 380))
      }, 3200)
      return () => clearInterval(t)
    }, [])
    const yearly = period === "yearly"
    return (
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
  )
}
