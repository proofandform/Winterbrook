/**
 * Optimize crawled originals in /assets into web-ready copies in /public/images.
 * - Rasters: resized to max 2400px wide, progressive JPEG q80 (next/image then
 *   serves AVIF/WebP variants on demand).
 * - SVG/MP4: copied through untouched.
 * - Emits lib/image-manifest.json with { width, height, blurDataURL } per image
 *   so every <Image> gets intrinsic sizing + blur-up without runtime probing.
 */
import sharp from "sharp";
import { readdir, mkdir, copyFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve("assets");
const OUT = path.resolve("public/images");
const VIDEO_OUT = path.resolve("public/video");
const MANIFEST = path.resolve("lib/image-manifest.json");

const sanitize = (name) =>
  name
    .normalize("NFKD")
    .replace(/©/g, "")
    .replace(/[^\w.\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-(?=\.)/g, "")
    .toLowerCase();

await mkdir(OUT, { recursive: true });
await mkdir(VIDEO_OUT, { recursive: true });
await mkdir(path.dirname(MANIFEST), { recursive: true });

const manifest = {};
const files = (await readdir(SRC)).filter((f) => !f.startsWith("."));
let done = 0;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const src = path.join(SRC, file);
  const clean = sanitize(file);

  if (ext === ".mp4") {
    continue; // hero videos are cut & transcoded deliberately, never bulk-copied
  }
  if (ext === ".svg") {
    await copyFile(src, path.join(OUT, clean));
    continue;
  }
  if (![".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)) continue;

  const outName = clean.replace(/\.(jpeg|png|webp|gif)$/, ".jpg");
  const outPath = path.join(OUT, outName);

  const img = sharp(src, { failOn: "none" }).rotate();
  const meta = await img.metadata();
  const width = Math.min(meta.width ?? 2400, 2400);

  let pipeline = img.resize({ width, withoutEnlargement: true });
  if (ext === ".png" && (meta.hasAlpha ?? false)) {
    pipeline = pipeline.flatten({ background: "#eae5dd" });
  }
  const info = await pipeline
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toFile(outPath);

  const blur = await sharp(src, { failOn: "none" })
    .rotate()
    .resize({ width: 16 })
    .jpeg({ quality: 40 })
    .toBuffer();

  manifest[outName] = {
    width: info.width,
    height: info.height,
    blurDataURL: `data:image/jpeg;base64,${blur.toString("base64")}`,
  };
  done++;
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
const outFiles = await readdir(OUT);
let totalKB = 0;
for (const f of outFiles) totalKB += (await stat(path.join(OUT, f))).size / 1024;
console.log(
  `Optimized ${done} rasters -> ${OUT} (${outFiles.length} files, ${(totalKB / 1024).toFixed(1)} MB total)`
);
