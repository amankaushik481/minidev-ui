"use client"
import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange)
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
  return () => mo.disconnect()
}

export function useTheme() {
  const dark = React.useSyncExternalStore(subscribe, () => document.documentElement.classList.contains("dark"), () => false)
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
      aria-label="Dark theme"
      aria-pressed={dark}
      className={cn(
        "relative inline-flex size-8 items-center justify-center rounded-lg text-fg-muted outline-none",
        "transition-[color,background-color] duration-[70ms] hover:bg-sunken hover:text-fg",
        "focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
    >
      {/* Icons follow the html.dark class set before paint, not React state, so the first frame is already right. */}
      <SunIcon aria-hidden className="absolute size-4 scale-100 rotate-0 opacity-100 transition-[transform,opacity] duration-200 ease-hairline dark:scale-50 dark:rotate-90 dark:opacity-0" />
      <MoonIcon aria-hidden className="absolute size-4 scale-50 -rotate-90 opacity-0 transition-[transform,opacity] duration-200 ease-hairline dark:scale-100 dark:rotate-0 dark:opacity-100" />
    </button>
  )
}
