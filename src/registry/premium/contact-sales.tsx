"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { NavMarketing } from "@/registry/ui/nav-marketing"
import { Button } from "@/registry/ui/button"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Textarea } from "@/registry/ui/textarea"
import { CaseStudyCard } from "@/registry/ui/case-study-card"
import { PressQuote } from "@/registry/ui/press-quote"

function ContactSales({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="contact-sales" data-tier="premium" className={cn("bg-bg", className)}>
      <NavMarketing />
      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <motion.h1 initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-medium tracking-[-0.026em] text-fg">
            Talk to sales
          </motion.h1>
          <p className="mt-3 text-sm text-fg-muted">Studio seats, custom themes, and launch support for teams.</p>
          <div className="mt-8 space-y-4">
            <CaseStudyCard company="Acme" title="Cut design QA time in half" result="52%" delta={52} />
            <PressQuote quote="The rare kit that looks intentional in screenshots." source="Design Weekly" />
          </div>
        </div>
        <form
          className="space-y-3 rounded-2xl border border-border bg-surface p-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <FormField label="Work email"><Input type="email" aria-label="Work email" required /></FormField>
          <FormField label="Company"><Input aria-label="Company" /></FormField>
          <FormField label="What do you need?"><Textarea aria-label="Message" rows={4} /></FormField>
          <Button type="submit" className="w-full">Request a call</Button>
        </form>
      </div>
    </div>
  )
}
export { ContactSales }
