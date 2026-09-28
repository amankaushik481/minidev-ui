"use client"
import * as React from "react"
import { LoaderCircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionHead } from "@/components/landing/bento"

function Card({ title, body, children, className }: { title: string; body: string; children: React.ReactNode; className?: string }) {
  return (
    <figure className={cn("group/c flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-raised", className)}>
      <div className="relative grid h-56 place-items-center overflow-hidden border-b border-border bg-bg">
        <div aria-hidden className="absolute inset-0 bg-grid [--grid-size:20px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        <div className="relative">{children}</div>
      </div>
      <figcaption className="p-5">
        <p className="text-[0.9375rem] font-medium tracking-[-0.01em] text-fg">{title}</p>
        <p className="mt-1.5 text-[0.8125rem] leading-[1.6] text-fg-muted">{body}</p>
      </figcaption>
    </figure>
  )
}

function KeycapDetail() {
  const rows = [
    { top: "top-0", label: "inset 0 1px highlight" },
    { top: "top-1/2 -translate-y-1/2", label: "1px hairline border" },
    { top: "bottom-0 translate-y-[1px]", label: "0 1px key edge" },
  ]
  return (
    <div className="relative flex items-center">
      <span className="inline-flex h-14 items-center rounded-xl border border-border bg-surface px-7 text-lg font-medium text-fg shadow-key">
        Continue
      </span>
      <div className="relative ml-[-10px] h-14 w-40">
        {rows.map((r) => (
          <span key={r.label} className={cn("absolute left-0 flex items-center gap-1.5", r.top)}>
            <span className="size-1.5 rounded-full border border-accent bg-surface" />
            <span className="h-px w-5 bg-accent-line" />
            <span className="rounded border border-accent-line bg-surface px-1.5 py-0.5 font-mono text-[10px] leading-none whitespace-nowrap text-accent-fg">{r.label}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function RadiusDetail() {
  return (
    <div className="relative rounded-[20px] border border-border bg-surface p-2 shadow-md">
      <div className="flex h-24 w-44 items-end rounded-[12px] border border-accent-line bg-accent-soft p-3">
        <span className="font-mono text-[10px] text-accent-fg">inner r12</span>
      </div>
      <span className="absolute -top-6 left-0 font-mono text-[10px] text-fg-subtle">outer r20 · pad 8</span>
      <span className="absolute -bottom-6 left-0 font-mono text-[10px] text-accent-fg">12 = 20 − 8</span>
      <span aria-hidden className="absolute top-2 left-0 h-px w-2 bg-accent" />
      <span aria-hidden className="absolute top-0 left-2 h-2 w-px bg-accent" />
    </div>
  )
}

function TrackingDetail() {
  const rows = [
    { t: "Body copy", size: "13", track: "+0.005em", cls: "text-[13px] tracking-[0.005em]" },
    { t: "Section title", size: "22", track: "−0.018em", cls: "text-[22px] tracking-[-0.018em]" },
    { t: "Display", size: "44", track: "−0.03em", cls: "text-[44px] leading-none tracking-[-0.03em]" },
  ]
  return (
    <div className="w-72 space-y-2">
      {rows.map((r) => (
        <div key={r.t} className="flex items-baseline justify-between gap-3 border-b border-dashed border-border pb-2 last:border-0">
          <span className={cn("font-medium text-fg", r.cls)}>{r.t.split(" ")[0]}</span>
          <span className="shrink-0 text-right font-mono text-[10px] leading-tight text-fg-subtle">
            {r.size}px<br />
            <span className="text-accent-fg">{r.track}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

function MotionDetail() {
  const [on, setOn] = React.useState(false)
  // cubic-bezier(0.2,0,0,1) and (0.3,0,0.8,0.15), plotted in a 140×90 box
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 140 100" className="h-32 w-44 overflow-visible" aria-label="Enter and exit easing curves">
        <rect x="0" y="0" width="140" height="100" className="fill-none stroke-border" strokeDasharray="2 3" />
        <path d="M0,100 C28,100 0,0 140,0" className="fill-none stroke-accent" strokeWidth="1.5" />
        <path d="M0,100 C42,100 112,85 140,0" className="fill-none stroke-fg-subtle" strokeWidth="1.25" strokeDasharray="3 3" />
        <text x="4" y="-6" className="fill-accent-fg font-mono text-[9px]">enter 200ms</text>
        <text x="84" y="114" className="fill-fg-subtle font-mono text-[9px]">exit 160ms</text>
      </svg>
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        className="relative h-32 w-10 rounded-full border border-border bg-sunken outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Play the easing"
      >
        <span
          className={cn(
            "absolute left-1/2 size-7 -translate-x-1/2 rounded-full bg-ink shadow-ink transition-[top]",
            on ? "top-[calc(100%-32px)] duration-200 ease-hairline" : "top-1 duration-[160ms] ease-exit"
          )}
        />
      </button>
    </div>
  )
}

const SWATCHES = [
  ["bg", "var(--bg)"],
  ["surface", "var(--surface)"],
  ["sunken", "var(--sunken)"],
  ["border", "var(--border)"],
  ["fg-muted", "var(--fg-muted)"],
  ["ink", "var(--ink)"],
  ["accent", "var(--accent)"],
  ["accent-2", "var(--accent-2)"],
] as const

function TokenDetail() {
  return (
    <div className="grid w-72 grid-cols-4 gap-2">
      {SWATCHES.map(([n, v]) => (
        <div key={n} className="space-y-1.5">
          <span className="block h-11 rounded-lg border border-border shadow-[inset_0_1px_0_var(--highlight)]" style={{ background: v }} />
          <span className="block truncate font-mono text-[9.5px] text-fg-muted">--{n}</span>
        </div>
      ))}
    </div>
  )
}

function StatesDetail() {
  const base = "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-[13px] font-medium"
  const ink = "bg-ink text-on-ink shadow-ink"
  const items = [
    { l: "rest", el: <span className={cn(base, ink)}>Save</span> },
    { l: "hover", el: <span className={cn(base, "bg-ink-hover text-on-ink shadow-ink")}>Save</span> },
    { l: "focus", el: <span className={cn(base, ink, "ring-2 ring-accent ring-offset-2 ring-offset-bg")}>Save</span> },
    { l: "active", el: <span className={cn(base, ink, "translate-y-[0.5px]")}>Save</span> },
    { l: "busy", el: <span className={cn(base, ink, "opacity-80")}><LoaderCircleIcon className="size-3.5 animate-spin" />Save</span> },
    { l: "disabled", el: <span className={cn(base, ink, "opacity-45")}>Save</span> },
  ]
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-5">
      {items.map((i) => (
        <div key={i.l} className="flex flex-col items-center gap-2">
          {i.el}
          <span className="font-mono text-[10px] text-fg-subtle">{i.l}</span>
        </div>
      ))}
    </div>
  )
}

export function Craft() {
  return (
    <section className="relative border-y border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <SectionHead
          eyebrow="The hairline standard"
          title={<>Details you feel<br className="hidden sm:block" /> before you notice them.</>}
          body="Six rules every component follows. They are why a settings page built with MiniDev UI reads as expensive, and one built without it reads as a template."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card title="One pixel, two lights" body="Solid controls carry a top highlight and a bottom key edge. Depth comes from light, not blur.">
            <KeycapDetail />
          </Card>
          <Card title="Radii that nest" body="Inner radius equals outer radius minus padding. Concentric corners are the first thing a designer checks.">
            <RadiusDetail />
          </Card>
          <Card title="Tracking tightens with size" body="Every size ships with its own letter-spacing, so headings never look loose and body text never looks cramped.">
            <TrackingDetail />
          </Card>
          <Card title="Exit is faster than entry" body="200ms in, 160ms out, on curves tuned for interfaces. Tap the rail to feel the difference.">
            <MotionDetail />
          </Card>
          <Card title="Tokens, not hex" body="Components speak in semantic OKLCH tokens. Change the accent or flip the theme and nothing else needs to move.">
            <TokenDetail />
          </Card>
          <Card title="Every state, drawn" body="Rest, hover, focus, pressed, busy and disabled are designed, not left to browser defaults. None of them shift layout.">
            <StatesDetail />
          </Card>
        </div>
      </div>
    </section>
  )
}
