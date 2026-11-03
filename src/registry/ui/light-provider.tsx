"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** The page's single light source: it follows the pointer, drifts when idle, and every shadow and sheen in the kit falls away from it. */

/*
 * Light & Material.
 *
 * <LightProvider /> runs one light source for the whole page. It follows the
 * pointer (eased), drifts on its own when nobody is pointing (phones, idle),
 * and writes five CSS variables on <html>: --lx --ly (position), --sx --sy
 * (shadow direction) and --la (angle toward the light). Every shadow-*,
 * surface and sheen in the kit reads them, so all components catch the same
 * light. With reduced motion the light stays still.
 *
 * Materials are a data attribute: <html data-material="glass"> or on any
 * subtree. hairline (default) · glass · metal · paper.
 *
 * Mount it once, near the root. A second provider on the same page does not
 * start a second light: it renders its children, or, with no children, a
 * small panel that shows the light at work (what the docs preview shows).
 */

type Material = "hairline" | "glass" | "metal" | "paper"
const MATERIALS: Material[] = ["hairline", "glass", "metal", "paper"]

/* prefers-reduced-motion, live. */
function useReducedMotion() {
  return React.useSyncExternalStore(
    (f) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
      mq.addEventListener("change", f)
      return () => mq.removeEventListener("change", f)
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  )
}

/* Number of providers currently running the light. Only the first one does. */
let lights = 0

type LightProviderProps = {
  /** Drift when the pointer is idle or absent. */
  idle?: boolean
  /** Rendered as-is. Without children the root provider renders nothing visible. */
  children?: React.ReactNode
}

function LightProvider({ idle = true, children }: LightProviderProps) {
  const reduce = useReducedMotion()
  const [secondary, setSecondary] = React.useState(false)
  React.useEffect(() => {
    if (lights > 0) {
      setSecondary(true)
      return
    }
    lights++
    const stop = reduce ? undefined : runLight(idle)
    return () => {
      lights--
      stop?.()
    }
  }, [reduce, idle])
  if (children !== undefined) return <>{children}</>
  if (secondary) return <LightDemo />
  return <span data-slot="light-provider" hidden />
}

/* Starts the light loop on <html>. Returns a function that stops it.
 *
 * Every shadow and sheen reads these variables, so each write restyles the
 * visible page. To keep that cheap: values are rounded (steps far below what
 * the eye can see) and written only when a rounded value changes, at most 30
 * times a second while following the pointer; nothing is written while the
 * page scrolls. The idle drift starts only after the visitor's first input
 * (a page nobody has touched yet stays still and costs nothing), writes 10
 * times a second (6 on phones), and rests after 30 s without any input. */
function runLight(idle: boolean) {
  const root = document.documentElement
  let tx = window.innerWidth * 0.3
  let ty = -window.innerHeight * 0.1
  let cx = tx
  let cy = ty
  let last = performance.now()
  let lastMove = 0
  let lastInput = performance.now()
  let lastWriteAt = 0
  let driftFrom = Infinity
  let raf = 0
  let lastWrite = ""
  let scrolling = 0
  const coarse = window.matchMedia("(pointer: coarse)").matches
  const FOLLOW_MS = 33
  const DRIFT_MS = coarse ? 160 : 100
  const REST_MS = 30000

  const write = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    const sx = Math.max(-1, Math.min(1, (w / 2 - cx) / (w / 2)))
    const sy = Math.max(-1, Math.min(1, (h / 2 - cy) / (h / 2)))
    const la = (Math.atan2(-sx, sy) * 180) / Math.PI // toward the light
    // 4px light steps and 1/64 shadow steps: a 28px shadow moves under half a pixel per step.
    const lx = Math.round(cx / 4) * 4
    const ly = Math.round(cy / 4) * 4
    const qx = Math.round(sx * 64) / 64
    const qy = Math.round(sy * 64) / 64
    const key = `${lx}|${ly}|${qx}|${qy}`
    if (key === lastWrite) return
    lastWrite = key
    root.style.setProperty("--lx", `${lx}px`)
    root.style.setProperty("--ly", `${ly}px`)
    root.style.setProperty("--sx", qx.toFixed(4))
    root.style.setProperty("--sy", qy.toFixed(4))
    root.style.setProperty("--la", `${Math.round(la)}deg`)
  }

  const tick = (now: number) => {
    const dt = Math.min(64, now - last)
    last = now
    const drifting = idle && now >= driftFrom && (coarse || now - lastMove > 5000)
    // Nobody has touched the page for a while: let the light rest until they do.
    if (drifting && now - lastInput > REST_MS) {
      raf = 0
      return
    }
    if (drifting) {
      const t = now / 1000
      tx = window.innerWidth * (0.5 + 0.34 * Math.cos(t * 0.32))
      ty = window.innerHeight * (0.28 + 0.26 * Math.sin(t * 0.32))
    }
    const k = 1 - Math.pow(0.001, dt / 1000) // frame-rate independent ease
    cx += (tx - cx) * Math.min(1, k * 1.6)
    cy += (ty - cy) * Math.min(1, k * 1.6)
    if (!scrolling && now - lastWriteAt >= (drifting ? DRIFT_MS : FOLLOW_MS)) {
      lastWriteAt = now
      write()
    }
    // No drift (or not armed yet): sleep once the light has caught up with the pointer.
    if ((!idle || driftFrom === Infinity) && !scrolling && Math.abs(tx - cx) < 0.5 && Math.abs(ty - cy) < 0.5) {
      raf = 0
      return
    }
    raf = requestAnimationFrame(tick)
  }
  const wake = () => {
    if (raf || document.hidden) return
    last = performance.now()
    raf = requestAnimationFrame(tick)
  }
  // Any input: arms the drift the first time, keeps it awake after that.
  const input = () => {
    lastInput = performance.now()
    if (driftFrom === Infinity) driftFrom = lastInput + 1500
    wake()
  }

  const move = (e: PointerEvent) => {
    input()
    if (e.pointerType === "touch") return
    tx = e.clientX
    ty = e.clientY
    lastMove = lastInput
  }
  const scroll = () => {
    input()
    clearTimeout(scrolling)
    scrolling = window.setTimeout(() => {
      scrolling = 0
      wake()
    }, 140)
  }
  const vis = () => {
    cancelAnimationFrame(raf)
    raf = 0
    wake()
  }
  window.addEventListener("pointermove", move, { passive: true })
  window.addEventListener("pointerdown", input, { passive: true })
  window.addEventListener("keydown", input, { passive: true })
  window.addEventListener("scroll", scroll, { passive: true, capture: true })
  window.addEventListener("resize", wake)
  document.addEventListener("visibilitychange", vis)
  raf = requestAnimationFrame(tick)
  return () => {
    cancelAnimationFrame(raf)
    clearTimeout(scrolling)
    window.removeEventListener("pointermove", move)
    window.removeEventListener("pointerdown", input)
    window.removeEventListener("keydown", input)
    window.removeEventListener("scroll", scroll, { capture: true })
    window.removeEventListener("resize", wake)
    document.removeEventListener("visibilitychange", vis)
  }
}

/* ── demo panel (a second provider with no children) ───────────────────── */
const TILES: { label: string; className: string }[] = [
  { label: "Card", className: "rounded-xl bg-surface text-fg-muted shadow-raised" },
  { label: "Key", className: "rounded-lg border border-border bg-surface text-fg-muted shadow-key" },
  { label: "Button", className: "rounded-xl bg-ink text-on-ink shadow-ink" },
  { label: "Menu", className: "rounded-xl border border-border bg-raised text-fg-muted shadow-overlay" },
]

function LightDemo() {
  return (
    <div data-slot="light-provider" className="w-full max-w-md rounded-2xl border border-border bg-surface p-5 shadow-raised">
      <p className="text-sm font-medium text-fg">One light, every shadow</p>
      <p className="mt-1 text-xs leading-[1.6] text-fg-muted">
        Move the pointer. The light follows it, drifts when you stop, and each surface casts its shadow away from it.
      </p>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {TILES.map((t) => (
          <div key={t.label} className={cn("grid h-16 place-items-center text-xs font-medium", t.className)}>
            {t.label}
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-fg-muted">Material</span>
        <MaterialSwitcher size="sm" />
      </div>
    </div>
  )
}

/* ── material store (reads and writes <html data-material>) ───────────── */
const subs = new Set<() => void>()
function readMaterial(): Material {
  if (typeof document === "undefined") return "hairline"
  const m = document.documentElement.getAttribute("data-material") as Material | null
  return m && MATERIALS.includes(m) ? m : "hairline"
}
function useMaterial() {
  const material = React.useSyncExternalStore(
    (f) => {
      subs.add(f)
      const mo = new MutationObserver(f)
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-material"] })
      return () => {
        subs.delete(f)
        mo.disconnect()
      }
    },
    readMaterial,
    () => "hairline" as Material
  )
  const setMaterial = React.useCallback((m: Material, from?: { x: number; y: number }) => {
    const apply = () => {
      document.documentElement.setAttribute("data-material", m)
      try {
        localStorage.setItem("material", m)
      } catch {}
      subs.forEach((f) => f())
    }
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!doc.startViewTransition || reduce) return apply()
    const x = from?.x ?? window.innerWidth / 2
    const y = from?.y ?? window.innerHeight / 2
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const vt = doc.startViewTransition(apply)
    vt.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 720, easing: "cubic-bezier(0.2, 0, 0, 1)", pseudoElement: "::view-transition-new(root)" }
        )
      })
      .catch(() => {})
  }, [])
  return { material, setMaterial }
}

/* ── switcher ──────────────────────────────────────────────────────────── */
const SWATCH: Record<Material, string> = {
  hairline: "bg-[linear-gradient(135deg,oklch(1_0_0),oklch(0.93_0.004_264))] shadow-[inset_0_0_0_1px_oklch(0.2_0.02_264/0.18)]",
  glass: "bg-[radial-gradient(circle_at_30%_25%,oklch(1_0_0/0.9),transparent_45%),conic-gradient(from_200deg,oklch(0.8_0.12_300),oklch(0.85_0.1_220),oklch(0.88_0.1_350),oklch(0.8_0.12_300))] shadow-[inset_0_0_0_1px_oklch(1_0_0/0.6)]",
  metal: "bg-[conic-gradient(from_210deg,oklch(0.96_0_0),oklch(0.7_0.005_250),oklch(0.98_0_0),oklch(0.62_0.005_250),oklch(0.96_0_0))] shadow-[inset_0_0_0_1px_oklch(0_0_0/0.2)]",
  paper: "bg-[oklch(0.95_0.02_85)] shadow-[inset_0_0_0_1px_oklch(0.5_0.04_70/0.3)]",
}
const LABEL: Record<Material, string> = { hairline: "Hairline", glass: "Glass", metal: "Metal", paper: "Paper" }

function MaterialSwitcher({ size = "default", labels = true, className }: { size?: "sm" | "default" | "lg"; labels?: boolean; className?: string }) {
  const { material, setMaterial } = useMaterial()
  const reduce = useReducedMotion()
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const pill = React.useRef<HTMLSpanElement | null>(null)
  const from = React.useRef<DOMRect | null>(null)
  // The pill lives in the selected button. When the selection changes, it glides
  // from where the old pill was (FLIP with the Web Animations API).
  React.useLayoutEffect(() => {
    const el = pill.current
    const old = from.current
    from.current = null
    if (!el || !old || reduce || typeof el.animate !== "function") return
    const now = el.getBoundingClientRect()
    if (Math.abs(old.left - now.left) < 1 && Math.abs(old.width - now.width) < 1) return
    el.animate(
      [
        { left: `${old.left - now.left}px`, right: `${now.right - old.right}px` },
        { left: "0px", right: "0px" },
      ],
      { duration: 420, easing: "cubic-bezier(0.3, 1.25, 0.5, 1)" }
    )
  }, [material, reduce])
  const h = size === "lg" ? "h-11 p-1" : size === "sm" ? "h-8 p-[3px]" : "h-9 p-[3px]"
  const pick = (m: Material, el?: HTMLElement | null) => {
    if (m !== material && pill.current) from.current = pill.current.getBoundingClientRect()
    const r = el?.getBoundingClientRect()
    setMaterial(m, r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : undefined)
  }
  return (
    <div
      role="radiogroup"
      aria-label="Material"
      data-slot="material-switcher"
      className={cn("relative isolate inline-flex items-stretch rounded-full bg-sunken shadow-[inset_0_0_0_1px_var(--border)]", h, className)}
    >
      {MATERIALS.map((m, i) => {
        const on = m === material
        return (
          <button
            key={m}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={labels ? undefined : LABEL[m]}
            tabIndex={on ? 0 : -1}
            onClick={(e) => pick(m, e.currentTarget)}
            onKeyDown={(e) => {
              const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0
              if (!d) return
              e.preventDefault()
              const n = (i + d + MATERIALS.length) % MATERIALS.length
              refs.current[n]?.focus()
              pick(MATERIALS[n], refs.current[n])
            }}
            className={cn(
              "relative inline-flex items-center gap-2 rounded-full font-medium whitespace-nowrap outline-none transition-colors duration-[70ms]",
              "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-sunken",
              size === "lg" ? "px-4 text-sm" : "px-3 text-[0.8125rem]",
              !labels && "px-1.5",
              on ? "text-fg" : "text-fg-muted hover:text-fg"
            )}
          >
            {on ? (
              <span
                ref={pill}
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-raised shadow-[0_1px_2px_0_oklch(0_0_0/0.1),0_0_0_1px_var(--border),inset_0_1px_0_0_var(--highlight)]"
              />
            ) : null}
            <span aria-hidden className={cn("size-4 shrink-0 rounded-full", size === "lg" && "size-5", SWATCH[m])} />
            {labels ? LABEL[m] : null}
          </button>
        )
      })}
    </div>
  )
}

export { LightProvider, MaterialSwitcher, useMaterial, MATERIALS }
export type { Material, LightProviderProps }
