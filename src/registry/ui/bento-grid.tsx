import * as React from "react"
import { BarChart3Icon, BellIcon, LockIcon, SparklesIcon, UsersIcon, ZapIcon, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A responsive bento grid: tiles of different spans on a six column grid
 * that collapse to one column on phones. Each tile has an icon, title,
 * copy and an optional visual slot. Server component friendly, no motion.
 */
type BentoItem = {
  title: string
  description: string
  icon?: LucideIcon
  /** Column span on large screens, out of 6. */
  span?: 2 | 3 | 4 | 6
  /** Row span on large screens. */
  rows?: 1 | 2
  visual?: React.ReactNode
  href?: string
}

type BentoGridProps = { items?: BentoItem[]; className?: string }

const SPAN = { 2: "lg:col-span-2", 3: "lg:col-span-3", 4: "lg:col-span-4", 6: "lg:col-span-6" }

const DEMO: BentoItem[] = [
  { title: "Real time analytics", description: "Every chart updates as events arrive, with no refresh and no sampling.", icon: BarChart3Icon, span: 4, rows: 2 },
  { title: "Instant alerts", description: "Get a message the moment a metric crosses a line you set.", icon: BellIcon, span: 2 },
  { title: "Roles and access", description: "Invite the team and decide who sees what.", icon: UsersIcon, span: 2 },
  { title: "SSO and audit logs", description: "SAML, SCIM and a full audit trail on every plan.", icon: LockIcon, span: 3 },
  { title: "Automations", description: "Trigger workflows from any event without writing code.", icon: ZapIcon, span: 3 },
]

function BentoGrid({ items = DEMO, className }: BentoGridProps) {
  return (
    <div data-slot="bento-grid" className={cn("grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[minmax(180px,auto)]", className)}>
      {items.map((it, i) => {
        const Icon = it.icon ?? SparklesIcon
        const Tag = it.href ? "a" : "div"
        return (
          <Tag
            key={it.title}
            {...(it.href ? { href: it.href } : {})}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-raised outline-none",
              it.href && "transition-[border-color] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent",
              SPAN[it.span ?? 2],
              it.rows === 2 && "lg:row-span-2",
              i === 0 && "sm:col-span-2",
            )}
          >
            <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-accent-fg">
              <Icon className="size-[18px]" strokeWidth={1.75} />
            </span>
            <h3 className="mt-4 text-base font-medium tracking-[-0.02em] text-fg">{it.title}</h3>
            <p className="mt-1.5 max-w-sm text-sm leading-[1.6] text-fg-muted">{it.description}</p>
            {it.visual ?? (it.rows === 2 ? <BentoChart /> : null)}
          </Tag>
        )
      })}
    </div>
  )
}

function BentoChart() {
  const bars = [32, 48, 40, 62, 55, 74, 68, 86, 80, 96]
  return (
    <div aria-hidden className="mt-auto flex h-40 items-end gap-2 pt-6">
      {bars.map((h, i) => (
        <span key={i} className="flex-1 rounded-t-md bg-accent" style={{ height: `${h}%`, opacity: 0.25 + (i / bars.length) * 0.75 }} />
      ))}
    </div>
  )
}

export { BentoGrid }
export type { BentoGridProps, BentoItem }
