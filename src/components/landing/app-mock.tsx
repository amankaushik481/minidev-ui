"use client"
import * as React from "react"
import {
  BarChart3Icon,
  BellIcon,
  CheckIcon,
  ChevronDownIcon,
  CreditCardIcon,
  DownloadIcon,
  LayoutGridIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AreaChart } from "@/registry/ui/area-chart"

/**
 * AppMock — a complete product surface ("Lumen", a fictional billing app)
 * built from MiniDev UI parts. Rendered twice by the hero: once as product,
 * once as its hairline spec. <Block> keeps both renders on identical geometry.
 */

const WireCtx = React.createContext(false)

function Block({
  label,
  spec,
  className,
  children,
  as: As = "div",
}: {
  label?: string
  spec?: string
  className?: string
  children?: React.ReactNode
  as?: "div" | "aside" | "header" | "section"
}) {
  const wire = React.useContext(WireCtx)
  return (
    <As className={cn("relative", className, wire && "border-transparent! bg-transparent! shadow-none!")}>
      <div className={cn("contents", wire && "[&>*]:invisible")}>{children}</div>
      {wire ? (
        <div className="pointer-events-none visible absolute inset-0 rounded-[inherit] border border-accent-line bg-[color-mix(in_oklch,var(--accent)_4%,transparent)]">
          {label ? (
            <span className="absolute top-1.5 left-2 font-mono text-[10px] leading-none text-accent-fg">{label}</span>
          ) : null}
          {spec ? (
            <span className="absolute right-2 bottom-1.5 font-mono text-[9px] leading-none text-accent-fg/70">{spec}</span>
          ) : null}
        </div>
      ) : null}
    </As>
  )
}

const KPIS = [
  { label: "MRR", value: "$84,210", delta: "+12.4%", up: true, pts: [30, 34, 33, 38, 41, 40, 46, 52, 50, 57, 61, 66] },
  { label: "Subscriptions", value: "2,418", delta: "+3.1%", up: true, pts: [20, 22, 21, 24, 25, 25, 27, 28, 30, 29, 31, 33] },
  { label: "Net churn", value: "1.8%", delta: "−0.4pp", up: true, pts: [30, 28, 29, 26, 25, 26, 23, 22, 21, 20, 19, 18] },
  { label: "ARPU", value: "$34.82", delta: "+2.2%", up: true, pts: [24, 25, 24, 26, 27, 27, 28, 28, 29, 30, 30, 31] },
]

const MRR = [42, 44, 43, 47, 49, 48, 53, 56, 55, 60, 63, 62, 67, 71, 70, 74, 79, 84]

const INVOICES = [
  { who: "Northwind Labs", ini: "NL", plan: "Scale · annual", status: "Paid", tone: "success", amt: "$12,480.00" },
  { who: "Halcyon Health", ini: "HH", plan: "Team · monthly", status: "Due in 3d", tone: "warning", amt: "$1,920.00" },
  { who: "Parabola Studio", ini: "PS", plan: "Pro · monthly", status: "Paid", tone: "success", amt: "$640.00" },
  { who: "Kestrel Freight", ini: "KF", plan: "Team · annual", status: "Failed", tone: "danger", amt: "$4,800.00" },
] as const

const NAV = [
  { icon: LayoutGridIcon, label: "Overview" },
  { icon: BarChart3Icon, label: "Revenue", active: true },
  { icon: UsersIcon, label: "Customers", count: "2.4k" },
  { icon: CreditCardIcon, label: "Invoices", count: "18" },
  { icon: SparklesIcon, label: "Ask Lumen", badge: "AI" },
  { icon: SettingsIcon, label: "Settings" },
]

function Sparkline({ pts }: { pts: number[] }) {
  return <AreaChart data={pts} grid={false} className="h-8 w-20" label="trend" />
}

export function AppMock({ wire = false, className }: { wire?: boolean; className?: string }) {
  return (
    <WireCtx.Provider value={wire}>
      <div
        aria-hidden={wire || undefined}
        className={cn(
          "relative flex h-[680px] w-[1200px] flex-col overflow-hidden rounded-[18px] border text-left",
          wire ? "border-accent-line bg-bg" : "border-border bg-bg shadow-lg",
          className
        )}
      >
        {wire ? <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid [--grid-line:color-mix(in_oklch,var(--accent)_9%,transparent)] [--grid-size:24px]" /> : null}

        {/* Window bar */}
        <Block as="header" label="window-chrome" spec="h44" className="flex h-11 shrink-0 items-center gap-3 border-b border-border bg-surface px-4">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[oklch(0.72_0.17_25)]" />
            <span className="size-2.5 rounded-full bg-[oklch(0.82_0.15_85)]" />
            <span className="size-2.5 rounded-full bg-[oklch(0.74_0.16_150)]" />
          </div>
          <div className="mx-auto flex h-6 w-72 items-center justify-center gap-1.5 rounded-md border border-border bg-sunken text-[11px] text-fg-subtle">
            <span className="size-1.5 rounded-full bg-success" /> app.lumen.dev/revenue
          </div>
          <div className="flex -space-x-1.5">
            {["oklch(0.7 0.12 250)", "oklch(0.72 0.13 30)", "oklch(0.7 0.12 160)"].map((c, i) => (
              <span key={i} className="size-5 rounded-full border-2 border-surface" style={{ background: c }} />
            ))}
          </div>
        </Block>

        <div className="flex min-h-0 flex-1">
          {/* Sidebar */}
          <Block as="aside" label="sidebar" spec="w232 · p12" className="flex w-[232px] shrink-0 flex-col gap-4 border-r border-border bg-surface p-3">
            <div className="flex items-center gap-2 rounded-lg px-1.5 py-1">
              <span className="grid size-7 place-items-center rounded-lg bg-ink text-[11px] font-semibold text-on-ink shadow-ink">L</span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium leading-tight text-fg">Lumen</p>
                <p className="text-[11px] leading-tight text-fg-subtle">Finance workspace</p>
              </div>
              <ChevronDownIcon className="size-3.5 text-fg-subtle" />
            </div>
            <div className="flex h-8 items-center gap-2 rounded-lg border border-border bg-sunken px-2.5 text-[12px] text-fg-subtle">
              <SearchIcon className="size-3.5" /> Search
              <span className="ml-auto rounded border border-border bg-surface px-1 text-[10px]">⌘K</span>
            </div>
            <nav className="flex flex-col gap-0.5">
              {NAV.map((n) => (
                <span
                  key={n.label}
                  className={cn(
                    "flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-[13px]",
                    n.active ? "bg-sunken font-medium text-fg shadow-[inset_0_0_0_1px_var(--border)]" : "text-fg-muted"
                  )}
                >
                  <n.icon className={cn("size-4", n.active ? "text-accent" : "text-fg-subtle")} />
                  {n.label}
                  {"count" in n && n.count ? <span className="ml-auto font-mono text-[10px] text-fg-subtle">{n.count}</span> : null}
                  {"badge" in n && n.badge ? (
                    <span className="ml-auto rounded-full border border-accent-line bg-accent-soft px-1.5 text-[10px] font-medium text-accent-fg">{n.badge}</span>
                  ) : null}
                </span>
              ))}
            </nav>
            <Block label="usage-meter" className="mt-auto rounded-xl border border-border bg-bg p-3">
              <div className="flex items-center justify-between text-[12px]">
                <span className="font-medium text-fg">API usage</span>
                <span className="font-mono text-[11px] text-fg-muted">72%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sunken">
                <div className="h-full w-[72%] rounded-full bg-accent" />
              </div>
              <p className="mt-2 text-[11px] text-fg-subtle">Resets in 9 days</p>
            </Block>
          </Block>

          {/* Main */}
          <main className="flex min-w-0 flex-1 flex-col gap-4 p-6">
            <Block label="page-header" spec="h56" className="flex items-end justify-between">
              <div>
                <p className="text-[12px] text-fg-subtle">Finance / Revenue</p>
                <h3 className="mt-1 text-[22px] font-medium tracking-[-0.02em] text-fg">Revenue</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 items-center rounded-lg border border-border bg-sunken p-[3px] text-[12px]">
                  <span className="rounded-[6px] bg-surface px-2.5 py-1 font-medium text-fg shadow-[0_1px_2px_0_oklch(0_0_0/0.08),0_0_0_1px_var(--border)]">30D</span>
                  <span className="px-2.5 py-1 text-fg-muted">90D</span>
                  <span className="px-2.5 py-1 text-fg-muted">1Y</span>
                </div>
                <span className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-[12px] font-medium text-fg shadow-key">
                  <DownloadIcon className="size-3.5 text-fg-muted" /> Export
                </span>
                <span className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-ink px-3 text-[12px] font-medium text-on-ink shadow-ink">
                  <PlusIcon className="size-3.5" /> New report
                </span>
              </div>
            </Block>

            <div className="grid grid-cols-4 gap-4">
              {KPIS.map((k) => (
                <Block key={k.label} label="stat-card" spec="r12 · p16" className="rounded-xl border border-border bg-surface p-4 shadow-raised">
                  <p className="text-[12px] text-fg-muted">{k.label}</p>
                  <div className="mt-1.5 flex items-end justify-between gap-2">
                    <div>
                      <p className="text-[21px] font-medium tracking-[-0.025em] text-fg tabular-nums">{k.value}</p>
                      <p className={cn("mt-0.5 text-[11px] font-medium tabular-nums", k.up ? "text-success" : "text-danger")}>{k.delta}</p>
                    </div>
                    <Sparkline pts={k.pts} />
                  </div>
                </Block>
              ))}
            </div>

            <div className="grid grid-cols-[1.65fr_1fr] gap-4">
              <Block label="chart-card · area-chart" spec="r12 · p20" className="rounded-xl border border-border bg-surface p-5 shadow-raised">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[13px] font-medium text-fg">Monthly recurring revenue</p>
                    <p className="mt-0.5 text-[11px] text-fg-subtle">Trailing 18 weeks · USD</p>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-fg-muted">
                    <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-accent" />MRR</span>
                    <span className="inline-flex items-center gap-1.5"><span className="h-px w-3 border-t border-dashed border-fg-subtle" />Target</span>
                  </div>
                </div>
                <div className="relative mt-4">
                  <AreaChart data={MRR} highlight={13} className="h-[150px]" label="MRR" />
                  <div className="absolute top-[4px] left-[73%] -translate-x-1/2 rounded-lg border border-border bg-raised px-2.5 py-1.5 shadow-md">
                    <p className="text-[10px] text-fg-subtle">Week 14</p>
                    <p className="text-[12px] font-medium tabular-nums text-fg">$71,040</p>
                  </div>
                  <div className="absolute inset-x-0 top-[28%] border-t border-dashed border-fg-subtle/60" />
                </div>
              </Block>

              <Block label="plan-mix · bar-list" spec="r12 · p20" className="rounded-xl border border-border bg-surface p-5 shadow-raised">
                <p className="text-[13px] font-medium text-fg">Plan mix</p>
                <p className="mt-0.5 text-[11px] text-fg-subtle">Share of MRR</p>
                <div className="mt-5 space-y-3.5">
                  {[
                    ["Scale", 46, "$38.7k"],
                    ["Team", 31, "$26.1k"],
                    ["Pro", 17, "$14.3k"],
                    ["Starter", 6, "$5.1k"],
                  ].map(([name, pct, amt]) => (
                    <div key={name as string}>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-fg">{name}</span>
                        <span className="font-mono text-[11px] text-fg-muted">{amt}</span>
                      </div>
                      <div className="mt-1.5 flex h-1.5 gap-px overflow-hidden rounded-full bg-sunken">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%`, opacity: 0.4 + (pct as number) / 80 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Block>
            </div>

            <Block label="data-table" spec="row h40" className="min-h-0 flex-1 overflow-hidden rounded-xl border border-border bg-surface shadow-raised">
              <div className="flex h-10 items-center justify-between border-b border-border px-4">
                <p className="text-[13px] font-medium text-fg">Recent invoices</p>
                <span className="text-[11px] text-fg-subtle">View all →</span>
              </div>
              {INVOICES.map((r) => (
                <div key={r.who} className="grid h-10 grid-cols-[1.5fr_1fr_0.9fr_0.8fr] items-center border-b border-border/70 px-4 text-[12px] last:border-0">
                  <span className="flex items-center gap-2.5 text-fg">
                    <span className="grid size-6 place-items-center rounded-md border border-border bg-sunken text-[9px] font-semibold text-fg-muted">{r.ini}</span>
                    {r.who}
                  </span>
                  <span className="text-fg-muted">{r.plan}</span>
                  <span>
                    <span
                      className={cn(
                        "inline-flex h-5 items-center gap-1 rounded-md border px-1.5 text-[11px] font-medium",
                        r.tone === "success" && "border-success/20 bg-success/10 text-success",
                        r.tone === "warning" && "border-warning/25 bg-warning/12 text-[color-mix(in_oklch,var(--warning)_70%,var(--fg))]",
                        r.tone === "danger" && "border-danger/20 bg-danger/10 text-danger"
                      )}
                    >
                      <span className="size-1 rounded-full bg-current" />
                      {r.status}
                    </span>
                  </span>
                  <span className="text-right font-mono text-[12px] text-fg">{r.amt}</span>
                </div>
              ))}
            </Block>
          </main>
        </div>

        {!wire ? (
          <div className="absolute top-[60px] left-[300px] flex w-[300px] items-start gap-3 rounded-xl border border-border bg-raised p-3 shadow-overlay">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-success text-white">
              <CheckIcon className="size-3.5" strokeWidth={2.5} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-medium text-fg">Invoice INV-2041 paid</p>
              <p className="mt-0.5 text-[11.5px] text-fg-muted">Northwind Labs · $12,480.00 via ACH</p>
            </div>
            <BellIcon className="size-3.5 text-fg-subtle" />
          </div>
        ) : null}
      </div>
    </WireCtx.Provider>
  )
}
