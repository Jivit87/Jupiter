import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";

const src = "/Users/jivitrana/Desktop/Jupiter/UI/home_page.png";
const outDir = "/tmp/jptr/sections";
mkdirSync(outDir, { recursive: true });

const meta = await sharp(src).metadata();
const W = meta.width;
const H = meta.height;
console.log("Dim:", W, "x", H);

// split into 6 vertical third-bands
const third = Math.floor(H / 6);
for (let i = 0; i < 6; i++) {
  await sharp(src)
    .extract({ left: 0, top: i * third, width: W, height: third })
    .resize({ width: W * 2 })
    .toFile(`${outDir}/band_${i}.png`);
}

// Also break into 64-pixel tall strips for fine inspection
const stripH = 96;
const strips = Math.ceil(H / stripH);
console.log("strips:", strips);
for (let i = 0; i < strips; i++) {
  const top = i * stripH;
  const height = Math.min(stripH, H - top);
  await sharp(src)
    .extract({ left: 0, top, width: W, height })
    .resize({ width: W * 2 })
    .toFile(`${outDir}/strip_${String(i).padStart(2,'0')}.png`);
}

// Sample colors at center column every 8 px to detect background transitions
const { data } = await sharp(src).raw().toBuffer({ resolveWithObject: true });
console.log("raw len:", data.length, "expected:", W * H * 3);
writeFileSync("/tmp/jptr/raw_meta.txt", JSON.stringify({ W, H, len: data.length }));

// Sample column at x = W/2 every 16 px
const samples = [];
for (let y = 0; y < H; y += 8) {
  const idx = (y * W + Math.floor(W / 2)) * 3;
  const r = data[idx], g = data[idx + 1], b = data[idx + 2];
  samples.push({ y, r, g, b, h: rgbToHex(r, g, b) });
}
writeFileSync("/tmp/jptr/center_column.json", JSON.stringify(samples, null, 2));
console.log("samples:", samples.length);

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}
