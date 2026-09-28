"use client"
import * as React from "react"
import {
  BoldIcon, CalendarIcon, ChevronDownIcon, CopyIcon, ItalicIcon, LinkIcon, MoreHorizontalIcon, PlusIcon, SearchIcon, SparklesIcon, TrashIcon, UploadCloudIcon, UnderlineIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Switch } from "@/registry/ui/switch"
import { Checkbox } from "@/registry/ui/checkbox"
import { Kbd } from "@/registry/ui/kbd"
import { StatusBadge } from "@/registry/ui/status-badge"

/**
 * Gallery thumbnails. Real components where they fit at thumbnail scale,
 * hairline drawings of the component where they don't. Never screenshots.
 */

const line = "rounded-full bg-border"
const box = "rounded-lg border border-border bg-surface"

function Bars({ w = ["w-24", "w-16"] }: { w?: string[] }) {
  return (
    <div className="space-y-1.5">
      {w.map((c, i) => <div key={i} className={cn("h-1.5", line, c, i === 0 && "bg-border-strong")} />)}
    </div>
  )
}

function Field({ label = true, value, className }: { label?: boolean; value?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("w-44 space-y-1.5", className)}>
      {label ? <div className={cn("h-1.5 w-12", line, "bg-border-strong")} /> : null}
      <div className={cn(box, "flex h-8 items-center px-2.5 text-[11px] text-fg-subtle shadow-xs")}>{value ?? "you@studio.com"}</div>
    </div>
  )
}

function Table({ rows = 4 }: { rows?: number }) {
  return (
    <div className={cn(box, "w-60 overflow-hidden shadow-xs")}>
      <div className="flex h-6 items-center gap-2 border-b border-border bg-sunken/70 px-2.5">
        <div className={cn("h-1 w-10", line)} /><div className={cn("ml-auto h-1 w-8", line)} />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex h-7 items-center gap-2 border-b border-border/70 px-2.5 last:border-0">
          <span className="size-3 rounded-full border border-border bg-sunken" />
          <div className={cn("h-1.5", line, ["w-16", "w-20", "w-12", "w-14"][i % 4])} />
          <span className={cn("ml-auto h-3 w-9 rounded border", i === 2 ? "border-danger/25 bg-danger/10" : i === 1 ? "border-accent-line bg-accent-soft" : "border-success/25 bg-success/10")} />
        </div>
      ))}
    </div>
  )
}

function Chat() {
  return (
    <div className="w-60 space-y-2">
      <div className="ml-auto w-32 rounded-xl rounded-br-sm border border-border bg-sunken px-2.5 py-1.5"><div className={cn("h-1.5 w-20", line, "bg-border-strong")} /></div>
      <div className="space-y-1.5 py-1"><div className={cn("h-1.5 w-48", line, "bg-border-strong")} /><div className={cn("h-1.5 w-40", line)} /><div className={cn("h-1.5 w-28", line)} /></div>
      <div className={cn(box, "flex h-8 items-center justify-between rounded-xl px-2.5 shadow-sm")}>
        <span className="flex items-center gap-1 text-[10px] text-fg-subtle"><SparklesIcon className="size-3 text-accent" /> Ask anything</span>
        <span className="grid size-5 place-items-center rounded-full bg-ink text-[9px] text-on-ink">↑</span>
      </div>
    </div>
  )
}

function Shell() {
  return (
    <div className={cn(box, "flex h-32 w-60 overflow-hidden shadow-xs")}>
      <div className="w-16 space-y-1.5 border-r border-border bg-sunken/60 p-2">
        <div className="mb-2 size-3.5 rounded bg-ink" />
        {[0, 1, 2, 3].map((i) => <div key={i} className={cn("h-1.5", line, i === 1 ? "bg-accent/70" : "", ["w-9", "w-10", "w-8", "w-9"][i])} />)}
      </div>
      <div className="flex-1 space-y-2 p-2.5">
        <div className={cn("h-2 w-16", line, "bg-border-strong")} />
        <div className="grid grid-cols-3 gap-1.5">{[0, 1, 2].map((i) => <div key={i} className="h-7 rounded-md border border-border" />)}</div>
        <div className="h-10 rounded-md border border-border bg-[linear-gradient(to_top,var(--accent-soft),transparent)]" />
      </div>
    </div>
  )
}

function Dialog() {
  return (
    <div className="relative grid h-32 w-60 place-items-center rounded-lg bg-scrim/40">
      <div className="w-40 space-y-2 rounded-xl border border-border bg-raised p-3 shadow-overlay">
        <div className={cn("h-2 w-20", line, "bg-border-strong")} />
        <div className={cn("h-1.5 w-28", line)} />
        <div className="flex justify-end gap-1.5 pt-1"><span className="h-4 w-10 rounded border border-border" /><span className="h-4 w-10 rounded bg-ink" /></div>
      </div>
    </div>
  )
}

function Toasts() {
  return (
    <div className="relative h-24 w-56">
      {[2, 1, 0].map((i) => (
        <div key={i} className="absolute inset-x-0 flex items-center gap-2 rounded-xl border border-border bg-raised p-2.5 shadow-md" style={{ bottom: i * 9, transform: `scale(${1 - i * 0.05})`, opacity: 1 - i * 0.25 }}>
          <span className="grid size-4 place-items-center rounded-full bg-success text-[8px] text-white">✓</span>
          <div className="space-y-1"><div className={cn("h-1.5 w-24", line, "bg-border-strong")} /><div className={cn("h-1 w-16", line)} /></div>
        </div>
      ))}
    </div>
  )
}

function Plans() {
  return (
    <div className="flex items-end gap-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className={cn("w-[72px] space-y-1.5 rounded-lg border p-2", i === 1 ? "h-28 border-accent bg-accent-soft/60 shadow-[0_0_0_3px_var(--accent-soft)]" : "h-24 border-border bg-surface")}>
          <div className={cn("h-1.5 w-8", line)} />
          <p className="text-[13px] font-medium tracking-[-0.02em] text-fg tabular-nums">${[0, 39, 99][i]}</p>
          <div className={cn("h-1 w-12", line)} /><div className={cn("h-1 w-10", line)} />
        </div>
      ))}
    </div>
  )
}

function Chart() {
  const h = [40, 62, 48, 80, 70, 92, 58]
  return (
    <div className="flex h-24 w-52 items-end gap-1.5 border-b border-border">
      {h.map((v, i) => <div key={i} className={cn("flex-1 rounded-t-[3px]", i === 5 ? "bg-accent" : "bg-accent/30")} style={{ height: `${v}%` }} />)}
    </div>
  )
}

function Kanban() {
  return (
    <div className="flex gap-2">
      {[3, 2, 1].map((n, c) => (
        <div key={c} className="w-[70px] space-y-1.5 rounded-lg border border-border bg-sunken/60 p-1.5">
          <div className={cn("h-1.5 w-8", line, "bg-border-strong")} />
          {Array.from({ length: n }).map((_, i) => <div key={i} className="h-7 rounded-md border border-border bg-surface shadow-xs" />)}
        </div>
      ))}
    </div>
  )
}

function Hero({ motion }: { motion?: boolean }) {
  return (
    <div className="w-56 text-center">
      <p className={cn("text-[22px] leading-[1] font-medium tracking-[-0.05em]", motion ? "text-gradient-accent" : "text-fg")}>Ship the page.</p>
      <div className="mx-auto mt-2 space-y-1"><div className={cn("mx-auto h-1.5 w-40", line)} /><div className={cn("mx-auto h-1.5 w-28", line)} /></div>
      <div className="mt-3 flex justify-center gap-1.5"><span className="h-5 w-16 rounded-md bg-ink" /><span className="h-5 w-14 rounded-md border border-border bg-surface" /></div>
    </div>
  )
}

const PREVIEWS: Record<string, () => React.ReactNode> = {
  new: () => (
    <div className="relative w-60">
      <div className="rounded-xl border border-border bg-surface p-3 shadow-sm">
        <p className="text-[10px] text-fg-muted">Revenue · Sep</p>
        <p className="text-base font-medium tracking-[-0.02em] tabular-nums text-fg">$81k</p>
        <svg viewBox="0 0 200 50" className="mt-1 h-10 w-full text-accent" preserveAspectRatio="none"><path d="M0,40 C30,38 40,30 70,28 C100,26 110,18 140,16 C165,14 180,8 200,6" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /><line x1="140" x2="140" y1="0" y2="50" stroke="currentColor" strokeOpacity="0.35" vectorEffect="non-scaling-stroke" /></svg>
      </div>
      <div className="absolute -right-4 -bottom-6 flex w-44 items-center gap-2 rounded-lg border border-border bg-raised p-2 shadow-overlay">
        <span className="grid size-4 place-items-center rounded-full bg-success text-[8px] text-white">✓</span>
        <span className="text-[10px] font-medium text-fg">Deployed to production</span>
      </div>
    </div>
  ),
  button: () => (
    <div className="flex gap-2"><Button size="sm">Save changes</Button><Button size="sm" variant="outline">Cancel</Button></div>
  ),
  "button-group": () => (
    <div className="flex rounded-lg shadow-key">
      {["Day", "Week", "Month"].map((l, i) => <span key={l} className={cn("border border-border bg-surface px-3 py-1.5 text-xs font-medium text-fg", i > 0 && "-ml-px", i === 0 && "rounded-l-lg", i === 2 && "rounded-r-lg", i === 1 && "bg-sunken")}>{l}</span>)}
    </div>
  ),
  "split-button": () => (
    <div className="flex"><span className="rounded-l-lg bg-ink px-3 py-1.5 text-xs font-medium text-on-ink shadow-ink">Deploy</span><span className="grid place-items-center rounded-r-lg border-l border-white/15 bg-ink px-1.5 text-on-ink shadow-ink"><ChevronDownIcon className="size-3.5" /></span></div>
  ),
  "icon-button": () => (
    <div className="flex gap-1.5">{[CopyIcon, LinkIcon, TrashIcon, MoreHorizontalIcon].map((I, i) => <span key={i} className="grid size-8 place-items-center rounded-lg border border-border bg-surface text-fg-muted shadow-key"><I className="size-3.5" /></span>)}</div>
  ),
  checkbox: () => (
    <div className="space-y-2.5">{["Email", "Push", "SMS"].map((l, i) => <div key={l} className="flex items-center gap-2 text-xs text-fg"><Checkbox defaultChecked={i < 2} aria-label={l} />{l}</div>)}</div>
  ),
  switch: () => (
    <div className="space-y-2.5">{["Auto-renew", "Weekly digest"].map((l, i) => <div key={l} className="flex w-40 items-center justify-between text-xs text-fg">{l}<Switch defaultChecked={i === 0} aria-label={l} /></div>)}</div>
  ),
  "radio-group": () => (
    <div className="space-y-2.5">{["Monthly", "Yearly"].map((l, i) => <div key={l} className="flex items-center gap-2 text-xs text-fg"><span className={cn("grid size-4 place-items-center rounded-full border", i === 1 ? "border-accent bg-accent" : "border-border-strong bg-surface")}>{i === 1 ? <span className="size-1.5 rounded-full bg-on-accent" /> : null}</span>{l}</div>)}</div>
  ),
  input: () => <Field />,
  "input-affix": () => <Field value={<span><span className="mr-1.5 border-r border-border pr-1.5 text-fg-subtle">https://</span><span className="text-fg">minidev.pro</span></span>} />,
  "form-field": () => <div className="space-y-1"><Field /><div className={cn("h-1 w-24", line)} /></div>,
  textarea: () => <div className={cn(box, "h-20 w-48 p-2.5 shadow-xs")}><Bars w={["w-32", "w-36", "w-20"]} /></div>,
  select: () => <Field value={<span className="flex w-full items-center justify-between text-fg">Team plan <ChevronDownIcon className="size-3.5 text-fg-subtle" /></span>} />,
  combobox: () => (
    <div className="w-44 space-y-1">
      <Field label={false} value={<span className="text-fg">Ber</span>} />
      <div className="rounded-lg border border-border bg-raised p-1 shadow-md">{["Berlin", "Bern", "Bergen"].map((c, i) => <div key={c} className={cn("rounded-md px-2 py-1 text-[11px]", i === 0 ? "bg-sunken text-fg" : "text-fg-muted")}>{c}</div>)}</div>
    </div>
  ),
  "search-input": () => <div className={cn(box, "flex h-8 w-48 items-center gap-2 px-2.5 text-[11px] text-fg-subtle shadow-xs")}><SearchIcon className="size-3.5" />Search<Kbd className="ml-auto">⌘K</Kbd></div>,
  "tags-input": () => (
    <div className={cn(box, "flex w-52 flex-wrap gap-1 p-1.5 shadow-xs")}>{["design", "react", "a11y"].map((t) => <span key={t} className="rounded-md border border-border bg-sunken px-1.5 py-0.5 text-[10px] text-fg">{t} ×</span>)}<span className="px-1 text-[10px] text-fg-subtle">Add…</span></div>
  ),
  "otp-input": () => <div className="flex gap-1.5">{["4", "2", "9", "", "", ""].map((d, i) => <span key={i} className={cn("grid size-8 place-items-center rounded-lg border bg-surface text-sm font-medium text-fg shadow-xs", i === 3 ? "border-accent shadow-[0_0_0_3px_var(--accent-soft)]" : "border-border")}>{d}</span>)}</div>,
  slider: () => (
    <div className="relative h-4 w-48"><div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-sunken" /><div className="absolute top-1/2 h-1.5 w-[62%] -translate-y-1/2 rounded-full bg-accent" /><span className="absolute top-1/2 left-[62%] size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-white shadow-sm" /></div>
  ),
  "date-picker": () => (
    <div className={cn(box, "w-44 p-2 shadow-xs")}>
      <div className="mb-1.5 flex items-center justify-between text-[10px] font-medium text-fg"><span>October</span><CalendarIcon className="size-3 text-fg-subtle" /></div>
      <div className="grid grid-cols-7 gap-0.5">{Array.from({ length: 21 }).map((_, i) => <span key={i} className={cn("grid h-4 place-items-center rounded text-[8px] tabular-nums", i === 9 ? "bg-ink text-on-ink" : i > 9 && i < 13 ? "bg-accent-soft text-accent-fg" : "text-fg-muted")}>{i + 1}</span>)}</div>
    </div>
  ),
  "color-picker": () => <div className="flex gap-1.5">{["var(--accent)", "oklch(0.6 0.15 250)", "oklch(0.62 0.14 200)", "var(--success)", "var(--warning)", "var(--danger)"].map((c, i) => <span key={i} className={cn("size-6 rounded-full border border-black/10", i === 0 && "ring-2 ring-accent ring-offset-2 ring-offset-bg")} style={{ background: c }} />)}</div>,
  "choice-card": () => (
    <div className="flex gap-2">{["Personal", "Team"].map((l, i) => <div key={l} className={cn("w-24 space-y-1 rounded-lg border p-2", i === 1 ? "border-accent shadow-[0_0_0_3px_var(--accent-soft)]" : "border-border bg-surface")}><span className={cn("block size-3 rounded-full border", i === 1 ? "border-accent bg-accent" : "border-border-strong")} /><p className="text-[11px] font-medium text-fg">{l}</p><div className={cn("h-1 w-14", line)} /></div>)}</div>
  ),
  "file-dropzone": () => <div className="grid h-24 w-52 place-items-center rounded-xl border border-dashed border-border-strong bg-surface/60 text-center"><div><UploadCloudIcon className="mx-auto size-5 text-fg-subtle" /><p className="mt-1 text-[10px] text-fg-muted">Drop files or <span className="text-accent-fg">browse</span></p></div></div>,
  "dropdown-menu": () => (
    <div className="w-40 rounded-xl border border-border bg-raised p-1 shadow-overlay">{["Edit", "Duplicate", "Share"].map((l, i) => <div key={l} className={cn("flex items-center justify-between rounded-md px-2 py-1 text-[11px]", i === 0 ? "bg-sunken text-fg" : "text-fg-muted")}>{l}<span className="font-mono text-[9px] text-fg-subtle">⌘{l[0]}</span></div>)}<div className="my-1 h-px bg-border" /><div className="rounded-md px-2 py-1 text-[11px] text-danger">Delete</div></div>
  ),
  "data-table": () => <Table />,
  "data-extra": () => <div className="space-y-2"><div className="flex gap-1.5">{["Status: Active", "Plan", "+ Filter"].map((l, i) => <span key={l} className={cn("rounded-md border px-2 py-0.5 text-[10px]", i === 0 ? "border-accent-line bg-accent-soft text-accent-fg" : "border-dashed border-border text-fg-muted")}>{l}</span>)}</div><Table rows={2} /></div>,
  feeds: () => (
    <div className="w-52 space-y-2.5">{[0, 1, 2].map((i) => <div key={i} className="flex items-start gap-2"><span className="mt-0.5 size-4 rounded-full border border-border bg-sunken" /><div className="flex-1 space-y-1"><div className={cn("h-1.5", line, "bg-border-strong", ["w-32", "w-24", "w-36"][i])} /><div className={cn("h-1 w-14", line)} /></div></div>)}</div>
  ),
  charts: () => <Chart />,
  stats: () => (
    <div className="flex gap-2">{[["MRR", "$84k", "+12%"], ["Churn", "1.8%", "−0.4"]].map(([l, v, d]) => <div key={l} className={cn(box, "w-24 p-2.5 shadow-xs")}><p className="text-[10px] text-fg-muted">{l}</p><p className="mt-1 text-base font-medium tracking-[-0.02em] tabular-nums text-fg">{v}</p><p className="text-[9px] font-medium text-success">{d}</p></div>)}</div>
  ),
  ai: () => <Chat />,
  "ai-studio": () => <Chat />,
  auth: () => (
    <div className={cn(box, "w-44 space-y-2 p-3 shadow-sm")}>
      <div className={cn("mx-auto h-2 w-20", line, "bg-border-strong")} />
      <div className="h-6 rounded-md border border-border" /><div className="h-6 rounded-md border border-border" /><div className="h-6 rounded-md bg-ink" />
    </div>
  ),
  billing: () => <Plans />,
  commerce: () => <Plans />,
  settings: () => (
    <div className={cn(box, "w-52 divide-y divide-border shadow-xs")}>{[true, false, true].map((on, i) => <div key={i} className="flex items-center justify-between px-2.5 py-2"><div className={cn("h-1.5", line, "bg-border-strong", ["w-20", "w-24", "w-16"][i])} /><span className={cn("h-3.5 w-6 rounded-full p-0.5", on ? "bg-accent" : "bg-border-strong")}><span className={cn("block size-2.5 rounded-full bg-white", on && "translate-x-2.5")} /></span></div>)}</div>
  ),
  admin: () => <Table rows={3} />,
  navigation: () => <Shell />,
  shells: () => <Shell />,
  layout: () => <Shell />,
  overlays: () => <Dialog />,
  feedback: () => <Toasts />,
  workflow: () => <Kanban />,
  engineering: () => (
    <div className="w-56 rounded-lg border border-[oklch(0.26_0.008_270)] bg-[oklch(0.17_0.008_270)] p-2.5 font-mono text-[9.5px] leading-[1.6] text-[oklch(0.8_0.01_270)] shadow-md">
      <p><span className="text-[oklch(0.8_0.11_160)]">✓</span> build <span className="text-[oklch(0.6_0.01_270)]">12.4s</span></p>
      <p><span className="text-[oklch(0.8_0.11_160)]">✓</span> test <span className="text-[oklch(0.6_0.01_270)]">148 passed</span></p>
      <p><span className="text-[oklch(0.76_0.13_300)]">●</span> deploy <span className="text-[oklch(0.6_0.01_270)]">running…</span></p>
    </div>
  ),
  editors: () => (
    <div className={cn(box, "w-52 shadow-xs")}>
      <div className="flex gap-1 border-b border-border p-1.5">{[BoldIcon, ItalicIcon, UnderlineIcon, LinkIcon].map((I, i) => <span key={i} className={cn("grid size-5 place-items-center rounded text-fg-muted", i === 0 && "bg-sunken text-fg")}><I className="size-3" /></span>)}</div>
      <div className="p-2.5"><Bars w={["w-36", "w-40", "w-24"]} /></div>
    </div>
  ),
  email: () => <div className={cn(box, "w-48 overflow-hidden shadow-xs")}><div className="h-2 bg-accent" /><div className="space-y-2 p-3"><div className={cn("h-2 w-24", line, "bg-border-strong")} /><Bars w={["w-36", "w-28"]} /><span className="block h-5 w-16 rounded bg-ink" /></div></div>,
  marketing: () => <Hero />,
  "marketing-sections": () => <Hero />,
  "premium-heroes": () => <Hero motion />,
  "premium-motion": () => (
    <p className="text-[34px] leading-none font-medium tracking-[-0.06em] text-gradient-accent">Motion<span className="text-fg">.</span></p>
  ),
  "premium-templates": () => <Hero motion />,
  showcase: () => <Shell />,
  blocks: () => (
    <div className="grid w-56 grid-cols-3 gap-1.5">{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className={cn("h-10 rounded-md border border-border bg-surface", i === 0 && "col-span-2 bg-accent-soft/60", i === 4 && "col-span-2")} />)}</div>
  ),
  system: () => <div className="flex flex-wrap items-center justify-center gap-2"><Kbd>⌘</Kbd><Kbd>K</Kbd><StatusBadge tone="success">Live</StatusBadge><StatusBadge tone="accent">Beta</StatusBadge></div>,
  "primitives-extra": () => <div className="flex items-center gap-2"><span className="size-7 rounded-full border-2 border-surface bg-[oklch(0.7_0.12_250)]" /><span className="-ml-3.5 size-7 rounded-full border-2 border-surface bg-[oklch(0.72_0.13_30)]" /><StatusBadge>3 online</StatusBadge></div>,
}

export function GalleryPreview({ slug }: { slug: string }) {
  const P = PREVIEWS[slug]
  return (
    <div inert className="pointer-events-none scale-[0.94] transition-transform duration-300 ease-hairline select-none group-hover:scale-100">
      {P ? P() : <Button size="sm" variant="outline"><PlusIcon />{slug}</Button>}
    </div>
  )
}
