#!/usr/bin/env node
// One-off image optimizer for the Nicole Corbett photo shoot.
// Reads selected JPGs from /Users/dillanmilosevich/Desktop/manna/websizephotos/<Folder>/MannaBakery-N.jpg
// and writes resized/compressed .webp into /Users/dillanmilosevich/Desktop/IDE/Manna_bread/public/images/.

import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';

const SRC_ROOT = '/Users/dillanmilosevich/Desktop/manna/websizephotos';
const OUT_DIR = '/Users/dillanmilosevich/Desktop/IDE/Manna_bread/public/images';

// [folder, sourceFile, outName]
const PICKS = [
  // Restaurant interiors
  ['Restaurant', 'MannaBakery-1.jpg',   'manna-arched-alcove.webp'],
  ['Restaurant', 'MannaBakery-13.jpg',  'manna-interior-timber-beams.webp'],
  ['Restaurant', 'MannaBakery-14.jpg',  'manna-interior-marble-tables.webp'],
  ['Restaurant', 'MannaBakery-19.jpg',  'manna-front-entry.webp'],
  ['Restaurant', 'MannaBakery-20.jpg',  'manna-cognac-lounge.webp'],
  ['Restaurant', 'MannaBakery-21.jpg',  'manna-conference-room.webp'],
  ['Restaurant', 'MannaBakery-108.jpg', 'manna-pergola-lounge.webp'],
  ['Restaurant', 'MannaBakery-109.jpg', 'manna-server-coffee.webp'],

  // Food
  ['Food', 'MannaBakery-45.jpg',  'manna-strawberry-waffle.webp'],
  ['Food', 'MannaBakery-51.jpg',  'manna-tomato-soup.webp'],
  ['Food', 'MannaBakery-58.jpg',  'manna-chophouse-soup.webp'],
  ['Food', 'MannaBakery-61.jpg',  'manna-quiche-fruit.webp'],
  ['Food', 'MannaBakery-90.jpg',  'manna-grilled-panini.webp'],
  ['Food', 'MannaBakery-95.jpg',  'manna-turkey-panini.webp'],
  ['Food', 'MannaBakery-105.jpg', 'manna-breakfast-croissant.webp'],
  ['Food', 'MannaBakery-107.jpg', 'manna-breakfast-spread.webp'],

  // Kitchen
  ['Kitchen', 'MannaBakery-22.jpg', 'manna-espresso-pour.webp'],
  ['Kitchen', 'MannaBakery-28.jpg', 'manna-latte-art.webp'],
  ['Kitchen', 'MannaBakery-68.jpg', 'manna-croissant-tray.webp'],
  ['Kitchen', 'MannaBakery-74.jpg', 'manna-cookbook-detail.webp'],
  ['Kitchen', 'MannaBakery-75.jpg', 'manna-recipe-books.webp'],
  ['Kitchen', 'MannaBakery-77.jpg', 'manna-danish-prep.webp'],
  ['Kitchen', 'MannaBakery-83.jpg', 'manna-kitchen-team.webp'],
];

const MAX_DIM = 2000;
const TARGET_KB_HIGH = 500;
const QUALITY_PRIMARY = 80;
const QUALITY_FALLBACK = 75;

await fs.mkdir(OUT_DIR, { recursive: true });

let totalIn = 0;
let totalOut = 0;
const results = [];

for (const [folder, src, outName] of PICKS) {
  const inPath = path.join(SRC_ROOT, folder, src);
  const outPath = path.join(OUT_DIR, outName);
  const inStat = await fs.stat(inPath);
  totalIn += inStat.size;

  const meta = await sharp(inPath).metadata();
  const longest = Math.max(meta.width || 0, meta.height || 0);
  const resizeOpts = longest > MAX_DIM
    ? (meta.width >= meta.height ? { width: MAX_DIM } : { height: MAX_DIM })
    : null;

  const encode = async (q) => {
    let pipe = sharp(inPath);
    if (resizeOpts) pipe = pipe.resize(resizeOpts);
    await pipe.webp({ quality: q, effort: 5 }).toFile(outPath);
    const s = await fs.stat(outPath);
    return s.size;
  };

  let size = await encode(QUALITY_PRIMARY);
  let qualityUsed = QUALITY_PRIMARY;
  if (size / 1024 > TARGET_KB_HIGH) {
    size = await encode(QUALITY_FALLBACK);
    qualityUsed = QUALITY_FALLBACK;
  }

  totalOut += size;
  results.push({
    src: `${folder}/${src}`,
    out: outName,
    inKB: Math.round(inStat.size / 1024),
    outKB: Math.round(size / 1024),
    quality: qualityUsed,
    dims: `${meta.width}x${meta.height}`,
  });
}

console.table(results);
console.log(`Total in:  ${(totalIn / 1024 / 1024).toFixed(2)} MB`);
console.log(`Total out: ${(totalOut / 1024 / 1024).toFixed(2)} MB`);
console.log(`Average out: ${Math.round(totalOut / 1024 / results.length)} KB per file`);
