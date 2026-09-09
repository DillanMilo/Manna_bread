// Extract the existing logo lettering without generating or typesetting new shapes.
const sharp = require('sharp');

async function main() {
  const { data, info } = await sharp('public/images/Bread from Heaven.PNG')
    .raw().toBuffer({ resolveWithObject: true });
  const crop = { left: 238, top: 249, width: 572, height: 169 };
  const cream = [254, 242, 207];
  const out = Buffer.alloc(crop.width * crop.height * 4);
  const pixel = (x, y) => (y * info.width + x) * info.channels;
  for (let y = 0; y < crop.height; y++) {
    for (let x = 0; x < crop.width; x++) {
      const sx = x + crop.left, sy = y + crop.top;
      const i = pixel(sx, sy), o = (y * crop.width + x) * 4;
      // The background and decorative elements in this crop are dark green.
      if (data[i] < 100) continue;
      let background = [39, 62, 50], nearest = Infinity;
      for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -4; dx <= 4; dx++) {
          const distance = dx * dx + dy * dy;
          if (distance >= nearest) continue;
          const j = pixel(sx + dx, sy + dy);
          if (data[j] < 90) {
            nearest = distance;
            background = [...data.subarray(j, j + 3)];
          }
        }
      }
      // Undo the original edge compositing against its local green background.
      const alpha = Math.max(0, Math.min(1,
        (data[i] - background[0]) / (cream[0] - background[0])));
      out[o] = cream[0]; out[o + 1] = cream[1]; out[o + 2] = cream[2];
      out[o + 3] = Math.round(alpha * 255);
    }
  }
  // Keep the substantial letter shapes; discard the separate bread illustration above it.
  const seen = new Uint8Array(crop.width * crop.height);
  const lettering = [];
  for (let start = 0; start < seen.length; start++) {
    if (seen[start] || out[start * 4 + 3] === 0) continue;
    const region = [start];
    seen[start] = 1;
    for (let q = 0; q < region.length; q++) {
      const current = region[q], x = current % crop.width, y = Math.floor(current / crop.width);
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || nx >= crop.width || ny < 0 || ny >= crop.height) continue;
        const next = ny * crop.width + nx;
        if (!seen[next] && out[next * 4 + 3] > 0) {
          seen[next] = 1; region.push(next);
        }
      }
    }
    if (region.length > 500) lettering.push(...region);
  }
  const keep = new Set(lettering);
  for (let i = 0; i < seen.length; i++) if (!keep.has(i)) out[i * 4 + 3] = 0;
  await sharp(out, { raw: { width: crop.width, height: crop.height, channels: 4 } })
    .png().toFile('public/images/manna-wordmark.png');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
