#!/usr/bin/env node
/**
 * Tell Bing, Yandex and other IndexNow engines that pages changed.
 * Run after a deploy is live:  node tools/indexnow.mjs            (every URL in the sitemap)
 *                              node tools/indexnow.mjs /tools /guides/x   (just these paths)
 * The key file lives at public/d56a93303a3141d95a40ea23e2e0f072.txt so engines can verify ownership.
 */
const HOST = "ui.minidev.pro"
const KEY = "d56a93303a3141d95a40ea23e2e0f072"

const args = process.argv.slice(2)
let urls
if (args.length) urls = args.map((p) => new URL(p, `https://${HOST}`).toString())
else {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text()
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
}
for (let i = 0; i < urls.length; i += 10000) {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls.slice(i, i + 10000) }),
  })
  console.log(`IndexNow: ${res.status} for ${Math.min(10000, urls.length - i)} URLs`)
}
