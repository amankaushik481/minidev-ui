#!/usr/bin/env node
/**
 * MiniDev UI audit gate.
 * 1) Screenshot every gallery route @ 1440 & 390, light & dark, DPR 2 → shots/
 * 2) axe-core — any violation fails
 * 3) Pixel contrast for text-ish nodes — fail below 4.5:1
 * 4) Bounding boxes rest vs hover vs focus — dimensional change fails
 *
 * Usage: npm run audit
 * Starts `next start` after `next build` unless AUDIT_BASE_URL is set.
 */

import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const shotsDir = path.join(root, "shots");
const galleryDir = path.join(root, "src/app/gallery");

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];
const THEMES = ["light", "dark"];
const CONTRAST_MIN = 4.5;

function relContrast(l1, l2) {
  const [a, b] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (a + 0.05) / (b + 0.05);
}

function srgbToLin(c) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function luminance(r, g, b) {
  return 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
}

async function discoverRoutes() {
  const routes = [];
  async function walk(dir, slugParts) {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    const hasPage = entries.some(
      (e) => e.isFile() && /^page\.(tsx|jsx|mdx)$/.test(e.name),
    );
    if (hasPage && slugParts.length > 0) {
      routes.push("/gallery/" + slugParts.join("/"));
    } else if (hasPage && slugParts.length === 0) {
      routes.push("/gallery");
    }
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      if (e.name.startsWith("_") || e.name.startsWith("(")) continue;
      await walk(path.join(dir, e.name), [...slugParts, e.name]);
    }
  }
  await walk(galleryDir, []);
  return [...new Set(routes)].sort();
}

async function waitForUrl(url, timeoutMs = 120_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 404) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Server did not become ready at ${url}`);
}

async function startServer() {
  if (process.env.AUDIT_BASE_URL) {
    return { baseUrl: process.env.AUDIT_BASE_URL, stop: async () => {} };
  }

  // Prefer production server for stable paints
  const build = spawn("npx", ["next", "build"], {
    cwd: root,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  await new Promise((resolve, reject) => {
    build.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`next build failed (${code})`)),
    );
  });

  const port = process.env.AUDIT_PORT || "4310";
  const child = spawn("npx", ["next", "start", "-p", port], {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
    shell: process.platform === "win32",
    env: { ...process.env, PORT: port },
  });
  const baseUrl = `http://127.0.0.1:${port}`;
  let stderr = "";
  child.stderr?.on("data", (d) => {
    stderr += d.toString();
  });
  try {
    await waitForUrl(baseUrl);
  } catch (e) {
    child.kill("SIGTERM");
    throw new Error(`${e.message}\n${stderr}`);
  }
  return {
    baseUrl,
    stop: async () => {
      child.kill("SIGTERM");
    },
  };
}

async function sampleContrast(page) {
  return page.evaluate(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    function toRgb(css) {
      if (!css || css === "transparent" || css === "rgba(0, 0, 0, 0)") return null;
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = "#000";
      ctx.fillStyle = css;
      try {
        ctx.fillRect(0, 0, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 1).data;
        return [d[0], d[1], d[2]];
      } catch {
        return null;
      }
    }
    const results = [];
    const nodes = Array.from(
      document.querySelectorAll("button, a, p, span, label, h1, h2, h3, li"),
    );
    for (const el of nodes.slice(0, 80)) {
      const text = (el.textContent || "").trim();
      if (!text) continue;
      // skip tiny / emoji-only noise that skews chip sampling
      if (text.length <= 2) continue;
      if (/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\d\s]+$/u.test(text) && text.length < 4) continue;
      const style = getComputedStyle(el);
      if (style.visibility === "hidden" || style.display === "none") continue;
      if (Number(style.opacity) === 0) continue;
      const fg = toRgb(style.color);
      let bgEl = el;
      let bg = null;
      for (let i = 0; i < 12 && bgEl; i++) {
        const b = getComputedStyle(bgEl).backgroundColor;
        bg = toRgb(b);
        if (bg) break;
        bgEl = bgEl.parentElement;
      }
      if (!fg || !bg) continue;
      results.push({
        text: text.slice(0, 40),
        fg,
        bg,
        tag: el.tagName.toLowerCase(),
      });
    }
    return results;
  });
}

function parseRgb(str) {
  const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

async function measureBoxes(page, selector) {
  const el = page.locator(selector).first();
  if ((await el.count()) === 0) return null;
  const rest = await el.boundingBox();
  await el.hover({ force: true }).catch(() => {});
  const hover = await el.boundingBox();
  await el.focus({ force: true }).catch(() => {});
  const focus = await el.boundingBox();
  await page.mouse.move(0, 0);
  return { rest, hover, focus };
}

function boxChanged(a, b) {
  if (!a || !b) return false;
  return (
    Math.abs(a.width - b.width) > 0.5 || Math.abs(a.height - b.height) > 0.5
  );
}

async function main() {
  const failures = [];
  const routes = await discoverRoutes();
  if (routes.length === 0) {
    console.error("No gallery routes found under src/app/gallery. Add components first.");
    process.exit(2);
  }

  console.log("Gallery routes:", routes.join(", "));
  await rm(shotsDir, { recursive: true, force: true });
  await mkdir(shotsDir, { recursive: true });

  const { baseUrl, stop } = await startServer();
  const browser = await chromium.launch({ headless: true });

  try {
    for (const route of routes) {
      for (const theme of THEMES) {
        for (const vp of VIEWPORTS) {
          const context = await browser.newContext({
            viewport: { width: vp.width, height: vp.height },
            deviceScaleFactor: 2,
          });
          const page = await context.newPage();
          const url = baseUrl + route;
          await page.goto(url, { waitUntil: "networkidle" });
          await page.evaluate((t) => {
            document.documentElement.classList.toggle("dark", t === "dark");
          }, theme);

          const slug = route.replace(/\//g, "_").replace(/^_/, "") || "gallery";
          const shotName = `${slug}__${theme}__${vp.name}.png`;
          await page.screenshot({
            path: path.join(shotsDir, shotName),
            fullPage: true,
          });

          // axe
          const axe = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa"])
            .exclude("button[disabled], input[disabled], textarea[disabled], [aria-disabled='true']")
            .analyze();
          for (const v of axe.violations) {
            failures.push(
              `[axe] ${route} (${theme}/${vp.name}): ${v.id} — ${v.help} (${v.nodes.length} nodes)`,
            );
          }

          // contrast (computed style approximation; catches obvious fails)
          const samples = await sampleContrast(page);
          for (const s of samples) {
            const fg = s.fg;
            const bg = s.bg;
            if (!fg || !bg) continue;
            const ratio = relContrast(luminance(...fg), luminance(...bg));
            if (ratio < CONTRAST_MIN) {
              failures.push(
                `[contrast] ${route} (${theme}): "${s.text}" ${ratio.toFixed(2)}:1 < ${CONTRAST_MIN}:1 (${s.tag})`,
              );
            }
          }

          // layout shift on interactive controls
          const boxes = await measureBoxes(page, "button, [role='button'], a");
          if (boxes?.rest) {
            if (boxChanged(boxes.rest, boxes.hover)) {
              failures.push(
                `[layout-shift] ${route} (${theme}): hover changed box ${JSON.stringify(boxes.rest)} → ${JSON.stringify(boxes.hover)}`,
              );
            }
            if (boxChanged(boxes.rest, boxes.focus)) {
              failures.push(
                `[layout-shift] ${route} (${theme}): focus changed box ${JSON.stringify(boxes.rest)} → ${JSON.stringify(boxes.focus)}`,
              );
            }
          }

          await page.close();
          await context.close();
        }
      }
    }
  } finally {
    await browser.close();
    await stop();
  }

  const reportPath = path.join(shotsDir, "audit-report.txt");
  const report =
    failures.length === 0
      ? "AUDIT PASS\n"
      : `AUDIT FAIL (${failures.length})\n` + failures.join("\n") + "\n";
  await writeFile(reportPath, report, "utf8");
  console.log(report);

  if (failures.length > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
