"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { NavMarketing } from "@/registry/ui/nav-marketing"
import { AspectRatio } from "@/registry/ui/aspect-ratio"
import { FooterMega } from "@/registry/ui/footer-mega"
import { Button } from "@/registry/ui/button"

const projects = [
  { name: "Northwind", blurb: "AI ops console" },
  { name: "Harbor", blurb: "Billing redesign" },
  { name: "Lumen", blurb: "Docs marketing" },
]

function AgencyPortfolio({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="agency-portfolio" data-tier="premium" className={cn("bg-bg", className)}>
      <NavMarketing brand="Studio" />
      <div className="mx-auto max-w-5xl space-y-12 px-6 py-16">
        <div className="max-w-2xl">
          <motion.h1 initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-medium tracking-[-0.026em] text-fg">
            Product UI with a pulse
          </motion.h1>
          <p className="mt-3 text-sm text-fg-muted">Selected work built on MiniDev Hairline — free primitives, Premium moments.</p>
          <Button className="mt-6">Start a project</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="overflow-hidden rounded-xl border border-border bg-surface"
            >
              <AspectRatio ratio={4 / 3} className="bg-sunken" />
              <div className="p-4">
                <p className="text-sm font-medium text-fg">{p.name}</p>
                <p className="text-xs text-fg-muted">{p.blurb}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <FooterMega columns={[{ title: "Studio", links: [{ label: "Work", href: "#" }, { label: "Contact", href: "#" }] }]} />
    </div>
  )
}
export { AgencyPortfolio }
