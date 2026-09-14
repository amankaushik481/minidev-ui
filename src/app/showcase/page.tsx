"use client"
import { SiteHeader, SiteFooter } from "@/components/site-chrome"
import { ClientPitchKit } from "@/registry/premium/client-pitch-kit"

export default function ShowcasePage() {
  return (
    <div className="min-h-full bg-bg text-fg">
      <SiteHeader solid />
      <main className="mx-auto max-w-6xl px-6 py-12 pb-28">
        <p className="mb-8 text-sm text-fg-muted">
          Client showcase — the walkthrough page. Scroll the chapters. Toggle free vs Premium. Show the OS mock.
        </p>
        <ClientPitchKit />
      </main>
      <SiteFooter />
    </div>
  )
}
