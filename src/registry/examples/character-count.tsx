"use client"
import * as React from "react"
import { CharacterCount } from "@/registry/ui/character-count"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Textarea } from "@/registry/ui/textarea"
import type { Example } from "./types"

function BioField() {
  const [bio, setBio] = React.useState("Design engineer at Northwind. I write about forms and the small details that make them pleasant.")
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} aria-describedby="bio-count" />
      <CharacterCount id="bio-count" value={bio.length} max={160} className="self-end" />
    </div>
  )
}

function MetaTitle() {
  const [title, setTitle] = React.useState("Spring sale: 20% off every desk lamp")
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="meta-title">Search title</Label>
      <Input id="meta-title" maxLength={60} value={title} onChange={(e) => setTitle(e.target.value)} aria-describedby="meta-title-count" />
      <CharacterCount id="meta-title-count" value={title.length} max={60} warnAt={10} className="self-end" />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Under a bio field",
    description: "Point the textarea's aria-describedby at the counter so screen readers hear the count with the field.",
    code: `function BioField() {
  const [bio, setBio] = React.useState("Design engineer at Northwind. I write about forms and the small details that make them pleasant.")
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} aria-describedby="bio-count" />
      <CharacterCount id="bio-count" value={bio.length} max={160} className="self-end" />
    </div>
  )
}`,
    node: <BioField />,
  },
  {
    title: "Hard cap with maxLength",
    description: "maxLength on the input stops typing at 60; warnAt starts the spoken count 10 characters before.",
    code: `function MetaTitle() {
  const [title, setTitle] = React.useState("Spring sale: 20% off every desk lamp")
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="meta-title">Search title</Label>
      <Input id="meta-title" maxLength={60} value={title} onChange={(e) => setTitle(e.target.value)} aria-describedby="meta-title-count" />
      <CharacterCount id="meta-title-count" value={title.length} max={60} warnAt={10} className="self-end" />
    </div>
  )
}`,
    node: <MetaTitle />,
  },
  {
    title: "Near and over the limit",
    description: "The count turns amber inside the warning zone and red past the limit.",
    code: `<div className="flex flex-col gap-2">
  <CharacterCount value={120} max={160} />
  <CharacterCount value={152} max={160} />
  <CharacterCount value={171} max={160} />
</div>`,
    node: (
      <div className="flex flex-col gap-2">
        <CharacterCount value={120} max={160} />
        <CharacterCount value={152} max={160} />
        <CharacterCount value={171} max={160} />
      </div>
    ),
  },
]
