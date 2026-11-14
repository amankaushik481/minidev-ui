"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A layout primitive that centres page content at a readable max width with responsive side padding (16px, 24px from sm).
 *
 * Wrap each page section's content in it. For a narrow centred column use Center; for spacing children use Stack or Cluster.
 *
 * @example
 * <Container size="lg"><PageHeader title="Invoices" /></Container>
 */
type ContainerProps = React.ComponentProps<"div"> & {
  /** Max width: sm 672px (prose), default 1024px, lg 1280px (dashboards), full none. */
  size?: "sm" | "default" | "lg" | "full"
}

const WIDTH = { sm: "max-w-2xl", default: "max-w-5xl", lg: "max-w-7xl", full: "max-w-none" } as const

function Container({ className, size = "default", ...props }: ContainerProps) {
  return <div data-slot="container" data-size={size} className={cn("mx-auto w-full px-4 sm:px-6", WIDTH[size], className)} {...props} />
}
export { Container }
export type { ContainerProps }
