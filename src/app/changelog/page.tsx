import type { Metadata } from "next"
import Link from "next/link"
import { CHANGELOG } from "@/content/changelog"
import { ContentShell, Crumbs } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { abs, breadcrumbLd, graph, meta } from "@/lib/seo"

export const metadata: Metadata = meta({
  title: "Changelog: New Components, Tools and Guides",
  description: "What changed in MiniDev UI, release by release: new React components, templates, free tools, guides and fixes. Updated with every release.",
  path: "/changelog",
})

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })

export default function Changelog() {
  return (
    <ContentShell>
      <JsonLd
        data={graph(
          {
            "@type": "Blog",
            name: "MiniDev UI changelog",
            url: abs("/changelog"),
            blogPost: CHANGELOG.map((r) => ({ "@type": "BlogPosting", headline: `${r.version}: ${r.title}`, datePublished: r.date, url: abs(`/changelog#v${r.version.replace(/\./g, "-")}`) })),
          },
          breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Changelog", path: "/changelog" }]),
        )}
      />
      <div className="mx-auto max-w-3xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "Changelog" }]} />
        <h1 className="mt-4 text-4xl leading-[1.02] font-medium tracking-[-0.045em] text-fg sm:text-6xl">Changelog</h1>
        <p className="mt-5 text-[1.125rem] leading-[1.65] text-fg-muted">Every release of MiniDev UI, newest first.</p>
        <ol className="mt-12 space-y-12 border-l border-border pl-6">
          {CHANGELOG.map((r) => (
            <li key={r.version} id={`v${r.version.replace(/\./g, "-")}`} className="relative scroll-mt-24">
              <span aria-hidden className="absolute top-2 -left-[29px] size-2.5 rounded-full border-2 border-bg bg-accent" />
              <p className="font-mono text-[12px] text-fg-subtle">
                v{r.version} · <time dateTime={r.date}>{fmt(r.date)}</time>
              </p>
              <h2 className="mt-1 text-[1.5rem] font-medium tracking-[-0.03em] text-fg">{r.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {r.items.map((it) => (
                  <li key={it.text} className="text-[0.9375rem] leading-[1.65] text-fg-muted">
                    {it.text}{" "}
                    {it.href ? <Link href={it.href} className="whitespace-nowrap text-accent-fg underline decoration-accent-line underline-offset-4">View</Link> : null}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </ContentShell>
  )
}
