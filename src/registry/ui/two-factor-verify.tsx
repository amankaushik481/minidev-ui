"use client"
import { AuthCard } from "@/registry/ui/auth-card"
import { OtpInput } from "@/registry/ui/otp-input"
import { Button } from "@/registry/ui/button"
function TwoFactorVerify() {
  return (
    <div data-slot="two-factor-verify">
      <AuthCard title="Two-factor authentication">
      <OtpInput />
      <Button className="w-full">Verify</Button>
    </AuthCard>
    </div>
  )
}
export { TwoFactorVerify }
