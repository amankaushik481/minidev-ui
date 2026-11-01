import { ArrowDownIcon, ArrowUpIcon, SearchIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Kbd, KbdGroup } from "@/registry/ui/kbd"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Key combinations",
    description: "KbdGroup spaces the keys of one shortcut; use the platform glyphs or spelled out names.",
    code: `<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>Shift</Kbd>
  <Kbd>P</Kbd>
</KbdGroup>
<KbdGroup>
  <Kbd><ArrowUpIcon /></Kbd>
  <Kbd><ArrowDownIcon /></Kbd>
</KbdGroup>`,
    node: (
      <div className="flex flex-wrap items-center gap-6">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd><ArrowUpIcon /></Kbd>
          <Kbd><ArrowDownIcon /></Kbd>
        </KbdGroup>
      </div>
    ),
  },
  {
    title: "Inside a button",
    description: "A keycap at the end of an outline button advertises the shortcut without extra copy.",
    code: `<Button variant="outline">
  <SearchIcon /> Search invoices
  <Kbd className="ml-1">⌘K</Kbd>
</Button>`,
    node: (
      <Button variant="outline">
        <SearchIcon /> Search invoices
        <Kbd className="ml-1">⌘K</Kbd>
      </Button>
    ),
  },
  {
    title: "Shortcut list",
    description: "A two column list for a help sheet; sequences read left to right with a plain then between them.",
    code: `<dl className="w-64 divide-y divide-border text-sm">
  <div className="flex items-center justify-between py-2">
    <dt className="text-fg-muted">New invoice</dt>
    <dd><Kbd>N</Kbd></dd>
  </div>
  <div className="flex items-center justify-between py-2">
    <dt className="text-fg-muted">Go to customers</dt>
    <dd className="flex items-center gap-1 text-xs text-fg-subtle"><Kbd>G</Kbd> then <Kbd>C</Kbd></dd>
  </div>
  <div className="flex items-center justify-between py-2">
    <dt className="text-fg-muted">Toggle sidebar</dt>
    <dd><KbdGroup><Kbd>⌘</Kbd><Kbd>\\</Kbd></KbdGroup></dd>
  </div>
</dl>`,
    node: (
      <dl className="w-64 divide-y divide-border text-sm">
        <div className="flex items-center justify-between py-2">
          <dt className="text-fg-muted">New invoice</dt>
          <dd><Kbd>N</Kbd></dd>
        </div>
        <div className="flex items-center justify-between py-2">
          <dt className="text-fg-muted">Go to customers</dt>
          <dd className="flex items-center gap-1 text-xs text-fg-subtle"><Kbd>G</Kbd> then <Kbd>C</Kbd></dd>
        </div>
        <div className="flex items-center justify-between py-2">
          <dt className="text-fg-muted">Toggle sidebar</dt>
          <dd><KbdGroup><Kbd>⌘</Kbd><Kbd>\</Kbd></KbdGroup></dd>
        </div>
      </dl>
    ),
  },
]
