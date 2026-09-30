"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { ArrowRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A call to action with a slow band of light that sweeps across the face,
 * a lit top edge and a soft bloom underneath. The sweep pauses for reduced
 * motion. Renders a button, or pass `render` to make it a link.
 */
type ShimmerButtonProps = React.ComponentProps<"button"> & {
  /** Seconds for one sweep. */
  duration?: number
  tone?: "ink" | "accent"
  size?: "default" | "lg"
  render?: React.ReactElement<Record<string, unknown>>
}

function ShimmerButton({ children = <>Get started <ArrowRightIcon className="size-4" /></>, duration = 2.6, tone = "ink", size = "lg", className, render, style, ...props }: ShimmerButtonProps) {
  const reduce = useReducedMotion()
  const cls = cn(
    "group/shimmer relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-medium whitespace-nowrap outline-none select-none",
    "transition-[transform,box-shadow] duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    tone === "ink" ? "bg-ink text-on-ink shadow-ink" : "bg-accent text-on-accent shadow-ink",
    size === "lg" ? "h-12 px-6 text-[0.9375rem]" : "h-10 px-4 text-sm",
    className,
  )
  const inner = (
    <>
      <span aria-hidden className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      {!reduce ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent mix-blend-soft-light"
          style={{ animation: `shimmer-sweep ${duration}s cubic-bezier(0.4,0,0.2,1) infinite` }}
        />
      ) : null}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <style>{`@keyframes shimmer-sweep{0%{transform:translateX(0)}60%,100%{transform:translateX(320%)}}`}</style>
    </>
  )
  if (render) return React.cloneElement(render, { className: cls, style, "data-slot": "shimmer-button", children: inner })
  return (
    <button type="button" data-slot="shimmer-button" className={cls} style={style} {...props}>
      {inner}
    </button>
  )
}

export { ShimmerButton }
export type { ShimmerButtonProps }
