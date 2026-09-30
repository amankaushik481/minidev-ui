import type { MetadataRoute } from "next"
import { SITE } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The playground mirrors /docs; keep crawlers on the canonical pages.
        disallow: ["/playground/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
