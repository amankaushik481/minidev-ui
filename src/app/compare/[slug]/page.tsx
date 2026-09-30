import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { COMPARISONS, comparisonBySlug } from "@/content/compare"
import { Blocks, ContentShell, Crumbs, FaqList, Inline, StudioNote } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { abs, breadcrumbLd, faqLd, graph, meta } from "@/lib/seo"

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = comparisonBySlug((await params).slug)
  if (!c) return {}
  return meta({ title: c.title, description: c.description, path: `/compare/${c.slug}`, image: `/compare/${c.slug}/opengraph-image`, keywords: [`${c.other.toLowerCase()} alternative`, `minidev ui vs ${c.other.toLowerCase()}`, `${c.other.toLowerCase()} vs`] })
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })

export default async function ComparePage({ params }: Params) {
  const c = comparisonBySlug((await params).slug)
  if (!c) notFound()
  const path = `/compare/${c.slug}`
  const others = COMPARISONS.filter((x) => x.slug !== c.slug)
  return (
    <ContentShell>
      <JsonLd
        data={graph(
          { "@type": "WebPage", name: c.title, description: c.description, url: abs(path), dateModified: c.checked, about: [{ "@type": "SoftwareSourceCode", name: "MiniDev UI" }, { "@type": "SoftwareSourceCode", name: c.other, url: c.otherUrl }] },
          breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Compare", path: "/compare" }, { name: `vs ${c.other}`, path }]),
          faqLd(c.faq),
        )}
      />
      <div className="mx-auto max-w-4xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "Compare", href: "/compare" }, { name: `vs ${c.other}` }]} />
        <h1 className="mt-4 text-[2.25rem] leading-[1.06] font-medium tracking-[-0.045em] text-fg sm:text-[3rem]">{c.title}</h1>
        <p className="mt-3 font-mono text-[12px] text-fg-subtle">Facts checked {fmt(c.checked)}</p>
        <div className="mt-8 rounded-2xl border border-accent-line bg-accent-soft p-6 text-[1.0625rem] leading-[1.7] text-fg">
          <Inline text={c.summary} />
        </div>

        <h2 className="mt-14 text-[1.75rem] font-medium tracking-[-0.03em] text-fg">At a glance</h2>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[600px] text-left text-[0.875rem]">
            <thead className="bg-sunken">
              <tr>
                <th className="w-[26%] px-4 py-3 font-medium text-fg-muted">Feature</th>
                <th className="px-4 py-3 font-medium text-fg">MiniDev UI</th>
                <th className="px-4 py-3 font-medium text-fg">
                  <a href={c.otherUrl} target="_blank" rel="noopener" className="hover:underline">{c.other}</a>
                </th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r) => (
                <tr key={r.feature} className="border-t border-border align-top">
                  <th scope="row" className="px-4 py-3 font-medium text-fg">{r.feature}</th>
                  <td className="px-4 py-3 text-fg-muted"><Inline text={r.minidev} /></td>
                  <td className="px-4 py-3 text-fg-muted"><Inline text={r.other} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <Blocks blocks={c.body} />
        </div>
        <FaqList faq={c.faq} />

        <section className="mt-14">
          <h2 className="text-[1.125rem] font-medium text-fg">Sources</h2>
          <ul className="mt-3 space-y-1.5 text-[0.8125rem]">
            {c.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener nofollow" className="text-fg-muted underline decoration-border-strong underline-offset-4 hover:text-fg">{s.label}</a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.8125rem] leading-[1.6] text-fg-subtle">{c.other} is a trademark of its owner. This page is our own summary, checked on {fmt(c.checked)}. Pricing and features change, so confirm on their site.</p>
        </section>
        <StudioNote />
        <section className="mt-14">
          <h2 className="text-[1.125rem] font-medium text-fg">Other comparisons</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {others.map((o) => (
              <Link key={o.slug} href={`/compare/${o.slug}`} className="rounded-xl border border-border bg-surface px-3.5 py-2 text-[0.875rem] text-fg shadow-key hover:border-border-strong">vs {o.other}</Link>
            ))}
          </div>
        </section>
      </div>
    </ContentShell>
  )
}
