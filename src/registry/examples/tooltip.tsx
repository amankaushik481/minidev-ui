import { BoldIcon, ItalicIcon, LinkIcon, UnderlineIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Kbd } from "@/registry/ui/kbd"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/ui/tooltip"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Icon toolbar",
    description: "Icon buttons need a label; one TooltipProvider shares the delay so moving along the toolbar feels instant.",
    code: `<TooltipProvider delay={300}>
  <div role="toolbar" aria-label="Formatting" className="flex items-center gap-0.5 rounded-lg border border-border bg-surface p-1 shadow-xs">
    <Tooltip>
      <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Bold" />}><BoldIcon /></TooltipTrigger>
      <TooltipContent>Bold</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Italic" />}><ItalicIcon /></TooltipTrigger>
      <TooltipContent>Italic</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Underline" />}><UnderlineIcon /></TooltipTrigger>
      <TooltipContent>Underline</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Insert link" />}><LinkIcon /></TooltipTrigger>
      <TooltipContent>Insert link</TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>`,
    node: (
      <TooltipProvider delay={300}>
        <div role="toolbar" aria-label="Formatting" className="flex items-center gap-0.5 rounded-lg border border-border bg-surface p-1 shadow-xs">
          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Bold" />}><BoldIcon /></TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Italic" />}><ItalicIcon /></TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Underline" />}><UnderlineIcon /></TooltipTrigger>
            <TooltipContent>Underline</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Insert link" />}><LinkIcon /></TooltipTrigger>
            <TooltipContent>Insert link</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    ),
  },
  {
    title: "With shortcut",
    description: "Drop a Kbd into the content to show the keyboard shortcut next to the label.",
    code: `<Tooltip>
  <TooltipTrigger render={<Button />}>Save invoice</TooltipTrigger>
  <TooltipContent>
    Save and close <Kbd>⌘S</Kbd>
  </TooltipContent>
</Tooltip>`,
    node: (
      <Tooltip>
        <TooltipTrigger render={<Button />}>Save invoice</TooltipTrigger>
        <TooltipContent>
          Save and close <Kbd>⌘S</Kbd>
        </TooltipContent>
      </Tooltip>
    ),
  },
  {
    title: "Placement",
    description: "side moves the label and its arrow to any edge; it flips when the viewport runs out of room.",
    code: `<div className="flex flex-wrap items-center gap-2">
  <Tooltip>
    <TooltipTrigger render={<Button variant="outline" />}>Bottom</TooltipTrigger>
    <TooltipContent side="bottom">Due in 3 days</TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger render={<Button variant="outline" />}>Left</TooltipTrigger>
    <TooltipContent side="left">Paid by bank transfer</TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger render={<Button variant="outline" />}>Right</TooltipTrigger>
    <TooltipContent side="right">Owned by Maya Chen</TooltipContent>
  </Tooltip>
</div>`,
    node: (
      <div className="flex flex-wrap items-center gap-2">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>Bottom</TooltipTrigger>
          <TooltipContent side="bottom">Due in 3 days</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>Left</TooltipTrigger>
          <TooltipContent side="left">Paid by bank transfer</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>Right</TooltipTrigger>
          <TooltipContent side="right">Owned by Maya Chen</TooltipContent>
        </Tooltip>
      </div>
    ),
  },
]
