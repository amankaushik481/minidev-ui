"use client"
import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function useTheme() {
  const [dark, setDark] = React.useState(false)
  React.useEffect(() => {
    const el = document.documentElement
    setDark(el.classList.contains("dark"))
    const mo = new MutationObserver(() => setDark(el.classList.contains("dark")))
    mo.observe(el, { attributes: true, attributeFilter: ["class"] })
    return () => mo.disconnect()
  }, [])
  const set = React.useCallback((next: boolean) => {
    const el = document.documentElement
    // Suppress transitions for one frame so the swap is instant everywhere.
    el.classList.add("[&_*]:!transition-none")
    el.classList.toggle("dark", next)
    try { localStorage.setItem("theme", next ? "dark" : "light") } catch {}
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove("[&_*]:!transition-none")))
  }, [])
  return { dark, setDark: set, toggle: () => set(!dark) }
}

export function ThemeToggle({ className }: { className?: string }) {
  const { dark, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "relative inline-flex size-8 items-center justify-center rounded-lg text-fg-muted outline-none",
        "transition-[color,background-color] duration-[70ms] hover:bg-sunken hover:text-fg",
        "focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
    >
      <SunIcon className={cn("absolute size-4 transition-[transform,opacity] duration-200 ease-hairline", dark ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100")} />
      <MoonIcon className={cn("absolute size-4 transition-[transform,opacity] duration-200 ease-hairline", dark ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0")} />
    </button>
  )
}
