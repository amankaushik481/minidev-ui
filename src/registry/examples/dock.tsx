import * as React from "react"
import { ChartBarIcon, FileTextIcon, HouseIcon, SettingsIcon, UsersIcon } from "lucide-react"
import { Dock } from "@/registry/premium/dock"
import type { Example } from "./types"

const PAGES = [
  { label: "Overview", icon: HouseIcon },
  { label: "Invoices", icon: FileTextIcon },
  { label: "Customers", icon: UsersIcon },
  { label: "Reports", icon: ChartBarIcon },
]

function AppDock() {
  const [page, setPage] = React.useState("Invoices")
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-fg-muted">
        Open: <span className="font-medium text-fg">{page}</span>
      </p>
      <Dock items={PAGES.map((p) => ({ ...p, active: p.label === page, onClick: () => setPage(p.label) }))} />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom items with links",
    description: "Each item takes a label and a lucide icon; with href it renders a link, and active adds the dot underneath.",
    code: `<Dock
  items={[
    { label: "Overview", icon: HouseIcon, href: "#overview", active: true },
    { label: "Invoices", icon: FileTextIcon, href: "#invoices" },
    { label: "Customers", icon: UsersIcon, href: "#customers" },
    { label: "Reports", icon: ChartBarIcon, href: "#reports" },
    { label: "Settings", icon: SettingsIcon, href: "#settings" },
  ]}
/>`,
    node: (
      <Dock
        items={[
          { label: "Overview", icon: HouseIcon, href: "#overview", active: true },
          { label: "Invoices", icon: FileTextIcon, href: "#invoices" },
          { label: "Customers", icon: UsersIcon, href: "#customers" },
          { label: "Reports", icon: ChartBarIcon, href: "#reports" },
          { label: "Settings", icon: SettingsIcon, href: "#settings" },
        ]}
      />
    ),
  },
  {
    title: "Bigger swell",
    description: "size is the resting icon, magnify the size under the pointer and distance how far the swell reaches.",
    code: `<Dock size={40} magnify={88} distance={180} />`,
    node: <Dock size={40} magnify={88} distance={180} />,
  },
  {
    title: "Active item",
    description: "Keep the current page in state and set active and onClick per item to use the dock as app navigation.",
    code: `const PAGES = [
  { label: "Overview", icon: HouseIcon },
  { label: "Invoices", icon: FileTextIcon },
  { label: "Customers", icon: UsersIcon },
  { label: "Reports", icon: ChartBarIcon },
]

function AppDock() {
  const [page, setPage] = React.useState("Invoices")
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-fg-muted">
        Open: <span className="font-medium text-fg">{page}</span>
      </p>
      <Dock items={PAGES.map((p) => ({ ...p, active: p.label === page, onClick: () => setPage(p.label) }))} />
    </div>
  )
}`,
    node: <AppDock />,
  },
]
