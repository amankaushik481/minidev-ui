"use client"
import { Switch } from "@/registry/ui/switch"
import { Label } from "@/registry/ui/label"
import { SwitchDemo } from "@/components/reference/demos"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

const cell = "flex flex-col items-center gap-2"
const caption = "font-mono text-[10px] tracking-[0.06em] text-fg-subtle uppercase"

export default function Page() {
  return (
    <GalleryPage title="Switch" description="Press and hold: the thumb leans toward where it is going, then springs across on release.">
      <GallerySection title="Settings row" description="Whole row is clickable, saves optimistically">
        <SwitchDemo />
      </GallerySection>
      <GallerySection title="States" className="justify-center gap-10">
        <div className={cell}><Switch aria-label="Off" /><span className={caption}>Off</span></div>
        <div className={cell}><Switch defaultChecked aria-label="On" /><span className={caption}>On</span></div>
        <div className={cell}><Switch disabled aria-label="Disabled off" /><span className={caption}>Disabled</span></div>
        <div className={cell}><Switch disabled defaultChecked aria-label="Disabled on" /><span className={caption}>Disabled on</span></div>
        <div className={cell}><Switch readOnly defaultChecked aria-label="Read only" /><span className={caption}>Read only</span></div>
        <div className={cell}><Switch loading defaultChecked aria-label="Saving" /><span className={caption}>Loading</span></div>
        <div className={cell}><Switch loading aria-label="Saving off" /><span className={caption}>Loading off</span></div>
        <div className={cell}><Switch aria-invalid aria-label="Invalid" /><span className={caption}>Invalid</span></div>
      </GallerySection>
      <GallerySection title="Sizes" className="justify-center gap-10">
        <div className={cell}><Switch size="sm" defaultChecked aria-label="Small" /><span className={caption}>sm</span></div>
        <div className={cell}><Switch defaultChecked aria-label="Default" /><span className={caption}>default</span></div>
        <div className={cell}><Switch size="sm" loading aria-label="Small loading" /><span className={caption}>sm loading</span></div>
      </GallerySection>
      <GallerySection title="With a separate label">
        <div className="flex items-center gap-2">
          <Switch id="s-public" defaultChecked />
          <Label htmlFor="s-public">Public invoice links</Label>
        </div>
      </GallerySection>
      <GallerySection title="Edge cases" className="grid gap-6 sm:grid-cols-2">
        <Switch
          defaultChecked
          label="Require two-factor authentication for every member of the Lumen finance workspace, including guests and contractors"
          description="Members without 2FA are signed out at their next request and asked to enrol before they can open invoices, payouts or customer records."
        />
        <Switch label="A" />
        <Switch label="Read only" description="Managed by your organisation's SSO policy." readOnly defaultChecked />
        <Switch label="Disabled" description="Upgrade to Scale to turn on audit exports." disabled />
        <Switch size="sm" label="Compact row" description="Small size aligns to the first line." defaultChecked />
        <Switch label="Terms" description="You need to accept this to continue." aria-invalid />
        <div dir="rtl" className="w-full">
          <Switch defaultChecked label="إشعارات الفواتير" description="الاتجاه من اليمين إلى اليسار" />
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
