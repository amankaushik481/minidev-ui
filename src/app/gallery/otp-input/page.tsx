"use client"
import { OtpInput } from "@/registry/ui/otp-input"
import { OtpDemo } from "@/components/reference/demos"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="OTP input" description="One real input under painted slots, so paste, SMS autofill and screen readers just work.">
      <GallerySection title="Verify flow"><OtpDemo /></GallerySection>
      <GallerySection title="States">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <OtpInput defaultValue="12" aria-label="Partly filled" />
          <OtpInput defaultValue="123456" status="success" aria-label="Verified" />
          <OtpInput disabled defaultValue="123456" aria-label="Disabled" />
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
