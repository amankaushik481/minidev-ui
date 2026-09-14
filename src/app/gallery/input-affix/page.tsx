"use client"

import { MailIcon, SearchIcon } from "lucide-react"
import { InputAffix } from "@/registry/ui/input-affix"
import { Label } from "@/registry/ui/label"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function InputAffixGallery() {
  return (
    <GalleryPage title="Input with affix">
      <GallerySection title="Prefix / suffix">
        <div className="w-72 space-y-2">
          <Label htmlFor="af-search">Search</Label>
          <InputAffix id="af-search" leading={<SearchIcon />} placeholder="Search" />
        </div>
        <div className="w-72 space-y-2">
          <Label htmlFor="af-url">URL</Label>
          <InputAffix id="af-url" leading="https://" placeholder="minidev.pro" />
        </div>
        <div className="w-72 space-y-2">
          <Label htmlFor="af-domain">Domain</Label>
          <InputAffix id="af-domain" trailing=".com" placeholder="domain" />
        </div>
        <div className="w-72 space-y-2">
          <Label htmlFor="af-mail">Email local</Label>
          <InputAffix id="af-mail" leading={<MailIcon />} trailing="@co" placeholder="you" />
        </div>
      </GallerySection>
      <GallerySection title="States">
        <div className="w-72 space-y-2">
          <Label htmlFor="af-dis">Disabled</Label>
          <InputAffix id="af-dis" leading={<SearchIcon />} placeholder="Disabled" disabled />
        </div>
        <div className="w-72 space-y-2">
          <Label htmlFor="af-inv">Invalid</Label>
          <InputAffix id="af-inv" leading={<SearchIcon />} placeholder="Invalid" aria-invalid />
        </div>
        <div className="w-72 space-y-2">
          <Label htmlFor="af-ro">Read only</Label>
          <InputAffix id="af-ro" leading={<SearchIcon />} defaultValue="Read only" readOnly />
        </div>
        <div className="w-72 space-y-2">
          <Label htmlFor="af-empty">Empty</Label>
          <InputAffix id="af-empty" leading={<SearchIcon />} placeholder="" />
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
