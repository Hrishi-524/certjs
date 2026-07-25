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
  debug,
}: DebugOverlayParams): string {
	if (!debug) return "";

	const elements: string[] = [];

	for (const ph of placeholders) {
		const absX = ph.x * width;
		const absY = ph.y * height;
		const absWidth = ph.width * width;
        const absHeight = ph.height * height;

			// Derive the center since x and y are start of placeholder rectangle
		const centerX = absX + absWidth / 2;
        const centerY = absY + absHeight / 2;

		if (debug.showBoxes) {
			elements.push(`
				<rect
					x="${centerX - absWidth / 2}"
					y="${centerY - absHeight / 2}"
					width="${absWidth}"
					height="${absHeight}"
					fill="none"
					stroke="red"
					stroke-width="2"
				/>
			`);
		}

		if (debug.showCenters) {
		elements.push(`
			<circle cx="${centerX}" cy="${centerY}" r="4" fill="blue" />
		`);
		}

		if (debug.showBaselines) {
		elements.push(`
			<line
				x1="${centerX - absWidth / 2}"
				y1="${centerY}"
				x2="${centerX + absWidth / 2}"
				y2="${centerY}"
				stroke="green"
				stroke-width="1"
			/>
		`);
		}
	}

	return elements.join("\n");
}
