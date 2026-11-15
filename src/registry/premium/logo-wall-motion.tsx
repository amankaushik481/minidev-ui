"use client"
import * as React from "react"
import { PauseIcon, PlayIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * An endless, slowly scrolling strip of customer logos or names with soft faded edges, for social proof under a hero.
 * The strip runs on the compositor (a CSS transform loop), pauses on hover and
 * with the "Pause motion" button (WCAG 2.2.2), and holds still for reduced motion. Screen readers get
 * the list once; the looping copy is hidden from them.
 *
 * Use it for a "trusted by" row. Reach for LogoCloud for a static grid,
 * HeroMarqueeBrands for a hero with a built-in brand strip, and MarqueeQuotes
 * for scrolling testimonials. Pass your real customers: never invent logos.
 *
 * @example
 * <LogoWallMotion title="Trusted by finance teams" logos={["Northwind", "Contoso", <img key="a" src="/acme.svg" alt="Acme" className="h-6" />]} />
 */
type LogoWallMotionProps = {
  /** Names or logo elements, in order. Elements need their own accessible name (an img alt). */
  logos?: React.ReactNode[]
  /** Label above the strip. Pass an empty string to hide it. */
  title?: string
  /** Seconds for one full loop. Higher is calmer. */
  duration?: number
  /** Scroll left to right instead. */
  reverse?: boolean
  className?: string
}

function LogoWallMotion({
  logos = ["Acme", "Globex", "Initech", "Umbrella", "Stark", "Wayne"],
  title = "Trusted by product teams",
  duration = 28,
  reverse = false,
  className,
}: LogoWallMotionProps) {
  const [paused, setPaused] = React.useState(false)
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-3 pr-3">
      {logos.map((logo, i) => (
        <li
          key={i}
          className="inline-flex h-11 min-w-28 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-medium text-fg shadow-highlight"
        >
          {logo}
        </li>
      ))}
    </ul>
  )
  return (
    <div data-slot="logo-wall-motion" data-tier="premium" className={cn("w-full max-w-full space-y-3 overflow-hidden", className)}>
      {title ? <p className="text-center text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">{title}</p> : null}
      <div className="relative w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-border bg-sunken py-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-[linear-gradient(90deg,var(--color-sunken),transparent)]" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-[linear-gradient(270deg,var(--color-sunken),transparent)]" aria-hidden />
        <div
          data-slot="logo-wall-motion-track"
          className="flex w-max [animation:marquee_var(--marquee-d)_linear_infinite] hover:[animation-play-state:paused] motion-reduce:[animation:none]"
          style={{ "--marquee-d": `${duration}s`, animationDirection: reverse ? "reverse" : undefined, animationPlayState: paused ? "paused" : undefined } as React.CSSProperties}
        >
          {row()}
          {row(true)}
        </div>
      </div>
      <div className="flex justify-center motion-reduce:hidden">
        <Button variant="ghost" size="sm" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
          {paused ? <PlayIcon aria-hidden /> : <PauseIcon aria-hidden />}
          {paused ? "Play motion" : "Pause motion"}
        </Button>
      </div>
    </div>
  )
}
export { LogoWallMotion }
export type { LogoWallMotionProps }
