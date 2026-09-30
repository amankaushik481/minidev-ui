import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { GLOSSARY, termBySlug } from "@/content/glossary"
import { Blocks, ComponentCard, ContentShell, Crumbs, StudioNote } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { abs, breadcrumbLd, graph, meta } from "@/lib/seo"

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return GLOSSARY.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const t = termBySlug((await params).slug)
  if (!t) return {}
  return meta({ title: `What Is ${t.term}? Definition and Examples`, description: t.short, path: `/glossary/${t.slug}`, image: `/glossary/${t.slug}/opengraph-image`, keywords: [`what is ${t.term.toLowerCase()}`, `${t.term.toLowerCase()} meaning`, `${t.term.toLowerCase()} react`] })
}

export default async function TermPage({ params }: Params) {
  const t = termBySlug((await params).slug)
  if (!t) notFound()
  const path = `/glossary/${t.slug}`
  const see = t.see.map(termBySlug).filter((x): x is NonNullable<typeof x> => Boolean(x))
  const i = GLOSSARY.findIndex((x) => x.slug === t.slug)
  const prev = GLOSSARY[i - 1]
  const next = GLOSSARY[i + 1]
  return (
    <ContentShell>
      <JsonLd
        data={graph(
          { "@type": "DefinedTerm", name: t.term, description: t.short, url: abs(path), inDefinedTermSet: abs("/glossary#set") },
          breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Glossary", path: "/glossary" }, { name: t.term, path }]),
        )}
      />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-8">
        <article className="min-w-0 max-w-3xl">
          <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "Glossary", href: "/glossary" }, { name: t.term }]} />
          <h1 className="mt-4 text-[2.25rem] leading-[1.06] font-medium tracking-[-0.045em] text-fg sm:text-[3rem]">What is {t.term}?</h1>
          <p className="mt-6 rounded-2xl border border-accent-line bg-accent-soft p-5 text-[1.125rem] leading-[1.6] text-fg">
            <strong className="font-semibold">{t.term}</strong>: {t.short}
          </p>
          <div className="mt-8">
            <Blocks blocks={t.body} />
          </div>
          <nav aria-label="More terms" className="mt-16 grid grid-cols-1 gap-3 border-t border-border pt-8 sm:grid-cols-2">
            {prev ? (
              <Link href={`/glossary/${prev.slug}`} className="rounded-xl border border-border bg-surface p-4 shadow-raised hover:border-border-strong">
                <span className="text-xs text-fg-subtle">Previous term</span>
                <span className="mt-1 block text-[0.9375rem] font-medium text-fg">{prev.term}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/glossary/${next.slug}`} className="rounded-xl border border-border bg-surface p-4 text-right shadow-raised hover:border-border-strong">
                <span className="text-xs text-fg-subtle">Next term</span>
                <span className="mt-1 block text-[0.9375rem] font-medium text-fg">{next.term}</span>
              </Link>
            ) : null}
          </nav>
          <StudioNote />
        </article>
        <aside className="space-y-4">
          {t.related.length ? <p className="text-[12px] font-medium tracking-[0.06em] text-fg-subtle uppercase">Components</p> : null}
          {t.related.slice(0, 4).map((n) => (
            <ComponentCard key={n} name={n} />
          ))}
          {see.length ? (
            <>
              <p className="pt-4 text-[12px] font-medium tracking-[0.06em] text-fg-subtle uppercase">See also</p>
              <ul className="space-y-2">
                {see.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/glossary/${s.slug}`} className="text-[0.875rem] text-fg-muted underline decoration-border-strong underline-offset-4 hover:text-fg">{s.term}</Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <p className="pt-4"><Link href="/glossary" className="text-[0.8125rem] font-medium text-fg hover:underline">All {GLOSSARY.length} terms</Link></p>
        </aside>
      </div>
    </ContentShell>
  )
}
