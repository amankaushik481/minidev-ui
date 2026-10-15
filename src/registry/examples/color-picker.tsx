"use client"
import * as React from "react"
import { ColorPicker } from "@/registry/ui/color-picker"
import { FormField } from "@/registry/ui/form-field"
import { Button } from "@/registry/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import type { Example } from "./types"

function ControlledDemo() {
  const [color, setColor] = React.useState("oklch(0.52 0.12 150)")
  return (
    <div className="flex flex-col gap-3">
      <ColorPicker value={color} onChange={setColor} />
      <div className="flex items-center gap-3">
        <span className="inline-flex h-5 items-center gap-1.5 rounded-full border border-border bg-surface px-2 text-[11px] font-medium text-fg">
          <span aria-hidden className="size-2 rounded-full" style={{ background: color }} />
          Paid
        </span>
        <code className="font-mono text-xs text-fg-muted">{color}</code>
      </div>
    </div>
  )
}

function PopoverDemo() {
  const [color, setColor] = React.useState("oklch(0.55 0.19 25)")
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        <span aria-hidden className="size-3.5 rounded-sm border border-border" style={{ background: color }} />
        Accent color
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit">
        <ColorPicker value={color} onChange={setColor} />
      </PopoverContent>
    </Popover>
  )
}

export const examples: Example[] = [
  {
    title: "Controlled value",
    description: "onChange returns the swatch's color string, which you can use anywhere a CSS color goes.",
    code: `function ControlledDemo() {
  const [color, setColor] = React.useState("oklch(0.52 0.12 150)")
  return (
    <div className="flex flex-col gap-3">
      <ColorPicker value={color} onChange={setColor} />
      <div className="flex items-center gap-3">
        <span className="inline-flex h-5 items-center gap-1.5 rounded-full border border-border bg-surface px-2 text-[11px] font-medium text-fg">
          <span aria-hidden className="size-2 rounded-full" style={{ background: color }} />
          Paid
        </span>
        <code className="font-mono text-xs text-fg-muted">{color}</code>
      </div>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "In a popover",
    description: "Show the current color on the trigger and open the swatches on demand.",
    code: `function PopoverDemo() {
  const [color, setColor] = React.useState("oklch(0.55 0.19 25)")
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        <span aria-hidden className="size-3.5 rounded-sm border border-border" style={{ background: color }} />
        Accent color
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit">
        <ColorPicker value={color} onChange={setColor} />
      </PopoverContent>
    </Popover>
  )
}`,
    node: <PopoverDemo />,
  },
  {
    title: "With form field",
    description: "FormField gives the swatches a heading and a hint about where the color is used.",
    code: `<FormField label="Brand color" description="Used for buttons on your hosted invoice page." className="w-fit">
  <ColorPicker />
</FormField>`,
    node: (
      <FormField label="Brand color" description="Used for buttons on your hosted invoice page." className="w-fit">
        <ColorPicker />
      </FormField>
    ),
  },
]
