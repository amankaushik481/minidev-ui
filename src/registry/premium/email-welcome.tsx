"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { EmailPreviewFrame } from "@/registry/ui/email-preview-frame"
import { EmailLayout } from "@/registry/ui/email-layout"
import { EmailHeader } from "@/registry/ui/email-header"
import { EmailFooter } from "@/registry/ui/email-footer"
import { EmailCard } from "@/registry/ui/email-card"
import { EmailButton } from "@/registry/ui/email-button"

function EmailWelcome({ className }: { className?: string }) {
  return (
    <div data-slot="email-welcome" data-tier="premium" className={cn(className)}>
      <EmailPreviewFrame subject="Welcome to MiniDev">
        <EmailLayout>
          <EmailHeader />
          <div className="space-y-4 px-6 py-6">
            <h1 className="text-xl font-medium tracking-[-0.014em] text-fg">You are in</h1>
            <p className="text-sm leading-[1.55] text-fg-muted">
              Your Free kit is ready. Premium motion templates unlock when you need a launch page that converts.
            </p>
            <EmailButton>Open the gallery</EmailButton>
          </div>
          <EmailCard title="Quick start">
            Install a component, keep DESIGN.md open, and never invent a color.
          </EmailCard>
          <EmailFooter />
        </EmailLayout>
      </EmailPreviewFrame>
    </div>
  )
}
export { EmailWelcome }
