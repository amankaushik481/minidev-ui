"use client"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Form field wrapper">
      <GallerySection title="States">
        <FormField id="ff1" label="Email" description="We will never share this." className="w-72">
          <Input id="ff1" type="email" placeholder="you@company.com" />
        </FormField>
        <FormField id="ff2" label="Password" required error="Must be at least 8 characters" className="w-72">
          <Input id="ff2" type="password" aria-invalid placeholder="••••••••" />
        </FormField>
      </GallerySection>
    </GalleryPage>
  )
}
