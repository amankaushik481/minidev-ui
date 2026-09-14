"use client"
import * as React from "react"
import { CheckIcon, MinusIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

type Row = { feature: string; free: boolean | string; premium: boolean | string }

function FeatureComparison({
  rows,
  className,
}: {
  rows: Row[]
  className?: string
}) {
  const reduce = useReducedMotion()
  const cell = (v: boolean | string) => {
    if (typeof v === "string") return <span className="text-sm text-fg">{v}</span>
    return v ? <CheckIcon className="size-4 text-success" aria-label="Included" /> : <MinusIcon className="size-4 text-fg-subtle" aria-label="Not included" />
  }
  return (
    <div data-slot="feature-comparison" data-tier="premium" className={cn("overflow-hidden rounded-2xl border border-border", className)}>
      <div className="grid grid-cols-3 border-b border-border bg-sunken px-4 py-3 text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">
        <span>Feature</span>
        <span className="text-center">Free</span>
        <span className="text-center text-accent">Premium</span>
      </div>
      {rows.map((r, i) => (
        <motion.div
          key={r.feature}
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03 }}
          className="grid grid-cols-3 items-center border-b border-border px-4 py-3 last:border-b-0"
        >
          <span className="text-sm text-fg">{r.feature}</span>
          <span className="flex justify-center">{cell(r.free)}</span>
          <span className="flex justify-center">{cell(r.premium)}</span>
        </motion.div>
      ))}
      <div className="flex justify-end gap-2 bg-surface px-4 py-4">
        <Button variant="outline">Stay free</Button>
        <Button>Get Premium</Button>
      </div>
    </div>
  )
}
export { FeatureComparison }
