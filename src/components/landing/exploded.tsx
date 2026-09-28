"use client"
import * as React from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"
import { BellIcon, ChevronsUpDownIcon, FileTextIcon, HomeIcon, LineChartIcon, PlusIcon, SearchIcon, SettingsIcon, UploadIcon, UsersIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Kbd } from "@/registry/ui/kbd"
import { NumberRoll } from "@/registry/ui/number-roll"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { StatusBadge } from "@/registry/ui/status-badge"
import { smoothPath } from "@/registry/ui/area-chart"

/*
 * The exploded view. One real app, rendered once per layer. Each layer hides
 * everything that is not its own part (visibility is inherited but can be
 * overridden, so layout stays identical in every copy). Scroll pulls the
 * layers apart along Z like an industrial drawing, then puts them back and
 * the app becomes live.
 */

const W = 1200
const H = 760

type Part = "canvas" | "surface" | "controls" | "content" | "overlay"
const LAYERS: { id: Part; n: string; name: string; spec: string }[] = [
  { id: "canvas", n: "01", name: "Canvas", spec: "bg · bg-grid · 1px frame" },
  { id: "surface", n: "02", name: "Surfaces", spec: "surface · border · shadow-raised" },
  { id: "controls", n: "03", name: "Controls", spec: "36px · rounded-lg · shadow-key" },
  { id: "content", n: "04", name: "Type and data", spec: "Geist 13/20 · tabular-nums" },
  { id: "overlay", n: "05", name: "Overlays", spec: "raised · shadow-overlay" },
]

/* ── data ──────────────────────────────────────────────────────────────── */
type Range = "7d" | "30d" | "90d"
const DATA: Record<Range, { revenue: number; customers: number; churn: number; d: [string, string, string]; series: number[] }> = {
  "7d": { revenue: 12480, customers: 1284, churn: 1.8, d: ["+8.2%", "+1.1%", "-0.2%"], series: [32, 38, 35, 44, 41, 52, 49, 58, 55, 63, 60, 71] },
  "30d": { revenue: 48290, customers: 1391, churn: 2.1, d: ["+12.4%", "+3.1%", "-0.4%"], series: [22, 30, 27, 36, 48, 42, 55, 51, 64, 60, 72, 80] },
  "90d": { revenue: 131640, customers: 1512, churn: 2.6, d: ["+31.0%", "+9.8%", "+0.3%"], series: [12, 18, 25, 22, 34, 40, 38, 52, 58, 66, 74, 88] },
}

function chartPaths(series: number[]) {
  const w = 600
  const h = 190
  const max = 100
  const pts = series.map((v, i) => [(i / (series.length - 1)) * w, h - (v / max) * (h - 16) - 4] as const)
  const line = smoothPath(pts)
  return { line, area: `${line} L ${w} ${h} L 0 ${h} Z` }
}

/* ── the app (rendered once per layer) ─────────────────────────────────── */
const P = (p: Part) => ({ "data-part": p })

function LumenMini({ range, setRange }: { range: Range; setRange: (r: Range) => void }) {
  const d = DATA[range]
  const { line, area } = chartPaths(d.series)
  const kpis = [
    { label: "Revenue", value: d.revenue, format: { style: "currency", currency: "USD", maximumFractionDigits: 0 } as Intl.NumberFormatOptions, delta: d.d[0] },
    { label: "Active customers", value: d.customers, format: {} as Intl.NumberFormatOptions, delta: d.d[1] },
    { label: "Churn", value: d.churn / 100, format: { style: "percent", minimumFractionDigits: 1 } as Intl.NumberFormatOptions, delta: d.d[2], invert: true },
  ]
  return (
    <div {...P("canvas")} className="relative flex size-full overflow-hidden rounded-[18px] border border-border bg-bg text-fg">
      <div {...P("canvas")} aria-hidden className="absolute inset-0 bg-grid opacity-60 [--grid-size:24px]" />
      {/* sidebar */}
      <aside {...P("surface")} className="relative flex w-[228px] shrink-0 flex-col border-r border-border bg-surface p-3">
        <div {...P("controls")} className="flex h-10 items-center gap-2.5 rounded-lg border border-border bg-raised px-2 shadow-key">
          <span className="grid size-6 place-items-center rounded-md bg-ink text-[11px] font-semibold text-on-ink">L</span>
          <span className="flex-1 text-[13px] font-medium">Northwind</span>
          <ChevronsUpDownIcon className="size-3.5 text-fg-subtle" />
        </div>
        <nav className="mt-5 space-y-0.5">
          {[
            { i: HomeIcon, l: "Overview", on: true },
            { i: LineChartIcon, l: "Revenue" },
            { i: UsersIcon, l: "Customers" },
            { i: FileTextIcon, l: "Invoices", n: 3 },
            { i: SettingsIcon, l: "Settings" },
          ].map(({ i: I, l, on, n }) => (
            <div key={l} {...P(on ? "controls" : "surface")} className={cn("relative flex h-8 items-center gap-2.5 rounded-md px-2.5", on && "bg-sunken shadow-[inset_0_0_0_1px_var(--border)]")}>
              <span {...P("content")} className={cn("flex items-center gap-2.5 text-[13px]", on ? "font-medium text-fg" : "text-fg-muted")}>
                <I className="size-4" />
                {l}
              </span>
              {n ? <span {...P("controls")} className="ml-auto rounded-full bg-accent px-1.5 font-mono text-[10px] leading-4 text-on-accent">{n}</span> : null}
            </div>
          ))}
        </nav>
        <div {...P("surface")} className="mt-auto rounded-xl border border-border bg-bg p-3">
          <div {...P("content")}>
            <p className="text-[12px] font-medium">Usage this month</p>
            <p className="mt-0.5 text-[11px] text-fg-muted">8,420 of 10,000 invoices</p>
          </div>
          <div {...P("controls")} className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-sunken">
            <div className="h-full w-[84%] rounded-full bg-accent" />
          </div>
        </div>
      </aside>

      {/* main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header {...P("surface")} className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-surface/70 px-5">
          <p {...P("content")} className="text-[13px] text-fg-muted">
            Northwind <span className="text-fg-subtle">/</span> <span className="font-medium text-fg">Overview</span>
          </p>
          <div className="relative ml-auto">
            <div {...P("controls")} className="flex h-8 w-60 items-center gap-2 rounded-lg border border-border bg-surface px-2.5 text-[12.5px] text-fg-subtle shadow-xs">
              <SearchIcon className="size-3.5" />
              Search invoices
              <Kbd className="ml-auto">⌘K</Kbd>
            </div>
            <div {...P("overlay")} aria-hidden className="pointer-events-none absolute -inset-[3px] rounded-[11px] border border-accent shadow-[0_0_0_3px_var(--accent-soft)]" />
          </div>
          <div className="relative">
            <Button {...P("controls")} size="sm">
              <PlusIcon /> New invoice
            </Button>
            <div {...P("overlay")} className="absolute top-10 right-0 z-10 w-52 rounded-xl border border-border bg-raised p-1 shadow-overlay">
              {[
                { i: FileTextIcon, l: "Invoice", k: "I", on: true },
                { i: UsersIcon, l: "Customer", k: "C" },
                { i: UploadIcon, l: "Import CSV", k: "U" },
              ].map(({ i: I, l, k, on }) => (
                <div key={l} className={cn("flex h-8 items-center gap-2 rounded-md px-2 text-[13px]", on ? "bg-sunken text-fg" : "text-fg-muted")}>
                  <I className="size-4" /> {l}
                  <span className="ml-auto font-mono text-[10px] text-fg-subtle">⌘{k}</span>
                </div>
              ))}
            </div>
          </div>
          <span {...P("controls")} className="relative grid size-8 place-items-center rounded-lg text-fg-muted">
            <BellIcon className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-accent ring-2 ring-surface" />
          </span>
          <span {...P("controls")} className="grid size-7 place-items-center rounded-full border border-border bg-sunken text-[10px] font-medium text-fg-muted">AK</span>
        </header>

        <div className="grid min-h-0 flex-1 grid-rows-[auto_1fr_auto] gap-4 p-5">
          {/* KPIs */}
          <div className="grid grid-cols-3 gap-4">
            {kpis.map((k) => {
              const good = k.invert ? k.delta.startsWith("-") : k.delta.startsWith("+")
              return (
                <div key={k.label} {...P("surface")} className="rounded-xl border border-border bg-surface p-4 shadow-raised">
                  <div className="flex items-center justify-between">
                    <p {...P("content")} className="text-[12.5px] text-fg-muted">{k.label}</p>
                    <span {...P("controls")}>
                      <StatusBadge tone={good ? "success" : "danger"}>{k.delta}</StatusBadge>
                    </span>
                  </div>
                  <p {...P("content")} className="mt-2 text-[26px] leading-8 font-medium tracking-[-0.03em]">
                    <NumberRoll value={k.value} format={k.format} />
                  </p>
                </div>
              )
            })}
          </div>

          {/* chart + activity */}
          <div className="grid min-h-0 grid-cols-[1fr_300px] gap-4">
            <div {...P("surface")} className="flex min-h-0 flex-col rounded-xl border border-border bg-surface p-4 shadow-raised">
              <div className="flex items-center justify-between">
                <div {...P("content")}>
                  <p className="text-[13px] font-medium">Revenue</p>
                  <p className="text-[12px] text-fg-muted">Net of refunds, in USD</p>
                </div>
                <div {...P("controls")}>
                  <SegmentedControl size="sm" aria-label="Range" value={range} onChange={(v) => setRange(v as Range)} items={["7d", "30d", "90d"]} />
                </div>
              </div>
              <svg {...P("content")} viewBox="0 0 600 190" preserveAspectRatio="none" className="mt-3 min-h-0 w-full flex-1 overflow-visible">
                <defs>
                  <linearGradient id="xl-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="var(--accent)" stopOpacity="0.22" />
                    <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((y) => (
                  <line key={y} x1="0" x2="600" y1={190 * y} y2={190 * y} stroke="var(--border)" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
                ))}
                <motion.path initial={false} animate={{ d: area }} transition={{ type: "spring", bounce: 0.12, duration: 0.7 }} fill="url(#xl-fill)" />
                <motion.path
                  initial={false}
                  animate={{ d: line }}
                  transition={{ type: "spring", bounce: 0.12, duration: 0.7 }}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.75"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div {...P("surface")} className="rounded-xl border border-border bg-surface p-4 shadow-raised">
              <p {...P("content")} className="text-[13px] font-medium">Activity</p>
              <ul className="mt-3 space-y-3.5">
                {[
                  ["JL", "Jordan paid INV-2041", "2m"],
                  ["SR", "Sam upgraded to Team", "18m"],
                  ["AK", "Refund issued to Globex", "1h"],
                  ["MW", "New customer: Initech", "3h"],
                ].map(([a, t, time]) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span {...P("controls")} className="grid size-6 shrink-0 place-items-center rounded-full border border-border bg-sunken text-[9px] font-medium text-fg-muted">{a}</span>
                    <span {...P("content")} className="min-w-0 flex-1 truncate text-[12.5px]">{t}</span>
                    <span {...P("content")} className="font-mono text-[10.5px] text-fg-subtle">{time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* table */}
          <div {...P("surface")} className="overflow-hidden rounded-xl border border-border bg-surface shadow-raised">
            <div {...P("surface")} className="grid h-9 grid-cols-[1.4fr_1fr_1fr_0.8fr] items-center border-b border-border bg-sunken/60 px-4">
              {["Customer", "Invoice", "Status", "Amount"].map((h, i) => (
                <span key={h} {...P("content")} className={cn("text-[11.5px] font-medium text-fg-muted", i === 3 && "text-right")}>{h}</span>
              ))}
            </div>
            {[
              ["Northwind Labs", "INV-2041", "success", "Paid", "$12,400"],
              ["Acme Robotics", "INV-2040", "warning", "Pending", "$3,890"],
            ].map(([c, id, tone, s, amt], i) => (
              <div key={id} className={cn("grid h-11 grid-cols-[1.4fr_1fr_1fr_0.8fr] items-center px-4", i === 0 && "border-b border-border")}>
                <span {...P("content")} className="text-[13px] font-medium">{c}</span>
                <span {...P("content")} className="font-mono text-[11.5px] text-fg-muted">{id}</span>
                <span {...P("controls")}>
                  <StatusBadge tone={tone as "success" | "warning"}>{s}</StatusBadge>
                </span>
                <span {...P("content")} className="text-right text-[13px] font-medium tabular-nums">{amt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* toast + cursor */}
      <div {...P("overlay")} className="absolute right-5 bottom-5 flex w-72 items-start gap-3 rounded-xl border border-border bg-raised p-3 shadow-overlay">
        <span className="mt-px grid size-5 place-items-center rounded-full bg-success text-[10px] text-white">✓</span>
        <div>
          <p className="text-[13px] font-medium">Invoice sent</p>
          <p className="text-[12px] text-fg-muted">Northwind Labs will get it by email.</p>
        </div>
      </div>
      <svg {...P("overlay")} aria-hidden viewBox="0 0 24 24" className="absolute top-[118px] right-[150px] size-5 drop-shadow">
        <path d="M5 3l14 8-6 1.5L10 19z" fill="var(--ink)" stroke="var(--bg)" strokeWidth="1.25" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

/* ── one plane of the stack ───────────────────────────────────────────── */
function Plane({
  layer,
  i,
  spacing,
  labels,
  overlayDisplay,
  children,
}: {
  layer: (typeof LAYERS)[number]
  i: number
  spacing: MotionValue<number>
  labels: MotionValue<number>
  overlayDisplay: MotionValue<string>
  children: React.ReactNode
}) {
  const z = useTransform(spacing, (s) => i * s + i * 0.5)
  const transform = useMotionTemplate`translateZ(${z}px)`
  const riser = useTransform(spacing, (s) => `${s}px`)
  const isTop = i === LAYERS.length - 1
  return (
    <motion.div
      data-layer={layer.id}
      className="xl-layer absolute inset-0 [transform-style:preserve-3d]"
      style={{ transform, display: layer.id === "overlay" ? overlayDisplay : undefined }}
    >
      {/* The sheet itself: a faint pane so each layer reads as a plane. */}
      {i > 0 ? (
        <motion.span
          aria-hidden
          style={{ opacity: labels }}
          className="absolute inset-0 rounded-[18px] border border-[color-mix(in_oklch,var(--accent)_30%,transparent)] bg-[color-mix(in_oklch,var(--accent)_2.5%,transparent)]"
        />
      ) : null}
      {children}
      {/* Label drawn on the plane, outside its left edge. */}
      <motion.div style={{ opacity: labels }} aria-hidden className="pointer-events-none absolute top-0 right-[calc(100%+20px)] hidden w-[260px] items-start justify-end gap-3 md:flex">
        <div className="text-right">
          <p className="font-mono text-[15px] text-accent-fg">{layer.n}</p>
          <p className="text-[26px] leading-8 font-medium tracking-[-0.03em] text-fg">{layer.name}</p>
          <p className="mt-1 font-mono text-[14px] text-fg-muted">{layer.spec}</p>
        </div>
        <span className="mt-3 h-px w-10 shrink-0 bg-accent" />
      </motion.div>
      <motion.span style={{ opacity: labels }} aria-hidden className="absolute -top-[5px] -left-[5px] size-[9px] rounded-full border border-accent bg-bg" />
      {/* Risers: dashed verticals up to the next plane, at the four corners. */}
      {!isTop
        ? [
            [0, 0],
            [W, 0],
            [0, H],
            [W, H],
          ].map(([x, y]) => (
            <motion.span
              key={`${x}-${y}`}
              aria-hidden
              className="absolute w-px origin-top"
              style={{
                left: x,
                top: y,
                height: riser,
                opacity: labels,
                transform: "rotateX(90deg)",
                background: "repeating-linear-gradient(180deg, var(--accent) 0 4px, transparent 4px 8px)",
              }}
            />
          ))
        : null}
    </motion.div>
  )
}

/* ── captions ─────────────────────────────────────────────────────────── */
const STEPS: { at: [number, number, number, number]; kicker: string; title: React.ReactNode }[] = [
  { at: [0.0, 0.03, 0.11, 0.14], kicker: "01 / 04", title: "Every screen is a stack of decisions." },
  { at: [0.14, 0.18, 0.56, 0.6], kicker: "02 / 04", title: "Five layers. Every value is a token." },
  { at: [0.6, 0.63, 0.78, 0.82], kicker: "03 / 04", title: "Nothing floats. Nothing is guessed." },
  { at: [0.82, 0.86, 0.99, 1], kicker: "04 / 04", title: <>Put back together, it is just your product.<span className="text-fg-muted"> Try 7d, 30d, 90d.</span></> },
]

function Caption({ p, step }: { p: MotionValue<number>; step: (typeof STEPS)[number] }) {
  const last = step.at[3] >= 1
  const opacity = useTransform(p, step.at, [0, 1, 1, last ? 1 : 0])
  const y = useTransform(p, step.at, [10, 0, 0, last ? 0 : -10])
  const filter = useTransform(opacity, (o) => `blur(${(1 - o) * 4}px)`)
  return (
    <motion.div style={{ opacity, y, filter }} className="absolute inset-x-0 top-0 text-center">
      <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">{step.kicker}</p>
      <p className="mx-auto mt-2 max-w-3xl px-4 text-[22px] leading-[1.2] font-medium tracking-[-0.03em] text-balance text-fg sm:text-[32px]">{step.title}</p>
    </motion.div>
  )
}

/* ── section ──────────────────────────────────────────────────────────── */
export function Exploded() {
  const ref = React.useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [range, setRange] = React.useState<Range>("30d")
  const [fit, setFit] = React.useState(0.9)
  const [live, setLive] = React.useState(false)

  React.useEffect(() => {
    const f = () => setFit(Math.min(1, (window.innerWidth - 32) / W, (window.innerHeight - 240) / H))
    f()
    window.addEventListener("resize", f)
    return () => window.removeEventListener("resize", f)
  }, [])

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })
  useMotionValueEvent(p, "change", (v) => setLive(v > 0.84))

  const spacing = useTransform(p, [0.12, 0.38, 0.58, 0.76], [0, 150, 150, 0])
  const rx = useTransform(p, [0, 0.4, 0.62, 0.86], [56, 58, 56, 0])
  const rz = useTransform(p, [0, 0.4, 0.62, 0.86], [-32, -24, -24, 0])
  const phase = useTransform(p, [0, 0.4, 0.62, 0.86], [0.8, 0.64, 0.74, 1])
  const scale = useTransform(phase, (s) => s * fit)
  const ty = useTransform(p, [0, 0.4, 0.62, 0.86], [30, 96, 70, 0])
  const labels = useTransform(p, [0.2, 0.32, 0.56, 0.64], [0, 1, 1, 0])
  const overlayOpacity = useTransform(p, [0.66, 0.76], [1, 0])
  const overlayDisplay = useTransform(overlayOpacity, (o): string => (o < 0.02 ? "none" : "block"))
  const transform = useMotionTemplate`translate(-50%, -50%) translateY(${ty}px) scale(${scale}) rotateX(${rx}deg) rotateZ(${rz}deg)`

  if (reduce) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto overflow-hidden" style={{ width: W * fit, height: H * fit }}>
          <div style={{ width: W, height: H, transform: `scale(${fit})`, transformOrigin: "top left" }}>
            <LumenMini range={range} setRange={setRange} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} aria-label="How a screen is built" className="relative h-[460vh]">
      <style>{`
        .xl-layer { pointer-events: none; }
        .xl-layer [data-part] { visibility: hidden; pointer-events: none; }
        ${LAYERS.map((l) => `.xl-layer[data-layer="${l.id}"] [data-part~="${l.id}"] { visibility: visible; pointer-events: auto; }`).join("\n")}
        .xl-layer[data-layer="overlay"] [data-part~="overlay"] { pointer-events: none; }
      `}</style>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,color-mix(in_oklch,var(--accent)_7%,transparent),transparent_70%)]" />
        <div className="absolute inset-x-0 top-[84px] h-28">
          {STEPS.map((s) => (
            <Caption key={s.kicker} p={p} step={s} />
          ))}
        </div>
        <div className="absolute inset-0 top-[170px] [perspective:2600px] [perspective-origin:50%_35%]">
          <motion.div
            style={{ transform, width: W, height: H }}
            className={cn("absolute top-1/2 left-1/2 [transform-style:preserve-3d]", !live && "select-none")}
          >
            {LAYERS.map((l, i) => (
              <Plane key={l.id} layer={l} i={i} spacing={spacing} labels={labels} overlayDisplay={overlayDisplay}>
                <div inert={!live || l.id === "overlay" ? true : undefined} className="size-full">
                  <LumenMini range={range} setRange={setRange} />
                </div>
              </Plane>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
