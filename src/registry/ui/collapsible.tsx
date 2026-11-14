"use client"
import * as React from "react"
import { Collapsible as CollapsibleNamespace } from "@base-ui/react/collapsible"
import { cn } from "@/lib/utils"

/**
 * A single show-and-hide section built on Base UI: a full-width trigger button and a panel it opens.
 *
 * Use for one optional block (advanced settings, an address, "show more"). For a stack of sections use Accordion;
 * for a table row that expands use ExpandableRow. The trigger gets `aria-expanded` and `aria-controls` automatically.
 *
 * Key props (on `Collapsible`): `open` / `defaultOpen`, `onOpenChange(open)`, `disabled`.
 * Style the open state with `data-panel-open` on the trigger (e.g. rotate a chevron with `group-data-[panel-open]:rotate-180`).
 *
 * @example
 * <Collapsible defaultOpen>
 *   <CollapsibleTrigger className="group">Advanced <ChevronDownIcon className="size-4 transition-transform group-data-[panel-open]:rotate-180" /></CollapsibleTrigger>
 *   <CollapsiblePanel>Webhook retries, idempotency keys and rate limits.</CollapsiblePanel>
 * </Collapsible>
 */
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
        "transition-[background-color] duration-[70ms] hover:bg-sunken",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "data-disabled:pointer-events-none data-disabled:opacity-45",
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
