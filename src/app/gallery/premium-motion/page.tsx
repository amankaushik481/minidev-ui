"use client"
import { HeroKineticType } from "@/registry/premium/hero-kinetic-type"
import { HeroPosterType } from "@/registry/premium/hero-poster-type"
import { HeroEditorialSplit } from "@/registry/premium/hero-editorial-split"
import { MaskedGradientHeadline } from "@/registry/premium/masked-gradient-headline"
import { MagneticCta } from "@/registry/premium/magnetic-cta"
import { StickyFeatureStory } from "@/registry/premium/sticky-feature-story"
import { BeforeAfterWipe } from "@/registry/premium/before-after-wipe"
import { DeviceFrameStack } from "@/registry/premium/device-frame-stack"
import { FlipStatBoard } from "@/registry/premium/flip-stat-board"
import { CursorSpotlightPanel } from "@/registry/premium/cursor-spotlight-panel"
import { MarqueeQuotes } from "@/registry/premium/marquee-quotes"
import { LaunchCountdown } from "@/registry/premium/launch-countdown"
import { OrbitLogoCluster } from "@/registry/premium/orbit-logo-cluster"
import { CommandWaitlist } from "@/registry/premium/command-waitlist"
import { HorizontalProductRail } from "@/registry/premium/horizontal-product-rail"
import { OnboardingMotion } from "@/registry/premium/onboarding-motion"
import { CardTilt } from "@/registry/premium/card-tilt"
import { TextScramble } from "@/registry/premium/text-scramble"
import { PinScrollGallery } from "@/registry/premium/pin-scroll-gallery"
import { MorphPrice } from "@/registry/premium/morph-price"
import { WaveformHero } from "@/registry/premium/waveform-hero"
import { GridReveal } from "@/registry/premium/grid-reveal"
import { FilmstripScrub } from "@/registry/premium/filmstrip-scrub"
import { TypographicMarquee } from "@/registry/premium/typographic-marquee"
import { SoftStack } from "@/registry/premium/soft-stack"
import { LiveComponentRail } from "@/registry/premium/live-component-rail"
import { FreePremiumCompare } from "@/registry/premium/free-premium-compare"
import { MetricTickerBoard } from "@/registry/premium/metric-ticker-board"
import { HeroClientPitch } from "@/registry/premium/hero-client-pitch"
import { ProductOsMock } from "@/registry/premium/product-os-mock"
import { FeatureBentoMotion } from "@/registry/premium/feature-bento-motion"
import { StickyCtaBar } from "@/registry/premium/sticky-cta-bar"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Motion" premium description="Kinetic type, sticky stories, magnetic calls to action. Everything respects reduced motion.">
      <GallerySection title="Poster / kinetic">
        <div className="w-full space-y-8">
          <HeroEditorialSplit />
          <HeroPosterType />
          <HeroKineticType />
        </div>
      </GallerySection>
      <GallerySection title="Marquee / scramble / tilt">
        <div className="w-full space-y-8">
          <TypographicMarquee />
          <TextScramble />
          <div className="grid gap-4 md:grid-cols-2">
            <CardTilt />
            <CardTilt title="Inevitable screens" body="Poster type + magnetic close." />
          </div>
        </div>
      </GallerySection>
      <GallerySection title="Waveform / stack / grid / bento">
        <div className="w-full space-y-8">
          <WaveformHero />
          <FeatureBentoMotion />
          <div className="grid gap-8 lg:grid-cols-2">
            <SoftStack />
            <GridReveal />
          </div>
          <div className="relative h-24"><StickyCtaBar title="Sticky close on scroll" /></div>
        </div>
      </GallerySection>
      <GallerySection title="Pin scroll / filmstrip / morph">
        <div className="w-full space-y-8">
          <PinScrollGallery />
          <FilmstripScrub />
          <MorphPrice />
        </div>
      </GallerySection>
      <GallerySection title="Masked + magnetic">
        <div className="w-full space-y-6">
          <MaskedGradientHeadline />
          <MagneticCta>Get started</MagneticCta>
        </div>
      </GallerySection>
      <GallerySection title="Device stack + orbit">
        <div className="grid w-full gap-8 lg:grid-cols-2">
          <DeviceFrameStack />
          <OrbitLogoCluster />
        </div>
      </GallerySection>
      <GallerySection title="Product rail">
        <div className="w-full"><HorizontalProductRail /></div>
      </GallerySection>
      <GallerySection title="Wipe compare">
        <div className="w-full"><BeforeAfterWipe /></div>
      </GallerySection>
      <GallerySection title="Sticky story">
        <div className="w-full"><StickyFeatureStory /></div>
      </GallerySection>
      <GallerySection title="Stats + spotlight + quotes">
        <div className="w-full space-y-8">
          <FlipStatBoard />
          <CursorSpotlightPanel />
          <MarqueeQuotes />
        </div>
      </GallerySection>
      <GallerySection title="Countdown + waitlist + onboarding">
        <div className="flex w-full flex-col items-center gap-10">
          <LaunchCountdown />
          <CommandWaitlist />
          <OnboardingMotion />
        </div>
      </GallerySection>
    
      <GallerySection title="Client pitch / OS / compare">
        <div className="w-full space-y-10">
          <HeroClientPitch />
          <MetricTickerBoard />
          <LiveComponentRail />
          <ProductOsMock />
          <FreePremiumCompare />
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
