"use client"
import { AuthCard } from "@/registry/ui/auth-card"
import { SocialAuthRow } from "@/registry/ui/social-auth-row"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
function SignUpForm() {
  return (
    <div data-slot="sign-up-form">
      <AuthCard title="Create account" footer={<>Have an account? <a className="text-accent underline underline-offset-2" href="#">Sign in</a></>}>
      <SocialAuthRow />
      <FormField id="su-name" label="Name" required>
        <Input id="su-name" />
      </FormField>
      <FormField id="su-email" label="Email" required>
        <Input id="su-email" type="email" />
      </FormField>
      <FormField id="su-password" label="Password" required>
        <Input id="su-password" type="password" />
      </FormField>
      <Button className="w-full">Create account</Button>
    </AuthCard>
    </div>
  )
}
export { SignUpForm }
