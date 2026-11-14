"use client"
import * as React from "react"
import { AuthCard } from "@/registry/ui/auth-card"
import { OtpInput } from "@/registry/ui/otp-input"
import { Button } from "@/registry/ui/button"

/**
 * The sign-in 2FA challenge: a card with a 6-digit code field that submits itself when the last digit is typed.
 *
 * `onVerify` receives the code. Set `invalid` after a wrong code to shake the field red. Use `TwoFactorSetup` to enrol a device, and `OtpInput` alone for other one-time codes.
 *
 * @example
 * <TwoFactorVerify onVerify={async (code) => setInvalid(!(await verify(code)))} invalid={invalid} />
 */
type TwoFactorVerifyProps = {
  /** Called with the 6-digit code on completion or submit. */
  onVerify?: (code: string) => void
  /** Shows the field as invalid, e.g. after a wrong code. */
  invalid?: boolean
  /** Line under the title. */
  description?: React.ReactNode
  className?: string
}

function TwoFactorVerify({ onVerify, invalid, description = "Enter the 6-digit code from your authenticator app.", className }: TwoFactorVerifyProps) {
  const [code, setCode] = React.useState("")
  return (
    <div data-slot="two-factor-verify" className={className}>
      <AuthCard title="Two-factor authentication" description={description}>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            if (code.length === 6) onVerify?.(code)
          }}
        >
          <OtpInput value={code} onChange={setCode} onComplete={onVerify} status={invalid ? "invalid" : "idle"} aria-label="6-digit code" />
          <Button type="submit" className="w-full" disabled={code.length < 6}>
            Verify
          </Button>
        </form>
      </AuthCard>
    </div>
  )
}
export { TwoFactorVerify }
export type { TwoFactorVerifyProps }
