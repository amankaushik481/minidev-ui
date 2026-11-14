"use client"
import * as React from "react"
import { Toolbar } from "@base-ui/react/toolbar"
import { BoldIcon, ItalicIcon, LinkIcon, ListIcon, ListOrderedIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Toggle } from "@/registry/ui/toggle"
import { ToggleGroup } from "@/registry/ui/toggle-group"

/**
 * RichTextToolbar — a formatting bar (bold, italic, link, bullet and numbered lists) for a text editor.
 *
 * Use it above a Textarea or a contenteditable editor. It is a real ARIA toolbar on Base UI: one
 * Tab stop, arrow keys move between buttons. Wire `onAction` to your editor's commands. For a
 * table's search and filter row use TableToolbar.
 *
 * @example
 * <RichTextToolbar onAction={(action, pressed) => editor.chain().focus().run(action, pressed)} />
 */

type RichTextAction = "bold" | "italic" | "link" | "bullet-list" | "numbered-list"

function RichTextToolbar({
  onAction,
  "aria-label": ariaLabel = "Formatting",
  className,
}: {
  /** Fires with the action and its new pressed state whenever a button toggles. */
  onAction?: (action: RichTextAction, pressed: boolean) => void
  /** Accessible name of the toolbar. */
  "aria-label"?: string
  className?: string
}) {
  const item = (action: RichTextAction, label: string, Icon: React.ElementType) => (
    <Toolbar.Button
      key={action}
      aria-label={label}
      render={<Toggle value={action} size="sm" onPressedChange={(pressed) => onAction?.(action, pressed)} />}
    >
      <Icon className="size-4" aria-hidden />
    </Toolbar.Button>
  )
  return (
    <Toolbar.Root
      data-slot="rich-text-toolbar"
      aria-label={ariaLabel}
      className={cn(
        "flex flex-wrap items-center gap-1 rounded-xl border border-border bg-surface p-1",
        className
      )}
    >
      <ToggleGroup multiple>
        {item("bold", "Bold", BoldIcon)}
        {item("italic", "Italic", ItalicIcon)}
      </ToggleGroup>
      <Toolbar.Separator className="mx-1 h-6 w-px bg-border" />
      {item("link", "Link", LinkIcon)}
      {item("bullet-list", "Bullet list", ListIcon)}
      {item("numbered-list", "Numbered list", ListOrderedIcon)}
    </Toolbar.Root>
  )
}
export { RichTextToolbar }
export type { RichTextAction }
