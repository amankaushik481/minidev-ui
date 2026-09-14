"use client"
import * as React from "react"
import { Sheet } from "@/registry/ui/sheet"
function Drawer(props: React.ComponentProps<typeof Sheet>) {
  return <Sheet data-slot="drawer" side="bottom" {...props} />
}
export { Drawer }
