"use client"
import * as React from "react"
import { motion, useReducedMotion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A single-open FAQ accordion whose answers spring open and close faster, with a plus that turns into a minus.
 *
 * Follows the WAI-ARIA accordion pattern: each question is a button inside a
 * heading, with `aria-expanded` and `aria-controls` pointing at a labelled
 * region. One answer is open at a time; clicking the open one closes it.
 * Reduced motion opens and closes instantly. Use it for a marketing FAQ; for
 * multi-open disclosure in product UI use Accordion.
 *
 * @example
 * <FaqAccordionMotion items={[{ q: "Is there a free plan?", a: "Yes, up to three projects." }]} defaultOpen={-1} />
 */
type FaqItem = {
  /** The question. Must be unique. */
  q: string
  /** The answer. */
  a: React.ReactNode
}

type FaqAccordionMotionProps = {
  items?: FaqItem[]
  /** Index open on first render; -1 starts all closed. */
  defaultOpen?: number
  className?: string
}

const FAQS: FaqItem[] = [
  { q: "Is there a free plan?", a: "Yes. The free plan covers up to three projects and has no time limit." },
  { q: "Can I import my existing data?", a: "Yes. Import from CSV, Linear, Jira or GitHub in a couple of clicks." },
  { q: "Can I cancel any time?", a: "Yes. Plans are monthly or yearly, and you keep access until the end of the period you paid for." },
]

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const
const EXIT = { duration: 0.16, ease: [0.3, 0, 0.8, 0.15] } as const

function FaqAccordionMotion({ items = FAQS, defaultOpen = 0, className }: FaqAccordionMotionProps) {
  const reduce = useReducedMotion()
  const id = React.useId()
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <div data-slot="faq-accordion-motion" data-tier="premium" className={cn("space-y-2", className)}>
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.q} className="rounded-xl border border-border bg-surface shadow-highlight">
            <h3>
              <button
                type="button"
                id={`${id}-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a-${i}`}
                className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {f.q}
                <span aria-hidden className="font-mono text-fg-muted">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`${id}-a-${i}`}
                  role="region"
                  aria-labelledby={`${id}-q-${i}`}
                  initial={{ height: 0 }}
                  animate={{ height: "auto", transition: reduce ? { duration: 0 } : MORPH }}
                  exit={{ height: 0, transition: reduce ? { duration: 0 } : EXIT }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border px-4 py-3 text-sm leading-[1.55] text-fg-muted">{f.a}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
export { FaqAccordionMotion }
export type { FaqAccordionMotionProps, FaqItem }
