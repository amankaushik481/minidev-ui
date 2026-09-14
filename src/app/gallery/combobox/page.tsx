"use client"
import * as React from "react"
import { Combobox } from "@/registry/ui/combobox"
import { Autocomplete } from "@/registry/ui/autocomplete"
import { MultiSelect } from "@/registry/ui/multi-select"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

const items = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt" },
]

export default function Page() {
  const [c, setC] = React.useState("next")
  const [m, setM] = React.useState<string[]>(["next"])
  return (
    <GalleryPage title="Combobox / autocomplete / multi-select">
      <GallerySection title="Combobox"><Combobox items={items} value={c} onChange={setC} /></GallerySection>
      <GallerySection title="Autocomplete"><Autocomplete options={items.map(i=>i.label)} placeholder="Framework" aria-label="Framework" /></GallerySection>
      <GallerySection title="Multi-select"><MultiSelect items={items} value={m} onChange={setM} /></GallerySection>
    </GalleryPage>
  )
}
