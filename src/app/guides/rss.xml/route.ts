import { GUIDES } from "@/content/guides"
import { SITE } from "@/lib/site"

export const dynamic = "force-static"

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

export function GET() {
  const items = GUIDES.map(
    (g) => `    <item>
      <title>${esc(g.title)}</title>
      <link>${SITE.url}/guides/${g.slug}</link>
      <guid isPermaLink="true">${SITE.url}/guides/${g.slug}</guid>
      <description>${esc(g.description)}</description>
      <pubDate>${new Date(g.date).toUTCString()}</pubDate>
    </item>`,
  ).join("\n")
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MiniDev UI guides</title>
    <link>${SITE.url}/guides</link>
    <atom:link href="${SITE.url}/guides/rss.xml" rel="self" type="application/rss+xml" />
    <description>Practical guides for React, Next.js and Tailwind CSS v4 from the team behind MiniDev UI.</description>
    <language>en</language>
${items}
  </channel>
</rss>`
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } })
}
