import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { TooltipProvider } from "@/registry/ui/tooltip";
import { BlueprintLayer } from "@/components/blueprint/blueprint"

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
  metadataBase: new URL("https://ui.minidev.pro"),
  title: {
    default: "MiniDev UI · Product UI, drawn with a finer pen",
    template: "%s · MiniDev UI",
  },
  description:
    "460+ free React + Tailwind components for tables, billing, settings, dashboards and AI chat. Hairline craft, light and dark, MIT forever.",
  openGraph: {
    title: "MiniDev UI",
    description:
      "460+ free React + Tailwind components, drawn to a hairline standard. MIT forever.",
    type: "website",
    siteName: "MiniDev UI",
    url: "https://ui.minidev.pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiniDev UI",
    description:
      "460+ free React + Tailwind components, drawn to a hairline standard. MIT forever.",
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
            __html: `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="flex min-h-full w-full min-w-0 flex-col overflow-x-clip bg-bg text-fg">
        {/* min-w-0: flex items default to min-width:auto and marquees/w-max would expand the page */}
        <div className="flex min-h-full w-full min-w-0 flex-1 flex-col">
          <TooltipProvider>{children}</TooltipProvider>
        </div>
        <BlueprintLayer />
      </body>
    </html>
  );
}
