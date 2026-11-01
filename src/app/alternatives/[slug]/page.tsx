import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRightIcon } from "lucide-react"
import { ALTERNATIVES, alternativesBySlug } from "@/content/alternatives"
import { matchupsFor } from "@/content/matchups"
import { alternativeEntry, alternativesLink, libraryById, matchupLink } from "@/content/libraries"
import { Blocks, ContentShell, Crumbs, FaqList, Inline, StudioNote } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { LinkChips, SourceList, formatDate } from "@/components/seo/compare-parts"
import { breadcrumbLd, faqLd, graph, itemListLd, meta } from "@/lib/seo"

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return ALTERNATIVES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = alternativesBySlug((await params).slug)
  if (!p) return {}
  const name = libraryById(p.slug).name.toLowerCase()
  // No image of its own: meta() falls back to the site default social card.
  return meta({ title: p.title, description: p.description, path: `/alternatives/${p.slug}`, keywords: [`${name} alternatives`, `${name} alternative`, `best ${name} alternative`, `free ${name} alternative`] })
}

const DISCLOSURE =
  "MiniDev UI is on this list, and this page is written by the team that makes it. It is described in the same terms as the others and placed where it fits, not at the top by default."

export default async function AlternativesPage({ params }: Params) {
  const p = alternativesBySlug((await params).slug)
  if (!p) notFound()
  const lib = libraryById(p.slug)
  const path = `/alternatives/${p.slug}`
  const items = p.items.map((it) => ({ ...it, ...alternativeEntry(p.slug, it) }))
  const related = [{ href: lib.comparison, label: `MiniDev UI vs ${lib.name}` }, ...matchupsFor(p.slug).map(matchupLink)]
  const others = ALTERNATIVES.filter((x) => x.slug !== p.slug).map((x) => alternativesLink(x.slug))
  return (
    <ContentShell>
      <JsonLd
        data={graph(
          itemListLd(items.map((it) => ({ name: it.name, path: it.compare.href })), p.title),
          breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Alternatives", path: "/alternatives" }, { name: lib.name, path }]),
          faqLd(p.faq),
        )}
      />
      <div className="mx-auto max-w-4xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "Alternatives", href: "/alternatives" }, { name: lib.name }]} />
        <h1 className="mt-4 text-[2.25rem] leading-[1.06] font-medium tracking-[-0.045em] text-fg sm:text-[3rem]">{p.title}</h1>
        <p className="mt-3 font-mono text-[12px] text-fg-subtle">Facts checked {formatDate(p.checked)}</p>
        <div className="mt-8 rounded-2xl border border-accent-line bg-accent-soft p-6 text-[1.0625rem] leading-[1.7] text-fg">
          <Inline text={p.intro} />
        </div>
        <div className="mt-5">
          <Blocks blocks={[{ type: "callout", tone: "note", text: DISCLOSURE }]} />
        </div>

        <h2 id="at-a-glance" className="mt-14 scroll-mt-24 text-[1.75rem] font-medium tracking-[-0.03em] text-fg">At a glance</h2>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[640px] text-left text-[0.875rem]">
            <thead className="bg-sunken">
              <tr>
                <th className="w-[22%] px-4 py-3 font-medium text-fg-muted">Library</th>
                <th className="px-4 py-3 font-medium text-fg-muted">Price and license</th>
                <th className="px-4 py-3 font-medium text-fg-muted">Best for</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-t border-border align-top">
                  <th scope="row" className="px-4 py-3 font-medium text-fg">
                    <a href={`#${it.id}`} className="hover:underline">{it.name}</a>
                  </th>
                  <td className="px-4 py-3 text-fg-muted"><Inline text={it.price} /></td>
                  <td className="px-4 py-3 text-fg-muted"><Inline text={it.bestFor} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-6">
          {items.map((it, i) => (
            <section key={it.id} aria-labelledby={it.id}>
              <h2 id={it.id} className="scroll-mt-24 pt-8 text-[1.75rem] leading-[1.15] font-medium tracking-[-0.03em] text-fg">
                <a href={`#${it.id}`} className="outline-none hover:underline hover:decoration-border-strong hover:underline-offset-8">
                  {i + 1}. {it.name}
                </a>
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.75] text-fg-muted">
                <Inline text={it.what} />
              </p>
              <dl className="mt-5 divide-y divide-border rounded-xl border border-border bg-surface text-[0.9375rem] leading-[1.6]">
                {[
                  { term: "Price and license", text: it.price },
                  { term: "Styling", text: it.styling },
                  { term: "Best for", text: it.bestFor },
                ].map((row) => (
                  <div key={row.term} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-4">
                    <dt className="font-medium text-fg">{row.term}</dt>
                    <dd className="text-fg-muted"><Inline text={row.text} /></dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.875rem]">
                <Link href={it.compare.href} className="group inline-flex items-center gap-1.5 font-medium text-fg hover:underline hover:underline-offset-4">
                  {it.compare.label} <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                {/^https?:/.test(it.site.href) ? (
                  <a href={it.site.href} target="_blank" rel="noopener" className="text-fg-muted underline decoration-border-strong underline-offset-4 hover:text-fg">{it.site.label}</a>
                ) : (
                  <Link href={it.site.href} className="text-fg-muted underline decoration-border-strong underline-offset-4 hover:text-fg">{it.site.label}</Link>
                )}
              </p>
            </section>
          ))}
        </div>

        {p.body?.length ? (
          <div className="mt-6">
            <Blocks blocks={p.body} />
          </div>
        ) : null}
        <FaqList faq={p.faq} />
        <SourceList
          sources={p.sources}
          note={`Product names are trademarks of their owners. This page is our own summary, checked on ${formatDate(p.checked)}. Pricing and features change, so confirm on each project's site.`}
        />
        <StudioNote />
        <LinkChips title="Related comparisons" links={related} />
        <LinkChips title="More alternatives" links={others} />
      </div>
    </ContentShell>
  )
}
