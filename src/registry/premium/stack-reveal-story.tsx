"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Numbered cards that rise on a spring and overlap into a stack on wider screens, telling a short three-step story.
 * From md up each card tucks under the one before it; on phones they sit as
 * a plain list so nothing overlaps text. Each card plays once; reduced motion
 * shows the stack in place.
 *
 * Use it for a compact "how it works" in three beats. Reach for SoftStack
 * for a purely visual pile, ScrollChapterStory for full-width chapters, and
 * StickyFeatureStory for pinned steps beside a preview.
 *
 * @example
 * <StackRevealStory cards={[{ title: "Connect", body: "Link your bank once." }, { title: "Send", body: "Invoices go out on time." }]} />
 */
type StackCard = {
  title: string
  body: string
}

type StackRevealStoryProps = {
  /** Cards in order; each is numbered 01, 02, 03… */
  cards?: StackCard[]
  className?: string
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

const CARDS: StackCard[] = [
  { title: "Free kit", body: "Product UI you ship tomorrow." },
  { title: "Launch moments", body: "Motion where it earns attention, calm everywhere else." },
  { title: "Client showcase", body: "/showcase — the walkthrough tab." },
]

function StackRevealStory({ cards = CARDS, className }: StackRevealStoryProps) {
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
      {cards.map((c, i) => (
        <motion.article
          key={i}
          initial={reduce ? false : { y: 28, scale: 0.98 }}
          whileInView={{ y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={reduce ? { duration: 0 } : { ...MORPH, delay: i * 0.08 }}
          style={{ zIndex: i + 1 }}
          className={cn(
            "relative rounded-2xl border border-border bg-surface p-5 shadow-highlight sm:p-6",
            // Overlap only from md up: on phones the cards would cover each other's text.
            i > 0 && "md:-mt-10"
          )}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.01em] text-accent-fg tabular-nums">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-2 text-lg font-medium tracking-[-0.014em] text-fg">{c.title}</h3>
          <p className="mt-1 text-sm leading-[1.55] text-fg-muted">{c.body}</p>
        </motion.article>
      ))}
    </section>
  )
}
export { StackRevealStory }
export type { StackRevealStoryProps }
