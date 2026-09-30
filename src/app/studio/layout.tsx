import type { Metadata } from "next"
import { PAGE_SEO, STUDIO_FAQ } from "@/content/pages"
import { meta } from "@/lib/seo"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbLd, faqLd, graph, serviceLd } from "@/lib/seo"

export const metadata: Metadata = meta({ ...PAGE_SEO.studio, path: "/studio" })

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={graph(serviceLd(), breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Hire us", path: "/studio" }]), faqLd(STUDIO_FAQ))} />
      {children}
    </>
  )
}
