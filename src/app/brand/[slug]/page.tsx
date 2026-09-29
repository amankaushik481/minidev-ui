"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { BrandKit } from "@/components/templates/brand-kit"
import { BRANDS } from "@/components/templates/brands"

export default function BrandPage() {
  const { slug } = useParams<{ slug: string }>()
  const brand = BRANDS[slug]
  if (!brand) {
    return (
      <div className="grid min-h-[60vh] place-items-center text-center">
        <div>
          <p className="text-2xl font-medium tracking-[-0.03em] text-fg">No brand called “{slug}”.</p>
          <Link href="/templates" className="mt-3 inline-block text-accent-fg underline">See all templates</Link>
        </div>
      </div>
    )
  }
  const back = slug === "minidev" ? { href: "/", label: "MiniDev UI" } : { href: `/templates/${slug}`, label: `${brand.name} site` }
  return <BrandKit brand={brand} back={back} />
}
