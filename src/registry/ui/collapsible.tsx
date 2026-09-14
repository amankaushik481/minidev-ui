"use client"
import * as React from "react"
import { Collapsible as CollapsibleNamespace } from "@base-ui/react/collapsible"
import { cn } from "@/lib/utils"

const CollapsibleRoot = CollapsibleNamespace.Root
const CollapsibleTriggerBase = CollapsibleNamespace.Trigger
const CollapsiblePanelBase = CollapsibleNamespace.Panel

function Collapsible(props: React.ComponentProps<typeof CollapsibleRoot>) {
  return <CollapsibleRoot data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({ className, ...props }: React.ComponentProps<typeof CollapsibleTriggerBase>) {
  return (
    <CollapsibleTriggerBase
      data-slot="collapsible-trigger"
      className={cn(
        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-fg outline-none",
        "hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
      {...props}
    />
  )
}

function CollapsiblePanel({ className, ...props }: React.ComponentProps<typeof CollapsiblePanelBase>) {
  return (
    <CollapsiblePanelBase
      data-slot="collapsible-panel"
      className={cn("px-3 pb-3 text-sm text-fg-muted", className)}
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsiblePanel }
