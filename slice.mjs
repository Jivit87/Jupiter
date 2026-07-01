import sharp from "sharp";
import { mkdirSync } from "node:fs";

const src = "/Users/jivitrana/Desktop/Jupiter/UI/home_page.png";
const outDir = "/tmp/jptr/sections";
mkdirSync(outDir, { recursive: true });

const meta = await sharp(src).metadata();
console.log("Dimensions:", meta.width, "x", meta.height);

const W = meta.width;
const H = meta.height;

// Slice into bands by approximate y ranges (from visual scan)
const bands = [
  { name: "00_topnav", top: 0, h: 56 },
  { name: "01_hero", top: 56, h: 460 },
  { name: "02_feature_strip", top: 516, h: 90 },
  { name: "03_brand_story", top: 606, h: 360 },
  { name: "04_curated", top: 966, h: 290 },
  { name: "05_trust_circles", top: 1256, h: 110 },
  { name: "06_instagram", top: 1366, h: 170 },
];

for (const b of bands) {
  const safeH = Math.max(1, Math.min(b.h, H - b.top));
  await sharp(src)
    .extract({ left: 0, top: b.top, width: W, height: safeH })
    .toFile(`${outDir}/${b.name}.png`);
  console.log("wrote", b.name);
}

// Also do a 2x upscale so text is more legible
await sharp(src).resize(W * 2, H * 2).toFile(`${outDir}/00_full_2x.png`);
console.log("wrote 2x full");
