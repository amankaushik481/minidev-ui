"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

type Q = { quote: string; name: string }

function Row({ items, reverse }: { items: Q[]; reverse?: boolean }) {
  const reduce = useReducedMotion()
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max gap-4"
        animate={reduce ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={reduce ? undefined : { duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((q, i) => (
          <figure
            key={`${q.name}-${i}`}
            className="w-72 shrink-0 rounded-xl border border-border bg-surface p-4 shadow-highlight"
          >
            <blockquote className="text-sm leading-[1.55] text-fg">“{q.quote}”</blockquote>
            <figcaption className="mt-3 text-xs text-fg-muted">{q.name}</figcaption>
          </figure>
        ))}
      </motion.div>
    </div>
  )
}

function MarqueeQuotes({
  items = [
    { quote: "Finally motion that matches the product kit.", name: "Jordan Lee" },
    { quote: "Hairline beats the blur-everywhere look.", name: "Sam Ortiz" },
    { quote: "We shipped the launch page in one afternoon.", name: "Riley Ng" },
    { quote: "Premium feels intentional in screenshots.", name: "Ava Chen" },
  ],
  className,
}: {
  items?: Q[]
  className?: string
}) {
  return (
    <div data-slot="marquee-quotes" data-tier="premium" className={cn("space-y-4", className)}>
      <Row items={items} />
      <Row items={[...items].reverse()} reverse />
    </div>
  )
}
export { MarqueeQuotes }
