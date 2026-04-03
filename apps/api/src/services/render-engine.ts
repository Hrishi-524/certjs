import sharp from "sharp";
import type { Placeholder , RenderInput } from "./types";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function renderCertificate(input: RenderInput): Promise<Buffer> {
    let image: sharp.Sharp;
    let meta: sharp.Metadata;

  // FIX #5: wrap Sharp calls in try/catch so errors carry context.
  // A raw Sharp error ("Input buffer contains unsupported image format")
  // is useless to a caller — wrap it with what you were doing.
  try {
    image = sharp(input.templateBuffer);
    meta = await image.metadata();
  } catch (err) {
    throw new Error(`renderCertificate: failed to read template — ${err}`);
  }

  // FIX #1: guard against missing metadata instead of using non-null assertions.
  // meta.width / meta.height are undefined for corrupt or unsupported images.
  if (!meta.width || !meta.height) {
    throw new Error(
      "renderCertificate: template image has no readable dimensions"
    );
  }

  const { width, height } = meta;

  // Build one SVG layer with every placeholder as a <text> element.
  const svgElements = input.placeholders.map((ph) => {
    // FIX #4: convert relative (0–1) coordinates to absolute pixels.
    // Stored as fractions so the same config works on any template size.
    const absX = Math.round(ph.x * width);
    const absY = Math.round(ph.y * height);

    const rawValue = input.data[ph.key] ?? "";

    // FIX #2: truncate to maxLength before rendering.
    // Prevents long strings from spilling outside the certificate boundary.
    const limit = ph.maxLength ?? 60;
    const truncated =
      rawValue.length > limit ? rawValue.slice(0, limit) + "…" : rawValue;

    // FIX #3: escape the final value — safe against <, >, &, quotes.
    const safeValue = escapeXml(truncated);

    const color = ph.fontColor ?? "#000000";
    const size = ph.fontSize ?? 40;
    const family = ph.fontFamily ?? "sans-serif"; // FIX #6: per-placeholder font

    const anchorMap = { center: "middle", right: "end", left: "start" } as const;
    const anchor = anchorMap[ph.align ?? "left"];
    
    return `<text
      x="${absX}"
      y="${absY}"
      font-size="${size}"
      fill="${color}"
      text-anchor="${anchor}"
      font-family="${escapeXml(family)}"
      dominant-baseline="middle"
    >${safeValue}</text>`;
  });

  const svg = `
    <svg
      width="${width}"
      height="${height}"
      xmlns="http://www.w3.org/2000/svg"
    >
      ${svgElements.join("\n")}
    </svg>
  `;

  // FIX #5: wrap the composite step separately — different failure mode.
  try {
    return await image
      .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
      .png()
      .toBuffer();
  } catch (err) {
    throw new Error(`renderCertificate: composite/export failed — ${err}`);
  }
}