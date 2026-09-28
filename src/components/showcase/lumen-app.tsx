"use client"
import * as React from "react"
import {
  BarChart3Icon, BellIcon, ChevronDownIcon, CreditCardIcon, DownloadIcon, FilterIcon, LayoutGridIcon, MenuIcon, PlusIcon,
  SearchIcon, SettingsIcon, SparklesIcon, UsersIcon, XIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Textarea } from "@/registry/ui/textarea"
import { StatusBadge } from "@/registry/ui/status-badge"
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { AreaChart } from "@/registry/ui/area-chart"
import { LineChart } from "@/registry/ui/line-chart"
import { AiDemo, BillingDemo, DataDemo, SettingsDemo } from "@/components/landing/bento"

type Screen = "overview" | "revenue" | "customers" | "billing" | "assistant" | "settings"

const NAV: { id: Screen; icon: typeof LayoutGridIcon; label: string; count?: string; badge?: string }[] = [
  { id: "overview", icon: LayoutGridIcon, label: "Overview" },
  { id: "revenue", icon: BarChart3Icon, label: "Revenue" },
  { id: "customers", icon: UsersIcon, label: "Customers", count: "2.4k" },
  { id: "billing", icon: CreditCardIcon, label: "Billing" },
  { id: "assistant", icon: SparklesIcon, label: "Ask Lumen", badge: "AI" },
  { id: "settings", icon: SettingsIcon, label: "Settings" },
]

function Header({ title, crumb, actions }: { title: string; crumb: string; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-xs text-fg-subtle">{crumb}</p>
        <h2 className="mt-1 text-[22px] font-medium tracking-[-0.022em] text-fg">{title}</h2>
      </div>
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  )
}

function Panel({ title, hint, action, className, children }: { title: string; hint?: string; action?: React.ReactNode; className?: string; children: React.ReactNode }) {
  return (
    <section className={cn("rounded-xl border border-border bg-surface shadow-raised", className)}>
      <div className="flex items-start justify-between gap-3 px-5 pt-4">
        <div>
          <p className="text-[13px] font-medium text-fg">{title}</p>
          {hint ? <p className="mt-0.5 text-[11.5px] text-fg-subtle">{hint}</p> : null}
        </div>
        {action}
      </div>
      <div className="p-5 pt-4">{children}</div>
    </section>
  )
}

const KPIS = [
  { label: "MRR", value: "$84,210", delta: "+12.4%", pts: [30, 34, 33, 38, 41, 40, 46, 52, 50, 57, 61, 66] },
  { label: "Subscriptions", value: "2,418", delta: "+3.1%", pts: [20, 22, 21, 24, 25, 25, 27, 28, 30, 29, 31, 33] },
  { label: "Net churn", value: "1.8%", delta: "−0.4pp", pts: [30, 28, 29, 26, 25, 26, 23, 22, 21, 20, 19, 18] },
  { label: "ARPU", value: "$34.82", delta: "+2.2%", pts: [24, 25, 24, 26, 27, 27, 28, 28, 29, 30, 30, 31] },
]

function Kpis() {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {KPIS.map((k) => (
        <div key={k.label} className="rounded-xl border border-border bg-surface p-4 shadow-raised">
          <p className="text-[12px] text-fg-muted">{k.label}</p>
          <div className="mt-1.5 flex items-end justify-between gap-2">
            <div>
              <p className="text-[21px] font-medium tracking-[-0.025em] tabular-nums text-fg">{k.value}</p>
              <p className="mt-0.5 text-[11px] font-medium tabular-nums text-success">{k.delta}</p>
            </div>
            <AreaChart data={k.pts} grid={false} className="h-8 w-20" label={`${k.label} trend`} />
          </div>
        </div>
      ))}
    </div>
  )
}

function Overview() {
  const [range, setRange] = React.useState("30d")
  const series = { "30d": [42, 44, 43, 47, 49, 48, 53, 56, 55, 60, 63, 62, 67, 71, 70, 74, 79, 84], "90d": [30, 33, 31, 36, 40, 38, 44, 48, 47, 52, 55, 58, 60, 63, 66, 70, 76, 84], "1y": [12, 15, 18, 20, 24, 27, 31, 33, 38, 42, 47, 50, 55, 61, 66, 72, 78, 84] } as Record<string, number[]>
  return (
    <div className="space-y-5">
      <Header
        crumb="Lumen / Overview"
        title="Good morning, Ada"
        actions={
          <>
            <Tabs value={range} onValueChange={(v) => setRange(String(v))}>
              <TabsList>
                <TabsTrigger value="30d">30D</TabsTrigger>
                <TabsTrigger value="90d">90D</TabsTrigger>
                <TabsTrigger value="1y">1Y</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button size="sm" variant="outline"><DownloadIcon /> Export</Button>
            <Button size="sm"><PlusIcon /> New report</Button>
          </>
        }
      />
      <Kpis />
      <div className="grid gap-4 xl:grid-cols-[1.65fr_1fr]">
        <Panel title="Monthly recurring revenue" hint="USD · compared with target">
          <div className="relative">
            <AreaChart key={range} data={series[range]} highlight={series[range].length - 1} className="h-52" label="MRR" />
          </div>
        </Panel>
        <Panel title="Plan mix" hint="Share of MRR">
          <div className="space-y-4">
            {[["Scale", 46, "$38.7k"], ["Team", 31, "$26.1k"], ["Pro", 17, "$14.3k"], ["Starter", 6, "$5.1k"]].map(([n, p, a]) => (
              <div key={n as string}>
                <div className="flex items-center justify-between text-[12.5px]"><span className="text-fg">{n}</span><span className="font-mono text-[11px] text-fg-muted">{a}</span></div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-sunken"><div className="h-full rounded-full bg-accent transition-[width] duration-500 ease-hairline" style={{ width: `${p}%`, opacity: 0.4 + (p as number) / 80 }} /></div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <RecentInvoices />
    </div>
  )
}

const INVOICES = [
  { who: "Northwind Labs", ini: "NL", plan: "Scale · annual", status: "Paid", tone: "success", amt: "$12,480.00" },
  { who: "Halcyon Health", ini: "HH", plan: "Team · monthly", status: "Due in 3d", tone: "warning", amt: "$1,920.00" },
  { who: "Parabola Studio", ini: "PS", plan: "Pro · monthly", status: "Paid", tone: "success", amt: "$640.00" },
  { who: "Kestrel Freight", ini: "KF", plan: "Team · annual", status: "Failed", tone: "danger", amt: "$4,800.00" },
] as const

function RecentInvoices() {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-raised">
      <div className="flex h-11 items-center justify-between border-b border-border px-5">
        <p className="text-[13px] font-medium text-fg">Recent invoices</p>
        <Button size="xs" variant="ghost">View all</Button>
      </div>
      {INVOICES.map((r) => (
        <div key={r.who} className="grid h-12 grid-cols-[1.5fr_1fr_auto_7rem] items-center gap-4 border-b border-border/70 px-5 text-[12.5px] transition-colors last:border-0 hover:bg-sunken/50">
          <span className="flex items-center gap-2.5 text-fg">
            <span className="grid size-7 place-items-center rounded-lg border border-border bg-sunken text-[10px] font-semibold text-fg-muted">{r.ini}</span>
            {r.who}
          </span>
          <span className="hidden text-fg-muted sm:block">{r.plan}</span>
          <StatusBadge tone={r.tone}>{r.status}</StatusBadge>
          <span className="text-right font-mono text-fg">{r.amt}</span>
        </div>
      ))}
    </section>
  )
}

function Revenue() {
  return (
    <div className="space-y-5">
      <Header crumb="Lumen / Revenue" title="Revenue" actions={<Button size="sm" variant="outline"><FilterIcon /> Segment</Button>} />
      <Kpis />
      <Panel title="New vs expansion vs churned" hint="Last 12 months" action={
        <div className="flex gap-3 text-[11px] text-fg-muted">
          <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-[var(--chart-1)]" />New</span>
          <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-[var(--chart-2)]" />Expansion</span>
          <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-[var(--chart-3)]" />Churned</span>
        </div>
      }>
        <LineChart className="h-64" series={[[12, 14, 13, 17, 19, 18, 23, 26, 25, 30, 33, 36], [4, 5, 6, 6, 8, 9, 9, 11, 12, 14, 15, 17], [6, 6, 5, 6, 5, 5, 4, 5, 4, 4, 3, 3]]} />
      </Panel>
    </div>
  )
}

function Customers() {
  return (
    <div className="space-y-5">
      <Header crumb="Lumen / Customers" title="Customers" actions={<><Button size="sm" variant="outline">Import</Button><Button size="sm"><PlusIcon /> Add customer</Button></>} />
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-64">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-fg-subtle" />
          <Input size="sm" placeholder="Search customers" className="pl-8" aria-label="Search customers" />
        </div>
        {["Status: Any", "Plan: Any", "Region"].map((f, i) => (
          <button key={f} type="button" className={cn("inline-flex h-8 items-center gap-1 rounded-lg border px-2.5 text-xs font-medium", i === 0 ? "border-accent-line bg-accent-soft text-accent-fg" : "border-dashed border-border text-fg-muted hover:text-fg")}>
            {i === 0 ? null : <PlusIcon className="size-3" />}{f}
          </button>
        ))}
      </div>
      <DataDemo />
      <div className="flex items-center justify-between text-xs text-fg-muted">
        <span>Showing 1–4 of 2,418</span>
        <div className="flex gap-1.5"><Button size="xs" variant="outline" disabled>Previous</Button><Button size="xs" variant="outline">Next</Button></div>
      </div>
    </div>
  )
}

function Billing() {
  return (
    <div className="space-y-5">
      <Header crumb="Lumen / Billing" title="Billing" />
      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <Panel title="Your plan" hint="Change any time, prorated to the day"><BillingDemo /></Panel>
        <div className="space-y-4">
          <Panel title="Usage this cycle" hint="Resets on Oct 1">
            <div className="grid gap-4 sm:grid-cols-3">
              {[["Seats", 14, 20], ["API calls", 72, 100], ["Storage", 38, 100]].map(([l, u, t]) => (
                <div key={l as string}>
                  <div className="flex justify-between text-[12.5px]"><span className="text-fg">{l}</span><span className="font-mono text-[11px] text-fg-muted">{u}/{t}{l === "Seats" ? "" : "%"}</span></div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sunken"><div className={cn("h-full rounded-full", (u as number) / (t as number) > 0.7 ? "bg-warning" : "bg-accent")} style={{ width: `${((u as number) / (t as number)) * 100}%` }} /></div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Invoices">
            <div className="-mx-5 -mb-5 divide-y divide-border border-t border-border">
              {[["INV-2041", "Sep 1, 2026", "$1,176.00", "success", "Paid"], ["INV-1988", "Aug 1, 2026", "$1,176.00", "success", "Paid"], ["INV-1930", "Jul 1, 2026", "$980.00", "success", "Paid"], ["INV-1877", "Jun 1, 2026", "$980.00", "danger", "Refunded"]].map(([id, d, a, t, s]) => (
                <div key={id} className="grid grid-cols-[1fr_1fr_auto_auto] items-center gap-4 px-5 py-3 text-[12.5px]">
                  <span className="font-mono text-fg">{id}</span>
                  <span className="text-fg-muted">{d}</span>
                  <StatusBadge tone={t as "success" | "danger"}>{s}</StatusBadge>
                  <span className="w-20 text-right font-mono text-fg">{a}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

function Assistant() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-5">
      <Header crumb="Lumen / Ask Lumen" title="Ask Lumen" actions={<StatusBadge tone="accent">Beta</StatusBadge>} />
      <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col rounded-2xl border border-border bg-surface p-5 shadow-raised">
        <AiDemo />
      </div>
    </div>
  )
}

function Settings() {
  return (
    <div className="space-y-5">
      <Header crumb="Lumen / Settings" title="Settings" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Profile" hint="Shown to your teammates">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full border border-border bg-sunken text-sm font-semibold text-fg-muted">AO</span>
              <Button size="sm" variant="outline">Change photo</Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5"><Label htmlFor="s-name">Name</Label><Input id="s-name" defaultValue="Ada Okafor" /></div>
              <div className="space-y-1.5"><Label htmlFor="s-email">Email</Label><Input id="s-email" defaultValue="ada@northwind.dev" /></div>
            </div>
            <div className="space-y-1.5"><Label htmlFor="s-bio">Bio</Label><Textarea id="s-bio" defaultValue="Head of finance ops. Ask me about revenue recognition." className="min-h-20" /></div>
            <div className="flex justify-end gap-2"><Button size="sm" variant="ghost">Cancel</Button><Button size="sm">Save changes</Button></div>
          </div>
        </Panel>
        <div className="space-y-4">
          <Panel title="Notifications"><SettingsDemo /></Panel>
          <section className="rounded-xl border border-danger/25 bg-danger/[0.03] p-5">
            <p className="text-[13px] font-medium text-danger">Delete workspace</p>
            <p className="mt-1 text-[12.5px] text-fg-muted">Permanently remove Lumen and all of its data. This cannot be undone.</p>
            <Button size="sm" variant="destructive" className="mt-3">Delete workspace</Button>
          </section>
        </div>
      </div>
    </div>
  )
}

const SCREENS: Record<Screen, () => React.ReactNode> = {
  overview: Overview, revenue: Revenue, customers: Customers, billing: Billing, assistant: Assistant, settings: Settings,
}

export function LumenApp({ className }: { className?: string }) {
  const [screen, setScreen] = React.useState<Screen>("overview")
  const [menu, setMenu] = React.useState(false)
  const Body = SCREENS[screen]
  const nav = (
    <nav className="flex flex-col gap-0.5" aria-label="Lumen">
      {NAV.map((n) => (
        <button
          key={n.id}
          type="button"
          onClick={() => { setScreen(n.id); setMenu(false) }}
          aria-current={screen === n.id ? "page" : undefined}
          className={cn(
            "flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-left text-[13px] outline-none transition-colors duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent",
            screen === n.id ? "bg-sunken font-medium text-fg shadow-[inset_0_0_0_1px_var(--border)]" : "text-fg-muted hover:bg-sunken/60 hover:text-fg"
          )}
        >
          <n.icon className={cn("size-4", screen === n.id ? "text-accent" : "text-fg-subtle")} />
          {n.label}
          {n.count ? <span className="ml-auto font-mono text-[10px] text-fg-subtle">{n.count}</span> : null}
          {n.badge ? <span className="ml-auto rounded-full border border-accent-line bg-accent-soft px-1.5 text-[10px] font-medium text-accent-fg">{n.badge}</span> : null}
        </button>
      ))}
    </nav>
  )
  return (
    <div className={cn("flex h-[820px] flex-col overflow-hidden rounded-[18px] border border-border bg-bg shadow-lg", className)}>
      <div className="flex h-11 shrink-0 items-center gap-3 border-b border-border bg-surface px-4">
        <div className="hidden gap-1.5 sm:flex">
          <span className="size-2.5 rounded-full bg-[oklch(0.72_0.17_25)]" /><span className="size-2.5 rounded-full bg-[oklch(0.82_0.15_85)]" /><span className="size-2.5 rounded-full bg-[oklch(0.74_0.16_150)]" />
        </div>
        <button type="button" className="grid size-7 place-items-center rounded-md text-fg-muted hover:bg-sunken md:hidden" aria-label={menu ? "Close navigation" : "Open navigation"} onClick={() => setMenu((m) => !m)}>
          {menu ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
        </button>
        <div className="mx-auto flex h-6 max-w-72 flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-sunken px-2 text-[11px] text-fg-subtle">
          <span className="size-1.5 rounded-full bg-success" /> app.lumen.dev/{screen}
        </div>
        <BellIcon className="size-4 text-fg-subtle" />
      </div>
      <div className="relative flex min-h-0 flex-1">
        <aside className={cn("w-[232px] shrink-0 flex-col gap-4 border-r border-border bg-surface p-3", menu ? "absolute inset-y-0 left-0 z-20 flex shadow-overlay" : "hidden md:flex")}>
          <div className="flex items-center gap-2 rounded-lg px-1.5 py-1">
            <span className="grid size-7 place-items-center rounded-lg bg-ink text-[11px] font-semibold text-on-ink shadow-ink">L</span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] leading-tight font-medium text-fg">Lumen</p>
              <p className="text-[11px] leading-tight text-fg-subtle">Finance workspace</p>
            </div>
            <ChevronDownIcon className="size-3.5 text-fg-subtle" />
          </div>
          {nav}
          <div className="mt-auto rounded-xl border border-border bg-bg p-3">
            <div className="flex items-center justify-between text-[12px]"><span className="font-medium text-fg">API usage</span><span className="font-mono text-[11px] text-fg-muted">72%</span></div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sunken"><div className="h-full w-[72%] rounded-full bg-accent" /></div>
            <p className="mt-2 text-[11px] text-fg-subtle">Resets in 9 days</p>
          </div>
        </aside>
        <main key={screen} className="min-w-0 flex-1 animate-[rise-in_220ms_var(--ease-hairline)_both] overflow-y-auto p-5 sm:p-7">
          <Body />
        </main>
      </div>
    </div>
  )
}
