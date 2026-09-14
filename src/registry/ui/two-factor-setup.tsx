"use client"
import { AuthCard } from "@/registry/ui/auth-card"
import { OtpInput } from "@/registry/ui/otp-input"
import { Button } from "@/registry/ui/button"
function TwoFactorSetup() {
  return (
    <div data-slot="two-factor-setup">
      <AuthCard title="Set up 2FA" footer="Scan the QR in your authenticator app, then enter a code.">
      <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-border bg-sunken text-xs text-fg-muted">
        QR placeholder
      </div>
      <OtpInput />
      <Button className="w-full">Verify and enable</Button>
    </AuthCard>
    </div>
  )
}
export { TwoFactorSetup }
