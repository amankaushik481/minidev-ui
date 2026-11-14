"use client"

import * as React from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon, SparklesIcon } from "lucide-react"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { GALLERY_ENTRIES } from "@/lib/gallery-catalog"
import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/registry/ui/copy-button"

type GalleryRouteData = { slug: string; items: { name: string; title: string }[] }

const GalleryRouteContext = React.createContext<GalleryRouteData | null>(null)

/** Set by each gallery route's server layout: which components the page renders, for docs links and the install command. */
export function GalleryRouteProvider({ value, children }: { value: GalleryRouteData; children: ReactNode }) {
  return <GalleryRouteContext.Provider value={value}>{children}</GalleryRouteContext.Provider>
}

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
    <section id={id} aria-labelledby={`${id}-title`} className="min-w-0 scroll-mt-20 py-6 first:pt-0 sm:py-8">
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h2 id={`${id}-title`} className="group/h text-[0.8125rem] font-medium text-fg">
          <a href={`#${id}`} className="rounded outline-none focus-visible:ring-2 focus-visible:ring-accent">
            {title}
            <span aria-hidden className="ml-1.5 text-fg-subtle opacity-0 transition-opacity group-hover/h:opacity-100 group-focus-within/h:opacity-100">#</span>
          </a>
        </h2>
        {description ? <p className="text-xs text-fg-subtle">{description}</p> : null}
      </div>
      <div className="relative min-w-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-raised">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots [--grid-size:14px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_85%)]" />
        <div className={cn("relative flex min-w-0 flex-wrap items-center gap-3 p-4 sm:p-10 [&>[class*='max-w-']]:w-full", className)}>
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
  const route = React.useContext(GalleryRouteContext)
  const items = route?.items ?? []
  const entry = route ? GALLERY_ENTRIES.find((g) => g.slug === route.slug) : undefined
  const lede = description ?? entry?.description
  const install = `npx shadcn@latest add ${items.map((c) => `${SITE.registry}/${c.name}`).join(" ")}`

  return (
    <div className="min-h-full bg-bg text-fg">
      <SiteHeader solid />
      <main className="mx-auto w-full min-w-0 max-w-7xl px-4 pt-8 pb-24 sm:px-6 sm:pt-12 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-xs text-fg-subtle">
            <li>
              <Link href="/gallery" className="rounded outline-none transition-colors hover:text-fg focus-visible:ring-2 focus-visible:ring-accent">
                Components
              </Link>
            </li>
            <li aria-hidden><ChevronRightIcon className="size-3" /></li>
            <li aria-current="page" className="min-w-0 truncate text-fg-muted">{title}</li>
          </ol>
        </nav>
        <div className="mt-4 flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h1 className="flex flex-wrap items-center gap-3 text-3xl font-medium tracking-[-0.03em] text-fg sm:text-[2.5rem] sm:leading-[1.05]">
              {title}
              {premium ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-accent-line bg-accent-soft px-2 py-0.5 text-[11px] font-medium tracking-normal text-accent-fg">
                  <SparklesIcon aria-hidden className="size-3" /> Motion
                </span>
              ) : null}
            </h1>
            {lede ? <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.6] text-fg-muted">{lede}</p> : null}
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <p className="text-xs text-fg-subtle">
              {items.length ? <><span className="tabular-nums">{items.length}</span> components · </> : null}Free · MIT · Copy and own
            </p>
            {items.length ? <CopyButton value={install} label="Copy install" /> : null}
          </div>
        </div>
        <div className="pt-8">{children}</div>
        {items.length ? <GalleryComponentList items={items} install={install} /> : null}
        {route ? <GalleryPager slug={route.slug} /> : null}
      </main>
      <SiteFooter />
    </div>
  )
}

/** Every component on the page, linked to its docs (props, install, usage). Plain links: agents and crawlers follow them. */
function GalleryComponentList({ items, install }: { items: GalleryRouteData["items"]; install: string }) {
  return (
    <section aria-labelledby="gallery-components" className="mt-10 rounded-2xl border border-border bg-surface p-4 shadow-raised sm:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h2 id="gallery-components" className="text-[0.9375rem] font-medium tracking-[-0.01em] text-fg">
          Components on this page <span className="font-mono text-[11px] font-normal text-fg-subtle tabular-nums">{items.length}</span>
        </h2>
        <p className="text-xs text-fg-subtle">Each one has props, usage and its own install command.</p>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((c) => (
          <li key={c.name}>
            <Link
              href={`/docs/${c.name}`}
              className="inline-flex h-8 items-center rounded-lg border border-border bg-bg px-2.5 text-[0.8125rem] text-fg shadow-key outline-none transition-colors duration-[70ms] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent"
            >
              {c.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex min-w-0 items-center gap-2 rounded-lg border border-border bg-sunken p-1.5 pl-3">
        <code className="min-w-0 flex-1 truncate font-mono text-[12px] text-fg-muted" title={install}>{install}</code>
        <CopyButton value={install} label="Copy command" />
      </div>
    </section>
  )
}

function GalleryPager({ slug }: { slug: string }) {
  const i = GALLERY_ENTRIES.findIndex((g) => g.slug === slug)
  if (i < 0) return null
  const prev = GALLERY_ENTRIES[i - 1]
  const next = GALLERY_ENTRIES[i + 1]
  const card = "group flex min-w-0 flex-col gap-0.5 rounded-xl border border-border bg-surface p-4 shadow-key outline-none transition-colors duration-[70ms] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent"
  return (
    <nav aria-label="More galleries" className="mt-10 grid gap-3 sm:grid-cols-2">
      {prev ? (
        <Link href={`/gallery/${prev.slug}`} className={card}>
          <span className="flex items-center gap-1 text-xs text-fg-subtle"><ArrowLeftIcon aria-hidden className="size-3" /> Previous</span>
          <span className="truncate text-[0.9375rem] font-medium text-fg">{prev.label}</span>
        </Link>
      ) : <span aria-hidden className="hidden sm:block" />}
      {next ? (
        <Link href={`/gallery/${next.slug}`} className={cn(card, "sm:items-end sm:text-right")}>
          <span className="flex items-center gap-1 text-xs text-fg-subtle">Next <ArrowRightIcon aria-hidden className="size-3" /></span>
          <span className="truncate text-[0.9375rem] font-medium text-fg">{next.label}</span>
        </Link>
      ) : null}
    </nav>
  )
}
