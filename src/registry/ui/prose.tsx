"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Prose — typography for long-form HTML you do not control: docs, blog posts, markdown output, model answers.
 *
 * Wrap rendered markdown or plain HTML elements in it and they get the kit's headings, spacing,
 * links, lists, code and quotes. For single headings or paragraphs in app UI use Heading and Text.
 *
 * @example
 * <Prose>
 *   <h2>Install</h2>
 *   <p>Add components with <code>npx shadcn add</code>.</p>
 * </Prose>
 */
function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="prose"
      className={cn(
        "max-w-prose text-sm leading-[1.55] text-fg",
        "[&>*+*]:mt-4 [&>:is(h1,h2,h3)+*]:mt-2 [&>*+:is(h2,h3)]:mt-8",
        "[&_:is(h1,h2,h3)]:text-balance [&_p]:text-pretty",
        "[&_h1]:text-3xl [&_h1]:font-medium [&_h1]:tracking-[-0.022em] [&_h1]:text-fg",
        "[&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-[-0.018em]",
        "[&_h3]:text-lg [&_h3]:font-medium [&_h3]:tracking-[-0.008em]",
        "[&_p]:text-fg-muted [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4",
        "[&_strong]:font-medium [&_strong]:text-fg [&_hr]:border-border",
        "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li+li]:mt-1 [&_li]:text-fg-muted",
        "[&_code]:rounded-md [&_code]:border [&_code]:border-border [&_code]:bg-sunken [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.8125rem]",
        "[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-sunken [&_pre]:p-4 [&_pre_code]:border-0 [&_pre_code]:bg-transparent [&_pre_code]:p-0",
        "[&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-fg-muted",
        className
      )}
      {...props}
    />
  )
}
export { Prose }
