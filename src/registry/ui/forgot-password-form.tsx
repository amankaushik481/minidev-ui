"use client"
import { AuthCard } from "@/registry/ui/auth-card"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
function ForgotPasswordForm() {
  return (
    <div data-slot="forgot-password-form">
      <AuthCard title="Forgot password">
      <FormField id="fp-email" label="Email">
        <Input id="fp-email" type="email" />
      </FormField>
      <Button className="w-full">Send reset email</Button>
    </AuthCard>
    </div>
  )
}
export { ForgotPasswordForm }
