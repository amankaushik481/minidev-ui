"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

const tiles = [
  { title: "AI surfaces", body: "Threads, traces, citations.", span: "lg:col-span-2" },
  { title: "Billing", body: "Plans, seats, invoices.", span: "" },
  { title: "Auth", body: "OTP, magic links, 2FA.", span: "" },
  { title: "Admin", body: "Roles, audits, flags.", span: "lg:col-span-2" },
]

function HeroBento({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <section data-slot="hero-bento" data-tier="premium" className={cn("rounded-2xl border border-border bg-bg p-6 sm:p-10", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-medium tracking-[-0.022em] text-fg sm:text-4xl">Everything your product shell needs</h1>
        <p className="mt-3 text-sm text-fg-muted">Compose free primitives. Drop Premium bentos when the page has to land.</p>
        <Button className="mt-6">Open gallery</Button>
      </div>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t, i) => (
          <motion.div
            key={t.title}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.35 }}
            className={cn(
              "rounded-xl border border-border bg-surface p-5 shadow-[inset_0_1px_0_oklch(1_0_0/0.5)]",
              t.span
            )}
          >
            <h2 className="text-sm font-medium text-fg">{t.title}</h2>
            <p className="mt-1 text-xs text-fg-muted">{t.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
export { HeroBento }
