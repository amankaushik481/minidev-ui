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
  /** Called with the 6-digit code on completion or submit, once per code: editing the code allows the next call. */
  onVerify?: (code: string) => void
  /** Shows the field as invalid, e.g. after a wrong code. */
  invalid?: boolean
  /** Line under the title. */
  description?: React.ReactNode
  className?: string
}

function TwoFactorVerify({ onVerify, invalid, description = "Enter the 6-digit code from your authenticator app.", className }: TwoFactorVerifyProps) {
  const [code, setCode] = React.useState("")
  // The last code sent, so the sixth digit and a later Verify/Enter do not both call onVerify.
  const sent = React.useRef("")
  const verify = (c: string) => {
    if (c === sent.current) return
    sent.current = c
    onVerify?.(c)
  }
  return (
    <div data-slot="two-factor-verify" className={className}>
      <AuthCard title="Two-factor authentication" description={description}>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            if (code.length === 6) verify(code)
          }}
        >
          <OtpInput
            value={code}
            onChange={(c) => {
              setCode(c)
              if (c !== sent.current) sent.current = ""
            }}
            onComplete={verify}
            status={invalid ? "invalid" : "idle"}
            aria-label="6-digit code"
          />
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
