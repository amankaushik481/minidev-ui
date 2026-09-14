"use client"
import * as React from "react"
import { CommandPalette } from "@/registry/ui/command-palette"
function CommandDialog({
  open,
  onOpenChange,
  commands,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  commands: { id: string; label: string; onSelect?: () => void }[]
}) {
  return (
    <div data-slot="command-dialog">
      <CommandPalette open={open} onOpenChange={onOpenChange} commands={commands} />
    </div>
  )
}
export { CommandDialog }
