"use client"
import * as React from "react"
import { SearchIcon } from "lucide-react"
import { CommandPalette } from "@/registry/ui/command-palette"
import { Button } from "@/registry/ui/button"

type Command = { id: string; label: string; onSelect?: () => void }

/** A command palette in a dialog; uncontrolled with its own "Search commands" trigger unless `open` is passed. */
type CommandDialogProps = {
  /** Controlled open state. Leave undefined to get a built-in trigger button and internal state. */
  open?: boolean
  onOpenChange?: (o: boolean) => void
  commands?: Command[]
}

const SAMPLE_COMMANDS: Command[] = [
  { id: "new-invoice", label: "New invoice" },
  { id: "add-customer", label: "Add customer" },
  { id: "record-payment", label: "Record a payment" },
  { id: "go-deploys", label: "Go to deploys" },
  { id: "export-csv", label: "Export customers to CSV" },
  { id: "toggle-theme", label: "Toggle dark mode" },
]

function CommandDialog({ open, onOpenChange, commands = SAMPLE_COMMANDS }: CommandDialogProps) {
  const [inner, setInner] = React.useState(false)
  const uncontrolled = open === undefined
  const isOpen = open ?? inner
  const setOpen = (o: boolean) => {
    if (uncontrolled) setInner(o)
    onOpenChange?.(o)
  }
  return (
    <div data-slot="command-dialog">
      {uncontrolled ? (
        <Button type="button" variant="outline" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={isOpen}>
          <SearchIcon />
          Search commands
        </Button>
      ) : null}
      <CommandPalette open={isOpen} onOpenChange={setOpen} commands={commands} />
    </div>
  )
}
export { CommandDialog }
export type { CommandDialogProps, Command as CommandDialogCommand }
