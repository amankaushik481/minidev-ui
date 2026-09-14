"use client"
import * as React from "react"
import { ChoiceCard } from "@/registry/ui/choice-card"
import { BuildingIcon, UserIcon } from "lucide-react"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  const [v, setV] = React.useState("team")
  return (
    <GalleryPage title="Choice card">
      <GallerySection title="Selectable">
        <div className="grid w-full max-w-xl gap-3">
          <ChoiceCard title="Personal" description="For solo founders" icon={<UserIcon />} selected={v==="personal"} onClick={() => setV("personal")} />
          <ChoiceCard title="Team" description="Shared workspace" icon={<BuildingIcon />} selected={v==="team"} onClick={() => setV("team")} />
          <ChoiceCard title="Disabled" description="Unavailable" disabled />
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
