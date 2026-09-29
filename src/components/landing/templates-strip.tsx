"use client"
import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { LivePreview, TEMPLATES } from "@/components/templates/catalog"

export function TemplatesStrip() {
  const picks = TEMPLATES.filter((t) => ["ponte", "lumen", "hale"].includes(t.slug))
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">Templates</p>
          <h2 className="mt-3 text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance text-fg sm:text-5xl">Whole products, not just pages.</h2>
          <p className="mt-4 text-[1.0625rem] leading-[1.65] text-fg-muted">
            {TEMPLATES.length} full landing pages with working product UI inside: a transfer app, a booking flow, an agent run, a cart. Open one and click around.
          </p>
        </div>
        <Button size="lg" variant="outline" render={<Link href="/templates" />}>
          All {TEMPLATES.length} templates <ArrowRightIcon />
        </Button>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {picks.map((t) => (
          <Link key={t.slug} href={`/templates/${t.slug}`} className="group overflow-hidden rounded-3xl border border-border bg-surface shadow-raised outline-none transition-[translate,box-shadow] duration-300 ease-hairline hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-accent">
            <LivePreview slug={t.slug} />
            <div className="flex items-center justify-between p-5">
              <div>
                <p className="text-[15px] font-medium text-fg">{t.name}</p>
                <p className="text-[12.5px] text-fg-muted">{t.kind}</p>
              </div>
              <ArrowUpRightIcon className="size-4 text-fg-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
