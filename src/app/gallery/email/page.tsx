"use client"
import { EmailLayout } from "@/registry/ui/email-layout"
import { EmailHeader } from "@/registry/ui/email-header"
import { EmailFooter } from "@/registry/ui/email-footer"
import { EmailButton } from "@/registry/ui/email-button"
import { EmailCard } from "@/registry/ui/email-card"
import { EmailPreviewFrame } from "@/registry/ui/email-preview-frame"
import { EmailWelcome } from "@/registry/premium/email-welcome"
import { EmailReceipt } from "@/registry/premium/email-receipt"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Email">
      <GallerySection title="Building blocks">
        <EmailPreviewFrame subject="Verify your email">
          <EmailLayout>
            <EmailHeader />
            <div className="space-y-3 px-6 py-6">
              <h1 className="text-xl font-medium text-fg">Confirm it is you</h1>
              <p className="text-sm text-fg-muted">Click below to verify aman@minidev.pro.</p>
              <EmailButton>Verify email</EmailButton>
            </div>
            <EmailCard title="Did not request this?">Ignore this message — your account stays unchanged.</EmailCard>
            <EmailFooter />
          </EmailLayout>
        </EmailPreviewFrame>
      </GallerySection>
      <GallerySection title="Premium templates">
        <div className="grid w-full gap-6 lg:grid-cols-2">
          <EmailWelcome />
          <EmailReceipt />
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
