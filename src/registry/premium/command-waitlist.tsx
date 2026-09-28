"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function CommandWaitlist({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const [email, setEmail] = React.useState("")
  const [done, setDone] = React.useState(false)
  return (
    <motion.div
      data-slot="command-waitlist"
      data-tier="premium"
      initial={reduce ? false : { y: 16, scale: 0.98 }}
      whileInView={{ y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 160, damping: 20 }}
      className={cn(
        "mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-highlight",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border bg-sunken px-4 py-2.5">
        <p className="text-xs font-medium text-fg-muted">Waitlist · MiniDev Premium</p>
        <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-fg-muted">⌘K</kbd>
      </div>
      <form
        className="space-y-3 p-4"
        onSubmit={(e) => {
          e.preventDefault()
          setDone(true)
        }}
      >
        <label className="block text-xs text-fg-muted" htmlFor="waitlist-email">
          join --email
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="h-10 w-full rounded-lg border border-border bg-bg px-3 font-mono text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-fg-muted">{done ? "Queued. We will ping you." : "No spam. Launch notes only."}</p>
          <Button type="submit" size="sm" disabled={done}>
            {done ? "Joined" : "Join"}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
export { CommandWaitlist }
