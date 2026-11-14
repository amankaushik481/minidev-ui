"use client"
import * as React from "react"
import { motion, useReducedMotion, useScroll } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A long-form story told in numbered chapters that rise in as you reach them, under a sticky progress bar that fills with your reading.
 * The progress bar is a scaleX transform tied straight to scroll, so it never
 * lays out again. Each chapter rises once on the morph spring. Reduced motion
 * shows chapters in place and the bar still tracks progress, without motion.
 *
 * Use it for a narrative "how it works" or manifesto section. Reach for
 * StickyFeatureStory for steps beside one pinned preview, TracingBeam for a
 * changelog-style timeline, and ScrollProgress for a page-wide reading bar.
 *
 * @example
 * <ScrollChapterStory chapters={[{ kicker: "01 · Send", title: "Invoices go out on time.", body: "Schedules and reminders are automatic." }]} />
 */
type Chapter = {
  /** Short label above the title, e.g. "01 · Plan". */
  kicker: string
  title: string
  body: string
}

type ScrollChapterStoryProps = {
  /** Chapters in order. */
  chapters?: Chapter[]
  className?: string
}

const CHAPTERS: Chapter[] = [
  { kicker: "01 · Plan", title: "Turn scattered requests into one clear roadmap.", body: "Collect feedback from every channel, then rank it by the revenue behind it." },
  { kicker: "02 · Build", title: "Ship in small, confident steps.", body: "Specs, designs and pull requests live side by side, so nothing gets lost between tools." },
  { kicker: "03 · Measure", title: "Know what worked, the day it ships.", body: "Adoption, retention and revenue per feature, without writing a single query." },
]

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function ScrollChapterStory({ chapters = CHAPTERS, className }: ScrollChapterStoryProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  return (
    <div ref={ref} data-slot="scroll-chapter-story" data-tier="premium" className={cn("relative", className)}>
      <div aria-hidden className="sticky top-16 z-10 mb-4 h-1 overflow-hidden rounded-full bg-border">
        <motion.div data-slot="scroll-chapter-story-progress" className="h-full origin-left bg-accent" style={{ scaleX: scrollYProgress }} />
      </div>
      <div className="space-y-[40vh]">
        {chapters.map((c, i) => (
          <motion.section
            key={i}
            initial={reduce ? false : { y: 24 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={reduce ? { duration: 0 } : MORPH}
            className="rounded-2xl border border-border bg-surface p-8 shadow-highlight sm:p-12"
          >
            <p className="text-xs font-medium uppercase tracking-[0.01em] text-accent-fg">{c.kicker}</p>
            <h3 className="mt-3 max-w-2xl text-3xl font-medium leading-[1.15] tracking-[-0.022em] text-fg sm:text-4xl sm:tracking-[-0.026em]">
              {c.title}
            </h3>
            <p className="mt-4 max-w-xl text-base leading-[1.55] text-fg-muted">{c.body}</p>
            <p className="mt-6 font-mono text-xs tabular-nums text-fg-subtle">
              Chapter {i + 1} / {chapters.length}
            </p>
          </motion.section>
        ))}
      </div>
    </div>
  )
}
export { ScrollChapterStory }
export type { ScrollChapterStoryProps, Chapter as ScrollChapter }
