"use client"
import * as React from "react"
import { createPortal } from "react-dom"
import { RulerIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { SITE } from "@/lib/site"

/*
 * Blueprint: the site-wide X-ray. Toggle it (or hold ⌥ / Alt) and every
 * component on the page shows its spec: box, padding, gaps, radius, type,
 * and the exact token classes it is built from. Like Figma's inspect, but on
 * the live product. It works on any element that carries data-slot.
 */

/* ── store ─────────────────────────────────────────────────────────────── */
type State = { on: boolean; peek: boolean }
let state: State = { on: false, peek: false }
const subs = new Set<() => void>()
const set = (p: Partial<State>) => {
  state = { ...state, ...p }
  const active = state.on || state.peek
  if (typeof document !== "undefined") {
    if (active) document.documentElement.setAttribute("data-blueprint", "")
    else document.documentElement.removeAttribute("data-blueprint")
  }
  subs.forEach((f) => f())
}
export function useBlueprint() {
  const s = React.useSyncExternalStore(
    (f) => {
      subs.add(f)
      return () => subs.delete(f)
    },
    () => state,
    () => state
  )
  return { ...s, active: s.on || s.peek, toggle: () => set({ on: !state.on }), setOn: (on: boolean) => set({ on }) }
}

/* ── measuring ─────────────────────────────────────────────────────────── */
const KNOWN = new Set(COMPONENT_INDEX.map((c) => c.name))
const px = (v: string) => Math.round(parseFloat(v) || 0)

type Box = { x: number; y: number; w: number; h: number }
type Spec = {
  slot: string
  component?: string
  parentSlot?: string
  rect: Box
  pad: [number, number, number, number]
  radius: number
  font: string
  gaps: Box[]
  parent?: Box
  tokens: { label: string; value: string }[]
  offGrid: string[]
}

const TOKEN_RX: [string, RegExp][] = [
  ["Fill", /^bg-(?!grid|dots|hatch|clip|cover|center|no-repeat|fixed|repeat|linear|radial|conic|\[url)/],
  ["Text", /^text-(?:fg|fg-muted|fg-subtle|on-ink|on-accent|accent|accent-fg|success|danger|warning|info|white|current|ink)\b/],
  ["Border", /^border-(?:border|border-strong|accent|accent-line|danger|success|warning|transparent|ink|dashed)\b/],
  ["Depth", /^shadow-(?:xs|sm|md|lg|xl|raised|key|ink|overlay|glow|highlight|none|\[)/],
  ["Radius", /^rounded(?:-[a-z0-9[\].]+)?$/],
  ["Motion", /^(?:ease-hairline|ease-spring|ease-exit|duration-.+)$/],
]

function measure(el: HTMLElement): Spec {
  const r = el.getBoundingClientRect()
  const cs = getComputedStyle(el)
  const slot = el.getAttribute("data-slot") || el.tagName.toLowerCase()
  const parentEl = el.parentElement?.closest("[data-slot]") as HTMLElement | null
  const parentSlot = parentEl?.getAttribute("data-slot") ?? undefined
  let component: string | undefined
  for (let n: HTMLElement | null = el; n; n = n.parentElement?.closest("[data-slot]") as HTMLElement | null) {
    const s = n.getAttribute("data-slot")
    if (s && KNOWN.has(s)) {
      component = s
      break
    }
  }

  const cls = (el.getAttribute("class") || "").split(/\s+/).filter((c) => c && !c.includes(":"))
  const tokens: Spec["tokens"] = []
  for (const [label, rx] of TOKEN_RX) {
    const hit = cls.filter((c) => rx.test(c))
    if (hit.length) tokens.push({ label, value: hit.slice(0, 2).join(" ") })
  }

  const pad: Spec["pad"] = [px(cs.paddingTop), px(cs.paddingRight), px(cs.paddingBottom), px(cs.paddingLeft)]
  const fam = /mono/i.test(cs.fontFamily) ? "Geist Mono" : "Geist"
  const lh = cs.lineHeight === "normal" ? "auto" : String(px(cs.lineHeight))
  const font = `${px(cs.fontSize)} / ${lh} · ${cs.fontWeight} · ${fam}`

  // Gaps between visible children of flex / grid containers.
  const gaps: Box[] = []
  if (/flex|grid/.test(cs.display) && (px(cs.columnGap) > 0 || px(cs.rowGap) > 0)) {
    const kids = Array.from(el.children)
      .map((k) => (k as HTMLElement).getBoundingClientRect())
      .filter((k) => k.width > 0 && k.height > 0)
      .slice(0, 32)
    for (let i = 0; i < kids.length - 1; i++) {
      const a = kids[i]
      const b = kids[i + 1]
      const vOverlap = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
      if (b.left >= a.right - 1 && vOverlap > 0 && b.left - a.right < 200) {
        gaps.push({ x: a.right, y: Math.min(a.top, b.top), w: b.left - a.right, h: Math.max(a.bottom, b.bottom) - Math.min(a.top, b.top) })
      } else if (b.top >= a.bottom - 1 && b.top - a.bottom < 200) {
        const left = Math.min(a.left, b.left)
        gaps.push({ x: left, y: a.bottom, w: Math.max(a.right, b.right) - left, h: b.top - a.bottom })
      }
    }
  }

  const pr = parentEl?.getBoundingClientRect()
  const parent = pr && pr.width < window.innerWidth * 0.98 ? { x: pr.left, y: pr.top, w: pr.width, h: pr.height } : undefined

  const offGrid: string[] = []
  const odd = (n: number) => n > 1 && n % 2 === 1
  if (odd(Math.round(r.height)) && Math.round(r.height) < 64) offGrid.push(`height ${Math.round(r.height)}`)
  pad.forEach((p, i) => odd(p) && offGrid.push(`${["top", "right", "bottom", "left"][i]} ${p}`))
  if (odd(px(cs.columnGap))) offGrid.push(`gap ${px(cs.columnGap)}`)

  return {
    slot,
    component,
    parentSlot,
    rect: { x: r.left, y: r.top, w: r.width, h: r.height },
    pad,
    radius: px(cs.borderTopLeftRadius),
    font,
    gaps,
    parent,
    tokens,
    offGrid,
  }
}

/* ── overlay ───────────────────────────────────────────────────────────── */
const HATCH =
  "repeating-linear-gradient(135deg, color-mix(in oklch, var(--accent) 34%, transparent) 0 1px, transparent 1px 5px)"

function Dim({ x, y, len, vertical, label, tone = "accent" }: { x: number; y: number; len: number; vertical?: boolean; label: string; tone?: "accent" | "danger" }) {
  const c = tone === "accent" ? "var(--accent)" : "var(--danger)"
  if (len < 4) return null
  return (
    <div className="absolute" style={vertical ? { left: x, top: y, height: len, width: 1 } : { left: x, top: y, width: len, height: 1 }}>
      <div className="absolute inset-0" style={{ background: tone === "danger" ? `repeating-linear-gradient(${vertical ? "180deg" : "90deg"}, ${c} 0 3px, transparent 3px 5px)` : c }} />
      {tone === "accent" ? (
        <>
          <div className="absolute" style={vertical ? { left: -3, top: 0, width: 7, height: 1, background: c } : { left: 0, top: -3, width: 1, height: 7, background: c }} />
          <div className="absolute" style={vertical ? { left: -3, bottom: 0, width: 7, height: 1, background: c } : { right: 0, top: -3, width: 1, height: 7, background: c }} />
        </>
      ) : null}
      <span
        className="absolute rounded-[4px] px-1 py-px font-mono text-[10px] leading-3.5 font-medium whitespace-nowrap text-white tabular-nums shadow-sm"
        style={{
          background: c,
          ...(vertical ? { left: 6, top: "50%", transform: "translateY(-50%)" } : { left: "50%", top: -9, transform: "translate(-50%,-50%)" }),
        }}
      >
        {label}
      </span>
    </div>
  )
}

function Overlay({ spec, copied }: { spec: Spec; copied: boolean }) {
  const { rect: r, pad } = spec
  const vw = typeof window !== "undefined" ? window.innerWidth : 1440
  const vh = typeof window !== "undefined" ? window.innerHeight : 900
  const cardW = 264
  const right = r.x + r.w + 48 + cardW < vw - 8
  const cardX = right ? r.x + r.w + 48 : Math.max(8, r.x - cardW - 24)
  const cardY = Math.min(Math.max(8, r.y), vh - 300)
  const p = spec.parent
  return (
    <>
      {/* padding */}
      {pad[0] > 0 ? <div className="absolute" style={{ left: r.x, top: r.y, width: r.w, height: pad[0], background: HATCH }} /> : null}
      {pad[2] > 0 ? <div className="absolute" style={{ left: r.x, top: r.y + r.h - pad[2], width: r.w, height: pad[2], background: HATCH }} /> : null}
      {pad[3] > 0 ? <div className="absolute" style={{ left: r.x, top: r.y + pad[0], width: pad[3], height: r.h - pad[0] - pad[2], background: HATCH }} /> : null}
      {pad[1] > 0 ? <div className="absolute" style={{ left: r.x + r.w - pad[1], top: r.y + pad[0], width: pad[1], height: r.h - pad[0] - pad[2], background: HATCH }} /> : null}
      {/* gaps */}
      {spec.gaps.map((g, i) => (
        <div key={i} className="absolute" style={{ left: g.x, top: g.y, width: g.w, height: g.h, background: "repeating-linear-gradient(135deg, color-mix(in oklch, var(--danger) 45%, transparent) 0 1px, transparent 1px 4px)" }} />
      ))}
      {/* box */}
      <div
        className="absolute border border-accent"
        style={{ left: r.x, top: r.y, width: r.w, height: r.h, borderRadius: spec.radius, boxShadow: "0 0 0 4px color-mix(in oklch, var(--accent) 12%, transparent)" }}
      />
      {/* dimensions */}
      <Dim x={r.x} y={r.y - 12} len={r.w} label={`${Math.round(r.w)}`} />
      <Dim x={r.x + r.w + 10} y={r.y} len={r.h} vertical label={`${Math.round(r.h)}`} />
      {/* distance to parent */}
      {p && r.x >= p.x && r.y >= p.y && r.x + r.w <= p.x + p.w + 0.5 && r.y + r.h <= p.y + p.h + 0.5 ? (
        <>
          <div className="absolute border border-dashed border-danger/60" style={{ left: p.x, top: p.y, width: p.w, height: p.h }} />
          <Dim tone="danger" x={p.x} y={r.y + r.h / 2} len={r.x - p.x} label={`${Math.round(r.x - p.x)}`} />
          <Dim tone="danger" x={r.x + r.w / 2} y={p.y} len={r.y - p.y} vertical label={`${Math.round(r.y - p.y)}`} />
        </>
      ) : null}
      {/* radius */}
      {spec.radius > 0 ? (
        <span className="absolute rounded-[4px] bg-ink px-1 py-px font-mono text-[10px] leading-3.5 text-on-ink" style={{ left: r.x - 4, top: r.y - 4, transform: "translate(-100%,-100%)" }}>
          r{spec.radius}
        </span>
      ) : null}

      {/* spec card */}
      <div
        className="absolute w-[264px] overflow-hidden rounded-xl border border-border bg-raised text-fg shadow-overlay"
        style={{ left: cardX, top: cardY }}
      >
        <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
          <span className="grid size-5 place-items-center rounded-md bg-accent text-on-accent">
            <RulerIcon className="size-3" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-[12px] font-medium">{spec.slot}</p>
            {spec.component && spec.component !== spec.slot ? (
              <p className="truncate text-[11px] text-fg-subtle">part of {spec.component}</p>
            ) : spec.parentSlot ? (
              <p className="truncate text-[11px] text-fg-subtle">inside {spec.parentSlot}</p>
            ) : null}
          </div>
        </div>
        <dl className="grid grid-cols-[64px_1fr] gap-x-2 gap-y-1.5 px-3 py-2.5 text-[11.5px]">
          <dt className="text-fg-subtle">Size</dt>
          <dd className="font-mono tabular-nums">
            {Math.round(r.w)} × {Math.round(r.h)}
          </dd>
          <dt className="text-fg-subtle">Padding</dt>
          <dd className="font-mono tabular-nums">{pad.every((v) => v === pad[0]) ? pad[0] : pad[0] === pad[2] && pad[1] === pad[3] ? `${pad[0]} ${pad[1]}` : pad.join(" ")}</dd>
          <dt className="text-fg-subtle">Type</dt>
          <dd className="truncate font-mono tabular-nums">{spec.font}</dd>
          {spec.tokens.map((t) => (
            <React.Fragment key={t.label}>
              <dt className="text-fg-subtle">{t.label}</dt>
              <dd className="truncate font-mono text-accent-fg">{t.value}</dd>
            </React.Fragment>
          ))}
        </dl>
        {spec.offGrid.length ? (
          <p className="border-t border-border bg-[color-mix(in_oklch,var(--warning)_10%,var(--raised))] px-3 py-2 text-[11px] text-fg">
            Off the 2px grid: <span className="font-mono">{spec.offGrid.join(", ")}</span>
          </p>
        ) : null}
        {spec.component ? (
          <div className="flex items-center gap-3 border-t border-border bg-sunken/60 px-3 py-2 text-[11px] text-fg-muted">
            {copied ? (
              <span className="text-success">Install command copied</span>
            ) : (
              <>
                <span><kbd className="font-mono text-fg">C</kbd> copy install</span>
                <span><kbd className="font-mono text-fg">D</kbd> open docs</span>
              </>
            )}
          </div>
        ) : null}
      </div>
    </>
  )
}

function isTyping(t: EventTarget | null) {
  const el = t as HTMLElement | null
  return !!el && (/input|textarea|select/i.test(el.tagName) || el.isContentEditable)
}

/** Mount once near the root. Renders the overlay and wires the keyboard. */
export function BlueprintLayer() {
  const { active } = useBlueprint()
  const [spec, setSpec] = React.useState<Spec | null>(null)
  const [copied, setCopied] = React.useState(false)
  const target = React.useRef<HTMLElement | null>(null)
  const frame = React.useRef(0)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  // Keyboard: hold Alt to peek, Esc to leave, C / D on a known component.
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Alt" && !e.repeat) set({ peek: true })
      if (e.key === "Escape" && state.on) set({ on: false })
      if (!(state.on || state.peek) || isTyping(e.target) || e.metaKey || e.ctrlKey) return
      const comp = target.current && measure(target.current).component
      if (!comp) return
      if (e.code === "KeyC") {
        e.preventDefault()
        navigator.clipboard?.writeText(`npx shadcn@latest add ${SITE.url}/r/${comp}.json`).catch(() => {})
        setCopied(true)
        setTimeout(() => setCopied(false), 1400)
      }
      if (e.code === "KeyD") {
        e.preventDefault()
        window.location.href = `/docs/${comp}`
      }
    }
    const up = (e: KeyboardEvent) => e.key === "Alt" && set({ peek: false })
    const blur = () => set({ peek: false })
    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)
    window.addEventListener("blur", blur)
    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keyup", up)
      window.removeEventListener("blur", blur)
    }
  }, [])

  React.useEffect(() => {
    if (!active) {
      setSpec(null)
      target.current = null
      return
    }
    const remeasure = () => {
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        const el = target.current
        setSpec(el && el.isConnected ? measure(el) : null)
      })
    }
    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-slot]") as HTMLElement | null
      if (el?.closest("[data-blueprint-ignore]")) return
      if (el !== target.current) {
        target.current = el
        remeasure()
      }
    }
    // Pick up whatever is under the pointer right now.
    window.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("scroll", remeasure, { passive: true, capture: true })
    window.addEventListener("resize", remeasure)
    return () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("scroll", remeasure, { capture: true })
      window.removeEventListener("resize", remeasure)
      cancelAnimationFrame(frame.current)
    }
  }, [active])

  if (!mounted || !active) return null
  return createPortal(
    <div data-blueprint-ignore aria-hidden className="pointer-events-none fixed inset-0 z-[200]">
      {spec ? <Overlay spec={spec} copied={copied} /> : null}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 animate-[rise-in_200ms_var(--ease-hairline)_both] items-center gap-3 rounded-full border border-border bg-raised py-1.5 pr-4 pl-1.5 text-[12px] text-fg-muted shadow-overlay">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-medium text-on-accent">
          <RulerIcon className="size-3.5" /> Blueprint
        </span>
        <span className="hidden sm:inline">Hover anything to read its spec</span>
        <span className="hidden text-fg-subtle sm:inline">·</span>
        <span>{state.on ? "Esc to exit" : "Release ⌥ to exit"}</span>
      </div>
    </div>,
    document.body
  )
}

/** Header button. */
export function BlueprintToggle({ className }: { className?: string }) {
  const { on, toggle } = useBlueprint()
  return (
    <button
      type="button"
      data-blueprint-ignore
      onClick={toggle}
      aria-pressed={on}
      aria-label="Blueprint mode: show every component's spec. Hold Option or Alt to peek."
      title="Blueprint (hold ⌥ to peek)"
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-lg outline-none transition-colors duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent",
        on ? "bg-accent text-on-accent shadow-ink" : "text-fg-muted hover:bg-sunken hover:text-fg",
        className
      )}
    >
      <RulerIcon className="size-4" />
    </button>
  )
}
