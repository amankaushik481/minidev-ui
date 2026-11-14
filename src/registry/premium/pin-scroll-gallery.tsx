"use client"
import * as React from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A gallery that pins to the viewport and slides its frames sideways as you scroll down, then releases.
 * The section is as tall as the frames need; vertical scroll drives a
 * horizontal transform, so nothing lays out again while it moves. Reduced
 * motion shows the frames as a plain grid instead of hijacking the scroll.
 *
 * Use it for three to five big product moments on a launch page. Reach for
 * HorizontalProductRail for a rail the visitor scrolls themselves,
 * StickyFeatureStory for pinned steps beside one preview, and
 * ScrollChapterStory for stacked chapters.
 *
 * @example
 * <PinScrollGallery frames={[{ title: "Send", body: "Invoices go out on schedule." }, { title: "Match", body: "Payments pair with invoices." }]} />
 */
type PinScrollFrame = {
  title: string
  body: string
  /** Optional visual for the frame; defaults to a soft accent panel. */
  media?: React.ReactNode
}

type PinScrollGalleryProps = {
  /** Frames in order. Each takes the full width of the pinned stage. */
  frames?: PinScrollFrame[]
  /** Small label above every frame title. */
  eyebrow?: string
  className?: string
}

const SAMPLE: PinScrollFrame[] = [
  { title: "Compose", body: "Free primitives for product UI." },
  { title: "Elevate", body: "Motion that earns the first screen." },
  { title: "Ship", body: "Preview, approve and publish in one flow." },
]

function Media({ media }: { media?: React.ReactNode }) {
  return media ?? <div aria-hidden className="mt-8 aspect-[16/9] rounded-xl border border-border bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklch,var(--accent)_20%,transparent),transparent_60%)] bg-sunken" />
}

function PinScrollGallery({ frames = SAMPLE, eyebrow = "Pinned story", className }: PinScrollGalleryProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${Math.max(0, frames.length - 1) * 100}%`])

  if (reduce) {
    return (
      <div ref={ref} data-slot="pin-scroll-gallery" data-tier="premium" className={cn("grid gap-4 md:grid-cols-3", className)}>
        {frames.map((f, i) => (
          <div key={i} className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-xl font-medium text-fg">{f.title}</h3>
            <p className="mt-2 text-sm text-fg-muted">{f.body}</p>
            {f.media}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      data-slot="pin-scroll-gallery"
      data-tier="premium"
      className={cn("relative", className)}
      // One screen of scroll per frame after the first, plus room to settle.
      style={{ height: `${Math.max(1, frames.length) * 70 + 10}vh` }}
    >
      <div className="sticky top-20 overflow-hidden">
        <motion.div style={{ x }} className="flex w-full">
          {frames.map((f, i) => (
            <div key={i} className="w-full shrink-0 px-2">
              <div className="rounded-2xl border border-border bg-surface p-10 shadow-highlight">
                {eyebrow ? <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">{eyebrow}</p> : null}
                <h3 className="mt-3 text-4xl font-medium tracking-[-0.026em] text-fg">{f.title}</h3>
                <p className="mt-3 max-w-md text-base leading-[1.55] text-fg-muted">{f.body}</p>
                <Media media={f.media} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
export { PinScrollGallery }
export type { PinScrollGalleryProps, PinScrollFrame }
