# SEO: what is in place and what to do next

Plain notes for running search on ui.minidev.pro. Last updated 30 Sep 2026.

## What the site now has

### Pages built for search (all static, server rendered)

- /components and /components/[category]: 20 category hubs ("React form components", "AI chat UI components for React", ...). Each has an intro, every component with its install command, FAQ, related categories.
- /docs/[name]: 495 component pages. Each has its own title, description (hand written per component), canonical, social image, breadcrumb and SoftwareSourceCode data, plus related components from the same category.
- /guides and /guides/[slug]: 11 long guides (1,300 to 2,000 words each) with FAQ and article data. RSS at /guides/rss.xml.
- /compare and /compare/[slug]: 5 comparison pages (shadcn/ui, Aceternity UI, Magic UI, Tailwind Plus, coss ui).
- /tools and /tools/[slug]: 4 free tools (box shadow generator, glassmorphism generator, OKLCH palette generator, brand kit generator). Tools attract links and repeat visits.
- Every existing page (templates, gallery pages, brand kits, studio, showcase, playground) now has its own title, description and canonical.

### Technical

- sitemap.xml: about 618 URLs. robots.txt points to it and keeps crawlers off /playground (a copy of /docs).
- Social images: generated per component, category, guide, comparison and tool (src/lib/og.tsx). Template pages use real screenshots in public/og/templates.
- Structured data: Organization, WebSite, SoftwareSourceCode, BreadcrumbList, FAQPage, TechArticle, HowTo, WebApplication, ProfessionalService (studio), CreativeWork (templates).
- llms.txt and llms-full.txt now list categories, guides, tools, comparisons and a description for every component (for ChatGPT, Claude, Perplexity and other AI tools).
- Favicon, apple icon, web manifest, a helpful 404 page.
- Internal links: homepage index, footer (Popular, Learn), docs index and every docs page link into the category hubs.

### Where to edit

- Component descriptions: src/content/component-seo/part-*.ts (part-4 is for new components).
- Category copy and FAQ: src/content/categories.ts
- Guides: src/content/guides/*.ts, then add the import to src/content/guides/index.ts
- Comparisons: src/content/compare/*.ts. Re-check competitor facts every 3 months and update `checked`.
- Titles and descriptions for hand built pages: src/content/pages.ts
- Tools: src/content/tools.ts and src/components/tools/*

## Do these after the next deploy (about 30 minutes)

1. Push and deploy. Then open these and make sure they load:
   - https://ui.minidev.pro/sitemap.xml
   - https://ui.minidev.pro/robots.txt
   - https://ui.minidev.pro/docs/button/opengraph-image
   - https://ui.minidev.pro/guides/rss.xml
2. Google Search Console
   - Add a property for ui.minidev.pro (URL prefix is fine). Verify with the HTML tag method: copy the content value and set it as `GOOGLE_SITE_VERIFICATION` in Netlify environment variables, then redeploy.
   - Submit https://ui.minidev.pro/sitemap.xml
   - Use URL Inspection and request indexing for: /, /components, /templates, /tools and each tool page, /guides and the 3 newest guides.
3. Bing Webmaster Tools: import the site from Search Console (one click). Bing feeds ChatGPT search and Copilot. Optional: set `BING_SITE_VERIFICATION`.
4. Analytics (pick one, both are off until set):
   - Plausible: set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=ui.minidev.pro`
   - Google Analytics 4: set `NEXT_PUBLIC_GA_ID=G-XXXXXXX`
5. Test a few URLs in https://search.google.com/test/rich-results and the LinkedIn Post Inspector (a docs page, a guide, a tool, a template).

## Links from other sites (the part that moves rankings)

Do one or two a day. Each is a real backlink or a steady source of visitors.

- Make the GitHub repo public and set `SITE.github` in src/lib/site.ts. A public repo with stars is the single strongest trust signal for a component library.
- Submit the registry to the shadcn registry directory (ui.shadcn.com, "Registry Directory"), so people can install with the namespaced CLI.
- Pull requests to lists: awesome-shadcn-ui, awesome-tailwindcss, awesome-react-components, awesome-nextjs.
- Launch sites: Product Hunt, Hacker News (Show HN: the box shadow generator or the brand kit generator makes a better post than "a UI kit"), DevHunt, Uneed, Peerlist, Tiny Launch, AlternativeTo (list as an alternative to Aceternity UI, Magic UI, Tailwind Plus).
- Reddit: r/reactjs, r/nextjs, r/tailwindcss, r/webdev. Post the tools and guides as useful things, not ads. One post per subreddit per month at most.
- Cross-post each guide to dev.to and Hashnode with the canonical URL set to the ui.minidev.pro guide.
- Every social post, reel and video links to one specific page (a tool, a guide, a template), not just the homepage.
- The npm package README should link to ui.minidev.pro and the docs.

## Content plan (next 8 weeks, 2 guides a week)

Aim each guide at one search phrase and link it to the matching category hub and components.

- React data table with TanStack Table and Tailwind
- shadcn sidebar layout for a SaaS app
- OTP input in React (paste, autofill, accessibility)
- Kanban board in React with drag and drop
- Stripe checkout and billing page UI in Next.js
- Settings page patterns for SaaS
- Command palette (Cmd+K) in React
- Toasts and notifications in Next.js
- Tailwind CSS v4 migration notes for component libraries
- Landing page teardowns of the 8 templates (one per template)

More tool ideas that pull links: Tailwind v4 theme generator, CSS gradient generator, noise and grain texture generator, favicon generator.

## Keep in mind

- One page per search intent. If two pages target the same phrase, merge them.
- Update `LIBRARY_UPDATED` in src/app/sitemap.ts and `SITE.countLabel` in src/lib/site.ts when the component set changes.
- Check Search Console weekly: pages with impressions but a low click rate need a better title and description.
