"use client"
import * as React from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react"
import { CalendarIcon, FolderIcon, HomeIcon, MailIcon, MessageCircleIcon, SettingsIcon, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A macOS style dock where icons swell as the pointer passes over them, with a label above the one under the pointer.
 *
 * Every item is a real button (with `onClick`) or link (with `href`),
 * reachable and labelled for keyboard and screen reader users; focus shows
 * the label too. Magnification is pointer only and off for reduced motion.
 * Use it for an app launcher or a playful bottom nav on marketing pages; for
 * product navigation use a sidebar or Tabs.
 *
 * @example
 * <Dock items={[{ label: "Home", icon: HomeIcon, href: "/", active: true }, { label: "Mail", icon: MailIcon, onClick: openMail }]} />
 */
type DockItem = {
  /** Accessible name and hover label. Must be unique. */
  label: string
  icon: LucideIcon
  /** Render as a link. */
  href?: string
  /** Render as a button with this handler (ignored when href is set). */
  onClick?: () => void
  /** Show the running dot and mark the item as the current page. */
  active?: boolean
}

type DockProps = {
  items?: DockItem[]
  /** Accessible name of the dock's nav landmark. */
  label?: string
  /** Resting icon size in pixels. */
  size?: number
  /** Size under the pointer. */
  magnify?: number
  /** How far the swell reaches, in pixels. */
  distance?: number
  className?: string
}

const DEFAULT: DockItem[] = [
  { label: "Home", icon: HomeIcon, active: true },
  { label: "Projects", icon: FolderIcon },
  { label: "Messages", icon: MessageCircleIcon },
  { label: "Mail", icon: MailIcon },
  { label: "Calendar", icon: CalendarIcon },
  { label: "Settings", icon: SettingsIcon },
]

const SNAPPY = { type: "spring", bounce: 0.18, duration: 0.42 } as const

function DockIcon({ item, mouseX, size, magnify, distance, reduce }: { item: DockItem; mouseX: MotionValue<number>; size: number; magnify: number; distance: number; reduce: boolean | null }) {
  const ref = React.useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const [hover, setHover] = React.useState(false)
  const d = useTransform(mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect()
    return b ? x - (b.left + b.width / 2) : Infinity
  })
  const target = useTransform(d, [-distance, 0, distance], [size, magnify, size])
  const s = useSpring(target, { mass: 0.1, stiffness: 180, damping: 14 })
  const Icon = item.icon
  const cls = "relative grid aspect-square place-items-center rounded-[28%] border border-border bg-raised text-fg shadow-raised outline-none focus-visible:ring-2 focus-visible:ring-accent"
  const inner = (
    <>
      <Icon className="size-[45%]" strokeWidth={1.75} />
      {item.active ? <span aria-hidden className="absolute -bottom-2 size-1 rounded-full bg-fg" /> : null}
      <motion.span
        aria-hidden
        initial={false}
        animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 4 }}
        transition={reduce ? { duration: 0 } : hover ? SNAPPY : { duration: 0.16, ease: [0.3, 0, 0.8, 0.15] }}
        className="pointer-events-none absolute -top-9 rounded-md border border-border bg-raised px-2 py-0.5 text-xs whitespace-nowrap text-fg shadow-overlay"
      >
        {item.label}
      </motion.span>
    </>
  )
  const common = { ref, "aria-label": item.label, "aria-current": item.active ? ("page" as const) : undefined, onPointerEnter: () => setHover(true), onPointerLeave: () => setHover(false), onFocus: () => setHover(true), onBlur: () => setHover(false), className: cls, style: { width: s, height: s } }
  return item.href ? (
    <motion.a href={item.href} {...common}>{inner}</motion.a>
  ) : (
    <motion.button type="button" onClick={item.onClick} {...common}>{inner}</motion.button>
  )
}

function Dock({ items = DEFAULT, label = "Dock", size = 44, magnify = 68, distance = 130, className }: DockProps) {
  const reduce = useReducedMotion()
  const mouseX = useMotionValue(Infinity)
  return (
    <nav aria-label={label} data-slot="dock" className={cn("flex h-[88px] items-end", className)}>
      <div
        onPointerMove={(e) => !reduce && mouseX.set(e.clientX)}
        onPointerLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-2.5 rounded-3xl border border-border bg-surface px-3 py-2.5 shadow-overlay"
      >
        {items.map((it) => (
          <DockIcon key={it.label} item={it} mouseX={mouseX} size={size} magnify={reduce ? size : magnify} distance={distance} reduce={reduce} />
        ))}
      </div>
    </nav>
  )
}

export { Dock }
export type { DockProps, DockItem }
