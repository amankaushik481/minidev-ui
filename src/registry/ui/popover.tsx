"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * Popover — a floating panel anchored to its trigger, built on Base UI; without children it shows a demo trigger and panel.
 *
 * Click or Enter opens it, focus moves inside, Escape or an outside click closes it and
 * focus returns to the trigger. The panel is non-modal and labelled by PopoverTitle.
 * Use it for small interactive content (share links, filters, quick edits); for
 * read-only hints use Tooltip, for a list of commands use DropdownMenu, for blocking
 * decisions use Dialog.
 *
 * @example
 * <Popover>
 *   <PopoverTrigger render={<Button variant="outline" />}>Share</PopoverTrigger>
 *   <PopoverContent align="start">
 *     <PopoverHeader>
 *       <PopoverTitle>Share report</PopoverTitle>
 *       <PopoverDescription>Anyone with the link can view.</PopoverDescription>
 *     </PopoverHeader>
 *     <PopoverClose render={<Button size="sm" />}>Done</PopoverClose>
 *   </PopoverContent>
 * </Popover>
 */

function Popover({ children, ...props }: PopoverPrimitive.Root.Props) {
  return (
    <PopoverPrimitive.Root data-slot="popover" {...props}>
      {children ?? <PopoverDemo />}
    </PopoverPrimitive.Root>
  )
}

// What the zero-prop docs preview renders: a share panel from Lumen.
function PopoverDemo() {
  return (
    <>
      <PopoverTrigger render={<Button variant="outline" />}>Share report</PopoverTrigger>
      <PopoverContent align="start">
        <PopoverHeader>
          <PopoverTitle>Share Q3 revenue</PopoverTitle>
          <PopoverDescription>Anyone at Northwind with the link can view. Editing stays with finance.</PopoverDescription>
        </PopoverHeader>
        <div className="flex items-center gap-2">
          <span className="flex h-8 min-w-0 flex-1 items-center truncate rounded-lg border border-border bg-sunken px-2.5 font-mono text-xs text-fg-muted">
            lumen.app/r/q3-revenue
          </span>
          <Button size="sm">Copy link</Button>
        </div>
      </PopoverContent>
    </>
  )
}

/** The element that toggles the popover. Use `render` to make a Button the trigger. */
function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

/** Closes the popover when pressed. Use `render` to make a Button do it. */
function PopoverClose({ ...props }: PopoverPrimitive.Close.Props) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-xl border border-border bg-raised p-3 text-sm text-fg shadow-overlay outline-hidden duration-200 ease-hairline data-closed:duration-[160ms] data-closed:ease-exit data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-fg-muted", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
