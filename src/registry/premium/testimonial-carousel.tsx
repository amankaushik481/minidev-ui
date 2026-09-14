"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

type Item = { quote: string; name: string; role: string }

function TestimonialCarousel({
  items = [
    { quote: "Premium finally feels like a different tier.", name: "Sam Rivera", role: "Founder" },
    { quote: "Hairline craft shows up in every screenshot.", name: "Lee Park", role: "Design Eng" },
    { quote: "Free for product, Premium for launch. Perfect split.", name: "Ava Chen", role: "PM" },
  ],
  className,
}: {
  items?: Item[]
  className?: string
}) {
  const reduce = useReducedMotion()
  const [i, setI] = React.useState(0)
  const item = items[i]
  React.useEffect(() => {
    if (reduce || items.length < 2) return
    const id = window.setInterval(() => setI((x) => (x + 1) % items.length), 4500)
    return () => window.clearInterval(id)
  }, [items.length, reduce])
  return (
    <div data-slot="testimonial-carousel" data-tier="premium" className={cn("rounded-2xl border border-border bg-surface p-8 shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]", className)}>
      <AnimatePresence mode="wait">
        <motion.figure
          key={item.name + i}
          initial={reduce ? false : { y: 12 }}
          animate={{ y: 0 }}
          exit={reduce ? undefined : { y: -12 }}
          transition={{ duration: 0.35 }}
        >
          <blockquote className="text-xl font-medium tracking-[-0.014em] text-fg sm:text-2xl">“{item.quote}”</blockquote>
          <figcaption className="mt-4 text-sm text-fg-muted">
            <span className="font-medium text-fg">{item.name}</span> · {item.role}
          </figcaption>
        </motion.figure>
      </AnimatePresence>
      <div className="mt-6 flex items-center gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Show testimonial ${idx + 1}`}
            aria-current={idx === i}
            onClick={() => setI(idx)}
            className={cn("h-1.5 w-6 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent", idx === i ? "bg-accent" : "bg-border")}
          />
        ))}
        <div className="ml-auto flex gap-2">
          <Button type="button" size="sm" variant="outline" onClick={() => setI((x) => (x - 1 + items.length) % items.length)}>Prev</Button>
          <Button type="button" size="sm" variant="outline" onClick={() => setI((x) => (x + 1) % items.length)}>Next</Button>
        </div>
      </div>
    </div>
  )
}
export { TestimonialCarousel }
