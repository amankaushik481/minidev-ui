"use client"
import * as React from "react"
import { BoldIcon, ItalicIcon, LinkIcon, ListIcon, ListOrderedIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Toggle } from "@/registry/ui/toggle"
import { ToggleGroup } from "@/registry/ui/toggle-group"
import { Separator } from "@/registry/ui/separator"

function RichTextToolbar({ className }: { className?: string }) {
  return (
    <div
      data-slot="rich-text-toolbar"
      role="toolbar"
      aria-label="Formatting"
      className={cn(
        "flex flex-wrap items-center gap-1 rounded-xl border border-border bg-surface p-1",
        className
      )}
    >
      <ToggleGroup multiple>
        <Toggle value="bold" size="sm" aria-label="Bold"><BoldIcon className="size-4" /></Toggle>
        <Toggle value="italic" size="sm" aria-label="Italic"><ItalicIcon className="size-4" /></Toggle>
      </ToggleGroup>
      <Separator orientation="vertical" className="mx-1 h-6" />
      <Toggle size="sm" aria-label="Link"><LinkIcon className="size-4" /></Toggle>
      <Toggle size="sm" aria-label="Bullet list"><ListIcon className="size-4" /></Toggle>
      <Toggle size="sm" aria-label="Numbered list"><ListOrderedIcon className="size-4" /></Toggle>
    </div>
  )
}
export { RichTextToolbar }
