import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og"

export const size = OG_SIZE
export const contentType = OG_TYPE
export const alt = "MiniDev UI: free React and Tailwind components"

export default function Image() {
  return ogImage({
    eyebrow: "500+ components",
    title: "Every UI kit is flat.\nThis one is lit.",
    subtitle: "Free React + Tailwind CSS v4 components, blocks and templates. shadcn-compatible.",
    footer: "npx shadcn add ui.minidev.pro/r/button.json",
  })
}
