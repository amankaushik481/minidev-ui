"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronRightIcon, SparklesIcon } from "lucide-react"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { cn } from "@/lib/utils"

/**
 * GallerySection — a titled "stage": a hairline plate on a dot field, the
 * way a component would sit on a designer's canvas.
 */
export function GallerySection({
  title,
  description,
  className,
  children,
}: {
  title: string
  description?: string
  className?: string
  children: ReactNode
}) {
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  return (
    <section id={id} className="min-w-0 scroll-mt-20 py-6 first:pt-0 sm:py-8">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 className="group/h text-[0.8125rem] font-medium text-fg">
          <a href={`#${id}`} className="outline-none focus-visible:underline">
            {title}
            <span className="ml-1.5 text-fg-subtle opacity-0 transition-opacity group-hover/h:opacity-100">#</span>
          </a>
        </h2>
        {description ? <p className="hidden text-xs text-fg-subtle sm:block">{description}</p> : null}
      </div>
      <div className="relative min-w-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-raised">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots [--grid-size:14px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_85%)]" />
        <div className={cn("relative flex min-w-0 flex-wrap items-center gap-3 p-5 sm:p-10", className)}>
          {children}
        </div>
      </div>
    </section>
  )
}

export function GalleryPage({
  title,
  premium,
  description,
  children,
}: {
  title: string
  premium?: boolean
  description?: string
  children: ReactNode
}) {
  return (
    <div className="min-h-full bg-bg text-fg">
      <SiteHeader solid />
      <main className="mx-auto w-full min-w-0 max-w-7xl px-4 pt-8 pb-24 sm:px-6 sm:pt-12 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-fg-subtle">
          <Link href="/gallery" className="rounded outline-none transition-colors hover:text-fg focus-visible:ring-2 focus-visible:ring-accent">
            Components
          </Link>
          <ChevronRightIcon className="size-3" />
          <span className="text-fg-muted">{title}</span>
        </nav>
        <div className="mt-4 flex flex-col gap-3 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h1 className="flex flex-wrap items-center gap-3 text-3xl font-medium tracking-[-0.03em] text-fg sm:text-[2.5rem] sm:leading-[1.05]">
              {title}
              {premium ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-accent-line bg-accent-soft px-2 py-0.5 text-[11px] font-medium tracking-normal text-accent-fg">
                  <SparklesIcon className="size-3" /> Motion
                </span>
              ) : null}
            </h1>
            {description ? <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.6] text-fg-muted">{description}</p> : null}
          </div>
          <p className="shrink-0 text-xs text-fg-subtle">Free · MIT · Copy and own</p>
        </div>
        <div className="pt-8">{children}</div>
      </main>
      <SiteFooter />
    </div>
  )
}
