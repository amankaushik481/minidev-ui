"use client"
import * as React from "react"
import { WishlistButton } from "@/registry/ui/wishlist-button"
import type { Example } from "./types"

function SavedLamp() {
  const [saved, setSaved] = React.useState(false)
  return (
    <div className="flex w-full max-w-xs items-center justify-between gap-3 rounded-xl border border-border bg-surface p-3">
      <div>
        <p className="text-sm font-medium text-fg">Aurora desk lamp</p>
        <p className="text-xs text-fg-muted">{saved ? "In your wishlist" : "$89"}</p>
      </div>
      <WishlistButton active={saved} onToggle={setSaved} label="Save Aurora desk lamp" />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Controlled, named per product",
    description: "Include the product in label so a grid of hearts is not a list of identical buttons.",
    code: `function SavedLamp() {
  const [saved, setSaved] = React.useState(false)
  return (
    <div className="flex w-full max-w-xs items-center justify-between gap-3 rounded-xl border border-border bg-surface p-3">
      <div>
        <p className="text-sm font-medium text-fg">Aurora desk lamp</p>
        <p className="text-xs text-fg-muted">{saved ? "In your wishlist" : "$89"}</p>
      </div>
      <WishlistButton active={saved} onToggle={setSaved} label="Save Aurora desk lamp" />
    </div>
  )
}`,
    node: <SavedLamp />,
  },
  {
    title: "Already saved",
    description: "Uncontrolled with defaultActive; onToggle still reports each change.",
    code: `<WishlistButton defaultActive label="Save Linen tote" onToggle={(on) => console.log(on)} />`,
    node: <WishlistButton defaultActive label="Save Linen tote" onToggle={(on) => console.log(on)} />,
  },
]
