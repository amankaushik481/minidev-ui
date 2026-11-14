"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { NavMarketing } from "@/registry/ui/nav-marketing"
import { Button } from "@/registry/ui/button"
import { FooterMega } from "@/registry/ui/footer-mega"

/**
 * A careers page: marketing navbar, headline, open roles that rise in as they scroll into view with an Apply button each, and a mega footer.
 *
 * A page template: pass your `roles`. Each Apply button is a link when the
 * role has an `href` and is named for its role ("Apply for Design
 * Engineer"), so screen reader users can tell the buttons apart.
 *
 * @example
 * <CareersPage roles={[{ title: "Design Engineer", loc: "Remote", type: "Full-time", href: "/jobs/design-engineer" }]} />
 */
type Role = {
  /** Job title. Must be unique. */
  title: string
  /** Location, e.g. "Remote" or "London / Remote". */
  loc: string
  /** Employment type, e.g. "Full-time". */
  type: string
  /** Application or job post link. */
  href?: string
}

type CareersPageProps = {
  /** Page heading (the only h1). */
  title?: string
  description?: string
  roles?: Role[]
  className?: string
}

const SAMPLE_ROLES: Role[] = [
  { title: "Design Engineer", loc: "Remote", type: "Full-time" },
  { title: "Product Engineer", loc: "SF / Remote", type: "Full-time" },
  { title: "Developer Advocate", loc: "Remote", type: "Contract" },
]

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function CareersPage({
  title = "Build the kit you wish you had",
  description = "Hairline craft, obsessive a11y, zero generic dashboards.",
  roles = SAMPLE_ROLES,
  className,
}: CareersPageProps) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="careers-page" data-tier="premium" className={cn("bg-bg", className)}>
      <NavMarketing />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : MORPH}
          className="text-4xl font-medium tracking-[-0.026em] text-balance text-fg"
        >
          {title}
        </motion.h1>
        <p className="mt-3 text-sm text-pretty text-fg-muted">{description}</p>
        <ul className="mt-10 space-y-3">
          {roles.map((r, i) => (
            <motion.li
              key={r.title}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reduce ? { duration: 0 } : { ...MORPH, delay: i * 0.05 }}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-fg">{r.title}</p>
                <p className="text-xs text-fg-muted">{r.loc} · {r.type}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                aria-label={`Apply for ${r.title}`}
                render={r.href ? <a href={r.href} /> : undefined}
              >
                Apply
              </Button>
            </motion.li>
          ))}
        </ul>
      </div>
      <FooterMega columns={[{ title: "Company", links: [{ label: "About", href: "#" }, { label: "Blog", href: "#" }] }]} />
    </div>
  )
}
export { CareersPage }
export type { CareersPageProps, Role as CareersRole }
