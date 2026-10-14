"use client"
import { cn } from "@/lib/utils"
import { Link } from "@/registry/ui/link"

/** A one-line site footer: brand on the left, a row of quiet links on the right. */
type FooterLink = { label: string; href: string }

const SAMPLE_LINKS: FooterLink[] = [
  { label: "Docs", href: "#docs" },
  { label: "Pricing", href: "#pricing" },
  { label: "Changelog", href: "#changelog" },
  { label: "Status", href: "#status" },
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
]

type FooterNavProps = {
  /** Links in the footer nav. Defaults to a typical set for Lumen. */
  links?: FooterLink[]
  className?: string
  /** Brand name on the left. */
  brand?: string
}

function FooterNav({
  links = SAMPLE_LINKS,
  className,
  brand = "Lumen",
}: FooterNavProps) {
  return (
    <footer
      data-slot="footer-nav"
      className={cn(
        "flex w-full flex-wrap items-center justify-between gap-4 border-t border-border py-6 text-sm",
        className
      )}
    >
      <p className="font-medium text-fg">{brand}</p>
      <nav className="flex flex-wrap gap-4" aria-label="Footer">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="text-fg-muted no-underline hover:text-fg hover:underline">
            {l.label}
          </Link>
        ))}
      </nav>
    </footer>
  )
}
export { FooterNav }
export type { FooterNavProps, FooterLink }
