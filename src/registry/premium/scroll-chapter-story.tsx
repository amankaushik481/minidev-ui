"use client"
import * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

const CHAPTERS = [
  { kicker: "01 · Plan", title: "Turn scattered requests into one clear roadmap.", body: "Collect feedback from every channel, then rank it by the revenue behind it." },
  { kicker: "02 · Build", title: "Ship in small, confident steps.", body: "Specs, designs and pull requests live side by side, so nothing gets lost between tools." },
  { kicker: "03 · Measure", title: "Know what worked, the day it ships.", body: "Adoption, retention and revenue per feature, without writing a single query." },
]

function ScrollChapterStory({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const progress = useTransform(scrollYProgress, [0, 1], [0, 100])
  return (
    <div ref={ref} data-slot="scroll-chapter-story" data-tier="premium" className={cn("relative", className)}>
      <div className="sticky top-16 z-10 mb-4 h-1 overflow-hidden rounded-full bg-border">
        <motion.div className="h-full bg-accent" style={reduce ? { width: "100%" } : { width: progress }} />
      </div>
      <div className="space-y-[40vh]">
        {CHAPTERS.map((c, i) => (
          <motion.section
            key={c.kicker}
            initial={reduce ? false : { y: 24 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
            className="rounded-2xl border border-border bg-surface p-8 shadow-highlight sm:p-12"
          >
            <p className="text-xs font-medium uppercase tracking-[0.01em] text-accent">{c.kicker}</p>
            <h3 className="mt-3 max-w-2xl text-3xl font-medium leading-[1.15] tracking-[-0.022em] text-fg sm:text-4xl sm:tracking-[-0.026em]">
              {c.title}
            </h3>
            <p className="mt-4 max-w-xl text-base leading-[1.55] text-fg-muted">{c.body}</p>
            <p className="mt-6 font-mono text-xs tabular-nums text-fg-subtle">Chapter {i + 1} / {CHAPTERS.length}</p>
          </motion.section>
        ))}
      </div>
    </div>
  )
}
export { ScrollChapterStory }
