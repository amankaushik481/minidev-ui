"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/*
 * HeroSpotlight: a launch hero. Staggered headline that settles in with a
 * blur, a lit second line that catches the cursor light, two actions, a
 * trust row, and a visual slot that rises last and tilts toward the light.
 */

type HeroSpotlightProps = {
  eyebrow?: React.ReactNode
  title?: React.ReactNode
  /** Second line of the title, lit by the cursor. */
  highlight?: React.ReactNode
  description?: React.ReactNode
  primary?: { label: string; href?: string; onClick?: () => void }
  secondary?: { label: string; href?: string; onClick?: () => void }
  /** Small proof line under the actions. */
  proof?: React.ReactNode
  /** Product visual (a DeviceFrame, a screenshot, anything). */
  visual?: React.ReactNode
  align?: "center" | "left"
  className?: string
}

const ease = [0.2, 0, 0, 1] as const

function HeroSpotlight({
  eyebrow = "Now in public beta",
  title = "Answers from your data,",
  highlight = "before you ask.",
  description = "Lumen watches revenue, churn and pipeline around the clock and tells your team what changed, why, and what to do next.",
  primary = { label: "Start free" },
  secondary = { label: "Watch the 2 min tour" },
  proof = "Free for 14 days · No card · SOC 2 Type II",
  visual,
  align = "center",
  className,
}: HeroSpotlightProps) {
  const reduce = useReducedMotion()
  const rise = (d: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 14, filter: "blur(6px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.8, delay: d, ease } }
  const center = align === "center"
  const act = (a: HeroSpotlightProps["primary"], variant: "default" | "outline") =>
    a ? (
      <Button size="lg" variant={variant} onClick={a.onClick} render={a.href ? <a href={a.href} /> : undefined}>
        {a.label}
        {variant === "default" ? <ArrowRightIcon /> : null}
      </Button>
    ) : null

  return (
    <section data-slot="hero-spotlight" className={cn("relative isolate overflow-hidden", className)}>
      <div aria-hidden className="light-spot absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid [--grid-size:64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_10%,transparent_70%)]" />
      <div className={cn("mx-auto max-w-7xl px-4 pt-20 sm:px-6 sm:pt-28 lg:px-8", center && "text-center")}>
        <div className={cn("max-w-4xl", center && "mx-auto")}>
          {eyebrow ? (
            <motion.p {...rise(0)} className={cn("inline-flex items-center gap-2 rounded-full border border-border bg-surface py-1 pr-3 pl-1.5 text-[12.5px] text-fg-muted shadow-xs")}>
              <span className="relative flex size-2 items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent/50" />
                <span className="relative size-1.5 rounded-full bg-accent" />
              </span>
              {eyebrow}
            </motion.p>
          ) : null}
          <motion.h1
            {...rise(0.08)}
            className="mt-6 text-[2.75rem] leading-[1.02] font-medium tracking-[-0.045em] text-balance text-fg sm:text-6xl lg:text-[5rem] lg:leading-[0.96] lg:tracking-[-0.055em]"
          >
            {title}
            {highlight ? (
              <>
                <br />
                <span className="text-lit">{highlight}</span>
              </>
            ) : null}
          </motion.h1>
          {description ? (
            <motion.p {...rise(0.16)} className={cn("mt-6 max-w-2xl text-[1.0625rem] leading-[1.65] text-pretty text-fg-muted sm:text-lg", center && "mx-auto")}>
              {description}
            </motion.p>
          ) : null}
          <motion.div {...rise(0.24)} className={cn("mt-9 flex flex-col gap-3 sm:flex-row", center && "justify-center")}>
            {act(primary, "default")}
            {act(secondary, "outline")}
          </motion.div>
          {proof ? (
            <motion.p {...rise(0.3)} className="mt-5 text-[12.5px] text-fg-subtle">
              {proof}
            </motion.p>
          ) : null}
        </div>
        {visual ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 60, rotateX: 18 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease }}
            style={{ transformPerspective: 1600 }}
            className="relative mt-16 sm:mt-20"
          >
            <div style={{ transform: "translate3d(calc(var(--sx) * -6px), calc(var(--sy) * -6px), 0)" }}>{visual}</div>
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}

export { HeroSpotlight }
export type { HeroSpotlightProps }
