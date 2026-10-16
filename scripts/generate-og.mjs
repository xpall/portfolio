// @ts-nocheck
/**
 * Renders og/og-card.html to a 1200x630 social share image.
 *
 * Usage: npm run generate:og
 *
 * The page is rendered at 2x device scale (2400x1260) with headless
 * Chromium, then downsampled to exactly 1200x630 with ImageMagick so the
 * text stays crisp on high-DPI previews.
 */
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const htmlPath = path.join(root, "og", "og-card.html");
const outDir = path.join(root, "assets", "og");
const outPath = path.join(outDir, "og-card.png");

const WIDTH = 1200;
const HEIGHT = 630;
const SCALE = 2;

fs.mkdirSync(outDir, { recursive: true });
const tmpPath = path.join(os.tmpdir(), `og-card-${Date.now()}.png`);

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: SCALE,
  });

  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
  // Make sure the web fonts are actually applied before capturing.
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);

  await page.screenshot({
    path: tmpPath,
    clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
  });
} finally {
  await browser.close();
}

// Downsample 2x capture back to the exact target size.
execFileSync(
  "convert",
  [tmpPath, "-resize", `${WIDTH}x${HEIGHT}!`, "-strip", outPath],
  { stdio: "inherit" }
);
fs.rmSync(tmpPath, { force: true });

const { size } = fs.statSync(outPath);
console.log(
  `Wrote ${path.relative(root, outPath)} (${WIDTH}x${HEIGHT}, ${(size / 1024).toFixed(0)} KB)`
);
