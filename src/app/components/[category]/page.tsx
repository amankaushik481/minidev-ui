import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRightIcon, BookOpenIcon } from "lucide-react"
import { CATEGORIES, categoryById } from "@/content/categories"
import { componentsInCategory } from "@/content/component-seo"
import { guideBySlug } from "@/content/guides"
import { ComponentCard, ContentShell, Crumbs, FaqList, Inline, StudioNote } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { GALLERY_ENTRIES } from "@/lib/gallery-catalog"
import { breadcrumbLd, faqLd, graph, itemListLd, meta } from "@/lib/seo"
import { humanTitle } from "@/lib/seo-routes"
import { SITE } from "@/lib/site"

type Params = { params: Promise<{ category: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = categoryById((await params).category)
  if (!c) return {}
  const n = componentsInCategory(c.id).length
  return meta({ title: c.title, description: c.description, path: `/components/${c.id}`, image: `/components/${c.id}/opengraph-image`, keywords: [c.h1.toLowerCase(), `free ${c.label.toLowerCase()} components`, `tailwind ${c.label.toLowerCase()}`, `shadcn ${c.label.toLowerCase()}`, `${n} components`] })
}

const GROUPS = [
  { kind: "ui", label: "Components" },
  { kind: "block", label: "Blocks and full pages" },
  { kind: "premium", label: "Motion" },
] as const

export default async function CategoryPage({ params }: Params) {
  const c = categoryById((await params).category)
  if (!c) notFound()
  const names = componentsInCategory(c.id)
  const entries = names.map((n) => COMPONENT_INDEX.find((e) => e.name === n)).filter((e): e is (typeof COMPONENT_INDEX)[number] => Boolean(e))
  const galleries = c.galleries.map((s) => GALLERY_ENTRIES.find((g) => g.slug === s)).filter((g): g is (typeof GALLERY_ENTRIES)[number] => Boolean(g))
  const guide = c.guide ? guideBySlug(c.guide) : undefined
  const related = c.related.map(categoryById).filter((x): x is NonNullable<typeof x> => Boolean(x))
  return (
    <ContentShell>
      <JsonLd
        data={graph(
          { "@type": "CollectionPage", name: c.title, description: c.description, url: `${SITE.url}/components/${c.id}` },
          itemListLd(entries.map((e) => ({ name: humanTitle(e.title), path: `/docs/${e.name}` })), c.h1),
          breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Components", path: "/components" }, { name: c.label, path: `/components/${c.id}` }]),
          faqLd(c.faq),
        )}
      />
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "Components", href: "/components" }, { name: c.label }]} />
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.02] font-medium tracking-[-0.045em] text-fg sm:text-[3.5rem]">{c.h1.replace(/^./, (m) => m.toUpperCase())}</h1>
        <p className="mt-5 max-w-2xl text-[1.125rem] leading-[1.65] text-fg-muted">{c.description}</p>
        <div className="mt-6 flex flex-wrap gap-2 text-[12.5px] text-fg-muted">
          {[`${entries.length} items`, "Free, MIT", "shadcn CLI compatible", "Tailwind CSS v4", "Light and dark"].map((t) => (
            <span key={t} className="rounded-full border border-border bg-surface px-3 py-1 shadow-xs">{t}</span>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 max-w-3xl gap-4">
          {c.intro.map((p) => (
            <p key={p.slice(0, 20)} className="text-[1.0625rem] leading-[1.75] text-fg-muted">
              <Inline text={p} />
            </p>
          ))}
        </div>

        {GROUPS.map((g) => {
          const list = entries.filter((e) => e.kind === g.kind)
          if (!list.length) return null
          return (
            <section key={g.kind} className="mt-14">
              <h2 className="text-[1.5rem] font-medium tracking-[-0.03em] text-fg">
                {g.label} <span className="font-mono text-[0.875rem] text-fg-subtle">{list.length}</span>
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {list.map((e) => (
                  <ComponentCard key={e.name} name={e.name} />
                ))}
              </div>
            </section>
          )
        })}

        {galleries.length || guide ? (
          <section className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
            {galleries.length ? (
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-raised">
                <h2 className="text-[1.0625rem] font-medium text-fg">See them live</h2>
                <p className="mt-1 text-[0.875rem] text-fg-muted">Galleries render these components with sample data in every state.</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {galleries.map((gl) => (
                    <li key={gl.slug}>
                      <Link href={`/gallery/${gl.slug}`} className="inline-flex rounded-lg border border-border bg-bg px-2.5 py-1 text-[0.8125rem] text-fg shadow-key hover:border-border-strong">
                        {gl.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {guide ? (
              <Link href={`/guides/${guide.slug}`} className="group rounded-2xl border border-border bg-surface p-6 shadow-raised outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
                <span className="flex items-center gap-2 text-[12px] font-medium tracking-[0.06em] text-accent-fg uppercase">
                  <BookOpenIcon className="size-3.5" /> Guide
                </span>
                <span className="mt-2 block text-[1.0625rem] font-medium tracking-[-0.02em] text-fg">{guide.title}</span>
                <span className="mt-1 block text-[0.875rem] leading-[1.6] text-fg-muted">{guide.description}</span>
              </Link>
            ) : null}
          </section>
        ) : null}

        <div className="max-w-3xl">
          <FaqList faq={c.faq} />
        </div>

        <section className="mt-16">
          <h2 className="text-[1.25rem] font-medium tracking-[-0.02em] text-fg">Related categories</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {related.map((r) => (
              <Link key={r.id} href={`/components/${r.id}`} className="group inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 py-2 text-[0.875rem] text-fg shadow-key hover:border-border-strong">
                {r.h1.replace(/^./, (m) => m.toUpperCase())} <ArrowRightIcon className="size-3.5 text-fg-subtle transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </section>
        <StudioNote />
      </div>
    </ContentShell>
  )
}
