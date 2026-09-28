"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

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
 */

type Material = "hairline" | "glass" | "metal" | "paper"
const MATERIALS: Material[] = ["hairline", "glass", "metal", "paper"]

function LightProvider({ idle = true }: { /** Drift when the pointer is idle or absent. */ idle?: boolean }) {
  const reduce = useReducedMotion()
  React.useEffect(() => {
    const root = document.documentElement
    if (reduce) return
    let tx = window.innerWidth * 0.3
    let ty = -window.innerHeight * 0.1
    let cx = tx
    let cy = ty
    let last = performance.now()
    let lastMove = 0
    let raf = 0
    let lastWrite = ""
    const coarse = window.matchMedia("(pointer: coarse)").matches

    const write = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const sx = Math.max(-1, Math.min(1, (w / 2 - cx) / (w / 2)))
      const sy = Math.max(-1, Math.min(1, (h / 2 - cy) / (h / 2)))
      const la = (Math.atan2(-sx, sy) * 180) / Math.PI // toward the light
      const key = `${Math.round(cx)}|${Math.round(cy)}`
      if (key === lastWrite) return
      lastWrite = key
      root.style.setProperty("--lx", `${Math.round(cx)}px`)
      root.style.setProperty("--ly", `${Math.round(cy)}px`)
      root.style.setProperty("--sx", sx.toFixed(3))
      root.style.setProperty("--sy", sy.toFixed(3))
      root.style.setProperty("--la", `${Math.round(la)}deg`)
    }

    const tick = (now: number) => {
      const dt = Math.min(64, now - last)
      last = now
      if (idle && (coarse || now - lastMove > 5000)) {
        const t = now / 1000
        tx = window.innerWidth * (0.5 + 0.34 * Math.cos(t * 0.32))
        ty = window.innerHeight * (0.28 + 0.26 * Math.sin(t * 0.32))
      }
      const k = 1 - Math.pow(0.001, dt / 1000) // frame-rate independent ease
      cx += (tx - cx) * Math.min(1, k * 1.6)
      cy += (ty - cy) * Math.min(1, k * 1.6)
      write()
      raf = requestAnimationFrame(tick)
    }

    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return
      tx = e.clientX
      ty = e.clientY
      lastMove = performance.now()
    }
    const vis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    }
    window.addEventListener("pointermove", move, { passive: true })
    document.addEventListener("visibilitychange", vis)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", move)
      document.removeEventListener("visibilitychange", vis)
    }
  }, [reduce, idle])
  return null
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
  const id = React.useId()
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const h = size === "lg" ? "h-11 p-1" : size === "sm" ? "h-8 p-[3px]" : "h-9 p-[3px]"
  const pick = (m: Material, el?: HTMLElement | null) => {
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
              <motion.span
                layoutId={`${id}-mat`}
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-raised shadow-[0_1px_2px_0_oklch(0_0_0/0.1),0_0_0_1px_var(--border),inset_0_1px_0_0_var(--highlight)]"
                transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.18, duration: 0.42 }}
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
export type { Material }
