"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="prose"
      className={cn(
        "max-w-prose text-sm leading-[1.55] text-fg",
        "[&_h1]:text-3xl [&_h1]:font-medium [&_h1]:tracking-[-0.022em] [&_h1]:text-fg",
        "[&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-[-0.018em]",
        "[&_h3]:text-lg [&_h3]:font-medium [&_h3]:tracking-[-0.008em]",
        "[&_p]:text-fg-muted [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4",
        "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
        "[&_code]:rounded-md [&_code]:border [&_code]:border-border [&_code]:bg-sunken [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.8125rem]",
        "[&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-fg-muted",
        className
      )}
      {...props}
    />
  )
}
export { Prose }
