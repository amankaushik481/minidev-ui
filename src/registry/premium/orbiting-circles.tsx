"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { BotIcon, CloudIcon, CreditCardIcon, DatabaseIcon, GitBranchIcon, MailIcon, MessageSquareIcon, WebhookIcon, ZapIcon, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Icons orbiting a centre on hairline rings, for "works with everything"
 * integration sections. Each ring sets its own radius, speed and direction;
 * icons stay upright as they travel. Static for reduced motion.
 */
type Ring = { radius: number; duration: number; reverse?: boolean; icons: LucideIcon[] }

type OrbitingCirclesProps = {
  rings?: Ring[]
  center?: React.ReactNode
  /** Box size in pixels. */
  size?: number
  className?: string
}

const DEFAULT: Ring[] = [
  { radius: 78, duration: 18, icons: [GitBranchIcon, MessageSquareIcon, MailIcon] },
  { radius: 150, duration: 30, reverse: true, icons: [DatabaseIcon, CreditCardIcon, BotIcon, CloudIcon, WebhookIcon] },
]

function OrbitingCircles({ rings = DEFAULT, center, size = 340, className }: OrbitingCirclesProps) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="orbiting-circles" className={cn("relative grid place-items-center", className)} style={{ width: size, height: size }}>
      {rings.map((r, ri) => (
        <React.Fragment key={ri}>
          <span aria-hidden className="absolute rounded-full border border-border" style={{ width: r.radius * 2, height: r.radius * 2 }} />
          {r.icons.map((Icon, i) => {
            const start = (360 / r.icons.length) * i
            const spin = reduce ? undefined : `orbit-${r.reverse ? "rev" : "fwd"} ${r.duration}s linear infinite`
            return (
              <span
                key={i}
                aria-hidden
                className="absolute top-1/2 left-1/2 size-0"
                style={{ transform: `rotate(${start}deg)` }}
              >
                <span className="absolute size-0" style={{ animation: spin }}>
                  <span className="absolute" style={{ transform: `translate(${r.radius}px, 0) rotate(${-start}deg)` }}>
                    <span
                      className="grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border border-border bg-raised text-fg shadow-raised"
                      style={{ animation: spin ? `orbit-${r.reverse ? "fwd" : "rev"} ${r.duration}s linear infinite` : undefined }}
                    >
                      <Icon className="size-[18px]" strokeWidth={1.75} />
                    </span>
                  </span>
                </span>
              </span>
            )
          })}
        </React.Fragment>
      ))}
      <div className="relative grid size-16 place-items-center rounded-2xl bg-ink text-on-ink shadow-ink">
        {center ?? <ZapIcon className="size-6" strokeWidth={1.75} />}
      </div>
      <style>{`@keyframes orbit-fwd{to{transform:rotate(360deg)}}@keyframes orbit-rev{to{transform:rotate(-360deg)}}`}</style>
    </div>
  )
}

export { OrbitingCircles }
export type { OrbitingCirclesProps }
