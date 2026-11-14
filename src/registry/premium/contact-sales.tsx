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

/**
 * A contact sales page: marketing navbar, headline with proof (a case study and a press quote) beside a request-a-call form.
 *
 * A page template. Labels are wired to their fields, and the form handles
 * pending, sent and error states. Pass `onSubmit` to receive `{ email,
 * company, message }`; it may return a promise, and a thrown error keeps
 * everything typed. Replace the sample proof with your own real customers
 * before shipping. For a bare form use FormField with Input and Textarea.
 *
 * @example
 * <ContactSales onSubmit={(data) => fetch("/api/sales", { method: "POST", body: JSON.stringify(data) })} />
 */
type ContactSalesData = { email: string; company: string; message: string }

type ContactSalesProps = {
  /** Page heading (the only h1). */
  title?: string
  description?: string
  /** Called with the form values. Return a promise to show a pending state; throw to show an error. */
  onSubmit?: (data: ContactSalesData) => void | Promise<unknown>
  className?: string
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function ContactSales({
  title = "Talk to sales",
  description = "Studio seats, custom themes, and launch support for teams.",
  onSubmit,
  className,
}: ContactSalesProps) {
  const reduce = useReducedMotion()
  const id = React.useId()
  const [state, setState] = React.useState<"idle" | "pending" | "sent" | "error">("idle")
  return (
    <div data-slot="contact-sales" data-tier="premium" className={cn("bg-bg", className)}>
      <NavMarketing />
      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : MORPH}
            className="text-4xl font-medium tracking-[-0.026em] text-balance text-fg"
          >
            {title}
          </motion.h1>
          <p className="mt-3 text-sm text-pretty text-fg-muted">{description}</p>
          <div className="mt-8 space-y-4">
            <CaseStudyCard company="Acme" title="Cut design QA time in half" result="52%" delta={52} />
            <PressQuote quote="The rare kit that looks intentional in screenshots." source="Design Weekly" />
          </div>
        </div>
        <form
          aria-labelledby={`${id}-form`}
          className="space-y-3 rounded-2xl border border-border bg-surface p-6 shadow-raised"
          onSubmit={async (e) => {
            e.preventDefault()
            if (state === "pending") return
            const f = new FormData(e.currentTarget)
            setState("pending")
            try {
              await onSubmit?.({ email: String(f.get("email") ?? ""), company: String(f.get("company") ?? ""), message: String(f.get("message") ?? "") })
              setState("sent")
            } catch {
              setState("error")
            }
          }}
        >
          <h2 id={`${id}-form`} className="sr-only">
            Request a call
          </h2>
          <FormField id={`${id}-email`} label="Work email" required>
            <Input id={`${id}-email`} name="email" type="email" autoComplete="email" required />
          </FormField>
          <FormField id={`${id}-company`} label="Company">
            <Input id={`${id}-company`} name="company" autoComplete="organization" />
          </FormField>
          <FormField id={`${id}-message`} label="What do you need?">
            <Textarea id={`${id}-message`} name="message" rows={4} />
          </FormField>
          <Button type="submit" className="w-full" disabled={state === "pending"}>
            {state === "pending" ? "Sending…" : "Request a call"}
          </Button>
          <p role="status" className={cn("text-xs", state === "error" ? "text-danger" : "text-fg-muted")}>
            {state === "sent" ? "Thanks. We will be in touch soon." : state === "error" ? "Could not send. Your message is still here; try again." : ""}
          </p>
        </form>
      </div>
    </div>
  )
}
export { ContactSales }
export type { ContactSalesProps, ContactSalesData }
