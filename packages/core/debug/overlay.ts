import type { Placeholder } from "../types";

interface DebugOverlayParams {
    placeholders: Placeholder[];
    width: number;
    height: number;
    debug?: {
        showBoxes?: boolean;
        showCenters?: boolean;
        showBaselines?: boolean;
    };
}

export function buildDebugOverlay({
    placeholders,
    width,
    height,
    debug }: DebugOverlayParams
): string {

  if (!debug) return "";

  const elements: string[] = [];

  for (const ph of placeholders) {
    const absX = Math.round(ph.x * width);
    const absY = Math.round(ph.y * height);
    const boxWidth = ph.width * width;
    const boxHeight = ph.height * height;

    // 🔴 BOX
    if (debug.showBoxes) {
      elements.push(`
        <rect
          x="${absX - boxWidth / 2}"
          y="${absY - boxHeight / 2}"
          width="${boxWidth}"
          height="${boxHeight}"
          fill="none"
          stroke="red"
          stroke-width="2"
        />
      `);
    }

    // 🔵 CENTER POINT
    if (debug.showCenters) {
      elements.push(`
        <circle cx="${absX}" cy="${absY}" r="4" fill="blue" />
      `);
    }

    // 🟢 BASELINE
    if (debug.showBaselines) {
      elements.push(`
        <line
          x1="${absX - boxWidth / 2}"
          y1="${absY}"
          x2="${absX + boxWidth / 2}"
          y2="${absY}"
          stroke="green"
          stroke-width="1"
        />
      `);
    }
  }

  return elements.join("\n");
}