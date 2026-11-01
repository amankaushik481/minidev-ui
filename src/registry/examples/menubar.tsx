"use client"
import * as React from "react"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/registry/ui/menubar"
import type { Example } from "./types"

function ZoomDemo() {
  const [zoom, setZoom] = React.useState(100)
  return (
    <div className="flex flex-col items-center gap-3">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => setZoom((z) => Math.min(200, z + 25))}>Zoom in</MenubarItem>
            <MenubarItem onClick={() => setZoom((z) => Math.max(50, z - 25))}>Zoom out</MenubarItem>
            <MenubarItem disabled={zoom === 100} className="data-[disabled]:text-fg-subtle" onClick={() => setZoom(100)}>Reset zoom</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Window</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Minimize</MenubarItem>
            <MenubarItem>Bring all to front</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <p className="text-xs tabular-nums text-fg-muted">Canvas zoom {zoom}%</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Application menus",
    description: "Each MenubarMenu owns one trigger and its content; once a menu is open, hovering the others switches between them.",
    code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New invoice</MenubarItem>
      <MenubarItem>Import customers</MenubarItem>
      <MenubarItem>Export as CSV</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem disabled className="data-[disabled]:text-fg-subtle">Undo</MenubarItem>
      <MenubarItem>Duplicate line</MenubarItem>
      <MenubarItem>Delete line</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Help</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Keyboard shortcuts</MenubarItem>
      <MenubarItem>Contact support</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
    node: (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New invoice</MenubarItem>
            <MenubarItem>Import customers</MenubarItem>
            <MenubarItem>Export as CSV</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem disabled className="data-[disabled]:text-fg-subtle">Undo</MenubarItem>
            <MenubarItem>Duplicate line</MenubarItem>
            <MenubarItem>Delete line</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Keyboard shortcuts</MenubarItem>
            <MenubarItem>Contact support</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ),
  },
  {
    title: "Items with actions",
    description: "Items take onClick and disabled like buttons, so a menu can drive state elsewhere on the page.",
    code: `function ZoomDemo() {
  const [zoom, setZoom] = React.useState(100)
  return (
    <div className="flex flex-col items-center gap-3">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => setZoom((z) => Math.min(200, z + 25))}>Zoom in</MenubarItem>
            <MenubarItem onClick={() => setZoom((z) => Math.max(50, z - 25))}>Zoom out</MenubarItem>
            <MenubarItem disabled={zoom === 100} className="data-[disabled]:text-fg-subtle" onClick={() => setZoom(100)}>Reset zoom</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Window</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Minimize</MenubarItem>
            <MenubarItem>Bring all to front</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <p className="text-xs tabular-nums text-fg-muted">Canvas zoom {zoom}%</p>
    </div>
  )
}`,
    node: <ZoomDemo />,
  },
]
