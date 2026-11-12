/**
 * Builds the matched leadership portraits in public/people/ from the
 * originals in assets/people-originals/: same 4:5 frame (800×1000), head top
 * 12% from the top, head-to-chin 40% of the height, on a matching charcoal
 * studio backdrop. Run with: node scripts/crop-portraits.mjs
 */
import sharp from "sharp";

// Charcoal studio gradient sampled from Gopali's photo: lighter centre, darker corners.
const studio = (x, y, W, H) => {
  const dx = (x / W - 0.5) / 0.75;
  const dy = (y / H - 0.42) / 0.9;
  const t = Math.min(1, Math.hypot(dx, dy));
  const centre = [98, 97, 98];
  const edge = [58, 57, 55];
  return centre.map((v, i) => v + (edge[i] - v) * t * t);
};

/** Replaces a flat background colour with the studio gradient using a soft matte. */
async function replaceFlatBackground(file, bg) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 3;
      const c = [data[i], data[i + 1], data[i + 2]];
      const d = Math.hypot(c[0] - bg[0], c[1] - bg[1], c[2] - bg[2]);
      const a = Math.max(0, Math.min(1, (d - 12) / 40)); // 0 = background, 1 = subject
      const s = studio(x, y, W, H);
      for (let k = 0; k < 3; k++) {
        const fg = a > 0.02 ? Math.max(0, Math.min(255, (c[k] - (1 - a) * bg[k]) / a)) : 0;
        data[i + k] = Math.round(a * fg + (1 - a) * s[k]);
      }
    }
  }
  return sharp(data, { raw: { width: W, height: H, channels: 3 } });
}

async function frame(image, { headTop, chin, centreX, width, height }, out) {
  const ch = Math.round((chin - headTop) / 0.4);
  const cw = Math.round(ch * 0.8);
  const top = Math.max(0, Math.min(Math.round(headTop - 0.12 * ch), height - ch));
  const left = Math.max(0, Math.min(Math.round(centreX - cw / 2), width - cw));
  await image
    .extract({ left, top, width: cw, height: ch })
    .resize(800, 1000, { kernel: "lanczos3" })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(out);
  console.log(out, { left, top, cw, ch });
}

// Rakhi's photo is a cut-out on flat grey (158,158,158).
await frame(
  await replaceFlatBackground("assets/people-originals/rakhi-kulshrestha.png", [158, 158, 158]),
  { headTop: 26, chin: 128, centreX: 205, width: 433, height: 577 },
  "public/people/rakhi-kulshrestha.jpg",
);
await frame(
  sharp("assets/people-originals/gopali-verma.jpg"),
  { headTop: 168, chin: 635, centreX: 600, width: 1254, height: 1254 },
  "public/people/gopali-verma.jpg",
);
