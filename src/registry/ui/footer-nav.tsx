"use client"
import { cn } from "@/lib/utils"
import { Link } from "@/registry/ui/link"

function FooterNav({
  links,
  className,
  brand = "MiniDev",
}: {
  links: { label: string; href: string }[]
  className?: string
  brand?: string
}) {
  return (
    <footer
      data-slot="footer-nav"
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 text-sm",
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
