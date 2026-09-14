"use client"
import * as React from "react"
import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTitle } from "@/registry/ui/dialog"
function CommandPalette({ open, onOpenChange, commands }: { open: boolean; onOpenChange: (o: boolean) => void; commands: { id: string; label: string; onSelect?: () => void }[] }) {
  const [q, setQ] = React.useState("")
  const filtered = commands.filter(c => c.label.toLowerCase().includes(q.toLowerCase()))
  return (
    <div data-slot="command-palette">
      <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[20%] max-w-lg translate-y-0 gap-0 overflow-hidden p-0" showCloseButton={false}>
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <div className="flex items-center gap-2 border-b border-border px-3">
          <SearchIcon className="size-4 text-fg-muted" />
          <input aria-label="Command search" value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Type a command…" className="h-11 w-full bg-transparent text-sm outline-none" />
        </div>
        <ul className="max-h-64 overflow-auto p-1">
          {filtered.map(c => (
            <li key={c.id}>
              <button type="button" className="flex w-full rounded-lg px-2.5 py-2 text-left text-sm hover:bg-sunken" onClick={() => { c.onSelect?.(); onOpenChange(false) }}>{c.label}</button>
            </li>
          ))}
          {filtered.length===0 ? <li className="px-2.5 py-3 text-xs text-fg-muted">No commands</li> : null}
        </ul>
      </DialogContent>
    </Dialog>
    </div>
  )
}
export { CommandPalette }
