import { SiteHeader, SiteFooter } from "@/components/site-chrome"
import { Hero } from "@/components/landing/hero"
import { LazySection } from "@/components/landing/lazy-section"

/*
 * Server component. Only the header, the hero and the footer hydrate on load;
 * every section below the fold is server-rendered in full and becomes live as
 * it approaches the viewport (see lazy-section.tsx). sm and lg are each
 * section's measured height in px at 390 and 1280 wide.
 */
export default function Home() {
  return (
    <div className="min-h-full overflow-x-clip bg-bg text-fg">
      <SiteHeader />
      <main className="min-w-0">
        <Hero />
        <LazySection id="templates" sm={1455} lg={782} />
        <LazySection id="materials" sm={2577} lg={990} />
        <LazySection id="exploded" sm={3882} lg={4140} />
        <LazySection id="proof" sm={341} lg={121} />
        <LazySection id="physics" sm={2096} lg={1267} />
        <LazySection id="bento" sm={3089} lg={1575} />
        <LazySection id="blueprint" sm={820} lg={560} />
        <LazySection id="craft" sm={2646} lg={1232} />
        <LazySection id="install" sm={1427} lg={875} />
        <LazySection id="categories" sm={2806} lg={1065} />
        <LazySection id="cta" sm={582} lg={595} />
      </main>
      <SiteFooter />
    </div>
  )
}
