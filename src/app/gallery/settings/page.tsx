"use client"
import { SettingsLayout, SettingsSection } from "@/registry/ui/settings-layout"
import { DangerZone } from "@/registry/ui/danger-zone"
import { ApiKeyList } from "@/registry/ui/api-key-list"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Settings & admin">
      <GallerySection title="Layout">
        <SettingsLayout className="w-full max-w-3xl" nav={<>
          <Button variant="ghost" className="w-full justify-start">Profile</Button>
          <Button variant="secondary" className="w-full justify-start">API</Button>
          <Button variant="ghost" className="w-full justify-start">Billing</Button>
        </>}>
          <SettingsSection title="Profile" description="Public details for your workspace.">
            <FormField id="name" label="Name" className="max-w-sm"><Input id="name" defaultValue="MiniDev" /></FormField>
          </SettingsSection>
          <SettingsSection title="API keys">
            <ApiKeyList keys={[{ id: "1", name: "Production", preview: "md_live_••••1234" }]} />
          </SettingsSection>
          <SettingsSection title="Danger zone"><DangerZone /></SettingsSection>
        </SettingsLayout>
      </GallerySection>
    </GalleryPage>
  )
}
