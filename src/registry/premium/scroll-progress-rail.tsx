"use client"
import * as React from "react"
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A sticky top rail with a thin bar that fills as the page scrolls and a row of section labels underneath.
 * The bar is a scaleX transform smoothed by the release spring, so it glides
 * with the scroll; reduced motion tracks the scroll exactly. Labels are plain
 * text by default, or pass `href`s to make them in-page links.
 *
 * Use it at the top of a long launch or story page. Reach for ScrollProgress
 * for a bare bar or a percent ring, and the free TableOfContents for a full
 * side navigation that highlights the current section.
 *
 * @example
 * <ScrollProgressRail labels={[{ label: "Intro", href: "#intro" }, { label: "Pricing", href: "#pricing" }]} />
 */
type RailLabel = string | { label: string; href: string }

type ScrollProgressRailProps = {
  /** Section labels, left to right. Strings render as text; `{ label, href }` renders a link. */
  labels?: RailLabel[]
  className?: string
}

/** The release spring from the spec: quick enough to keep up with scroll, soft enough to glide. */
const RELEASE = { stiffness: 400, damping: 40, restDelta: 0.001 }

function ScrollProgressRail({
  labels = ["Intro", "Product", "Proof", "Pricing"],
  className,
}: ScrollProgressRailProps) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, RELEASE)
  // Only a rail with links is navigation; plain labels stay plain text.
  const Wrap = labels.some((l) => typeof l !== "string") ? "nav" : "div"
  const label = "text-[10px] font-medium tracking-[0.01em] text-fg-muted uppercase"
  return (
    <div
      data-slot="scroll-progress-rail"
      data-tier="premium"
      className={cn("sticky top-0 z-50 border-b border-border bg-raised", className)}
    >
      <div aria-hidden className="relative h-0.5 w-full bg-sunken">
        <motion.div
          data-slot="scroll-progress-rail-bar"
          className="absolute inset-0 origin-left bg-accent"
          style={{ scaleX: reduce ? scrollYProgress : smooth }}
        />
      </div>
      <Wrap aria-label={Wrap === "nav" ? "Sections" : undefined} className="mx-auto flex max-w-5xl justify-between gap-2 px-6 py-2">
        {labels.map((l, i) =>
          typeof l === "string" ? (
            <span key={i} className={label}>
              {l}
            </span>
          ) : (
            <a
              key={i}
              href={l.href}
              className={cn(label, "rounded-sm outline-none transition-colors duration-[70ms] hover:text-fg focus-visible:ring-2 focus-visible:ring-accent")}
            >
              {l.label}
            </a>
          )
        )}
      </Wrap>
    </div>
  )
}
export { ScrollProgressRail }
export type { ScrollProgressRailProps }
