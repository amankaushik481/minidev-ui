"use client"
import { MaterialSwitcher, useMaterial } from "@/registry/ui/light-provider"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function PaperModeButton() {
  const { material, setMaterial } = useMaterial()
  const on = material === "paper"
  return (
    <Button variant="outline" onClick={() => setMaterial(on ? "hairline" : "paper")}>
      {on ? "Back to hairline" : "Reading mode: paper"}
    </Button>
  )
}

export const examples: Example[] = [
  {
    title: "Appearance setting",
    description: "MaterialSwitcher sets data-material on <html>, so every surface on the page changes at once.",
    code: `<div className="flex w-full max-w-md items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4">
  <div>
    <p className="text-sm font-medium text-fg">Material</p>
    <p className="text-xs text-fg-muted">How cards, menus and buttons are drawn.</p>
  </div>
  <MaterialSwitcher size="sm" />
</div>`,
    node: (
      <div className="flex w-full max-w-md items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4">
        <div>
          <p className="text-sm font-medium text-fg">Material</p>
          <p className="text-xs text-fg-muted">How cards, menus and buttons are drawn.</p>
        </div>
        <MaterialSwitcher size="sm" />
      </div>
    ),
  },
  {
    title: "Swatches only",
    description: "labels={false} keeps the switcher small enough for a header; each swatch keeps an aria-label.",
    code: `<MaterialSwitcher labels={false} size="sm" />`,
    node: <MaterialSwitcher labels={false} size="sm" />,
  },
  {
    title: "Your own control",
    description: "useMaterial returns the current material and a setter, for a toggle that fits your product.",
    code: `function PaperModeButton() {
  const { material, setMaterial } = useMaterial()
  const on = material === "paper"
  return (
    <Button variant="outline" onClick={() => setMaterial(on ? "hairline" : "paper")}>
      {on ? "Back to hairline" : "Reading mode: paper"}
    </Button>
  )
}`,
    node: <PaperModeButton />,
  },
]
