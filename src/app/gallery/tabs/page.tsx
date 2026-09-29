"use client"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { ActivityIcon, CreditCardIcon, LayoutDashboardIcon, ReceiptIcon, SettingsIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { TabsDemo } from "@/components/reference/demos"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

const panel = "pt-2 text-[0.8125rem] text-fg-muted"
const scroll = "-m-1 max-w-[calc(100%+0.5rem)] overflow-x-auto p-1 [scrollbar-width:none]"

export default function Page() {
  return (
    <GalleryPage title="Tabs" description="Click or arrow between tabs: the thumb and the underline glide to the new tab instead of blinking.">
      <GallerySection title="Customer page" description="Line tabs with counts, default tabs as a range picker">
        <TabsDemo />
      </GallerySection>

      <GallerySection title="Default" className="flex-col items-start gap-6">
        <Tabs defaultValue="overview" className="w-full">
          <div className={scroll}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="invoices" badge={12}>Invoices</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="overview" className={panel}>Overview for the Lumen workspace.</TabsContent>
          <TabsContent value="invoices" className={panel}>12 invoices issued this month.</TabsContent>
          <TabsContent value="activity" className={panel}>Recent activity.</TabsContent>
        </Tabs>
        <Tabs defaultValue="invoices">
          <TabsList>
            <TabsTrigger value="overview"><LayoutDashboardIcon /> Overview</TabsTrigger>
            <TabsTrigger value="invoices"><ReceiptIcon /> Invoices</TabsTrigger>
            <TabsTrigger value="payments"><CreditCardIcon /> Payments</TabsTrigger>
          </TabsList>
        </Tabs>
      </GallerySection>

      <GallerySection title="Line" className="flex-col items-start gap-6">
        <Tabs defaultValue="deploys" className="w-full max-w-lg">
          <div className={scroll}>
            <TabsList variant="line">
              <TabsTrigger value="deploys" badge={3}>Deploys</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="env">Environment</TabsTrigger>
              <TabsTrigger value="domains" disabled>Domains</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="deploys" className={panel}>3 deploys in the last hour.</TabsContent>
          <TabsContent value="logs" className={panel}>Streaming logs from web@4.2.0.</TabsContent>
          <TabsContent value="env" className={panel}>14 variables across production and preview.</TabsContent>
        </Tabs>
        <Tabs defaultValue="activity">
          <TabsList variant="line">
            <TabsTrigger value="overview"><LayoutDashboardIcon /> Overview</TabsTrigger>
            <TabsTrigger value="activity"><ActivityIcon /> Activity</TabsTrigger>
            <TabsTrigger value="settings"><SettingsIcon /> Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      </GallerySection>

      <GallerySection title="Vertical" className="items-start gap-12">
        <Tabs defaultValue="general" orientation="vertical" className="flex-row">
          <TabsList className="w-40">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="members" badge={8}>Members</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="audit" disabled>Audit log</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="w-48 text-[0.8125rem] text-fg-muted">Workspace name and URL.</TabsContent>
          <TabsContent value="members" className="w-48 text-[0.8125rem] text-fg-muted">8 members, 2 pending invites.</TabsContent>
          <TabsContent value="billing" className="w-48 text-[0.8125rem] text-fg-muted">Scale plan, billed yearly.</TabsContent>
        </Tabs>
        <Tabs defaultValue="members" orientation="vertical" className="flex-row">
          <TabsList variant="line" className="w-40">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
        </Tabs>
      </GallerySection>

      <GallerySection title="Edge cases" className="flex-col items-start gap-6">
        <Tabs defaultValue="a" className="w-full max-w-md">
          <TabsList className="w-full">
            <TabsTrigger value="a" className="min-w-0"><span className="truncate">Quarterly revenue recognition schedule</span></TabsTrigger>
            <TabsTrigger value="b">Q</TabsTrigger>
          </TabsList>
        </Tabs>
        <Tabs defaultValue="list">
          <TabsList aria-label="View">
            <TabsTrigger value="list" aria-label="Overview"><LayoutDashboardIcon /></TabsTrigger>
            <TabsTrigger value="board" aria-label="Invoices"><ReceiptIcon /></TabsTrigger>
            <TabsTrigger value="cards" aria-label="Payments"><CreditCardIcon /></TabsTrigger>
          </TabsList>
        </Tabs>
        <Tabs defaultValue="b">
          <TabsList variant="line">
            <TabsTrigger value="a">A</TabsTrigger>
            <TabsTrigger value="b" badge={999}>Invoices waiting for approval</TabsTrigger>
          </TabsList>
        </Tabs>
        <DirectionProvider direction="rtl">
          <div dir="rtl">
            <Tabs defaultValue="b">
              <TabsList>
                <TabsTrigger value="a">نظرة عامة</TabsTrigger>
                <TabsTrigger value="b" badge={4}>الفواتير</TabsTrigger>
                <TabsTrigger value="c">النشاط</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </DirectionProvider>
      </GallerySection>
    </GalleryPage>
  )
}
