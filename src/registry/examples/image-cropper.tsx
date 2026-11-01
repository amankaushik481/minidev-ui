"use client"
import * as React from "react"
import { ImageCropper, type CropRect } from "@/registry/ui/image-cropper"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function CoverDemo() {
  const [rect, setRect] = React.useState<CropRect | null>(null)
  const [saved, setSaved] = React.useState(false)
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <ImageCropper
        aspects={["16:9", "3:2"]}
        defaultAspect="16:9"
        allowCircle={false}
        showPreview={false}
        alt="Northwind launch cover"
        onCrop={(r) => {
          setRect(r)
          setSaved(false)
        }}
      />
      <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2">
        <code className="truncate font-mono text-xs text-fg-muted">
          {rect ? `{ x: ${rect.x}, y: ${rect.y}, width: ${rect.width}, height: ${rect.height}, rotation: ${rect.rotation} }` : "Move the image to get a crop"}
        </code>
        <Button size="sm" disabled={!rect || saved} onClick={() => setSaved(true)}>
          {saved ? "Saved" : "Use as cover"}
        </Button>
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Avatar crop",
    description: "One square preset with the circle mask locked on, the usual setup for a profile photo picker.",
    code: `<ImageCropper
  aspects={["1:1"]}
  defaultAspect="1:1"
  defaultCircle
  allowCircle={false}
  alt="Maya Chen's profile photo"
  fileName="maya-chen-avatar.png"
/>`,
    node: (
      <ImageCropper
        aspects={["1:1"]}
        defaultAspect="1:1"
        defaultCircle
        allowCircle={false}
        alt="Maya Chen's profile photo"
        fileName="maya-chen-avatar.png"
      />
    ),
  },
  {
    title: "Reading the crop",
    description: "onCrop fires once an interaction settles with the rectangle in source pixels, ready to send to your server or to getCroppedBlob.",
    code: `function CoverDemo() {
  const [rect, setRect] = React.useState<CropRect | null>(null)
  const [saved, setSaved] = React.useState(false)
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <ImageCropper
        aspects={["16:9", "3:2"]}
        defaultAspect="16:9"
        allowCircle={false}
        showPreview={false}
        alt="Northwind launch cover"
        onCrop={(r) => {
          setRect(r)
          setSaved(false)
        }}
      />
      <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2">
        <code className="truncate font-mono text-xs text-fg-muted">
          {rect ? \`{ x: \${rect.x}, y: \${rect.y}, width: \${rect.width}, height: \${rect.height}, rotation: \${rect.rotation} }\` : "Move the image to get a crop"}
        </code>
        <Button size="sm" disabled={!rect || saved} onClick={() => setSaved(true)}>
          {saved ? "Saved" : "Use as cover"}
        </Button>
      </div>
    </div>
  )
}`,
    node: <CoverDemo />,
  },
]
