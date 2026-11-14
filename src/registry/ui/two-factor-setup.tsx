"use client"
import * as React from "react"
import { AuthCard } from "@/registry/ui/auth-card"
import { OtpInput } from "@/registry/ui/otp-input"
import { Button } from "@/registry/ui/button"

/**
 * The enable-2FA step: a QR code slot, the manual setup key, a 6-digit code field and a verify button.
 *
 * Render your QR (for example with `QrCode`) in `qr` and the base32 secret in `secret`. `onVerify` receives the code once all six digits are in. Use `TwoFactorVerify` for the sign-in challenge after 2FA is on.
 *
 * @example
 * <TwoFactorSetup qr={<QrCode value={otpauthUrl} />} secret="JBSW Y3DP EHPK 3PXP" onVerify={(code) => enable2fa(code)} />
 */
type TwoFactorSetupProps = {
  /** The QR code for the authenticator app. Shows a placeholder when omitted. */
  qr?: React.ReactNode
  /** Setup key for manual entry, shown in mono under the QR. */
  secret?: string
  /** Called with the 6-digit code when the form is submitted. */
  onVerify?: (code: string) => void
  /** Shows the field as invalid, e.g. after a wrong code. */
  invalid?: boolean
  className?: string
}

function TwoFactorSetup({ qr, secret, onVerify, invalid, className }: TwoFactorSetupProps) {
  const [code, setCode] = React.useState("")
  return (
    <div data-slot="two-factor-setup" className={className}>
      <AuthCard title="Set up 2FA" footer="Scan the QR in your authenticator app, then enter a code.">
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            if (code.length === 6) onVerify?.(code)
          }}
        >
          {qr ?? (
            <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-border bg-sunken text-xs text-fg-muted">
              QR code
            </div>
          )}
          {secret ? (
            <p className="text-xs text-fg-muted">
              Or enter this key: <code className="font-mono text-fg select-all">
                {secret}
              </code>
            </p>
          ) : null}
          <OtpInput value={code} onChange={setCode} status={invalid ? "invalid" : "idle"} aria-label="6-digit code from your authenticator app" />
          <Button type="submit" className="w-full" disabled={code.length < 6}>
            Verify and enable
          </Button>
        </form>
      </AuthCard>
    </div>
  )
}
export { TwoFactorSetup }
export type { TwoFactorSetupProps }
