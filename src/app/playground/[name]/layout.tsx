import type { Metadata } from "next"
import { abs } from "@/lib/seo"
import { docsMeta } from "@/lib/seo-routes"

type Params = { params: Promise<{ name: string }> }

/** The playground route renders the docs page; point search engines at the docs URL. */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { name } = await params
  return { ...docsMeta(name), alternates: { canonical: abs(`/docs/${name}`) }, robots: { index: false, follow: true } }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
