"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { SearchInput } from "@/registry/ui/search-input"
import { Callout } from "@/registry/ui/callout"
import { CodeBlock } from "@/registry/ui/code-block"
import { Toc } from "@/registry/ui/toc"
import { ScrollReveal } from "@/registry/premium/scroll-reveal"

/**
 * A documentation home: a hero with search and two entry buttons, then a sticky table of contents beside install, tokens and premium sections that reveal on scroll.
 *
 * A page template for a docs landing route; swap the copy, TOC items and
 * sections. The search field is presentational until you wire `onChange` on
 * SearchInput. For a single docs article use Toc with your MDX content.
 *
 * @example
 * <DocsMarketing />
 */
function DocsMarketing({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="docs-marketing" data-tier="premium" className={cn("space-y-12", className)}>
      <section className="rounded-2xl border border-border bg-sunken px-6 py-16 text-center">
        <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">
          Documentation
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-4xl font-medium tracking-[-0.026em] text-fg"
        >
          Build faster with MiniDev UI
        </motion.h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-fg-muted">
          Guides, API references, and copy-paste recipes — styled like the product.
        </p>
        <div className="mx-auto mt-6 max-w-md">
          <SearchInput aria-label="Search docs" placeholder="Search docs…" />
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <Button>Get started</Button>
          <Button variant="outline">API reference</Button>
        </div>
      </section>
      <div className="grid gap-10 lg:grid-cols-[200px_1fr]">
        <Toc
          items={[
            { id: "install", title: "Install" },
            { id: "tokens", title: "Tokens", level: 2 },
            { id: "premium", title: "Premium", level: 2 },
          ]}
          activeId="install"
        />
        <div className="space-y-6">
          <ScrollReveal>
            <h2 id="install" className="text-2xl font-medium tracking-[-0.018em] text-fg">Install</h2>
            <p className="mt-2 text-sm text-fg-muted">Add components from the registry into your Next.js app.</p>
            <div className="mt-4">
              <CodeBlock code="npx shadcn@latest add @minidev/button" language="bash" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 id="tokens" className="text-2xl font-medium tracking-[-0.018em] text-fg">Tokens</h2>
            <Callout title="Rule" tone="info">Every value comes from DESIGN.md. Invent nothing.</Callout>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 id="premium" className="text-2xl font-medium tracking-[-0.018em] text-fg">Premium</h2>
            <p className="mt-2 text-sm text-fg-muted">Motion blocks live under <code className="rounded-sm border border-border bg-sunken px-1 font-mono">src/registry/premium</code>.</p>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
export { DocsMarketing }
