"use client"
import * as React from "react"
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import { MenuIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * FloatingNav — a sticky marketing header that tucks into a floating raised pill once you scroll, with a hover highlight that glides between links.
 *
 * Use at the top of a landing page, above HeroSpotlight. It tracks window scroll. Below md the links move into a menu
 * sheet: the toggle has aria-expanded/aria-controls, Escape closes it and returns focus, and choosing a link closes it.
 * For an app shell with a sidebar use Topbar or Sidebar; for in-page section tabs use Tabs.
 *
 * @example
 * <FloatingNav links={[{ label: "Pricing", href: "#pricing" }]} cta={{ label: "Start free", href: "/signup" }} />
 */
type NavLink = {
  /** Link text. */
  label: string
  /** Target URL or in-page anchor; also the React key, so keep it unique. */
  href: string
}

type FloatingNavProps = {
  /** Logo or wordmark at the left. Defaults to the Lumen wordmark. */
  brand?: React.ReactNode
  /** Where the brand links to. */
  brandHref?: string
  /** Primary navigation links. */
  links?: NavLink[]
  /** Solid button at the right. Renders as a link when `href` is set. */
  cta?: { label: string; href?: string; onClick?: () => void }
  /** Ghost link before the CTA, hidden on the smallest screens. Pass null to remove it. */
  secondary?: { label: string; href?: string } | null
  className?: string
}

const LINKS: NavLink[] = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

function FloatingNav({
  brand = (
    <span className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em] text-fg">
      <span className="grid size-7 place-items-center rounded-lg bg-ink text-[13px] text-on-ink shadow-ink">L</span>
      Lumen
    </span>
  ),
  brandHref = "/",
  links = LINKS,
  cta = { label: "Start free" },
  secondary = { label: "Sign in", href: "#" },
  className,
}: FloatingNavProps) {
  const { scrollY } = useScroll()
  const [tucked, setTucked] = React.useState(false)
  const [hover, setHover] = React.useState<string | null>(null)
  const [open, setOpen] = React.useState(false)
  const reduce = useReducedMotion()
  const id = React.useId()
  const toggle = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      setOpen(false)
      toggle.current?.focus()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])
  useMotionValueEvent(scrollY, "change", (y) => setTucked(y > 40))
  const spring = reduce ? { duration: 0 } : { type: "spring" as const, bounce: 0.16, duration: 0.5 }

  return (
    <div data-slot="floating-nav" className={cn("sticky top-0 z-50 px-3 pt-3", className)}>
      <motion.nav
        layout
        transition={spring}
        aria-label="Main"
        className={cn(
          "mx-auto flex h-14 items-center gap-2 pr-2 pl-4",
          tucked ? "max-w-4xl rounded-2xl border border-border bg-raised shadow-overlay" : "max-w-7xl rounded-2xl border border-transparent"
        )}
      >
        <a href={brandHref} className="mr-3 shrink-0 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent">
          {brand}
        </a>
        <ul className="hidden flex-1 items-center md:flex" onMouseLeave={() => setHover(null)}>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onMouseEnter={() => setHover(l.href)}
                onFocus={() => setHover(l.href)}
                className="relative block rounded-lg px-3 py-1.5 text-[13.5px] text-fg-muted outline-none transition-colors duration-[70ms] hover:text-fg focus-visible:text-fg focus-visible:ring-2 focus-visible:ring-accent"
              >
                {hover === l.href ? (
                  <motion.span layoutId={`${id}-hl`} transition={spring} aria-hidden className="absolute inset-0 -z-10 rounded-lg bg-fg/[0.05]" />
                ) : null}
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-1.5">
          {secondary ? (
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" render={secondary.href ? <a href={secondary.href} /> : undefined}>
              {secondary.label}
            </Button>
          ) : null}
          {cta ? (
            <Button size="sm" onClick={cta.onClick} render={cta.href ? <a href={cta.href} /> : undefined}>
              {cta.label}
            </Button>
          ) : null}
          <Button
            ref={toggle}
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={`${id}-menu`}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <XIcon aria-hidden /> : <MenuIcon aria-hidden />}
          </Button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {open ? (
          <motion.nav
            id={`${id}-menu`}
            aria-label="Main menu"
            initial={reduce ? false : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -6, scale: 0.99, transition: { duration: 0.14 } }}
            transition={spring}
            className="mx-auto mt-2 max-w-4xl origin-top rounded-2xl border border-border bg-raised p-2 shadow-overlay md:hidden"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-[15px] text-fg outline-none hover:bg-sunken focus-visible:bg-sunken focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset">
                {l.label}
              </a>
            ))}
            {secondary ? (
              <a href={secondary.href ?? "#"} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-[15px] text-fg-muted outline-none hover:bg-sunken focus-visible:bg-sunken focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset sm:hidden">
                {secondary.label}
              </a>
            ) : null}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export { FloatingNav }
export type { FloatingNavProps, NavLink }
