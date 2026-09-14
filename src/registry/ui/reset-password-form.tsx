"use client"
import { AuthCard } from "@/registry/ui/auth-card"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
function ResetPasswordForm() {
  return (
    <div data-slot="reset-password-form">
      <AuthCard title="Reset password">
      <FormField id="rp-pass" label="New password">
        <Input id="rp-pass" type="password" />
      </FormField>
      <FormField id="rp-confirm" label="Confirm password">
        <Input id="rp-confirm" type="password" />
      </FormField>
      <Button className="w-full">Update password</Button>
    </AuthCard>
    </div>
  )
}
export { ResetPasswordForm }
