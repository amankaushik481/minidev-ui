"use client"
import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisIcon,
  FileTextIcon,
  HouseIcon,
  LockIcon,
  RocketIcon,
  RotateCwIcon,
  SettingsIcon,
  UsersIcon,
  WifiIcon,
  BatteryIcon,
  SignalIcon,
  ArrowUpRightIcon,
  PlusIcon,
  SendIcon,
  ReceiptIcon,
  ArrowDownLeftIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A browser window frame with traffic lights, back and forward buttons, an address bar and optional tabs, wrapping your screenshot or any children.
 * PhoneMockup, exported from the same file, is the matching handset with a
 * dynamic island and rounded screen. Both are built from tokens, so they
 * follow light, dark and every material. With no content, the browser shows
 * a Lumen dashboard made of plain divs, with a phone over its corner on wide
 * screens and below it on narrow ones.
 */
type BrowserMockupProps = {
  /** Address shown in the URL bar. */
  url?: string
  /** Tab labels. The strip is hidden when empty. */
  tabs?: string[]
  /** Index of the active tab. */
  activeTab?: number
  /** Screenshot to show instead of children. */
  src?: string
  alt?: string
  /** Stay dark in both themes, or follow the page theme. */
  appearance?: "auto" | "dark"
  /** Render a PhoneMockup beside the window. Defaults to on for the built-in sample only. */
  phone?: boolean
  children?: React.ReactNode
  className?: string
}

type PhoneMockupProps = {
  /** Screenshot to show instead of children. */
  src?: string
  alt?: string
  /** Clock in the status bar. */
  time?: string
  /** Width in pixels. Height follows the 9:19.5 screen ratio. */
  width?: number
  /** Stay dark in both themes, or follow the page theme. */
  appearance?: "auto" | "dark"
  children?: React.ReactNode
  className?: string
}

function TrafficLights() {
  return (
    <span aria-hidden className="flex items-center gap-1.5">
      <span className="size-2.5 rounded-full bg-danger/80" />
      <span className="size-2.5 rounded-full bg-warning/80" />
      <span className="size-2.5 rounded-full bg-success/80" />
    </span>
  )
}

function splitUrl(url: string) {
  const m = url.match(/^(?:(https?:\/\/))?([^/?#]+)(.*)$/)
  return m ? { scheme: m[1] ?? "", host: m[2], rest: m[3] } : { scheme: "", host: url, rest: "" }
}

const BARS = [34, 48, 42, 58, 52, 66, 60, 74, 70, 84, 78, 92]
const INVOICES = [
  { id: "INV-2041", name: "Maya Chen", amount: "$4,200.00", status: "Paid" },
  { id: "INV-2040", name: "Theo Okafor", amount: "$1,850.00", status: "Sent" },
  { id: "INV-2039", name: "Priya Raman", amount: "$12,400.00", status: "Paid" },
]
const NAV = [
  { icon: HouseIcon, label: "Overview", active: true },
  { icon: FileTextIcon, label: "Invoices" },
  { icon: UsersIcon, label: "Customers" },
  { icon: RocketIcon, label: "Deploys" },
  { icon: SettingsIcon, label: "Settings" },
]

/** The sample page: a slice of Lumen's overview, in plain divs. */
function LumenDashboard() {
  return (
    <div data-slot="browser-mockup-sample" className="flex h-[320px] text-[11px] leading-[1.5]">
      <aside className="hidden w-36 shrink-0 flex-col border-r border-border bg-surface p-3 @md:flex">
        <div className="flex items-center gap-2 px-1.5 pb-3">
          <span className="grid size-5 place-items-center rounded-md bg-ink text-[9px] font-semibold text-on-ink">L</span>
          <span className="text-xs font-medium text-fg">Lumen</span>
        </div>
        <ul className="space-y-0.5">
          {NAV.map((n) => (
            <li
              key={n.label}
              className={cn("flex h-7 items-center gap-2 rounded-md px-2", n.active ? "bg-sunken font-medium text-fg" : "text-fg-muted")}
            >
              <n.icon className="size-3.5" />
              {n.label}
            </li>
          ))}
        </ul>
      </aside>
      <main className="min-w-0 flex-1 space-y-3 overflow-hidden bg-bg p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium tracking-[-0.01em] text-fg">Overview</p>
          <span className="rounded-md border border-border bg-surface px-2 py-0.5 text-[10px] text-fg-muted shadow-xs">Last 30 days</span>
        </div>
        <div className="grid grid-cols-2 gap-2 @md:grid-cols-3">
          {[
            { label: "Revenue", value: "$128,400", delta: "+12.4%", up: true },
            { label: "Open invoices", value: "24", delta: "-3", up: false },
            { label: "New customers", value: "86", delta: "+18%", up: true },
          ].map((s, i) => (
            <div key={s.label} className={cn("min-w-0 rounded-lg border border-border bg-surface p-2.5 shadow-raised", i === 2 && "hidden @md:block")}>
              <p className="truncate text-[10px] text-fg-muted">{s.label}</p>
              <p className="mt-0.5 text-sm font-medium tracking-[-0.01em] text-fg">{s.value}</p>
              <p className={cn("text-[10px]", s.up ? "text-success" : "text-fg-subtle")}>{s.delta}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-2 @md:grid-cols-[1fr_1.2fr]">
          <div className="hidden flex-col rounded-lg border border-border bg-surface p-2.5 shadow-raised @md:flex">
            <p className="text-[10px] text-fg-muted">Revenue by week</p>
            <div className="mt-2 flex min-h-20 flex-1 items-end gap-1">
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className={cn("flex-1 rounded-sm", i === BARS.length - 1 ? "bg-accent" : "bg-accent-soft")}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface p-2.5 shadow-raised">
            <p className="text-[10px] text-fg-muted">Recent invoices</p>
            <ul className="mt-1.5 divide-y divide-border">
              {INVOICES.map((inv) => (
                <li key={inv.id} className="flex items-center justify-between py-1.5">
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-fg">{inv.name}</span>
                    <span className="font-mono text-[9.5px] text-fg-subtle">{inv.id}</span>
                  </span>
                  <span className="text-right">
                    <span className="block font-mono text-fg">{inv.amount}</span>
                    <span className={cn("text-[9.5px]", inv.status === "Paid" ? "text-success" : inv.status === "Due" ? "text-warning" : "text-fg-muted")}>
                      {inv.status}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

/** The sample phone screen: Lumen's mobile home. */
function LumenMobile() {
  return (
    <div data-slot="phone-mockup-sample" className="flex h-full flex-col gap-3 bg-bg px-3 pt-2 text-[11px] leading-[1.5]">
      <div>
        <p className="text-[10px] text-fg-muted">Good morning</p>
        <p className="text-sm font-medium tracking-[-0.01em] text-fg">Maya Chen</p>
      </div>
      <div className="rounded-xl bg-ink p-3.5 text-on-ink shadow-ink">
        <p className="text-[10px] text-on-ink/70">Available balance</p>
        <p className="mt-0.5 font-mono text-lg font-medium tracking-[-0.01em]">$42,180.00</p>
        <p className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-on-ink/10 px-1.5 py-0.5 text-[9.5px]">
          <ArrowUpRightIcon className="size-2.5" /> +$6,240 this month
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center text-[9.5px] text-fg-muted">
        {[
          { icon: SendIcon, label: "Send" },
          { icon: PlusIcon, label: "Invoice" },
          { icon: ReceiptIcon, label: "Bills" },
          { icon: EllipsisIcon, label: "More" },
        ].map((a) => (
          <span key={a.label} className="flex flex-col items-center gap-1">
            <span className="grid size-8 place-items-center rounded-full border border-border bg-surface text-fg shadow-key">
              <a.icon className="size-3.5" />
            </span>
            {a.label}
          </span>
        ))}
      </div>
      <div className="min-h-0 flex-1 rounded-t-xl border border-b-0 border-border bg-surface px-3 pt-2.5 shadow-raised">
        <p className="text-[10px] font-medium text-fg-muted">Recent</p>
        <ul className="mt-0.5 divide-y divide-border">
          {[
            { name: "Sam Lowe", note: "INV-2038 paid", amount: "+$960", inbound: true },
            { name: "Northwind", note: "Hosting", amount: "-$240", inbound: false },
            { name: "Maya Chen", note: "INV-2041 paid", amount: "+$4,200", inbound: true },
          ].map((r) => (
            <li key={r.name} className="flex items-center gap-2 py-2">
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-fg">{r.name}</span>
                <span className="block truncate text-[9.5px] text-fg-subtle">{r.note}</span>
              </span>
              <span className={cn("inline-flex shrink-0 items-center gap-0.5 font-mono text-[10.5px]", r.inbound ? "text-success" : "text-fg")}>
                {r.inbound ? <ArrowDownLeftIcon className="size-2.5" /> : <ArrowUpRightIcon className="size-2.5" />}
                {r.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function PhoneMockup({ src, alt = "", time = "9:41", width = 240, appearance = "auto", children, className }: PhoneMockupProps) {
  return (
    <div
      data-slot="phone-mockup"
      data-tier="premium"
      className={cn(appearance === "dark" && "dark", "relative shrink-0 rounded-[44px] bg-ink p-2 shadow-lg", className)}
      style={{ width, maxWidth: "100%" }}
    >
      <span aria-hidden className="absolute top-20 -left-0.5 h-6 w-0.5 rounded-l-sm bg-ink" />
      <span aria-hidden className="absolute top-30 -left-0.5 h-10 w-0.5 rounded-l-sm bg-ink" />
      <span aria-hidden className="absolute top-42 -left-0.5 h-10 w-0.5 rounded-l-sm bg-ink" />
      <span aria-hidden className="absolute top-32 -right-0.5 h-14 w-0.5 rounded-r-sm bg-ink" />
      <div data-slot="phone-mockup-screen" className="relative aspect-[9/19.5] overflow-hidden rounded-[36px] bg-bg text-fg ring-1 ring-border">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-11 items-center justify-between px-6 pt-1 text-[11px] font-medium text-fg">
          <span>{time}</span>
          <span className="flex items-center gap-1">
            <SignalIcon className="size-3" />
            <WifiIcon className="size-3" />
            <BatteryIcon className="size-3.5" />
          </span>
        </div>
        <span aria-hidden data-slot="phone-mockup-island" className="absolute top-2.5 left-1/2 z-10 h-5 w-18 -translate-x-1/2 rounded-full bg-ink dark:bg-sunken" />
        <div className="absolute inset-0 pt-11">
          {src ? <img src={src} alt={alt} className="block size-full object-cover object-top" /> : children ?? <LumenMobile />}
        </div>
      </div>
    </div>
  )
}

function BrowserMockup({
  url = "https://app.lumen.dev/overview",
  tabs = [],
  activeTab = 0,
  src,
  alt = "",
  appearance = "auto",
  phone,
  children,
  className,
}: BrowserMockupProps) {
  const { host, rest } = splitUrl(url)
  const sample = children === undefined && src === undefined
  const showPhone = phone ?? sample

  const frame = (
    <div
      data-slot="browser-mockup"
      data-tier="premium"
      className={cn(
        !showPhone && appearance === "dark" && "dark",
        "@container min-w-0 w-full overflow-hidden rounded-xl border border-border bg-bg text-fg shadow-raised",
        !showPhone && className
      )}
    >
      {tabs.length ? (
        <div data-slot="browser-mockup-tabs" className="flex items-end gap-1 overflow-hidden bg-sunken px-3 pt-2">
          {tabs.map((t, i) => (
            <span
              key={`${t}-${i}`}
              aria-current={i === activeTab ? "page" : undefined}
              className={cn(
                "max-w-40 truncate rounded-t-lg px-3 py-1.5 text-xs",
                i === activeTab ? "bg-surface text-fg shadow-highlight" : "text-fg-muted"
              )}
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
      <div data-slot="browser-mockup-bar" className="flex h-12 items-center gap-3 border-b border-border bg-surface px-3">
        <TrafficLights />
        <span aria-hidden className="hidden items-center gap-0.5 text-fg-subtle @sm:flex">
          <ChevronLeftIcon className="size-4" />
          <ChevronRightIcon className="size-4 opacity-40" />
          <RotateCwIcon className="ml-1 size-3.5" />
        </span>
        <span data-slot="browser-mockup-address" className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-lg bg-sunken px-3 font-mono text-xs">
          <LockIcon aria-hidden className="size-3 shrink-0 text-fg-subtle" />
          <span className="truncate">
            <span className="text-fg">{host}</span>
            <span className="text-fg-muted">{rest}</span>
          </span>
        </span>
        <span aria-hidden className="hidden text-fg-subtle @sm:block">
          <EllipsisIcon className="size-4" />
        </span>
      </div>
      <div data-slot="browser-mockup-viewport" className="bg-bg">
        {src ? <img src={src} alt={alt} className="block w-full" /> : sample ? <LumenDashboard /> : children}
      </div>
    </div>
  )

  if (!showPhone) return frame

  // Wide containers: the phone overlaps the window's bottom right corner. Narrow ones stack.
  return (
    <div
      data-slot="browser-mockup-scene"
      className={cn(appearance === "dark" && "dark", "@container w-full", className)}
    >
      <div className="relative @xl:pr-44 @xl:pb-8">
        {frame}
        <PhoneMockup width={192} className="mx-auto mt-6 @xl:absolute @xl:right-0 @xl:bottom-0 @xl:mt-0" />
      </div>
    </div>
  )
}

export { BrowserMockup, PhoneMockup }
export type { BrowserMockupProps, PhoneMockupProps }
