import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { JsonLd } from "@/components/seo/json-ld"
import { PAGE_SEO } from "@/content/pages"
import { Button } from "@/registry/ui/button"
import { LivePreview, TEMPLATES } from "@/components/templates/catalog"
import { breadcrumbLd, graph, itemListLd } from "@/lib/seo"
import { SITE } from "@/lib/site"

// No entrance animation: the cards are the page, so they render visible from the first paint.
export default function TemplatesIndex() {
  return (
    <div className="min-h-full bg-bg text-fg">
      <JsonLd
        data={graph(
          { "@type": "CollectionPage", name: PAGE_SEO.templates.title, description: PAGE_SEO.templates.description, url: `${SITE.url}/templates` },
          itemListLd(TEMPLATES.map((t) => ({ name: `${t.name}: ${t.kind} template`, path: `/templates/${t.slug}` })), "Templates"),
          breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Templates", path: "/templates" }]),
        )}
      />
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden">
          <div aria-hidden className="light-spot absolute inset-0 -z-10" />
          <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 sm:pt-24 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">Templates</p>
              <h1 className="mt-3 text-[2.5rem] leading-[1] font-medium tracking-[-0.05em] text-balance sm:text-7xl">
                Whole products,
                <br />
                <span className="text-lit">not just pages.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-[1.6] text-fg-muted">
                Free React and Tailwind CSS landing page templates. Each one is a real product story with working UI inside it, built from MiniDev UI components and blocks you can install one by one. Open one, click around, switch the material.
              </p>
            </div>
          </div>
        </section>
        <section aria-label="Templates" className="mx-auto grid max-w-7xl gap-6 px-4 pb-24 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {TEMPLATES.map((t) => (
            <article
              key={t.slug}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-raised transition-[translate,box-shadow] duration-300 ease-hairline hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0"
            >
              <LivePreview slug={t.slug} />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium tracking-[-0.02em]">{t.name}</h2>
                  <span className="rounded-full border border-border bg-sunken px-2.5 py-0.5 text-[11.5px] text-fg-muted">{t.material}</span>
                </div>
                <p className="mt-0.5 text-[13px] text-accent-fg">{t.kind}</p>
                <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-fg-muted">{t.blurb}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {t.tags.map((g) => (
                      <span key={g} className="rounded-md bg-sunken px-2 py-0.5 text-[11px] text-fg-muted">{g}</span>
                    ))}
                  </div>
                  <Link href={`/brand/${t.slug}`} className="relative z-10 ml-auto mr-4 rounded-md text-[13px] text-fg-muted underline-offset-4 outline-none hover:text-fg hover:underline focus-visible:ring-2 focus-visible:ring-accent">
                    Brand kit
                  </Link>
                  <span className="inline-flex items-center gap-1 text-[13px] font-medium text-fg">
                    Open <ArrowUpRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
              <Link href={`/templates/${t.slug}`} className="absolute inset-0 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset" aria-label={`Open the ${t.name} template, ${t.kind}`} />
            </article>
          ))}
        </section>
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-surface p-8 shadow-raised sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="text-2xl font-medium tracking-[-0.03em] sm:text-3xl">Your idea is not on this list?</h2>
              <p className="mt-2 max-w-xl text-[15px] text-fg-muted">Tell us about it. We send back a clickable prototype of your product in 48 hours, free.</p>
            </div>
            <Button size="lg" render={<Link href="/studio#prototype" />}>
              Get my free prototype <ArrowRightIcon />
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
