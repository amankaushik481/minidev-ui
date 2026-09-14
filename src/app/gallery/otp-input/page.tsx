"use client"
import { OtpInput } from "@/registry/ui/otp-input"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="OTP input">
      <GallerySection title="Default"><OtpInput /></GallerySection>
      <GallerySection title="Disabled"><OtpInput disabled value="123456" /></GallerySection>
    </GalleryPage>
  )
}
