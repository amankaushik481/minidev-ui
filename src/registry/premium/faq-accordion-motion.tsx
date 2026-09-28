"use client"
import * as React from "react"
import { motion, useReducedMotion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

const FAQS = [
  { q: "Is the free tier really MIT?", a: "Yes. Free UI and blocks stay MIT. Premium is soft-gated commercially for kinetic launch moments." },
  { q: "Will Premium drift from free tokens?", a: "No. Same Geist, hue 285, Hairline. Premium only adds motion and composition." },
  { q: "How do I demo this to a client?", a: "Open / then /showcase. Walk the OS mock, compare tiers, scroll the chapters." },
]

function FaqAccordionMotion({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const [open, setOpen] = React.useState(0)
  return (
    <section data-slot="faq-accordion-motion" data-tier="premium" className={cn("space-y-2", className)}>
      {FAQS.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.q} className="rounded-xl border border-border bg-surface shadow-highlight">
            <button
              type="button"
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              {f.q}
              <span className="font-mono text-fg-muted">{isOpen ? "−" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={reduce ? false : { height: 0 }}
                  animate={{ height: "auto" }}
                  exit={reduce ? undefined : { height: 0 }}
                  transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-border px-4 py-3 text-sm leading-[1.55] text-fg-muted">{f.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </section>
  )
}
export { FaqAccordionMotion }
