import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * The basic raised surface: a bordered, rounded panel with optional header, content and footer slots.
 *
 * Compose `Card` > `CardHeader` (`CardTitle`, `CardDescription`, `CardAction`) + `CardContent` +
 * `CardFooter`. Spacing comes from one `--card-spacing` variable, so `size="sm"` tightens every
 * slot at once. A first child `<img>` bleeds to the edges. Use it for any grouped content; prefer
 * `StatCard` for a single KPI and `BlogCard` for a linked article. Server component friendly.
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Northwind</CardTitle>
 *     <CardDescription>Customer since 2023</CardDescription>
 *     <CardAction><Button size="sm" variant="outline">Edit</Button></CardAction>
 *   </CardHeader>
 *   <CardContent>Open balance: $12,400</CardContent>
 *   <CardFooter><Button size="sm">Send invoice</Button></CardFooter>
 * </Card>
 */
function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & {
  /** Spacing scale for every slot: default 20px, sm 14px. */
  size?: "default" | "sm"
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl border border-border bg-card py-(--card-spacing) text-sm text-fg shadow-raised [--card-spacing:--spacing(5)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3.5)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

/** Title, description and an optional `CardAction` in the top-right. */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

/** The card's heading text. It renders a div; put an `h2`/`h3` inside when the page outline needs a heading. */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-[0.9375rem] leading-snug font-medium tracking-[-0.01em] text-fg group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-[0.8125rem] leading-[1.5] text-fg-muted", className)}
      {...props}
    />
  )
}

/** A button or menu pinned to the header's top-right corner. */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

/** A tinted bottom bar for actions, separated by a hairline. */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-2 rounded-b-xl border-t border-border bg-sunken/60 px-(--card-spacing) py-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
