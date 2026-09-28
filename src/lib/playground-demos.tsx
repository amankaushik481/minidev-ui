"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { Switch } from "@/registry/ui/switch"
import { Checkbox } from "@/registry/ui/checkbox"
import { Badge } from "@/registry/ui/badge"
import { Callout } from "@/registry/ui/callout"
import { EmptyState } from "@/registry/ui/empty-state"
import { ErrorState } from "@/registry/ui/error-state"
import { FormField } from "@/registry/ui/form-field"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Kbd } from "@/registry/ui/kbd"
import { Skeleton } from "@/registry/ui/skeleton"
import { Progress } from "@/registry/ui/progress"
import { Slider } from "@/registry/ui/slider"
import { Textarea } from "@/registry/ui/textarea"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { StatusBadge } from "@/registry/ui/status-badge"
import { MetricDelta } from "@/registry/ui/metric-delta"
import { QueryBuilder } from "@/registry/ui/query-builder"
import { BuildPipeline } from "@/registry/ui/build-pipeline"
import { ShortcutCheatSheet } from "@/registry/ui/shortcut-cheat-sheet"
import { SecretReveal } from "@/registry/ui/secret-reveal"
import { UptimeBar } from "@/registry/ui/uptime-bar"
import { Spinner } from "@/registry/ui/spinner"
import { Banner } from "@/registry/ui/banner"
import { InlineAlert } from "@/registry/ui/inline-alert"
import { BackLink } from "@/registry/ui/back-link"
import { CitationChip } from "@/registry/ui/citation-chip"
import { StopGenerating } from "@/registry/ui/stop-generating"
import { OfflineBanner } from "@/registry/ui/offline-banner"
import { CommitRow } from "@/registry/ui/commit-row"
import { CheckRunList } from "@/registry/ui/check-run-list"
import { TraceWaterfall } from "@/registry/ui/trace-waterfall"
import { CoverageMeter } from "@/registry/ui/coverage-meter"
import { RegionPicker } from "@/registry/ui/region-picker"
import { WaffleChart } from "@/registry/ui/waffle-chart"
import { GoalRing } from "@/registry/ui/goal-ring"
import { PublishBar } from "@/registry/ui/publish-bar"
import { LiveCursorsBar } from "@/registry/ui/live-cursors-bar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { MagneticCta } from "@/registry/premium/magnetic-cta"
import { HeroKineticType } from "@/registry/premium/hero-kinetic-type"
import { HeroPosterType } from "@/registry/premium/hero-poster-type"
import { HeroEditorialSplit } from "@/registry/premium/hero-editorial-split"
import { CardTilt } from "@/registry/premium/card-tilt"
import { TextScramble } from "@/registry/premium/text-scramble"
import { MorphPrice } from "@/registry/premium/morph-price"
import { BeforeAfterWipe } from "@/registry/premium/before-after-wipe"
import { LogoWallMotion } from "@/registry/premium/logo-wall-motion"
import { TestimonialCarousel } from "@/registry/premium/testimonial-carousel"
import { WaveformHero } from "@/registry/premium/waveform-hero"
import { FilmstripScrub } from "@/registry/premium/filmstrip-scrub"
import { SoftStack } from "@/registry/premium/soft-stack"
import { GridReveal } from "@/registry/premium/grid-reveal"
import { LaunchCountdown } from "@/registry/premium/launch-countdown"
import { VersionBadge } from "@/registry/ui/version-badge"
import { ContextChip } from "@/registry/ui/context-chip"
import { DiffView } from "@/registry/ui/diff-view"
import { ChatThread } from "@/registry/ui/chat-thread"
import { AgentTrace } from "@/registry/ui/agent-trace"
import { ArtifactPreview } from "@/registry/ui/artifact-preview"
import { SuggestionChips } from "@/registry/ui/suggestion-chips"
import { UpgradePrompt } from "@/registry/ui/upgrade-prompt"
import { LoadingOverlay } from "@/registry/ui/loading-overlay"
import { StickyCtaBar } from "@/registry/premium/sticky-cta-bar"
import { FeatureBentoMotion } from "@/registry/premium/feature-bento-motion"
import { HeroClientPitch } from "@/registry/premium/hero-client-pitch"
import { ProductOsMock } from "@/registry/premium/product-os-mock"
import { MetricTickerBoard } from "@/registry/premium/metric-ticker-board"
import { FreePremiumCompare } from "@/registry/premium/free-premium-compare"
import { LiveComponentRail } from "@/registry/premium/live-component-rail"
import { CommandWaitlist } from "@/registry/premium/command-waitlist"
import { Toaster, toast } from "@/registry/ui/toast"
import { InteractiveAreaChart } from "@/registry/ui/interactive-area-chart"
import { NotificationInbox } from "@/registry/ui/notification-inbox"

const AGENT_STEPS = [
  { id: "1", name: "read_file(\"pricing-table.tsx\")", status: "done" as const, duration: "0.2s", detail: "182 lines · PlanCard × 3, no billing toggle" },
  { id: "2", name: "search_docs(\"segmented control\")", status: "done" as const, duration: "0.6s", detail: "Found SegmentedControl in registry/ui" },
  { id: "3", name: "edit_file(\"pricing-table.tsx\")", status: "running" as const, detail: "+ <SegmentedControl items={[\"Monthly\", \"Yearly\"]} />" },
  { id: "4", name: "run_checks()", status: "pending" as const },
]

function ToastDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Toaster />
      <Button variant="outline" onClick={() => toast("Draft saved", { description: "Autosaved 2 seconds ago." })}>Default</Button>
      <Button variant="outline" onClick={() => toast.success("Invoice sent", { description: "Northwind Labs will get it by email.", action: { label: "View", onClick: () => {} } })}>Success</Button>
      <Button variant="outline" onClick={() => toast.error("Payment failed", { description: "The card was declined. Try another method." })}>Error</Button>
      <Button onClick={() => toast.promise(new Promise((r) => setTimeout(r, 1600)), { loading: "Deploying web@4.2.0…", success: "Deployed to production", error: "Deploy failed" })}>Promise</Button>
    </div>
  )
}

export type DemoState = { label: string; node: React.ReactNode }

export const CURATED_PLAYGROUND = [
  "button","input","switch","checkbox","badge","tabs","dialog","select",
  "empty-state","upgrade-prompt","chat-thread","agent-trace","diff-view",
  "hero-client-pitch","product-os-mock","metric-ticker-board","free-premium-compare",
  "live-component-rail","magnetic-cta","hero-kinetic-type","feature-bento-motion",
  "before-after-wipe","logo-wall-motion","testimonial-carousel","sticky-cta-bar",
] as const

export function getPlaygroundDemos(name: string): DemoState[] | null {
  const map: Record<string, DemoState[]> = {
    button: [
      { label: "Default", node: <Button>Continue</Button> },
      { label: "Outline", node: <Button variant="outline">Cancel</Button> },
      { label: "Destructive", node: <Button variant="destructive">Delete</Button> },
      { label: "Sizes", node: <div className="flex flex-wrap items-center gap-2"><Button size="sm">Sm</Button><Button>Default</Button><Button size="lg">Lg</Button></div> },
    ],
    input: [
      { label: "Default", node: <FormField label="Email"><Input type="email" placeholder="you@minidev.pro" aria-label="Email" /></FormField> },
      { label: "Disabled", node: <Input disabled defaultValue="Locked" aria-label="Disabled" /> },
    ],
    switch: [
      { label: "Off / on", node: <div className="flex items-center gap-3"><Switch aria-label="Notifications" /><Switch defaultChecked aria-label="Marketing" /></div> },
    ],
    checkbox: [
      { label: "States", node: <div className="flex gap-4"><label className="flex items-center gap-2 text-sm"><Checkbox aria-label="A" /> Unchecked</label><label className="flex items-center gap-2 text-sm"><Checkbox defaultChecked aria-label="B" /> Checked</label></div> },
    ],
    badge: [
      { label: "Variants", node: <div className="flex flex-wrap gap-2"><Badge>Default</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="outline">Outline</Badge><Badge variant="destructive">Destructive</Badge></div> },
    ],
    callout: [
      { label: "Tones", node: <div className="w-full max-w-md space-y-3"><Callout title="Info" tone="info">Stay on semantic tokens.</Callout><Callout title="Warning" tone="warning">Audit before merge.</Callout></div> },
    ],
    "empty-state": [
      { label: "Default", node: <EmptyState title="No projects" description="Create your first project to get started." actionLabel="New project" /> },
    ],
    "error-state": [
      { label: "Retry", node: <ErrorState onRetry={() => {}} /> },
    ],
    banner: [
      { label: "Accent", node: <Banner action={<Button size="sm">Upgrade</Button>}>5 days left in your trial.</Banner> },
      { label: "Warning", node: <Banner tone="warning">Degraded API performance in us-east.</Banner> },
    ],
    "inline-alert": [
      { label: "Tones", node: <div className="w-full max-w-md space-y-3"><InlineAlert title="Saved" tone="success">Draft synced.</InlineAlert><InlineAlert title="Careful" tone="warning">This action is billable.</InlineAlert></div> },
    ],
    spinner: [
      { label: "Sizes", node: <div className="flex items-center gap-4"><Spinner size="sm" /><Spinner /><Spinner size="lg" /></div> },
    ],
    "back-link": [{ label: "Default", node: <BackLink href="/gallery">Gallery</BackLink> }],
    "citation-chip": [{ label: "Indexed", node: <div className="flex gap-2"><CitationChip index={1}>DESIGN.md</CitationChip><CitationChip index={2}>audit.mjs</CitationChip></div> }],
    "stop-generating": [{ label: "Default", node: <StopGenerating /> }],
    "offline-banner": [{ label: "With retry", node: <div className="w-full"><OfflineBanner onRetry={() => {}} /></div> }],
    tabs: [
      { label: "Basic", node: <Tabs defaultValue="a"><TabsList><TabsTrigger value="a">Overview</TabsTrigger><TabsTrigger value="b">Activity</TabsTrigger></TabsList><TabsContent value="a">Overview panel</TabsContent><TabsContent value="b">Activity panel</TabsContent></Tabs> },
    ],
    dialog: [
      { label: "Basic", node: (
        <Dialog>
          <DialogTrigger className="inline-flex h-9 items-center rounded-lg border border-border bg-surface px-3 text-sm font-medium text-fg outline-none hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent">
            Open dialog
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename project</DialogTitle>
              <DialogDescription>This updates the gallery slug and docs link.</DialogDescription>
            </DialogHeader>
            <Input aria-label="Name" defaultValue="lux-css" />
          </DialogContent>
        </Dialog>
      ) },
    ],
    select: [
      { label: "Basic", node: (
        <Select defaultValue="free">
          <SelectTrigger className="w-48" aria-label="Tier"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </SelectContent>
        </Select>
      ) },
    ],
    kbd: [{ label: "Combo", node: <div className="flex items-center gap-1"><Kbd>⌘</Kbd><Kbd>K</Kbd></div> }],
    skeleton: [{ label: "Block", node: <div className="w-64 space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3" /><Skeleton className="h-24 w-full" /></div> }],
    progress: [{ label: "Value", node: <Progress value={64} aria-label="Progress" className="w-64" /> }],
    slider: [{ label: "Default", node: <Slider defaultValue={[40]} aria-label="Intensity" className="w-64" /> }],
    textarea: [{ label: "Default", node: <Textarea aria-label="Notes" placeholder="Ship notes…" className="min-h-28" /> }],
    avatar: [{ label: "Fallback", node: <Avatar><AvatarFallback>AK</AvatarFallback></Avatar> }],
    "status-badge": [{ label: "Tones", node: <div className="flex flex-wrap gap-2"><StatusBadge tone="success">Live</StatusBadge><StatusBadge tone="warning">Degraded</StatusBadge><StatusBadge tone="danger">Down</StatusBadge><StatusBadge tone="accent">Premium</StatusBadge></div> }],
    "metric-delta": [{ label: "Up / down", node: <div className="flex gap-4"><MetricDelta value={12} /><MetricDelta value={-4} /></div> }],
    "query-builder": [{ label: "Interactive", node: <div className="w-full max-w-xl"><QueryBuilder /></div> }],
    "build-pipeline": [{ label: "Stages", node: <BuildPipeline /> }],
    "shortcut-cheat-sheet": [{ label: "Sheet", node: <div className="w-full max-w-md"><ShortcutCheatSheet /></div> }],
    "secret-reveal": [{ label: "Reveal", node: <div className="w-full max-w-md"><SecretReveal /></div> }],
    "uptime-bar": [{ label: "90 days", node: <div className="w-full max-w-lg"><UptimeBar /></div> }],
    "commit-row": [{ label: "Row", node: <div className="w-full max-w-xl rounded-xl border border-border bg-surface"><CommitRow /></div> }],
    "check-run-list": [{ label: "Checks", node: <div className="w-full max-w-md"><CheckRunList /></div> }],
    "trace-waterfall": [{ label: "Trace", node: <div className="w-full max-w-xl"><TraceWaterfall /></div> }],
    "coverage-meter": [{ label: "Coverage", node: <div className="w-64"><CoverageMeter value={91} /></div> }],
    "region-picker": [{ label: "Regions", node: <div className="w-full max-w-lg"><RegionPicker /></div> }],
    "waffle-chart": [{ label: "Adoption", node: <div className="w-56"><WaffleChart /></div> }],
    "goal-ring": [{ label: "Goal", node: <GoalRing /> }],
    "publish-bar": [{ label: "Draft", node: <div className="w-full"><PublishBar /></div> }],
    "live-cursors-bar": [{ label: "Presence", node: <LiveCursorsBar /> }],
    "magnetic-cta": [{ label: "Hover me", node: <MagneticCta>Get Premium</MagneticCta> }],
    "hero-kinetic-type": [{ label: "Hero", node: <div className="w-full"><HeroKineticType /></div> }],
    "hero-poster-type": [{ label: "Poster", node: <div className="w-full"><HeroPosterType /></div> }],
    "hero-editorial-split": [{ label: "Editorial", node: <div className="w-full"><HeroEditorialSplit /></div> }],
    "card-tilt": [{ label: "Tilt", node: <div className="w-full max-w-sm"><CardTilt /></div> }],
    "text-scramble": [{ label: "Scramble", node: <TextScramble /> }],
    "morph-price": [{ label: "Price", node: <div className="w-full max-w-sm"><MorphPrice /></div> }],
    "before-after-wipe": [{ label: "Wipe", node: <div className="w-full max-w-xl"><BeforeAfterWipe /></div> }],
    "logo-wall-motion": [{ label: "Logos", node: <div className="w-full"><LogoWallMotion /></div> }],
    "testimonial-carousel": [{ label: "Carousel", node: <div className="w-full max-w-xl"><TestimonialCarousel /></div> }],
    "waveform-hero": [{ label: "Waveform", node: <div className="w-full"><WaveformHero /></div> }],
    "filmstrip-scrub": [{ label: "Scrub", node: <div className="w-full max-w-xl"><FilmstripScrub /></div> }],
    "soft-stack": [{ label: "Stack", node: <SoftStack /> }],
    "grid-reveal": [{ label: "Grid", node: <div className="w-full max-w-lg"><GridReveal /></div> }],
    "launch-countdown": [{ label: "Countdown", node: <div className="w-full"><LaunchCountdown /></div> }],
    "command-waitlist": [{ label: "Waitlist", node: <CommandWaitlist /> }],
    "version-badge": [{ label: "Channels", node: <div className="flex flex-wrap gap-2"><VersionBadge version="0.6.0" channel="stable" /><VersionBadge version="0.7.0" channel="beta" /></div> }],
    "context-chip": [{ label: "Active", node: <div className="flex gap-2"><ContextChip active>Files</ContextChip><ContextChip>Web</ContextChip></div> }],
    "diff-view": [{ label: "Sample", node: <div className="w-full max-w-lg"><DiffView filename="button.tsx" lines={[{ type: "ctx", text: "function Button() {" }, { type: "del", text: "  return <button />" }, { type: "add", text: "  return <button data-slot=\"button\" />" }, { type: "ctx", text: "}" }]} /></div> }],
    "chat-thread": [{ label: "Thread", node: <div className="w-full max-w-md rounded-xl border border-border bg-surface p-4 shadow-raised"><ChatThread messages={[{ id: "1", role: "user", content: "Summarise churn for September." }, { id: "2", role: "assistant", content: "Net churn fell to 1.8%, down 0.4 points. Most of the drop came from annual plans renewing early after the pricing change." }]} /></div> }],
    "agent-trace": [{ label: "Agent run", node: <AgentTrace steps={AGENT_STEPS} meta="3 tools · 0.8s · $0.004" /> }],
    toast: [{ label: "Click to fire, hover the stack to expand", node: <ToastDemo /> }],
    "interactive-area-chart": [{ label: "Hover or use arrow keys", node: <InteractiveAreaChart /> }],
    "notification-inbox": [{ label: "Click the bell", node: <NotificationInbox /> }],
    "artifact-preview": [{ label: "Artifact", node: <div className="w-full max-w-md"><ArtifactPreview title="preview.tsx" copyValue=" console.log(1)">{" "}<pre className="font-mono text-xs text-fg">const ok = true</pre></ArtifactPreview></div> }],
    "suggestion-chips": [{ label: "Chips", node: <SuggestionChips /> }],
    "upgrade-prompt": [{ label: "Prompt", node: <div className="w-full max-w-sm"><UpgradePrompt /></div> }],
    "loading-overlay": [{ label: "Overlay", node: <div className="relative h-32 w-64 rounded-xl border border-border bg-surface"><LoadingOverlay label="Saving" /></div> }],
    "feature-bento-motion": [{ label: "Bento", node: <div className="w-full"><FeatureBentoMotion /></div> }],
    "sticky-cta-bar": [{ label: "Scroll page to reveal", node: <div className="h-40 w-full text-sm text-fg-muted">Sticky CTA mounts globally in demos that need it — see Premium motion gallery.</div> }],
    "hero-client-pitch": [{ label: "Pitch", node: <div className="w-full"><HeroClientPitch /></div> }],
    "product-os-mock": [{ label: "OS", node: <div className="w-full"><ProductOsMock /></div> }],
    "metric-ticker-board": [{ label: "Metrics", node: <div className="w-full"><MetricTickerBoard /></div> }],
    "free-premium-compare": [{ label: "Compare", node: <div className="w-full"><FreePremiumCompare /></div> }],
    "live-component-rail": [{ label: "Rail", node: <div className="w-full"><LiveComponentRail /></div> }],
  }
  return map[name] ?? null
}
