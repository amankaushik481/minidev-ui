"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import {
  BellIcon,
  BoxIcon,
  BracesIcon,
  BugIcon,
  CalendarIcon,
  ChartBarIcon,
  ChartPieIcon,
  CloudIcon,
  CodeIcon,
  CpuIcon,
  CreditCardIcon,
  DatabaseIcon,
  GitBranchIcon,
  GlobeIcon,
  KeyIcon,
  LayersIcon,
  LockIcon,
  MailIcon,
  MessageSquareIcon,
  PackageIcon,
  ReceiptIcon,
  RocketIcon,
  ServerIcon,
  SettingsIcon,
  ShieldIcon,
  SparklesIcon,
  TerminalIcon,
  UsersIcon,
  WalletIcon,
  ZapIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A sphere of icons that turns slowly in 3D, scales and fades with depth, and can be dragged to spin with inertia.
 * Items sit on a Fibonacci sphere so they spread evenly, and each is a real
 * element (lucide icons by default, or your children), so they stay crisp and
 * take token colours. The sphere turns on its own, keeps spinning after a
 * flick, pauses off screen and holds still for reduced motion. Arrow keys
 * turn it when it has focus.
 */
type IconCloudProps = {
  /** Items to place on the sphere. Defaults to 30 lucide icons. */
  children?: React.ReactNode
  /** Diameter in pixels. Shrinks to fit a narrower container. */
  size?: number
  /** Idle spin speed. 1 is one turn every 25 seconds, 0 holds still until dragged. */
  speed?: number
  /** Size of each tile in pixels. */
  itemSize?: number
  /** Allow pointer drag and arrow keys to turn the sphere. */
  interactive?: boolean
  className?: string
}

const DEFAULT_ICONS = [
  CodeIcon, GitBranchIcon, DatabaseIcon, CloudIcon, ServerIcon, CpuIcon,
  GlobeIcon, TerminalIcon, BracesIcon, BugIcon, BoxIcon, PackageIcon,
  LayersIcon, ZapIcon, RocketIcon, ShieldIcon, LockIcon, KeyIcon,
  MailIcon, BellIcon, CalendarIcon, ChartBarIcon, ChartPieIcon, CreditCardIcon,
  ReceiptIcon, WalletIcon, UsersIcon, MessageSquareIcon, SettingsIcon, SparklesIcon,
]

type Pt = { x: number; y: number; z: number }

/** Evenly spread points on a unit sphere. Deterministic, so the server and client agree. */
function fibonacciSphere(n: number): Pt[] {
  const golden = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: n }, (_, i) => {
    const y = n === 1 ? 0 : 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const t = golden * i
    return { x: Math.cos(t) * r, y, z: Math.sin(t) * r }
  })
}

/** Rotate a point around Y then X and project it with a little perspective. */
function project(p: Pt, rx: number, ry: number, radius: number) {
  const cy = Math.cos(ry)
  const sy = Math.sin(ry)
  const cx = Math.cos(rx)
  const sx = Math.sin(rx)
  const x1 = p.x * cy + p.z * sy
  const z1 = -p.x * sy + p.z * cy
  const y2 = p.y * cx - z1 * sx
  const z2 = p.y * sx + z1 * cx
  const depth = (z2 + 1) / 2
  const persp = 1 / (1.12 - 0.12 * z2)
  return {
    x: x1 * radius * persp,
    y: y2 * radius * persp,
    scale: 0.64 + 0.36 * depth,
    opacity: 0.4 + 0.6 * depth,
    z: Math.round(depth * 1000),
  }
}

const TILT = 0.38

function IconCloud({ children, size = 360, speed = 1, itemSize = 48, interactive = true, className }: IconCloudProps) {
  const reduce = useReducedMotion()
  const boxRef = React.useRef<HTMLDivElement>(null)
  const itemRefs = React.useRef<(HTMLSpanElement | null)[]>([])
  const hintId = React.useId()

  const items = React.useMemo(
    () =>
      children !== undefined
        ? React.Children.toArray(children)
        : DEFAULT_ICONS.map((Icon, i) => <Icon key={i} className="size-[22px]" aria-hidden />),
    [children]
  )
  const n = items.length
  const points = React.useMemo(() => fibonacciSphere(n), [n])
  const initialRadius = Math.max(0, size / 2 - itemSize / 2 - 4)

  React.useEffect(() => {
    const box = boxRef.current
    if (!box || !n) return
    const rot = { x: TILT, y: 0 }
    const vel = { x: 0, y: 0 }
    let radius = initialRadius
    let raf = 0
    let last = 0
    let visible = true
    let dragging = false
    let lastX = 0
    let lastY = 0
    let lastT = 0
    const idle = speed * 0.25
    const gain = 0.0075

    const measure = () => {
      radius = Math.max(0, box.clientWidth / 2 - itemSize / 2 - 4)
    }
    const draw = () => {
      for (let i = 0; i < n; i++) {
        const el = itemRefs.current[i]
        if (!el) continue
        const q = project(points[i], rot.x, rot.y, radius)
        el.style.transform = `translate(-50%, -50%) translate3d(${q.x.toFixed(1)}px, ${q.y.toFixed(1)}px, 0) scale(${q.scale.toFixed(3)})`
        el.style.opacity = q.opacity.toFixed(3)
        el.style.zIndex = String(q.z)
      }
    }
    const step = (t: number) => {
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0
      last = t
      if (!dragging && dt) {
        const friction = Math.pow(0.08, dt)
        vel.x *= friction
        vel.y *= friction
        rot.y += (idle + vel.y) * dt
        rot.x += vel.x * dt
      }
      draw()
      raf = requestAnimationFrame(step)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
      last = 0
    }
    const sync = () => {
      const run = !reduce && visible && !document.hidden
      if (run && !raf) raf = requestAnimationFrame(step)
      if (!run && raf) stop()
    }

    const onDown = (e: PointerEvent) => {
      if (!interactive || e.button !== 0) return
      dragging = true
      vel.x = 0
      vel.y = 0
      lastX = e.clientX
      lastY = e.clientY
      lastT = e.timeStamp
      box.setPointerCapture(e.pointerId)
      box.dataset.dragging = "true"
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      const dt = Math.max(1, e.timeStamp - lastT) / 1000
      lastX = e.clientX
      lastY = e.clientY
      lastT = e.timeStamp
      rot.y += dx * gain
      rot.x -= dy * gain
      // Smooth the flick velocity so one jittery event cannot launch the sphere.
      vel.y = vel.y * 0.5 + Math.max(-10, Math.min(10, (dx * gain) / dt)) * 0.5
      vel.x = vel.x * 0.5 + Math.max(-10, Math.min(10, (-dy * gain) / dt)) * 0.5
      if (reduce || !raf) draw()
    }
    const onUp = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      delete box.dataset.dragging
      if (box.hasPointerCapture(e.pointerId)) box.releasePointerCapture(e.pointerId)
      // A still pointer at release means no flick.
      if (e.timeStamp - lastT > 80) {
        vel.x = 0
        vel.y = 0
      }
      if (reduce) {
        vel.x = 0
        vel.y = 0
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (!interactive) return
      const k = e.key
      if (k !== "ArrowLeft" && k !== "ArrowRight" && k !== "ArrowUp" && k !== "ArrowDown") return
      e.preventDefault()
      if (reduce) {
        if (k === "ArrowLeft") rot.y -= 0.3
        if (k === "ArrowRight") rot.y += 0.3
        if (k === "ArrowUp") rot.x += 0.3
        if (k === "ArrowDown") rot.x -= 0.3
        draw()
        return
      }
      if (k === "ArrowLeft") vel.y -= 2.4
      if (k === "ArrowRight") vel.y += 2.4
      if (k === "ArrowUp") vel.x += 2.4
      if (k === "ArrowDown") vel.x -= 2.4
    }

    measure()
    draw()
    const ro = new ResizeObserver(() => {
      measure()
      if (reduce || !raf) draw()
    })
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    })
    ro.observe(box)
    io.observe(box)
    box.addEventListener("pointerdown", onDown)
    box.addEventListener("pointermove", onMove)
    box.addEventListener("pointerup", onUp)
    box.addEventListener("pointercancel", onUp)
    box.addEventListener("keydown", onKey)
    document.addEventListener("visibilitychange", sync)
    sync()

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      box.removeEventListener("pointerdown", onDown)
      box.removeEventListener("pointermove", onMove)
      box.removeEventListener("pointerup", onUp)
      box.removeEventListener("pointercancel", onUp)
      box.removeEventListener("keydown", onKey)
      document.removeEventListener("visibilitychange", sync)
    }
  }, [n, points, speed, itemSize, interactive, reduce, initialRadius])

  return (
    <div
      ref={boxRef}
      data-slot="icon-cloud"
      data-tier="premium"
      role="group"
      aria-label={`Rotating cloud of ${n} icons`}
      aria-describedby={interactive ? hintId : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={cn(
        "relative mx-auto aspect-square w-full touch-pan-y rounded-full outline-none select-none",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg",
        interactive && "cursor-grab data-[dragging=true]:cursor-grabbing",
        className
      )}
      style={{ maxWidth: size }}
    >
      {items.map((item, i) => {
        const q = project(points[i], TILT, 0, initialRadius)
        return (
          <span
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el
            }}
            aria-hidden
            data-slot="icon-cloud-item"
            className="absolute top-1/2 left-1/2 grid place-items-center rounded-xl border border-border bg-raised text-fg shadow-raised will-change-transform"
            style={{
              width: itemSize,
              height: itemSize,
              transform: `translate(-50%, -50%) translate3d(${q.x.toFixed(1)}px, ${q.y.toFixed(1)}px, 0) scale(${q.scale.toFixed(3)})`,
              opacity: q.opacity.toFixed(3),
              zIndex: q.z,
            }}
          >
            {item}
          </span>
        )
      })}
      {interactive ? (
        <span id={hintId} className="sr-only">
          Drag to turn the sphere, or use the arrow keys while it has focus.
        </span>
      ) : null}
    </div>
  )
}

export { IconCloud }
export type { IconCloudProps }
