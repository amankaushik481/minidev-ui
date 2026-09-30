"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { BotIcon, DatabaseIcon, FileTextIcon, MailIcon, MessageSquareIcon, UserIcon, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Light that travels along curved paths between elements: sources on the
 * left flow into a hub, the hub flows out to a result. Paths are measured
 * from the real DOM, so the diagram reflows with its container. Use the
 * `Beam` primitive to connect any two refs in your own layout.
 */

type BeamProps = {
  container: React.RefObject<HTMLElement | null>
  from: React.RefObject<HTMLElement | null>
  to: React.RefObject<HTMLElement | null>
  /** Vertical bend of the curve, in pixels. */
  curvature?: number
  duration?: number
  delay?: number
  reverse?: boolean
}

function Beam({ container, from, to, curvature = 0, duration = 3, delay = 0, reverse = false }: BeamProps) {
  const reduce = useReducedMotion()
  const id = React.useId().replace(/:/g, "")
  const [d, setD] = React.useState("")
  const [box, setBox] = React.useState({ w: 0, h: 0 })
  // useEffect, not useLayoutEffect: the container ref is attached after child layout effects run.
  React.useEffect(() => {
    const measure = () => {
      const c = container.current?.getBoundingClientRect()
      const a = from.current?.getBoundingClientRect()
      const b = to.current?.getBoundingClientRect()
      if (!c || !a || !b) return
      const x1 = a.left - c.left + a.width / 2
      const y1 = a.top - c.top + a.height / 2
      const x2 = b.left - c.left + b.width / 2
      const y2 = b.top - c.top + b.height / 2
      const mx = (x1 + x2) / 2
      setBox({ w: c.width, h: c.height })
      setD(`M ${x1},${y1} C ${mx},${y1 - curvature} ${mx},${y2 - curvature} ${x2},${y2}`)
    }
    measure()
    const raf = requestAnimationFrame(measure)
    const ro = new ResizeObserver(measure)
    if (container.current) ro.observe(container.current)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [container, from, to, curvature])
  if (!d) return null
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 overflow-visible" width={box.w} height={box.h} viewBox={`0 0 ${box.w} ${box.h}`}>
      <defs>
        <linearGradient id={`beam-${id}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={box.w} y2="0">
          <stop offset="0" stopColor="var(--accent-2)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="var(--border-strong)" strokeWidth={1.5} strokeLinecap="round" />
      {!reduce ? (
        <path
          d={d}
          fill="none"
          stroke={`url(#beam-${id})`}
          strokeWidth={2.25}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="14 300"
          style={{ animation: `beam-travel ${duration}s cubic-bezier(0.45,0,0.2,1) ${delay}s infinite ${reverse ? "reverse" : "normal"}` }}
        />
      ) : null}
      <style>{`@keyframes beam-travel{from{stroke-dashoffset:14}to{stroke-dashoffset:-100}}`}</style>
    </svg>
  )
}

type Node = { icon: LucideIcon; label: string }

type AnimatedBeamProps = {
  inputs?: Node[]
  hub?: Node
  output?: Node
  className?: string
}

function NodeView({ n, r, big }: { n: Node; r: React.RefObject<HTMLDivElement | null>; big?: boolean }) {
  const Icon = n.icon
  return (
    <div className="relative z-10 flex flex-col items-center gap-1.5">
      <div ref={r} className={cn("grid place-items-center rounded-2xl border border-border", big ? "size-16 bg-ink text-on-ink shadow-ink" : "size-11 bg-raised text-fg shadow-raised")}>
        <Icon className={big ? "size-7" : "size-5"} strokeWidth={1.75} />
      </div>
      <span className="text-[11px] text-fg-muted">{n.label}</span>
    </div>
  )
}

function AnimatedBeam({
  inputs = [
    { icon: MailIcon, label: "Email" },
    { icon: MessageSquareIcon, label: "Chat" },
    { icon: FileTextIcon, label: "Docs" },
    { icon: DatabaseIcon, label: "CRM" },
  ],
  hub = { icon: BotIcon, label: "Agent" },
  output = { icon: UserIcon, label: "Customer" },
  className,
}: AnimatedBeamProps) {
  const box = React.useRef<HTMLDivElement>(null)
  const hubRef = React.useRef<HTMLDivElement>(null)
  const outRef = React.useRef<HTMLDivElement>(null)
  const refs = React.useRef<React.RefObject<HTMLDivElement | null>[]>([])
  refs.current = inputs.map((_, i) => refs.current[i] ?? React.createRef<HTMLDivElement>())
  return (
    <div data-slot="animated-beam" ref={box} className={cn("relative flex w-full max-w-xl items-center justify-between px-2 py-4", className)}>
      <div className="flex flex-col gap-5">
        {inputs.map((n, i) => (
          <NodeView key={n.label} n={n} r={refs.current[i]} />
        ))}
      </div>
      <NodeView n={hub} r={hubRef} big />
      <NodeView n={output} r={outRef} />
      {inputs.map((n, i) => (
        <Beam key={n.label} container={box} from={refs.current[i]} to={hubRef} curvature={(i - (inputs.length - 1) / 2) * -18} delay={i * 0.35} />
      ))}
      <Beam container={box} from={hubRef} to={outRef} duration={2.4} delay={0.8} />
      <span className="sr-only">{`${inputs.map((n) => n.label).join(", ")} flow into ${hub.label}, which responds to ${output.label}.`}</span>
    </div>
  )
}

export { AnimatedBeam, Beam }
export type { AnimatedBeamProps, BeamProps }
