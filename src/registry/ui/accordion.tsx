"use client"
import * as React from "react"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Stacked disclosure sections: each item has a header button that shows or hides its panel.
 *
 * Use for FAQs, settings groups and long detail pages where readers scan headings first.
 * Prefer `Tabs` when exactly one view is shown at a time and all are peers, and `Collapsible`
 * for a single show/hide region. Built on Base UI: full keyboard support (Enter/Space toggle,
 * focus moves with Tab), `aria-expanded`/`aria-controls` wired for you.
 *
 * @example
 * <Accordion defaultValue={["billing"]}>
 *   <AccordionItem value="billing">
 *     <AccordionTrigger>How does billing work?</AccordionTrigger>
 *     <AccordionPanel>Invoices go out on the 1st of each month.</AccordionPanel>
 *   </AccordionItem>
 * </Accordion>
 *
 * Key props (on `Accordion`): `value` / `defaultValue` (array of open item values),
 * `onValueChange`, `multiple` (allow several open at once), `disabled`.
 */
function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    />
  )
}

/** One section. Give it a unique `value` so `Accordion` can track whether it is open. */
function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("rounded-xl border border-border bg-surface", className)}
      {...props}
    />
  )
}

/** The header button. Wrapped in a heading element by Base UI; the chevron turns when open. */
function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-fg data-[panel-open]:rounded-b-none",
          "outline-none transition-[background-color] duration-[70ms] hover:bg-sunken/60",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-45",
          "[&[data-panel-open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon aria-hidden className="size-4 shrink-0 text-fg-muted transition-transform duration-[140ms] ease-hairline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

/** The collapsible body. Height animates from Base UI's measured `--accordion-panel-height`. */
function AccordionPanel({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      className={cn(
        "h-[var(--accordion-panel-height)] overflow-hidden text-sm text-fg-muted",
        "transition-[height] duration-200 ease-hairline data-[ending-style]:duration-[160ms] data-[ending-style]:ease-exit",
        "data-[ending-style]:h-0 data-[starting-style]:h-0",
        className
      )}
      {...props}
    >
      <div className="border-t border-border px-4 py-3">{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionPanel }
