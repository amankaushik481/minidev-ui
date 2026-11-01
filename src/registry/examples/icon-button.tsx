import { BellIcon, DownloadIcon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react"
import { IconButton } from "@/registry/ui/icon-button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/ui/tooltip"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Sizes",
    description: "32, 36 and 44px squares; the icon stays 16px so the hit area grows without the glyph getting heavier.",
    code: `<IconButton size="icon-sm" aria-label="Add"><PlusIcon /></IconButton>
<IconButton aria-label="Add"><PlusIcon /></IconButton>
<IconButton size="icon-lg" aria-label="Add"><PlusIcon /></IconButton>`,
    node: (
      <div className="flex items-center gap-2">
        <IconButton size="icon-sm" aria-label="Add"><PlusIcon /></IconButton>
        <IconButton aria-label="Add"><PlusIcon /></IconButton>
        <IconButton size="icon-lg" aria-label="Add"><PlusIcon /></IconButton>
      </div>
    ),
  },
  {
    title: "Variants",
    description: "Outline is the default; ghost suits toolbars and destructive is for the one action that deletes.",
    code: `<IconButton variant="default" aria-label="Edit"><PencilIcon /></IconButton>
<IconButton aria-label="Download"><DownloadIcon /></IconButton>
<IconButton variant="ghost" aria-label="Notifications"><BellIcon /></IconButton>
<IconButton variant="soft" aria-label="Add"><PlusIcon /></IconButton>
<IconButton variant="destructive" aria-label="Delete"><Trash2Icon /></IconButton>`,
    node: (
      <div className="flex flex-wrap items-center gap-2">
        <IconButton variant="default" aria-label="Edit"><PencilIcon /></IconButton>
        <IconButton aria-label="Download"><DownloadIcon /></IconButton>
        <IconButton variant="ghost" aria-label="Notifications"><BellIcon /></IconButton>
        <IconButton variant="soft" aria-label="Add"><PlusIcon /></IconButton>
        <IconButton variant="destructive" aria-label="Delete"><Trash2Icon /></IconButton>
      </div>
    ),
  },
  {
    title: "With tooltip",
    description: "Pass the whole IconButton, icon included, to the trigger render prop; the tooltip repeats the aria-label on hover and focus.",
    code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<IconButton variant="ghost" aria-label="Download invoice PDF"><DownloadIcon /></IconButton>} />
    <TooltipContent>Download PDF</TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger render={<IconButton variant="ghost" aria-label="Delete invoice"><Trash2Icon /></IconButton>} />
    <TooltipContent>Delete</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    node: (
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger render={<IconButton variant="ghost" aria-label="Download invoice PDF"><DownloadIcon /></IconButton>} />
            <TooltipContent>Download PDF</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<IconButton variant="ghost" aria-label="Delete invoice"><Trash2Icon /></IconButton>} />
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
]
