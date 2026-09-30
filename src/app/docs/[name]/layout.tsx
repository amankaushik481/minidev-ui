import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { breadcrumbLd, componentLd, graph } from "@/lib/seo"
import { componentCopy, docsMeta } from "@/lib/seo-routes"

type Params = { params: Promise<{ name: string }> }

export function generateStaticParams() {
  return COMPONENT_INDEX.map((c) => ({ name: c.name }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { name } = await params
  return docsMeta(name)
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
  return (
    <>
      <JsonLd data={graph(componentLd({ name: e.name, title: c.name, description: c.description, keywords: c.keywords, deps: e.deps }), breadcrumbLd(crumbs))} />
      {children}
    </>
  )
}
