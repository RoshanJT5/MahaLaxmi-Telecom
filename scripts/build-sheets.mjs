// Builds 6 spritesheets per variant (desktop + mobile) from the flythrough frames.
// Usage: node scripts/build-sheets.mjs
// Output: public/page-section2/sheets/{desk,mob}-N.jpg + manifest.json
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const FRAMES_DIR = path.join(ROOT, 'public/page-section2/frames');
const MOBILE_DIR = path.join(ROOT, 'public/page-section2/frames-mobile');
const OUT_DIR = path.join(ROOT, 'public/page-section2/sheets');

const listFrames = async (dir) =>
  (await readdir(dir))
    .filter((f) => /\.jpe?g$/i.test(f))
    .sort()
    .map((f) => path.join(dir, f));

const chunk = (arr, sizes) => {
  const out = [];
  let i = 0;
  for (const n of sizes) {
    out.push(arr.slice(i, i + n));
    i += n;
  }
  return out;
};

async function buildSheet(files, { cols, rows, cellW, cellH, outFile }) {
  const sheetW = cols * cellW;
  const sheetH = rows * cellH;
  const composites = [];
  for (let k = 0; k < files.length; k++) {
    const col = k % cols;
    const row = Math.floor(k / cols);
    const buf = await sharp(files[k])
      .resize(cellW, cellH, { fit: 'cover' })
      .jpeg({ quality: 72 })
      .toBuffer();
    composites.push({ input: buf, left: col * cellW, top: row * cellH });
  }
  await sharp({
    create: { width: sheetW, height: sheetH, channels: 3, background: '#0a0a0b' },
  })
    .composite(composites)
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(outFile);
  return { sheetW, sheetH };
}

async function buildVariant({ name, dir, prefix, perSheet, cols, rows, cellW, cellH }) {
  const files = await listFrames(dir);
  console.log(`[${name}] ${files.length} frames`);
  const groups = chunk(files, perSheet);
  const sheets = [];
  let start = 0;
  for (let i = 0; i < groups.length; i++) {
    const outFile = path.join(OUT_DIR, `${prefix}-${i}.jpg`);
    const { sheetW, sheetH } = await buildSheet(groups[i], { cols, rows, cellW, cellH, outFile });
    console.log(`[${name}] sheet ${i}: ${groups[i].length} frames -> ${path.basename(outFile)} (${sheetW}x${sheetH})`);
    sheets.push({ file: `sheets/${prefix}-${i}.jpg`, start, count: groups[i].length });
    start += groups[i].length;
  }
  return { cellW, cellH, cols, rows, total: files.length, sheets };
}

const main = async () => {
  await mkdir(OUT_DIR, { recursive: true });

  const desktop = await buildVariant({
    name: 'desktop',
    dir: FRAMES_DIR,
    prefix: 'desk',
    perSheet: [43, 43, 43, 43, 43, 40],
    cols: 7,
    rows: 7,
    cellW: 960,
    cellH: 540,
  });

  const mobile = await buildVariant({
    name: 'mobile',
    dir: MOBILE_DIR,
    prefix: 'mob',
    perSheet: [22, 22, 22, 21, 21, 20],
    cols: 6,
    rows: 4,
    cellW: 853,
    cellH: 480,
  });

  await writeFile(path.join(OUT_DIR, 'manifest.json'), JSON.stringify({ desktop, mobile }, null, 2));
  console.log('manifest.json written');
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
