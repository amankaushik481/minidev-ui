import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { TooltipProvider } from "@/registry/ui/tooltip";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1c20" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.minidev.pro"),
  title: {
    default: "MiniDev UI — Hairline React + Tailwind registry",
    template: "%s · MiniDev UI",
  },
  description:
    "Free MIT product UI forever. Premium kinetic launch moments. Geist Sans, accent hue 285, audit-gated screenshots.",
  openGraph: {
    title: "MiniDev UI",
    description:
      "Free components. Premium moments. Hairline craft for product teams who care.",
    type: "website",
    siteName: "MiniDev UI",
    url: "https://ui.minidev.pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiniDev UI",
    description:
      "Free MIT product UI. Premium kinetic launch moments. Audit-gated.",
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
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-bg text-fg">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
