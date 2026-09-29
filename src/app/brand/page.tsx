"use client"
import { BrandKit } from "@/components/templates/brand-kit"
import { BRANDS } from "@/components/templates/brands"

export default function MiniDevBrand() {
  return <BrandKit brand={BRANDS.minidev} back={{ href: "/", label: "MiniDev UI" }} />
}
