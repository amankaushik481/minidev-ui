import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { INSTALLS, installBySlug } from "@/content/install"
import { Blocks, ContentShell, Crumbs, FaqList, StudioNote } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { abs, articleLd, breadcrumbLd, faqLd, graph, meta } from "@/lib/seo"

type Params = { params: Promise<{ framework: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return INSTALLS.map((g) => ({ framework: g.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const g = installBySlug((await params).framework)
  if (!g) return {}
  return meta({ title: g.title, description: g.description, path: `/docs/installation/${g.slug}`, keywords: g.keywords })
}

export default async function InstallPage({ params }: Params) {
  const g = installBySlug((await params).framework)
  if (!g) notFound()
  const path = `/docs/installation/${g.slug}`
  const steps = g.body.filter((b): b is Extract<typeof b, { type: "h2" }> => b.type === "h2")
  return (
    <ContentShell>
      <JsonLd
        data={graph(
          { ...articleLd({ title: g.title, description: g.description, path, date: g.date, updated: g.updated, keywords: g.keywords }), image: abs("/opengraph-image") },
          { "@type": "HowTo", name: g.title, description: g.description, step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.text, url: `${abs(path)}#${s.id}` })) },
          breadcrumbLd([{ name: "Docs", path: "/docs" }, { name: "Installation", path: "/docs/installation" }, { name: g.framework, path }]),
          ...(g.faq?.length ? [faqLd(g.faq)] : []),
        )}
      />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_220px] lg:px-8">
        <article className="min-w-0 max-w-3xl">
          <Crumbs items={[{ name: "Docs", href: "/docs" }, { name: "Installation", href: "/docs/installation" }, { name: g.framework }]} />
          <h1 className="mt-4 text-[2.25rem] leading-[1.06] font-medium tracking-[-0.045em] text-fg sm:text-[3rem]">{g.title}</h1>
          <p className="mt-4 text-[1.125rem] leading-[1.65] text-fg-muted">{g.description}</p>
          <div className="mt-10">
            <Blocks blocks={g.body} />
          </div>
          {g.faq?.length ? <FaqList faq={g.faq} /> : null}
          <section className="mt-14">
            <h2 className="text-[1.125rem] font-medium text-fg">Other frameworks</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {INSTALLS.filter((x) => x.slug !== g.slug).map((x) => (
                <Link key={x.slug} href={`/docs/installation/${x.slug}`} className="rounded-xl border border-border bg-surface px-3.5 py-2 text-[0.875rem] text-fg shadow-key hover:border-border-strong">{x.framework}</Link>
              ))}
            </div>
          </section>
          <StudioNote />
        </article>
        <aside className="hidden lg:block">
          <nav aria-label="Steps" className="sticky top-24">
            <p className="text-[12px] font-medium tracking-[0.06em] text-fg-subtle uppercase">Steps</p>
            <ol className="mt-3 space-y-2 border-l border-border">
              {steps.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-3 text-[0.8125rem] leading-[1.45] text-fg-muted hover:border-fg hover:text-fg">{h.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      </div>
    </ContentShell>
  )
}
