export interface Placeholder {
  key: string;

  /**
   * Position as a fraction of the image dimensions (0.0 – 1.0).
   * x: 0.5 = horizontal center, y: 0.3 = 30% from the top.
   * This makes placeholders portable across different template sizes.
   * FIX #4: was absolute pixels — now relative coordinates.
   */
  x: number;
  y: number;

  fontSize?: number;
  fontColor?: string;
  fontFamily?: string; // FIX #6: was hardcoded "sans-serif"
  align?: "left" | "center" | "right";

  /**
   * Hard character limit before truncation.
   * FIX #2: prevents text overflow on the certificate.
   * Default: 60. Set lower for short fields like names.
   */
  maxLength?: number;
}

export interface RenderInput {
  templateBuffer: Buffer;
  placeholders: Placeholder[];
  data: Record<string, string>;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/**
 * FIX #3: Escape XML special characters so SVG never breaks
 * if a value contains <, >, &, ', or ".
 * Without this, a name like "John & Co" corrupts the SVG.
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}