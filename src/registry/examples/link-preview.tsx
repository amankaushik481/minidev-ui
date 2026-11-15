"use client"
import { LinkPreview } from "@/registry/ui/link-preview"
import type { Example } from "./types"

// A gradient card as an inline SVG, standing in for an Open Graph image.
const OG_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(252 70% 58%)'/><stop offset='1' stop-color='hsl(200 80% 60%)'/></linearGradient></defs><rect width='1200' height='600' fill='url(#g)'/><rect x='80' y='240' width='520' height='48' rx='8' fill='hsl(0 0% 100% / 0.9)'/><rect x='80' y='310' width='360' height='28' rx='6' fill='hsl(0 0% 100% / 0.6)'/></svg>"
  )

export const examples: Example[] = [
  {
    title: "Shared link with image",
    description: "Fetch the page's Open Graph title, description and image on your server, then pass them in.",
    code: `<LinkPreview
  className="w-full max-w-sm"
  url="https://lumen.example/changelog/scheduled-payouts"
  title="Scheduled payouts are here"
  description="Pick a day of the week and Lumen pays approved bills in one batch, with a summary by email."
  image={OG_IMAGE}
/>`,
    node: (
      <LinkPreview
        className="w-full max-w-sm"
        url="https://lumen.example/changelog/scheduled-payouts"
        title="Scheduled payouts are here"
        description="Pick a day of the week and Lumen pays approved bills in one batch, with a summary by email."
        image={OG_IMAGE}
      />
    ),
  },
  {
    title: "Compact card in a comment",
    description: "Leave out image for a text-only card that fits inside a comment or chat bubble.",
    code: `<div className="w-full max-w-sm space-y-2 rounded-xl border border-border bg-sunken p-3">
  <p className="text-sm text-fg">Maya: here is the policy we agreed on for late fees.</p>
  <LinkPreview
    url="https://docs.lumen.example/billing/late-fees"
    title="Late fees and grace periods"
    description="How Lumen calculates late fees, and how to waive one for a single invoice."
  />
</div>`,
    node: (
      <div className="w-full max-w-sm space-y-2 rounded-xl border border-border bg-sunken p-3">
        <p className="text-sm text-fg">Maya: here is the policy we agreed on for late fees.</p>
        <LinkPreview
          url="https://docs.lumen.example/billing/late-fees"
          title="Late fees and grace periods"
          description="How Lumen calculates late fees, and how to waive one for a single invoice."
        />
      </div>
    ),
  },
]
