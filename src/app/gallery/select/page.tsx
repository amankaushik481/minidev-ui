"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select"
import { Label } from "@/registry/ui/label"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

function DemoSelect({
  id,
  label,
  placeholder = "Pick one",
  disabled,
  ...props
}: {
  id: string
  label: string
  placeholder?: string
  disabled?: boolean
} & React.ComponentProps<typeof Select>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select disabled={disabled} {...props}>
        <SelectTrigger id={id} className="w-56" aria-label={label}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
          <SelectItem value="b">Beta</SelectItem>
          <SelectItem value="c">A very long option label for overflow</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default function SelectGallery() {
  return (
    <GalleryPage title="Select">
      <GallerySection title="Default">
        <DemoSelect id="sel-default" label="Default select" />
      </GallerySection>
      <GallerySection title="States">
        <DemoSelect id="sel-dis" label="Disabled select" disabled placeholder="Disabled" />
        <DemoSelect id="sel-val" label="With value" defaultValue="a" />
        <DemoSelect id="sel-empty" label="Unset" placeholder="Empty / unset" />
      </GallerySection>
      <GallerySection title="RTL">
        <div dir="rtl">
          <DemoSelect id="sel-rtl" label="RTL select" placeholder="اختر" />
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
