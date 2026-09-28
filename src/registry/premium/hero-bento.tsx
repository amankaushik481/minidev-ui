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
    <section
      data-slot="hero-bento"
      data-tier="premium"
      className={cn("min-w-0 overflow-hidden rounded-2xl border border-border bg-bg p-4 sm:p-10", className)}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-[clamp(1.5rem,2.5vw+1rem,2.25rem)] font-medium tracking-[-0.022em] text-fg">
          Everything your product shell needs
        </h1>
        <p className="mt-3 text-sm text-fg-muted">Compose free primitives. Drop Premium bentos when the page has to land.</p>
        <Button className="mt-6 w-full sm:w-auto">Open gallery</Button>
      </div>
      <div className="mt-8 grid min-w-0 gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t, i) => (
          <motion.div
            key={t.title}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.35 }}
            className={cn(
              "min-w-0 rounded-xl border border-border bg-surface p-5 shadow-highlight",
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
