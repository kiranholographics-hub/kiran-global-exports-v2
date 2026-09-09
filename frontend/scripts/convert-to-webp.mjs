// One-off conversion: recompress every raster image (jpg/jpeg/png) under
// public/ as .webp, then remove the original file. Run with:
//   node scripts/convert-to-webp.mjs
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const RASTER_EXT = new Set(['.jpg', '.jpeg', '.png']);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (RASTER_EXT.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const files = await walk(PUBLIC_DIR);
  let totalBefore = 0;
  let totalAfter = 0;
  const converted = [];

  for (const file of files) {
    const ext = path.extname(file);
    const dest = file.slice(0, -ext.length) + '.webp';
    const before = (await fs.stat(file)).size;

    await sharp(file).webp({ quality: 82 }).toFile(dest);

    const after = (await fs.stat(dest)).size;
    await fs.unlink(file);

    totalBefore += before;
    totalAfter += after;
    converted.push({ file: path.relative(PUBLIC_DIR, file), before, after });
  }

  for (const c of converted) {
    console.log(
      `${c.file} — ${(c.before / 1024).toFixed(0)}KB -> ${(c.after / 1024).toFixed(0)}KB`
    );
  }
  console.log(
    `\nConverted ${converted.length} images. Total: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
