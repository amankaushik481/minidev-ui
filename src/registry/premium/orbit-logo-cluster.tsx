"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A ring of logo or name pills slowly orbiting a centre badge, each pill staying upright as it travels.
 * The orbit is a pair of CSS transform loops (the ring turns, each pill turns
 * back), so it runs on the compositor and costs nothing on the main thread.
 * It pauses while the pointer is over it and holds still for reduced motion.
 * Screen readers get the names as a plain list.
 *
 * Use it for "connects with" or partner sections with text names. Reach for
 * OrbitingCircles for icons on several rings, and LogoWallMotion for a
 * scrolling strip. Pass real partners: never invent logos.
 *
 * @example
 * <OrbitLogoCluster center="Lumen" logos={["Stripe", "Plaid", "Xero", "QuickBooks"]} duration={48} />
 */
type OrbitLogoClusterProps = {
  /** Content of the centre badge: your mark or a short name. */
  center?: React.ReactNode
  /** Names or logo elements on the ring. Elements need their own accessible name. */
  logos?: React.ReactNode[]
  /** Seconds for one full orbit. */
  duration?: number
  /** Accessible name for the list of logos. */
  label?: string
  className?: string
}

function OrbitLogoCluster({
  center = "MD",
  logos = ["Acme", "Nova", "Orbit", "Pulse", "Stack", "Voxel"],
  duration = 40,
  label = "Integrations",
  className,
}: OrbitLogoClusterProps) {
  const spin = "[animation:orbit-logo-cluster-spin_var(--orbit-d)_linear_infinite] group-hover/orbit:[animation-play-state:paused] motion-reduce:[animation:none]"
  return (
    <div
      data-slot="orbit-logo-cluster"
      data-tier="premium"
      className={cn("group/orbit relative mx-auto aspect-square w-full max-w-md", className)}
      style={{ "--orbit-d": `${duration}s` } as React.CSSProperties}
    >
      <div className="absolute inset-[18%] rounded-full border border-border" aria-hidden />
      <div className="absolute inset-[32%] rounded-full border border-border" aria-hidden />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex size-16 items-center justify-center rounded-2xl border border-accent-line bg-accent-soft text-sm font-medium text-fg shadow-highlight">
          {center}
        </div>
      </div>
      <ul aria-label={label} className={cn("absolute inset-0", spin)}>
        {logos.map((logo, i) => {
          const a = (i / logos.length) * Math.PI * 2
          const r = 42
          return (
            <li
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-fg"
              style={{ left: `${50 + Math.cos(a) * r}%`, top: `${50 + Math.sin(a) * r}%` }}
            >
              <span className={cn("block", spin)} style={{ animationDirection: "reverse" }}>
                {logo}
              </span>
            </li>
          )
        })}
      </ul>
      <style>{`@keyframes orbit-logo-cluster-spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
export { OrbitLogoCluster }
export type { OrbitLogoClusterProps }
