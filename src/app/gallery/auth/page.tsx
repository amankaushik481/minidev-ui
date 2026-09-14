"use client"
import { AuthCard } from "@/registry/ui/auth-card"
import { SocialAuthRow } from "@/registry/ui/social-auth-row"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
import { OtpInput } from "@/registry/ui/otp-input"
import { Stepper } from "@/registry/ui/stepper"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Auth & onboarding">
      <GallerySection title="Sign in">
        <AuthCard title="Sign in" footer={<>No account? <a className="text-accent underline underline-offset-2" href="#">Sign up</a></>}>
          <SocialAuthRow />
          <FormField id="email" label="Email"><Input id="email" type="email" placeholder="you@company.com" /></FormField>
          <FormField id="password" label="Password"><Input id="password" type="password" /></FormField>
          <Button className="w-full">Continue</Button>
        </AuthCard>
      </GallerySection>
      <GallerySection title="OTP / onboarding">
        <div className="space-y-4"><OtpInput /><Stepper steps={["Account","Workspace","Invite"]} current={1} /></div>
      </GallerySection>
    </GalleryPage>
  )
}
