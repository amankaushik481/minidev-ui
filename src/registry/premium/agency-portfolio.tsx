"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { NavMarketing } from "@/registry/ui/nav-marketing"
import { AspectRatio } from "@/registry/ui/aspect-ratio"
import { FooterMega } from "@/registry/ui/footer-mega"
import { Button } from "@/registry/ui/button"

/**
 * A full agency portfolio page: marketing navbar, headline, project cards that rise in sequence as they scroll in, and a mega footer.
 *
 * A page template, not a primitive: drop it on a route and swap the copy and
 * `projects`. Cards show a cover image when `image` is set, a sunken
 * placeholder otherwise. For a single project grid inside your own page use
 * the cards directly; for a careers or blog page use CareersPage or BlogHome.
 *
 * @example
 * <AgencyPortfolio projects={[{ name: "Northwind", blurb: "AI ops console", image: "/northwind.png", href: "/work/northwind" }]} />
 */
type Project = {
  /** Client or project name. Must be unique. */
  name: string
  /** One line on what was made. */
  blurb: string
  /** Cover image, 4:3. */
  image?: string
  /** Case study link; makes the whole card a link. */
  href?: string
}

type AgencyPortfolioProps = {
  /** Brand shown in the navbar. */
  brand?: string
  /** Page headline (the only h1). */
  title?: string
  /** Line under the headline. */
  description?: string
  projects?: Project[]
  className?: string
}

const SAMPLE_PROJECTS: Project[] = [
  { name: "Northwind", blurb: "AI ops console" },
  { name: "Harbor", blurb: "Billing redesign" },
  { name: "Lumen", blurb: "Docs marketing" },
]

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function AgencyPortfolio({
  brand = "Studio",
  title = "Product UI with a pulse",
  description = "Selected work. Products we designed, built and shipped in thirty days.",
  projects = SAMPLE_PROJECTS,
  className,
}: AgencyPortfolioProps) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="agency-portfolio" data-tier="premium" className={cn("bg-bg", className)}>
      <NavMarketing brand={brand} />
      <div className="mx-auto max-w-5xl space-y-12 px-6 py-16">
        <div className="max-w-2xl">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : MORPH}
            className="text-4xl font-medium tracking-[-0.026em] text-balance text-fg"
          >
            {title}
          </motion.h1>
          <p className="mt-3 text-sm text-pretty text-fg-muted">{description}</p>
          <Button className="mt-6">Start a project</Button>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const body = (
              <>
                <AspectRatio ratio={4 / 3} className="bg-sunken">
                  {p.image ? <img src={p.image} alt="" className="size-full object-cover" /> : null}
                </AspectRatio>
                <div className="p-4">
                  <p className="text-sm font-medium text-fg">{p.name}</p>
                  <p className="text-xs text-fg-muted">{p.blurb}</p>
                </div>
              </>
            )
            return (
              <motion.li
                key={p.name}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={reduce ? { duration: 0 } : { ...MORPH, delay: i * 0.06 }}
                className="overflow-hidden rounded-xl border border-border bg-surface shadow-raised"
              >
                {p.href ? (
                  <a
                    href={p.href}
                    className="block outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
                  >
                    {body}
                  </a>
                ) : (
                  body
                )}
              </motion.li>
            )
          })}
        </ul>
      </div>
      <FooterMega columns={[{ title: brand, links: [{ label: "Work", href: "#" }, { label: "Contact", href: "#" }] }]} />
    </div>
  )
}
export { AgencyPortfolio }
export type { AgencyPortfolioProps, Project as AgencyProject }
