import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRightIcon } from "lucide-react"
import { GUIDES, guideBySlug } from "@/content/guides"
import { readingMinutes } from "@/content/reading"
import { Blocks, ComponentCard, ContentShell, Crumbs, FaqList, StudioNote } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { articleLd, breadcrumbLd, faqLd, graph, meta } from "@/lib/seo"

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const g = guideBySlug((await params).slug)
  if (!g) return {}
  return meta({ title: g.title, description: g.description, path: `/guides/${g.slug}`, image: `/guides/${g.slug}/opengraph-image`, keywords: g.keywords, type: "article", publishedTime: g.date, modifiedTime: g.updated })
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })

export default async function GuidePage({ params }: Params) {
  const g = guideBySlug((await params).slug)
  if (!g) notFound()
  const toc = g.body.filter((b): b is Extract<typeof b, { type: "h2" }> => b.type === "h2")
  const more = GUIDES.filter((x) => x.slug !== g.slug).slice(0, 4)
  const path = `/guides/${g.slug}`
  return (
    <ContentShell>
      <JsonLd
        data={graph(
          articleLd({ title: g.title, description: g.description, path, date: g.date, updated: g.updated, keywords: g.keywords }),
          breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Guides", path: "/guides" }, { name: g.title, path }]),
          ...(g.faq?.length ? [faqLd(g.faq)] : []),
        )}
      />
      <div className="mx-auto grid grid-cols-1 max-w-6xl gap-12 px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_220px] lg:px-8">
        <article className="min-w-0 max-w-3xl">
          <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "Guides", href: "/guides" }, { name: g.title }]} />
          <h1 className="mt-4 text-[2.25rem] leading-[1.06] font-medium tracking-[-0.045em] text-fg sm:text-[3rem]">{g.title}</h1>
          <p className="mt-4 text-[1.125rem] leading-[1.65] text-fg-muted">{g.description}</p>
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] text-fg-subtle">
            <span>
              By <Link href="/studio" className="text-fg-muted hover:text-fg">MiniDev</Link>
            </span>
            <span aria-hidden>·</span>
            <time dateTime={g.updated ?? g.date}>{fmt(g.updated ?? g.date)}</time>
            <span aria-hidden>·</span>
            <span>{readingMinutes(g.body, g.faq)} min read</span>
          </p>
          <div className="mt-10">
            <Blocks blocks={g.body} />
          </div>
          {g.related.length ? (
            <section className="mt-16">
              <h2 className="text-[1.5rem] font-medium tracking-[-0.03em] text-fg">Components used in this guide</h2>
              <div className="mt-5 grid grid-cols-1 gap-3">
                {g.related.slice(0, 8).map((n) => (
                  <ComponentCard key={n} name={n} />
                ))}
              </div>
            </section>
          ) : null}
          {g.faq?.length ? <FaqList faq={g.faq} /> : null}
          <StudioNote />
          <section className="mt-16">
            <h2 className="text-[1.25rem] font-medium tracking-[-0.02em] text-fg">More guides</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {more.map((m) => (
                <Link key={m.slug} href={`/guides/${m.slug}`} className="group rounded-2xl border border-border bg-surface p-5 shadow-raised outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
                  <span className="block text-[0.9375rem] font-medium tracking-[-0.015em] text-fg">{m.title}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-[0.8125rem] text-fg-muted">Read <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" /></span>
                </Link>
              ))}
            </div>
          </section>
        </article>
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-24">
            <p className="text-[12px] font-medium tracking-[0.06em] text-fg-subtle uppercase">On this page</p>
            <ul className="mt-3 space-y-2 border-l border-border">
              {toc.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-3 text-[0.8125rem] leading-[1.45] text-fg-muted hover:border-fg hover:text-fg">
                    {h.text}
                  </a>
                </li>
              ))}
              {g.faq?.length ? (
                <li>
                  <a href="#faq" className="-ml-px block border-l border-transparent pl-3 text-[0.8125rem] text-fg-muted hover:border-fg hover:text-fg">FAQ</a>
                </li>
              ) : null}
            </ul>
          </nav>
        </aside>
      </div>
    </ContentShell>
  )
}
