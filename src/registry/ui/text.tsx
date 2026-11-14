"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Body copy: a 14px paragraph with the kit's line height, in default, muted, subtle or mono flavours.
 *
 * Renders a `<p>` and accepts every paragraph prop. Use `Heading` for titles and `Prose` for long-form rich text.
 *
 * @example
 * <Text muted>Invoices are emailed to billing@northwind.com.</Text>
 */
type TextProps = React.ComponentProps<"p"> & {
  /** Secondary text colour (`text-fg-muted`, at least 7:1). */
  muted?: boolean
  /** Tertiary text colour (`text-fg-subtle`, at least 4.5:1) for hints and meta. */
  subtle?: boolean
  /** Geist Mono at 13px, for ids, amounts and code-like values. */
  mono?: boolean
}

function Text({ className, muted, subtle, mono, ...props }: TextProps) {
  return (
    <p
      data-slot="text"
      className={cn(
        "text-sm leading-[1.55] text-fg",
        muted && "text-fg-muted",
        subtle && "text-fg-subtle",
        mono && "font-mono text-[0.8125rem] tracking-[0.005em]",
        className
      )}
      {...props}
    />
  )
}
export { Text }
export type { TextProps }
