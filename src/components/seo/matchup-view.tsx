import type { Block, Matchup } from "@/content/types"
import { MATCHUPS } from "@/content/matchups"
import { alternativesBySlug } from "@/content/alternatives"
import { alternativesLink, libraryById, matchupLink } from "@/content/libraries"
import { Blocks, ContentShell, Crumbs, FaqList, Inline, StudioNote } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { LinkChips, SourceList, formatDate } from "@/components/seo/compare-parts"
import { abs, breadcrumbLd, faqLd, graph } from "@/lib/seo"

/** A head to head page for two other libraries. Rendered by /compare/[slug] when the slug is a matchup. */
export function MatchupView({ m }: { m: Matchup }) {
  const a = libraryById(m.a)
  const b = libraryById(m.b)
  const path = `/compare/${m.slug}`
  const label = `${a.name} vs ${b.name}`
  const fits: Block[] = [{ type: "h2", text: "Where MiniDev UI fits", id: "where-minidev-ui-fits" }, ...m.minidev.map((text): Block => ({ type: "p", text }))]
  const related = [
    { href: a.comparison, label: `MiniDev UI vs ${a.name}` },
    { href: b.comparison, label: `MiniDev UI vs ${b.name}` },
    ...[m.a, m.b].filter((id) => alternativesBySlug(id)).map(alternativesLink),
  ]
  const more = MATCHUPS.filter((x) => x.slug !== m.slug).map(matchupLink)
  return (
    <ContentShell>
      <JsonLd
        data={graph(
          {
            "@type": "WebPage",
            name: m.title,
            description: m.description,
            url: abs(path),
            dateModified: m.checked,
            about: [
              { "@type": "SoftwareSourceCode", name: a.name, url: a.url },
              { "@type": "SoftwareSourceCode", name: b.name, url: b.url },
            ],
          },
          breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Compare", path: "/compare" }, { name: label, path }]),
          faqLd(m.faq),
        )}
      />
      <div className="mx-auto max-w-4xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "Compare", href: "/compare" }, { name: label }]} />
        <h1 className="mt-4 text-[2.25rem] leading-[1.06] font-medium tracking-[-0.045em] text-fg sm:text-[3rem]">{m.title}</h1>
        <p className="mt-3 font-mono text-[12px] text-fg-subtle">Facts checked {formatDate(m.checked)}</p>
        <div className="mt-8 rounded-2xl border border-accent-line bg-accent-soft p-6 text-[1.0625rem] leading-[1.7] text-fg">
          <p>
            <Inline text={m.verdict} />
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <strong className="font-semibold">Pick {a.name} if</strong> <Inline text={m.pickA} />
            </li>
            <li>
              <strong className="font-semibold">Pick {b.name} if</strong> <Inline text={m.pickB} />
            </li>
          </ul>
        </div>

        <h2 className="mt-14 text-[1.75rem] font-medium tracking-[-0.03em] text-fg">At a glance</h2>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[600px] text-left text-[0.875rem]">
            <thead className="bg-sunken">
              <tr>
                <th className="w-[22%] px-4 py-3 font-medium text-fg-muted">Feature</th>
                {[a, b].map((lib) => (
                  <th key={lib.id} className="px-4 py-3 font-medium text-fg">
                    <a href={lib.url} target="_blank" rel="noopener" className="hover:underline">{lib.name}</a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {m.rows.map((r) => (
                <tr key={r.feature} className="border-t border-border align-top">
                  <th scope="row" className="px-4 py-3 font-medium text-fg">{r.feature}</th>
                  <td className="px-4 py-3 text-fg-muted"><Inline text={r.a} /></td>
                  <td className="px-4 py-3 text-fg-muted"><Inline text={r.b} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <Blocks blocks={m.body} />
        </div>
        <div className="mt-5">
          <Blocks blocks={fits} />
        </div>
        <FaqList faq={m.faq} />
        <SourceList
          sources={m.sources}
          note={`${a.name} and ${b.name} are trademarks of their owners. This page is our own summary, checked on ${formatDate(m.checked)}. Pricing and features change, so confirm on their sites.`}
        />
        <StudioNote />
        <LinkChips title="Related comparisons" links={related} />
        <LinkChips title="More head to head" links={more} />
      </div>
    </ContentShell>
  )
}
