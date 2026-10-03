import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { TooltipProvider } from "@/registry/ui/tooltip";
import { BlueprintLayer } from "@/components/blueprint/blueprint"
import { LightRoot } from "@/components/light-root"
import { JsonLd } from "@/components/seo/json-ld"
import { SiteAnalytics } from "@/components/site-analytics"
import { SITE } from "@/lib/site"
import { graph, libraryLd, organizationLd, websiteLd } from "@/lib/seo"

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
            __html: `(function(){try{var r=document.documentElement;var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)r.classList.add("dark");var q=new URLSearchParams(location.search).get("material");var m=q||localStorage.getItem("material")||"glass";r.setAttribute("data-material",m)}catch(e){}})()`,
          }}
        />
        <link rel="alternate" type="application/rss+xml" title="MiniDev UI guides" href="/guides/rss.xml" />
        <link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt" />
        <JsonLd data={graph(organizationLd(), websiteLd(), libraryLd())} />
      </head>
      <body className="flex min-h-full w-full min-w-0 flex-col overflow-x-clip bg-bg text-fg">
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
