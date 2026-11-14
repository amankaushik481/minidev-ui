"use client"
import * as React from "react"
import { motion, useMotionValueEvent, useScroll, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A pinned two-column story: as you scroll, each step on the left lights up in turn while a mock preview on the right follows along.
 * The section is as tall as its steps need and works for any number of
 * them. The active step nudges into place on the snappy spring and is
 * marked `aria-current="step"`. Reduced motion drops the pinning and shows
 * every step as a plain list.
 *
 * Use it to explain three to five features in order on a launch page. Reach
 * for ScrollChapterStory for full-width chapters, PinScrollGallery for big
 * sideways frames, and ProductTour when the visitor should click through.
 *
 * @example
 * <StickyFeatureStory steps={[{ label: "01", title: "Connect", body: "Link your bank once." }, { label: "02", title: "Reconcile", body: "Payments match themselves." }]} />
 */
type Step = {
  /** Short marker above the title, e.g. "01". */
  label: string
  title: string
  body: string
}

type StickyFeatureStoryProps = {
  /** Steps in order. */
  steps?: Step[]
  className?: string
}

const SNAPPY = { type: "spring", bounce: 0.18, duration: 0.42 } as const

function StickyFeatureStory({
  steps = [
    { label: "01", title: "Compose free", body: "Ship product UI from the MIT kit — tables, AI, billing, shells." },
    { label: "02", title: "Invite the team", body: "Bring everyone in with one link. Roles and permissions are already set." },
    { label: "03", title: "Ship it", body: "Publish when you are ready. Roll back in one click if you are not." },
  ],
  className,
}: StickyFeatureStoryProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const [idx, setIdx] = React.useState(0)
  // Split the scroll into one equal slice per step, whatever the count.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduce) setIdx(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))))
  })

  return (
    <div
      ref={ref}
      data-slot="sticky-feature-story"
      data-tier="premium"
      className={cn("relative", className)}
      style={{ height: reduce ? undefined : `${steps.length * 90}vh` }}
    >
      <div className={cn("grid gap-8 lg:grid-cols-2", reduce ? "" : "sticky top-16 h-[70vh] items-center")}>
        <div className="space-y-6">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              aria-current={!reduce && i === idx ? "step" : undefined}
              animate={reduce ? undefined : { x: i === idx ? 0 : -4 }}
              transition={SNAPPY}
              className={cn(
                "border-l pl-4 transition-colors duration-[70ms]",
                i === idx ? "border-accent" : "border-border"
              )}
            >
              <p className={cn("text-xs font-medium tracking-[0.01em] uppercase", i === idx ? "text-fg" : "text-fg-muted")}>{s.label}</p>
              <h3 className={cn("mt-1 text-2xl font-medium tracking-[-0.018em]", i === idx ? "text-fg" : "text-fg-muted")}>{s.title}</h3>
              <p className="mt-2 text-sm leading-[1.55] text-fg-muted">{s.body}</p>
            </motion.div>
          ))}
        </div>
        <div aria-hidden className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-sunken">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklch,var(--accent)_18%,transparent),transparent_55%)]" aria-hidden />
          <div className="absolute inset-4 rounded-xl border border-border bg-surface shadow-highlight">
            <div className="flex h-9 items-center gap-1.5 border-b border-border px-3">
              <span className="size-2 rounded-full bg-border-strong" />
              <span className="size-2 rounded-full bg-border-strong" />
              <span className="size-2 rounded-full bg-border-strong" />
            </div>
            <div className="space-y-3 p-4">
              <motion.div
                key={idx}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduce ? { duration: 0 } : SNAPPY}
                className="h-3 w-2/3 rounded bg-border-strong"
              />
              <div className="h-3 w-1/2 rounded bg-border" />
              <div className="mt-6 grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "aspect-square rounded-lg border border-border bg-sunken",
                      i === idx % 3 && "border-accent-line bg-accent-soft"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="absolute right-4 bottom-4 text-xs font-medium tabular-nums text-fg-muted">
            {String(idx + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  )
}
export { StickyFeatureStory }
export type { StickyFeatureStoryProps }
