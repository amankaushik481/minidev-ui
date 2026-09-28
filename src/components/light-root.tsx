"use client"
import { usePathname } from "next/navigation"
import { LightProvider } from "@/registry/ui/light-provider"

/* The light drifts on its own only on the landing page; elsewhere it follows the pointer. */
export function LightRoot() {
  const path = usePathname()
  return <LightProvider idle={path === "/"} />
}
