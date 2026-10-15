import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRightIcon } from "lucide-react"
import { BLOCK_TYPES, blockTypeBySlug } from "@/content/blocks"
import { categoryById } from "@/content/categories"
import { ContentShell, Crumbs, FaqList, Inline, StudioNote } from "@/components/seo/prose"
import { LiveBlock } from "@/components/seo/live-block"
import { JsonLd } from "@/components/seo/json-ld"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { breadcrumbLd, faqLd, graph, itemListLd, meta } from "@/lib/seo"
import { humanTitle } from "@/lib/seo-routes"
import { SITE } from "@/lib/site"

type Params = { params: Promise<{ type: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return BLOCK_TYPES.map((b) => ({ type: b.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const b = blockTypeBySlug((await params).type)
  if (!b) return {}
  return meta({ title: b.title, description: b.description, path: `/blocks/${b.slug}`, image: `/og/blocks/${b.slug}.jpg`, keywords: b.keywords })
}

export default async function BlockTypePage({ params }: Params) {
  const b = blockTypeBySlug((await params).type)
  if (!b) notFound()
  const entries = b.items.map((n) => COMPONENT_INDEX.find((e) => e.name === n)).filter((e): e is (typeof COMPONENT_INDEX)[number] => Boolean(e))
  const category = categoryById(b.category)
  const others = BLOCK_TYPES.filter((x) => x.slug !== b.slug)
  return (
    <ContentShell>
      <JsonLd
        data={graph(
          { "@type": "CollectionPage", name: b.title, description: b.description, url: `${SITE.url}/blocks/${b.slug}` },
          itemListLd(entries.map((e) => ({ name: humanTitle(e.title), path: `/docs/${e.name}` })), b.h1),
          breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Blocks", path: "/blocks" }, { name: b.name, path: `/blocks/${b.slug}` }]),
          faqLd(b.faq),
        )}
      />
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "Blocks", href: "/blocks" }, { name: b.name }]} />
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.02] font-medium tracking-[-0.045em] text-fg sm:text-[3.5rem]">{b.h1}</h1>
        <p className="mt-5 max-w-2xl text-[1.125rem] leading-[1.65] text-fg-muted">{b.description}</p>
        <div className="mt-6 flex flex-wrap gap-2 text-[12.5px] text-fg-muted">
          {[`${entries.length} blocks`, "Free, MIT", "shadcn CLI compatible", "Tailwind CSS v4", "Light and dark"].map((t) => (
            <span key={t} className="rounded-full border border-border bg-surface px-3 py-1 shadow-xs">{t}</span>
          ))}
        </div>
        <div className="mt-10 grid max-w-3xl grid-cols-1 gap-4">
          {b.intro.map((p) => (
            <p key={p.slice(0, 24)} className="text-[1.0625rem] leading-[1.75] text-fg-muted">
              <Inline text={p} />
            </p>
          ))}
        </div>

        <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {entries.map((e, i) => (
            <LiveBlock key={e.name} name={e.name} priority={i < 2} />
          ))}
        </section>

        <div className="max-w-3xl">
          <FaqList faq={b.faq} />
        </div>

        <section className="mt-16">
          <h2 className="text-[1.25rem] font-medium tracking-[-0.02em] text-fg">More block types</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => (
              <Link key={o.slug} href={`/blocks/${o.slug}`} className="group inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 py-2 text-[0.875rem] text-fg shadow-key hover:border-border-strong">
                {o.name} <ArrowRightIcon className="size-3.5 text-fg-subtle transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
            {category ? (
              <Link href={`/components/${category.id}`} className="inline-flex items-center gap-1.5 rounded-xl border border-accent-line bg-accent-soft px-3.5 py-2 text-[0.875rem] text-fg shadow-key">
                All {category.label.toLowerCase()} components <ArrowRightIcon className="size-3.5" />
              </Link>
            ) : null}
          </div>
        </section>
        <StudioNote />
      </div>
    </ContentShell>
  )
}
