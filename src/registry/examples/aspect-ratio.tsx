"use client"
import { PlayIcon } from "lucide-react"
import { AspectRatio } from "@/registry/ui/aspect-ratio"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Video thumbnails",
    description: "The default 16 / 9 holds each thumbnail's shape; the play icon and duration are positioned absolutely inside.",
    code: `<div className="grid w-full max-w-2xl gap-4 sm:grid-cols-3">
  {[["Send your first invoice", "2:14"], ["Set up reminders", "1:48"], ["Export to CSV", "0:56"]].map(([title, length]) => (
    <div key={title} className="space-y-2">
      <AspectRatio className="rounded-lg border border-border bg-sunken">
        <PlayIcon aria-hidden className="absolute inset-0 m-auto size-6 text-fg-subtle" />
        <span className="absolute right-2 bottom-2 rounded bg-surface px-1.5 font-mono text-[11px] text-fg tabular-nums">{length}</span>
      </AspectRatio>
      <p className="text-sm text-fg">{title}</p>
    </div>
  ))}
</div>`,
    node: (
      <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-3">
        {[["Send your first invoice", "2:14"], ["Set up reminders", "1:48"], ["Export to CSV", "0:56"]].map(([title, length]) => (
          <div key={title} className="space-y-2">
            <AspectRatio className="rounded-lg border border-border bg-sunken">
              <PlayIcon aria-hidden className="absolute inset-0 m-auto size-6 text-fg-subtle" />
              <span className="absolute right-2 bottom-2 rounded bg-surface px-1.5 font-mono text-[11px] text-fg tabular-nums">{length}</span>
            </AspectRatio>
            <p className="text-sm text-fg">{title}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Link preview from stored dimensions",
    description: "Pass width / height from your CMS: 1200 / 630 is the usual social share image.",
    code: `<div className="w-full max-w-sm overflow-hidden rounded-xl border border-border bg-surface">
  <AspectRatio ratio={1200 / 630} className="bg-accent-soft">
    <p className="absolute inset-0 grid place-items-center px-6 text-center text-lg font-medium text-fg">Lumen 2.4: CSV export is here</p>
  </AspectRatio>
  <div className="space-y-0.5 p-3">
    <p className="text-xs text-fg-subtle">lumen.example</p>
    <p className="text-sm font-medium text-fg">Export every invoice with its line items</p>
  </div>
</div>`,
    node: (
      <div className="w-full max-w-sm overflow-hidden rounded-xl border border-border bg-surface">
        <AspectRatio ratio={1200 / 630} className="bg-accent-soft">
          <p className="absolute inset-0 grid place-items-center px-6 text-center text-lg font-medium text-fg">Lumen 2.4: CSV export is here</p>
        </AspectRatio>
        <div className="space-y-0.5 p-3">
          <p className="text-xs text-fg-subtle">lumen.example</p>
          <p className="text-sm font-medium text-fg">Export every invoice with its line items</p>
        </div>
      </div>
    ),
  },
]
