import type { Metadata, Viewport } from "next";
import { GeistMono, GeistSans } from "@/fonts/geist";
import "./globals.css";
import { TooltipProvider } from "@/registry/ui/tooltip";
import { BlueprintLayer } from "@/components/blueprint/blueprint"
import { LightRoot } from "@/components/light-root"
import { JsonLd } from "@/components/seo/json-ld"
import { SiteAnalytics } from "@/components/site-analytics"
import { SkipLink } from "@/registry/ui/skip-link"
import { SITE } from "@/lib/site"
import { graph, libraryLd, organizationLd, personLd, websiteLd } from "@/lib/seo"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfc" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0f11" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "MiniDev UI: Free React + Tailwind Components, Blocks and Templates",
    template: "%s · MiniDev UI",
  },
  description: `${SITE.countLabel} free React and Tailwind CSS v4 components, landing page blocks and templates. shadcn-compatible, copy and own the code, light and dark, MIT licensed.`,
  applicationName: SITE.name,
  // Google shows a favicon when the page links a square icon whose size is a multiple of 48px
  // (or an SVG) and /favicon.ico is reachable. Files live in /public so the URLs never change.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icons/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  authors: [{ name: "MiniDev", url: SITE.studio.url }],
  creator: "MiniDev",
  publisher: "MiniDev",
  category: "technology",
  keywords: [
    "react components",
    "tailwind components",
    "shadcn components",
    "shadcn registry",
    "free ui kit",
    "nextjs components",
    "tailwind css v4",
    "landing page blocks",
    "react templates",
  ],
  openGraph: {
    title: "MiniDev UI: Free React + Tailwind Components",
    description: `${SITE.countLabel} free React + Tailwind components, blocks and templates, drawn to a hairline standard. shadcn-compatible, MIT.`,
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiniDev UI: Free React + Tailwind Components",
    description: `${SITE.countLabel} free React + Tailwind components, blocks and templates. shadcn-compatible, MIT.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full overflow-x-clip antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var r=document.documentElement;var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)r.classList.add("dark");var q=new URLSearchParams(location.search).get("material");var m=q||localStorage.getItem("material")||"glass";r.setAttribute("data-material",m)}catch(e){}document.addEventListener("click",function(e){var a=e.target&&e.target.closest&&e.target.closest("[data-skip-link]");var m=a&&(document.getElementById("main")||document.querySelector("main"));if(m){e.preventDefault();m.setAttribute("tabindex","-1");m.style.outline="none";m.focus();m.scrollIntoView()}})})()`,
          }}
        />
        <link rel="alternate" type="application/rss+xml" title="MiniDev UI guides" href="/guides/rss.xml" />
        {/* Discovery for crawlers and coding agents: the machine-readable versions of this site */}
        <link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt" />
        <link rel="alternate" type="text/plain" title="llms-full.txt" href="/llms-full.txt" />
        <link rel="alternate" type="text/markdown" title="AGENTS.md: rules for AI coding agents" href="/AGENTS.md" />
        <link rel="alternate" type="application/json" title="shadcn registry" href="/r/registry.json" />
        <JsonLd data={graph(organizationLd(), personLd(), websiteLd(), libraryLd())} />
      </head>
      <body className="flex min-h-full w-full min-w-0 flex-col overflow-x-clip bg-bg text-fg">
        {/* Pages name their <main> differently; the click handler in the head script finds it. */}
        <SkipLink href="#main" data-skip-link="" />
        {/* min-w-0: flex items default to min-width:auto and marquees/w-max would expand the page */}
        <div className="flex min-h-full w-full min-w-0 flex-1 flex-col">
          <TooltipProvider>{children}</TooltipProvider>
        </div>
        <BlueprintLayer />
        <LightRoot />
        <SiteAnalytics />
      </body>
    </html>
  );
}
