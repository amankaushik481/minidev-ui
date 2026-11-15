import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { componentDocs } from "@/content/component-docs"
import { breadcrumbLd, componentLd, faqLd, graph } from "@/lib/seo"
import { componentCopy, docsMeta } from "@/lib/seo-routes"
import { mdPath } from "./markdown"

type Params = { params: Promise<{ name: string }> }

export function generateStaticParams() {
  return COMPONENT_INDEX.map((c) => ({ name: c.name }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { name } = await params
  const m = docsMeta(name)
  if (!COMPONENT_INDEX.some((c) => c.name === name)) return m
  // <link rel="alternate" type="text/markdown"> tells agents where the clean copy of this page lives.
  return { ...m, alternates: { ...m.alternates, types: { "text/markdown": mdPath(name) } } }
}

export default async function Layout({ children, params }: Params & { children: React.ReactNode }) {
  const { name } = await params
  const e = COMPONENT_INDEX.find((c) => c.name === name)
  if (!e) return children
  const c = componentCopy(e)
  const crumbs = [
    { name: "Docs", path: "/docs" },
    ...(c.category ? [{ name: c.category.label, path: `/components/${c.category.id}` }] : []),
    { name: c.name, path: `/docs/${e.name}` },
  ]
  const faq = componentDocs(e.name)?.faq
  return (
    <>
      <JsonLd data={graph(componentLd({ name: e.name, title: c.name, description: c.description, keywords: c.keywords, deps: e.deps }), breadcrumbLd(crumbs), ...(faq?.length ? [faqLd(faq)] : []))} />
      {children}
    </>
  )
}
