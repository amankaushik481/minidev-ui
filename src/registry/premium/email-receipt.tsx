"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { EmailPreviewFrame } from "@/registry/ui/email-preview-frame"
import { EmailLayout } from "@/registry/ui/email-layout"
import { EmailHeader } from "@/registry/ui/email-header"
import { EmailFooter } from "@/registry/ui/email-footer"
import { Separator } from "@/registry/ui/separator"

function EmailReceipt({ className }: { className?: string }) {
  return (
    <div data-slot="email-receipt" data-tier="premium" className={cn(className)}>
      <EmailPreviewFrame subject="Receipt for Premium — $49.00">
        <EmailLayout>
          <EmailHeader brand="MiniDev Billing" />
          <div className="space-y-4 px-6 py-6">
            <h1 className="text-xl font-medium text-fg">Payment received</h1>
            <p className="text-sm text-fg-muted">Thanks for upgrading. Here is your receipt.</p>
            <div className="rounded-xl border border-border bg-bg p-4 text-sm">
              <div className="flex justify-between"><span className="text-fg-muted">Premium</span><span className="tabular-nums text-fg">$49.00</span></div>
              <div className="mt-2 flex justify-between"><span className="text-fg-muted">Tax</span><span className="tabular-nums text-fg">$0.00</span></div>
              <Separator className="my-3" />
              <div className="flex justify-between font-medium"><span className="text-fg">Total</span><span className="tabular-nums text-fg">$49.00</span></div>
            </div>
          </div>
          <EmailFooter />
        </EmailLayout>
      </EmailPreviewFrame>
    </div>
  )
}
export { EmailReceipt }
