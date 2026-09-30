import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TOOLS, toolBySlug } from "@/content/tools"
import { Blocks, ComponentCard, ContentShell, Crumbs, FaqList, StudioNote } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { ShadowGenerator } from "@/components/tools/shadow-generator"
import { GlassGenerator } from "@/components/tools/glass-generator"
import { PaletteGenerator } from "@/components/tools/palette-generator"
import { BrandKitGenerator } from "@/components/tools/brand-kit-generator"
import { ThemeGenerator } from "@/components/tools/theme-generator"
import { ColorConverter } from "@/components/tools/color-converter"
import { ContrastChecker } from "@/components/tools/contrast-checker"
import { FluidTypeCalculator } from "@/components/tools/fluid-type"
import { MeshGradient } from "@/components/tools/mesh-gradient"
import { NoiseGenerator } from "@/components/tools/noise-generator"
import { abs, breadcrumbLd, faqLd, graph, meta, webAppLd } from "@/lib/seo"

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const t = toolBySlug((await params).slug)
  if (!t) return {}
  return meta({ title: t.title, description: t.description, path: `/tools/${t.slug}`, image: `/tools/${t.slug}/opengraph-image`, keywords: t.keywords })
}

const UI: Record<string, () => React.ReactElement> = {
  "box-shadow-generator": ShadowGenerator,
  "glassmorphism-generator": GlassGenerator,
  "oklch-palette-generator": PaletteGenerator,
  "brand-kit-generator": BrandKitGenerator,
  "shadcn-theme-generator": ThemeGenerator,
  "hex-to-oklch": ColorConverter,
  "contrast-checker": ContrastChecker,
  "fluid-type-calculator": FluidTypeCalculator,
  "mesh-gradient-generator": MeshGradient,
  "noise-texture-generator": NoiseGenerator,
}

export default async function ToolPage({ params }: Params) {
  const t = toolBySlug((await params).slug)
  if (!t) notFound()
  const Tool = UI[t.slug]
  const path = `/tools/${t.slug}`
  const others = TOOLS.filter((x) => x.slug !== t.slug)
  return (
    <ContentShell>
      <JsonLd
        data={graph(
          webAppLd({ name: t.title, description: t.description, path }),
          {
            "@type": "HowTo",
            name: `How to use the ${t.name.toLowerCase()}`,
            step: t.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, text: s, url: `${abs(path)}#how-to` })),
          },
          breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Tools", path: "/tools" }, { name: t.name, path }]),
          faqLd(t.faq),
        )}
      />
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "Tools", href: "/tools" }, { name: t.name }]} />
        <h1 className="mt-4 max-w-4xl text-[2.25rem] leading-[1.04] font-medium tracking-[-0.045em] text-fg sm:text-[3.25rem]">{t.h1}</h1>
        <p className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.65] text-fg-muted">{t.description}</p>
        <div className="mt-10">{Tool ? <Tool /> : null}</div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0 max-w-3xl">
            <section id="how-to" className="scroll-mt-24">
              <h2 className="text-[1.75rem] font-medium tracking-[-0.03em] text-fg">How to use it</h2>
              <ol className="mt-5 space-y-3">
                {t.steps.map((s, i) => (
                  <li key={s} className="flex gap-4 text-[1rem] leading-[1.65] text-fg-muted">
                    <span className="grid grid-cols-1 size-7 shrink-0 place-items-center rounded-full border border-border bg-surface font-mono text-[12px] text-fg">{i + 1}</span>
                    <span className="pt-0.5">{s}</span>
                  </li>
                ))}
              </ol>
            </section>
            <div className="mt-6">
              <Blocks blocks={t.body} />
            </div>
            <FaqList faq={t.faq} />
          </div>
          <aside className="space-y-4">
            <p className="text-[12px] font-medium tracking-[0.06em] text-fg-subtle uppercase">Related components</p>
            {t.related.map((n) => (
              <ComponentCard key={n} name={n} />
            ))}
            <p className="pt-4 text-[12px] font-medium tracking-[0.06em] text-fg-subtle uppercase">More tools</p>
            <ul className="space-y-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/tools/${o.slug}`} className="text-[0.875rem] text-fg-muted underline decoration-border-strong underline-offset-4 hover:text-fg">{o.name}</Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <StudioNote />
      </div>
    </ContentShell>
  )
}
