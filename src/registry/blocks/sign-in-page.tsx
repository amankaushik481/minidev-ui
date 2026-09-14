"use client"
import { AuthCard } from "@/registry/ui/auth-card"
import { SocialAuthRow } from "@/registry/ui/social-auth-row"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
function SignInPage() {
  return (
    <div data-slot="sign-in-page" className="flex min-h-[480px] items-center justify-center p-6">
      <AuthCard title="Welcome back" footer={<>No account? <a className="text-accent underline underline-offset-2" href="#">Sign up</a></>}>
        <SocialAuthRow />
        <FormField id="email" label="Email"><Input id="email" type="email" /></FormField>
        <FormField id="password" label="Password"><Input id="password" type="password" /></FormField>
        <Button className="w-full">Sign in</Button>
      </AuthCard>
    </div>
  )
}
export { SignInPage }
