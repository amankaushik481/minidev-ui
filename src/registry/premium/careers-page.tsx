"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { NavMarketing } from "@/registry/ui/nav-marketing"
import { Button } from "@/registry/ui/button"
import { FooterMega } from "@/registry/ui/footer-mega"

const roles = [
  { title: "Design Engineer", loc: "Remote", type: "Full-time" },
  { title: "Product Engineer", loc: "SF / Remote", type: "Full-time" },
  { title: "Developer Advocate", loc: "Remote", type: "Contract" },
]

function CareersPage({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="careers-page" data-tier="premium" className={cn("bg-bg", className)}>
      <NavMarketing />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <motion.h1 initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-medium tracking-[-0.026em] text-fg">
          Build the kit you wish you had
        </motion.h1>
        <p className="mt-3 text-sm text-fg-muted">Hairline craft, obsessive a11y, zero generic dashboards.</p>
        <ul className="mt-10 space-y-3">
          {roles.map((r, i) => (
            <motion.li
              key={r.title}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-fg">{r.title}</p>
                <p className="text-xs text-fg-muted">{r.loc} · {r.type}</p>
              </div>
              <Button size="sm" variant="outline">Apply</Button>
            </motion.li>
          ))}
        </ul>
      </div>
      <FooterMega columns={[{ title: "Company", links: [{ label: "About", href: "#" }, { label: "Blog", href: "#" }] }]} />
    </div>
  )
}
export { CareersPage }
