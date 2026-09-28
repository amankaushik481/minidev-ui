"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

const CARDS = [
  { title: "Free kit", body: "Product UI you ship tomorrow." },
  { title: "Premium moments", body: "Kinetic heroes when the page must convert." },
  { title: "Client showcase", body: "/showcase — the walkthrough tab." },
]

function StackRevealStory({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <section
      data-slot="stack-reveal-story"
      data-tier="premium"
      className={cn(
        "relative mx-auto flex max-w-md flex-col gap-3 md:block md:gap-0",
        className
      )}
    >
      {CARDS.map((c, i) => (
        <motion.article
          key={c.title}
          initial={reduce ? false : { y: 28, scale: 0.98 }}
          whileInView={{ y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ delay: i * 0.08, duration: 0.35, ease: [0.2, 0, 0, 1] }}
          style={{ zIndex: i + 1 }}
          className={cn(
            "relative rounded-2xl border border-border bg-surface p-5 shadow-highlight sm:p-6",
            // Overlap ONLY from md up — was -mt-10 on all viewports (mobile bug)
            i > 0 && "md:-mt-10"
          )}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.01em] text-accent">0{i + 1}</p>
          <h3 className="mt-2 text-lg font-medium tracking-[-0.014em] text-fg">{c.title}</h3>
          <p className="mt-1 text-sm leading-[1.55] text-fg-muted">{c.body}</p>
        </motion.article>
      ))}
    </section>
  )
}
export { StackRevealStory }
