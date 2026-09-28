"use client"
import { SiteHeader, SiteFooter } from "@/components/site-chrome"
import { ClientPitchKit } from "@/registry/premium/client-pitch-kit"

export default function ShowcasePage() {
  return (
    <div className="min-h-full overflow-x-hidden bg-bg text-fg">
      <SiteHeader solid />
      <main className="mx-auto max-w-6xl px-4 py-8 pb-24 sm:px-6 sm:py-12 sm:pb-28">
        <p className="mb-6 text-sm text-fg-muted sm:mb-8">
          Showcase: the walkthrough page. Scroll the chapters and open the living product mock.
        </p>
        <ClientPitchKit />
      </main>
      <SiteFooter />
    </div>
  )
}
