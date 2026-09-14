"use client"
import { PricingTable } from "@/registry/ui/pricing-table"
import { UsageMeter } from "@/registry/ui/usage-meter"
import { InvoiceList } from "@/registry/ui/invoice-list"
import { UpgradePrompt } from "@/registry/ui/upgrade-prompt"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Billing & commerce">
      <GallerySection title="Pricing">
        <PricingTable className="w-full" plans={[
          { name: "Free", price: "$0", features: ["10 components","Community"], cta: "Start" },
          { name: "Pro", price: "$29", features: ["All components","Priority"], highlighted: true },
          { name: "Team", price: "$99", features: ["Seats","SSO","Audit"] },
        ]} />
      </GallerySection>
      <GallerySection title="Usage / invoices / upgrade">
        <div className="w-72 space-y-4"><UsageMeter label="Seats" used={3} limit={5} /><UpgradePrompt /></div>
        <InvoiceList className="w-full max-w-md" items={[
          { id: "INV-104", date: "Sep 1, 2026", amount: "$29.00", status: "paid" },
          { id: "INV-105", date: "Oct 1, 2026", amount: "$29.00", status: "open" },
        ]} />
      </GallerySection>
    </GalleryPage>
  )
}
