"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A dotted globe drawn on a plain canvas, no WebGL, that turns on its own and spins under your finger.
 * Two thousand points sit on a sphere, rotate with simple trig and draw with
 * depth shading. Markers take latitude and longitude, carry labels and are
 * joined by arcs with a pulse travelling along each one. Drag to rotate with
 * inertia, or focus the globe and use the arrow keys. Colours resolve through
 * the cascade; the canvas is sharp on high density screens, sleeps off screen
 * and draws one still frame for reduced motion. Content ignores the pointer
 * where it is empty, so the globe stays draggable beside it.
 */
type GlobeMarker = {
  /** Latitude in degrees, north positive. */
  lat: number
  /** Longitude in degrees, east positive. */
  lng: number
  /** Label drawn beside the marker. */
  label?: string
}

type GlobeProps = {
  /** Places to mark, in degrees. Consecutive markers are joined by arcs. */
  markers?: GlobeMarker[]
  /** Number of dots on the sphere. */
  dots?: number
  /** Idle spin in degrees per second. 0 holds still until dragged. */
  speed?: number
  /** Join consecutive markers with arcs. */
  arcs?: boolean
  /** Where the globe sits on wide panels. The demo content takes the other side. */
  align?: "left" | "center" | "right"
  /** Dot colour. Any CSS colour, including var(--token). Defaults to the muted foreground. */
  color?: string
  /** Marker, arc and glow colour. Any CSS colour. Defaults to the accent. */
  accent?: string
  className?: string
  children?: React.ReactNode
}

const DEFAULT_MARKERS: GlobeMarker[] = [
  { lat: 28.61, lng: 77.21, label: "Delhi" },
  { lat: 51.51, lng: -0.13, label: "London" },
  { lat: 37.77, lng: -122.42, label: "San Francisco" },
  { lat: 1.35, lng: 103.82, label: "Singapore" },
  { lat: -23.55, lng: -46.63, label: "São Paulo" },
]

/** Panels narrower than this stack the content above the globe. Matches the @lg container breakpoint. */
const NARROW = 512
const GOLDEN = Math.PI * (3 - Math.sqrt(5))
const DEG = Math.PI / 180

type RGBA = [number, number, number, number]

/** Unit vector for a place, y up and z toward the viewer at zero rotation. */
function toVector(lat: number, lng: number): [number, number, number] {
  const la = lat * DEG
  const lo = lng * DEG
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)]
}

function Globe({
  markers = DEFAULT_MARKERS,
  dots = 2000,
  speed = 6,
  arcs = true,
  align = "right",
  color = "var(--fg-muted)",
  accent = "var(--accent)",
  className,
  children,
}: GlobeProps) {
  const reduce = useReducedMotion()
  const boxRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const markerKey = JSON.stringify(markers)
  const places = markers.map((m) => m.label).filter(Boolean)
  const label = `Globe${places.length ? ` with markers for ${places.join(", ")}` : ""}. Drag or use the arrow keys to rotate.`

  React.useEffect(() => {
    const box = boxRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!box || !canvas || !ctx) return

    const marks = JSON.parse(markerKey) as GlobeMarker[]
    const count = Math.max(0, Math.round(dots))
    const auto = speed * DEG
    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let last = 0
    let clock = 0
    let colorAt = 0
    let visible = true
    let font = "sans-serif"

    // View state.
    let rotY = -1.1
    let rotX = 0.4
    let spin = auto
    let tiltV = 0
    let dragging = false
    let lastX = 0
    let lastY = 0
    let lastT = 0
    let velX = 0
    let velY = 0

    // Points on a Fibonacci sphere: even spacing, no clumping at the poles.
    const pts = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const y = 1 - (2 * (i + 0.5)) / count
      const rr = Math.sqrt(1 - y * y)
      const th = i * GOLDEN
      pts[i * 3] = Math.cos(th) * rr
      pts[i * 3 + 1] = y
      pts[i * 3 + 2] = Math.sin(th) * rr
    }
    const marksV = marks.map((m) => toVector(m.lat, m.lng))

    // Colours resolve through the cascade into rgba, so tokens follow theme and material.
    // No transition on the canvas colour, or a reduced-motion stylesheet can hand back a mid-transition value.
    canvas.style.setProperty("transition", "none", "important")
    const probe = document.createElement("canvas")
    probe.width = probe.height = 1
    const pctx = probe.getContext("2d", { willReadFrequently: true })
    const rgba = (css: string): RGBA => {
      canvas.style.color = css
      const resolved = getComputedStyle(canvas).color || "currentColor"
      if (!pctx) return [128, 128, 128, 1]
      pctx.clearRect(0, 0, 1, 1)
      pctx.fillStyle = "rgb(128 128 128)"
      pctx.fillStyle = resolved
      pctx.fillRect(0, 0, 1, 1)
      const d = pctx.getImageData(0, 0, 1, 1).data
      return [d[0], d[1], d[2], d[3] / 255]
    }
    const col = (c: RGBA, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a * c[3]))})`
    let cDot: RGBA = [128, 128, 128, 1]
    let cAccent: RGBA = [128, 128, 128, 1]
    let cAccent2: RGBA = [128, 128, 128, 1]
    let cFg: RGBA = [128, 128, 128, 1]
    let cRaised: RGBA = [255, 255, 255, 1]
    let cSunken: RGBA = [240, 240, 240, 1]
    let cBorder: RGBA = [200, 200, 200, 1]
    let cRim: RGBA = [180, 180, 180, 1]
    const readColors = () => {
      cDot = rgba(color)
      cAccent = rgba(accent)
      cAccent2 = rgba("var(--accent-2)")
      cFg = rgba("var(--fg)")
      cRaised = rgba("var(--raised)")
      cSunken = rgba("var(--sunken)")
      cBorder = rgba("var(--border)")
      cRim = rgba("var(--border-strong)")
      font = getComputedStyle(box).fontFamily || "sans-serif"
    }

    const resize = () => {
      const r = box.getBoundingClientRect()
      w = Math.max(1, Math.round(r.width))
      h = Math.max(1, Math.round(r.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
    }

    const layout = () => {
      if (w < NARROW) return { cx: w / 2, cy: h * 0.98, r: Math.min(w * 0.46, h * 0.72) }
      const r = Math.min(h * 0.44, w * 0.25)
      const cx = align === "center" ? w / 2 : align === "right" ? w * 0.74 : w * 0.26
      return { cx, cy: h / 2, r }
    }

    const rotate = (x: number, y: number, z: number, out: number[]) => {
      const sy = Math.sin(rotY)
      const cy = Math.cos(rotY)
      const sx = Math.sin(rotX)
      const cx = Math.cos(rotX)
      const x1 = x * cy + z * sy
      const z1 = -x * sy + z * cy
      out[0] = x1
      out[1] = y * cx - z1 * sx
      out[2] = y * sx + z1 * cx
    }

    const tmp = [0, 0, 0]
    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const { cx, cy, r } = layout()
      if (r < 8) return

      // Atmosphere.
      const halo = ctx.createRadialGradient(cx, cy, r * 0.98, cx, cy, r * 1.14)
      halo.addColorStop(0, col(cAccent, 0.26))
      halo.addColorStop(0.45, col(cAccent, 0.07))
      halo.addColorStop(1, col(cAccent, 0))
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(cx, cy, r * 1.14, 0, Math.PI * 2)
      ctx.fill()

      // The body, lit from the top left.
      const body = ctx.createRadialGradient(cx - r * 0.42, cy - r * 0.48, r * 0.06, cx, cy, r)
      body.addColorStop(0, col(cRaised, 1))
      body.addColorStop(0.55, col(cRaised, 0.7))
      body.addColorStop(1, col(cSunken, 1))
      ctx.fillStyle = body
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = col(cRim, 1)
      ctx.lineWidth = 1
      ctx.stroke()

      // Dots, batched into depth buckets so each bucket is one fill.
      const base = Math.max(0.7, r / 112)
      const buckets = 6
      for (let b = 0; b < buckets; b++) {
        const lo = b / buckets
        const hi = (b + 1) / buckets
        const mid = (lo + hi) / 2
        ctx.beginPath()
        const rad = base * (0.55 + 0.6 * mid)
        for (let i = 0; i < count; i++) {
          rotate(pts[i * 3], pts[i * 3 + 1], pts[i * 3 + 2], tmp)
          const z = tmp[2]
          if (z < lo || (z >= hi && b < buckets - 1)) continue
          const sx = cx + r * tmp[0]
          const sy = cy - r * tmp[1]
          ctx.moveTo(sx + rad, sy)
          ctx.arc(sx, sy, rad, 0, Math.PI * 2)
        }
        ctx.fillStyle = col(cDot, 0.14 + 0.72 * mid)
        ctx.fill()
      }

      // Project the markers once.
      const proj = marksV.map((v) => {
        rotate(v[0], v[1], v[2], tmp)
        return { x: cx + r * tmp[0], y: cy - r * tmp[1], z: tmp[2] }
      })

      // Arcs between consecutive markers, lifted off the surface, hidden behind the body.
      if (arcs && marksV.length > 1) {
        const segs = 40
        for (let i = 0; i < marksV.length - 1; i++) {
          const a = marksV[i]
          const b = marksV[i + 1]
          const dot = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))
          const ang = Math.acos(dot)
          if (ang < 1e-4) continue
          const lift = 0.04 + 0.12 * (ang / Math.PI)
          const sinA = Math.sin(ang)
          const pt = (k: number) => {
            const wa = Math.sin((1 - k) * ang) / sinA
            const wb = Math.sin(k * ang) / sinA
            const m = 1 + lift * Math.sin(Math.PI * k)
            rotate((a[0] * wa + b[0] * wb) * m, (a[1] * wa + b[1] * wb) * m, (a[2] * wa + b[2] * wb) * m, tmp)
            // Routes show on the near half only, so nothing floats past the limb.
            return { x: cx + r * tmp[0], y: cy - r * tmp[1], ok: tmp[2] > -0.04 }
          }
          const trace = (from: number, to: number, width: number, style: string) => {
            ctx.beginPath()
            let open = false
            const n = Math.max(2, Math.round(segs * (to - from)))
            for (let s = 0; s <= n; s++) {
              const p = pt(from + ((to - from) * s) / n)
              if (p.ok) {
                if (open) ctx.lineTo(p.x, p.y)
                else ctx.moveTo(p.x, p.y)
                open = true
              } else open = false
            }
            ctx.lineWidth = width
            ctx.strokeStyle = style
            ctx.stroke()
          }
          trace(0, 1, 1, col(cAccent, 0.5))
          if (!reduce) {
            // A pulse travels each route, with a short tail behind it.
            const head = (t * 0.11 + i * 0.29) % 1
            const tail = Math.max(0, head - 0.14)
            if (head > 0.01) trace(tail, head, 1.8, col(cAccent2, 0.95))
            const hp = pt(head)
            if (hp.ok) {
              ctx.beginPath()
              ctx.arc(hp.x, hp.y, 2.2, 0, Math.PI * 2)
              ctx.fillStyle = col(cAccent2, 1)
              ctx.fill()
            }
          }
        }
      }

      // Markers, back to front, with labels that stay inside the canvas.
      ctx.font = `500 11px ${font}`
      ctx.textBaseline = "middle"
      const order = proj.map((p, i) => ({ p, i })).filter(({ p }) => p.z > -0.02).sort((a, b) => a.p.z - b.p.z)
      for (const { p, i } of order) {
        const vis = Math.min(1, Math.max(0.1, p.z * 3 + 0.15))
        if (!reduce) {
          const ph = (t * 0.55 + i * 0.23) % 1
          ctx.beginPath()
          ctx.arc(p.x, p.y, 4 + 13 * ph, 0, Math.PI * 2)
          ctx.lineWidth = 1
          ctx.strokeStyle = col(cAccent, (1 - ph) * 0.55 * vis)
          ctx.stroke()
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, 6.5, 0, Math.PI * 2)
        ctx.fillStyle = col(cAccent, 0.22 * vis)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2)
        ctx.fillStyle = col(cAccent, vis)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = col(cRaised, vis)
        ctx.fill()
        const text = marks[i].label
        if (!text) continue
        const tw = ctx.measureText(text).width
        const pw = tw + 14
        const ph = 20
        let lx = p.x + 11
        if (lx + pw > w - 6) lx = p.x - 11 - pw
        const ly = p.y - ph / 2
        ctx.beginPath()
        ctx.roundRect(lx, ly, pw, ph, 6)
        ctx.fillStyle = col(cRaised, 0.94 * vis)
        ctx.fill()
        ctx.lineWidth = 1
        ctx.strokeStyle = col(cBorder, vis)
        ctx.stroke()
        ctx.fillStyle = col(cFg, vis)
        ctx.fillText(text, lx + 7, ly + ph / 2 + 0.5)
      }
    }

    const step = (dt: number) => {
      if (dragging) return
      // Inertia eases back into the idle spin; tilt settles where it was left.
      spin = auto + (spin - auto) * Math.exp(-dt * 1.6)
      tiltV *= Math.exp(-dt * 3)
      rotY += spin * dt
      rotX = Math.max(-1.2, Math.min(1.2, rotX + tiltV * dt))
    }

    const loop = (t: number) => {
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0
      last = t
      clock += dt
      if (t - colorAt > 1000) {
        colorAt = t
        readColors()
      }
      step(dt)
      draw(clock)
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
      last = 0
    }
    const sync = () => {
      if (reduce) {
        stop()
        draw(0)
        return
      }
      const run = visible && !document.hidden
      if (run && !raf) raf = requestAnimationFrame(loop)
      if (!run && raf) stop()
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      lastT = performance.now()
      velX = 0
      velY = 0
      spin = 0
      tiltV = 0
      canvas.setPointerCapture(e.pointerId)
      canvas.dataset.dragging = "true"
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      const { r } = layout()
      const now = performance.now()
      const dt = Math.max(0.004, (now - lastT) / 1000)
      const dx = (e.clientX - lastX) / r
      const dy = (e.clientY - lastY) / r
      lastX = e.clientX
      lastY = e.clientY
      lastT = now
      rotY += dx
      rotX = Math.max(-1.2, Math.min(1.2, rotX + dy))
      velX = velX * 0.4 + (dx / dt) * 0.6
      velY = velY * 0.4 + (dy / dt) * 0.6
      if (reduce) draw(0)
    }
    const onUp = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      delete canvas.dataset.dragging
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId)
      // A flick keeps turning; a held release just rests, unless reduced motion asks for stillness.
      const stale = performance.now() - lastT > 80
      spin = reduce || stale ? 0 : Math.max(-7, Math.min(7, velX))
      tiltV = reduce || stale ? 0 : Math.max(-5, Math.min(5, velY))
      if (reduce) draw(0)
    }
    const onKey = (e: KeyboardEvent) => {
      const k = e.key
      if (k !== "ArrowLeft" && k !== "ArrowRight" && k !== "ArrowUp" && k !== "ArrowDown") return
      e.preventDefault()
      if (k === "ArrowLeft") rotY -= 0.22
      if (k === "ArrowRight") rotY += 0.22
      if (k === "ArrowUp") rotX = Math.max(-1.2, rotX - 0.18)
      if (k === "ArrowDown") rotX = Math.min(1.2, rotX + 0.18)
      if (reduce || !raf) draw(clock)
    }

    readColors()
    resize()
    const ro = new ResizeObserver(() => {
      resize()
      draw(clock)
    })
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      sync()
    })
    // Theme and material can change on any ancestor (a docs stage, a section), so watch the whole tree, one read per frame.
    let pending = 0
    const mo = new MutationObserver(() => {
      if (pending) return
      pending = requestAnimationFrame(() => {
        pending = 0
        readColors()
        if (!raf) draw(clock)
      })
    })
    ro.observe(box)
    io.observe(box)
    mo.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ["class", "data-material", "data-theme"] })
    document.addEventListener("visibilitychange", sync)
    canvas.addEventListener("pointerdown", onDown)
    canvas.addEventListener("pointermove", onMove)
    canvas.addEventListener("pointerup", onUp)
    canvas.addEventListener("pointercancel", onUp)
    canvas.addEventListener("keydown", onKey)
    sync()

    return () => {
      stop()
      cancelAnimationFrame(pending)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener("visibilitychange", sync)
      canvas.removeEventListener("pointerdown", onDown)
      canvas.removeEventListener("pointermove", onMove)
      canvas.removeEventListener("pointerup", onUp)
      canvas.removeEventListener("pointercancel", onUp)
      canvas.removeEventListener("keydown", onKey)
    }
  }, [markerKey, dots, speed, arcs, align, color, accent, reduce])

  return (
    <div
      ref={boxRef}
      data-slot="globe"
      className={cn("@container relative isolate h-[360px] w-full overflow-hidden rounded-2xl border border-border bg-bg", className)}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={label}
        tabIndex={0}
        data-slot="globe-canvas"
        className="absolute inset-0 z-0 size-full cursor-grab touch-pan-y outline-none select-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset data-[dragging=true]:cursor-grabbing"
      />
      <div className="pointer-events-none relative z-10 flex h-full items-start @lg:items-center [&>*]:pointer-events-auto">
        {children ?? (
          <div
            className={cn(
              "flex flex-col items-start gap-4 p-6 text-left @lg:p-10",
              align === "center" && "@lg:mx-auto @lg:items-center @lg:text-center",
              align === "left" && "@lg:ml-auto @lg:w-1/2",
              align === "right" && "@lg:w-1/2"
            )}
          >
            <span className="rounded-full border border-accent-line bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-fg">
              Lumen worldwide
            </span>
            <p className="max-w-[16ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">
              Invoices in 140 currencies, settled locally
            </p>
            <Button>
              See coverage
              <ArrowRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export { Globe }
export type { GlobeProps, GlobeMarker }
