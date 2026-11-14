"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cn } from "@/lib/utils"

/**
 * A round user picture with an initials fallback while the image loads or if it fails.
 *
 * Compose `Avatar` > `AvatarImage` + `AvatarFallback`. Add `AvatarBadge` for a status dot, and wrap
 * several in this file's `AvatarGroup` for a simple overlapping stack. Prefer the data-driven
 * `AvatarGroup` from `avatar-group` for tooltips and a "+N" overflow. Give `AvatarImage` an `alt`
 * with the person's name, or `alt=""` when the name is printed next to it.
 *
 * @example
 * <Avatar size="lg">
 *   <AvatarImage src="/maya.jpg" alt="Maya Chen" />
 *   <AvatarFallback>MC</AvatarFallback>
 * </Avatar>
 */
function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  /** Diameter: sm 24px, default 32px, lg 40px. Override with a `size-*` class for others. */
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
        className
      )}
      {...props}
    />
  )
}

/** The photo. Hidden until it loads; `AvatarFallback` shows meanwhile. */
function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      {...props}
    />
  )
}

/** Initials or an icon, shown while the image loads or when it fails. Pass `delay` (ms) to avoid a flash. */
function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-sunken text-sm text-fg-muted group-data-[size=sm]/avatar:text-xs",
        className
      )}
      {...props}
    />
  )
}

/** A small dot pinned bottom-right, e.g. presence. Recolour with `bg-success`; give it `aria-label` or sr-only text if it carries meaning. */
function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-accent text-on-accent ring-2 ring-bg select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  )
}

/** A plain overlapping stack of `Avatar` children, ringed in the page colour. */
function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-bg",
        className
      )}
      {...props}
    />
  )
}

/** The "+3" circle at the end of an `AvatarGroup`. */
function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-sunken text-sm text-fg-muted ring-2 ring-bg group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
