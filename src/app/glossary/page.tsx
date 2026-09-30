import type { Metadata } from "next"
import Link from "next/link"
import { GLOSSARY } from "@/content/glossary"
import { ContentShell, Crumbs, StudioNote } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { abs, breadcrumbLd, graph, meta } from "@/lib/seo"

export const metadata: Metadata = meta({
  title: "UI and Front-End Glossary: React, Tailwind and Design Terms",
  description: `${GLOSSARY.length} plain definitions of UI patterns and front-end terms: combobox, design tokens, OKLCH, hydration, skeleton screens, shadcn registry and more.`,
  path: "/glossary",
})

export default function GlossaryIndex() {
  const letters = [...new Set(GLOSSARY.map((t) => t.term[0].toUpperCase().replace(/[^A-Z]/, "#")))].sort()
  const group = (l: string) => GLOSSARY.filter((t) => t.term[0].toUpperCase().replace(/[^A-Z]/, "#") === l)
  return (
    <ContentShell>
      <JsonLd
        data={graph(
          {
            "@type": "DefinedTermSet",
            "@id": abs("/glossary#set"),
            name: "MiniDev UI glossary",
            url: abs("/glossary"),
            hasDefinedTerm: GLOSSARY.map((t) => ({ "@type": "DefinedTerm", name: t.term, description: t.short, url: abs(`/glossary/${t.slug}`) })),
          },
          breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Glossary", path: "/glossary" }]),
        )}
      />
      <div className="mx-auto max-w-5xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "Glossary" }]} />
        <h1 className="mt-4 text-4xl leading-[1.02] font-medium tracking-[-0.045em] text-fg sm:text-6xl">Glossary</h1>
        <p className="mt-5 max-w-2xl text-[1.125rem] leading-[1.65] text-fg-muted">
          Plain definitions of the UI patterns and front-end terms that come up when you build product interfaces with React and Tailwind CSS. Each one links to components that put it into practice.
        </p>
        <nav aria-label="Letters" className="mt-8 flex flex-wrap gap-1.5">
          {letters.map((l) => (
            <a key={l} href={`#letter-${l}`} className="grid size-8 place-items-center rounded-lg border border-border bg-surface font-mono text-[12px] text-fg shadow-key hover:border-border-strong">{l}</a>
          ))}
        </nav>
        <div className="mt-10 space-y-10">
          {letters.map((l) => (
            <section key={l} id={`letter-${l}`} className="scroll-mt-24">
              <h2 className="border-b border-border pb-2 font-mono text-[13px] text-fg-subtle">{l}</h2>
              <dl className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {group(l).map((t) => (
                  <Link key={t.slug} href={`/glossary/${t.slug}`} className="group min-w-0 rounded-2xl border border-border bg-surface p-5 shadow-raised outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
                    <dt className="text-[1rem] font-medium tracking-[-0.015em] text-fg">{t.term}</dt>
                    <dd className="mt-1.5 text-[0.875rem] leading-[1.6] text-fg-muted">{t.short}</dd>
                  </Link>
                ))}
              </dl>
            </section>
          ))}
        </div>
        <StudioNote />
      </div>
    </ContentShell>
  )
}
