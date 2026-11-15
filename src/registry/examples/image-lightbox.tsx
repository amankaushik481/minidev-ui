"use client"
import * as React from "react"
import { ImageLightbox } from "@/registry/ui/image-lightbox"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

// A drawn receipt as an inline SVG, so the example needs no network.
const RECEIPT =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><rect width='600' height='400' fill='hsl(40 30% 96%)'/><rect x='170' y='30' width='260' height='340' rx='6' fill='hsl(0 0% 100%)' stroke='hsl(220 10% 80%)'/><rect x='200' y='60' width='120' height='14' rx='3' fill='hsl(220 12% 30%)'/><g fill='hsl(220 10% 70%)'><rect x='200' y='110' width='200' height='8' rx='2'/><rect x='200' y='135' width='170' height='8' rx='2'/><rect x='200' y='160' width='190' height='8' rx='2'/><rect x='200' y='185' width='150' height='8' rx='2'/></g><rect x='200' y='240' width='200' height='1' fill='hsl(220 10% 80%)'/><rect x='200' y='260' width='70' height='12' rx='2' fill='hsl(220 12% 30%)'/><rect x='330' y='260' width='70' height='12' rx='2' fill='hsl(252 70% 55%)'/></svg>"
  )

function ControlledLightbox() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ImageLightbox src={RECEIPT} alt="Receipt for INV-2041, Northwind, $4,200.00" open={open} onOpenChange={setOpen} />
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        View receipt
      </Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Attached receipt",
    description: "The alt names both the thumbnail button and the open viewer, so describe what the image shows.",
    code: `<ImageLightbox src={RECEIPT} alt="Receipt for INV-2041, Northwind, $4,200.00" />`,
    node: <ImageLightbox src={RECEIPT} alt="Receipt for INV-2041, Northwind, $4,200.00" />,
  },
  {
    title: "Opened from another button",
    description: "Control it with open and onOpenChange; Escape and a backdrop click still close it through onOpenChange(false).",
    code: `function ControlledLightbox() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ImageLightbox src={RECEIPT} alt="Receipt for INV-2041, Northwind, $4,200.00" open={open} onOpenChange={setOpen} />
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        View receipt
      </Button>
    </div>
  )
}`,
    node: <ControlledLightbox />,
  },
]
