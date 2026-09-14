"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeftIcon, SparklesIcon } from "lucide-react"

export function GallerySection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="space-y-4 border-b border-border py-10 last:border-b-0">
      <h2 className="text-xs font-medium uppercase tracking-[0.01em] text-fg">
        {title}
      </h2>
      <div className="w-full min-w-0 space-y-4">{children}</div>
    </section>
  )
}

export function GalleryPage({
  title,
  premium,
  children,
}: {
  title: string
  premium?: boolean
  children: ReactNode
}) {
  return (
    <main className="mx-auto max-w-5xl overflow-x-hidden bg-bg px-4 py-8 text-fg sm:px-6 sm:py-12">
      <div className="mb-4">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-fg outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeftIcon className="size-3.5" />
          Gallery
        </Link>
      </div>
      <div className="flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-medium tracking-[-0.022em] text-fg sm:text-3xl">
            {title}
          </h1>
          {premium ? (
            <span className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-0.5 text-[10px] font-medium tracking-[0.01em] text-fg uppercase shadow-[inset_0_1px_0_oklch(1_0_0/0.5)]">
              <SparklesIcon className="size-3 text-accent" /> Premium
            </span>
          ) : null}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="h-8 rounded-lg border border-border px-3 text-xs text-fg transition-[border-color] duration-[70ms] hover:border-fg-subtle"
            onClick={() => document.documentElement.classList.remove("dark")}
          >
            Light
          </button>
          <button
            type="button"
            className="h-8 rounded-lg border border-border px-3 text-xs text-fg transition-[border-color] duration-[70ms] hover:border-fg-subtle"
            onClick={() => document.documentElement.classList.add("dark")}
          >
            Dark
          </button>
        </div>
      </div>
      {children}
    </main>
  )
}
