import sharp from "sharp";
import type {  DebugOptions, LayoutResult, RenderInput } from "./types";
import escapeXml from "./utils/escapeXml";
import strategyFn from "./strategies";
import { buildDebugOverlay } from "./debug/overlay";

export async function renderCertificate(input: RenderInput, debugOptions?: DebugOptions): Promise<Buffer> {
    let image: sharp.Sharp;
    let meta: sharp.Metadata;

    console.log("renderCertificate: Starting rendering process with input:", input);
    // Step 1. Load the template image and read its dimensions.
    try {
        image = sharp(input.templateBuffer);
        meta = await image.metadata();
    } catch (err) {
        throw new Error(`renderCertificate: failed to read template — ${err}`);
    }

    if (!meta.width || !meta.height) {
        throw new Error("renderCertificate: template image has no readable dimensions");
    }

    const { width, height } = meta;

    /*
        Placholders schema (ph as referenced in types.ts):
        - id, template_id (FK), name, x, y, key, align, width, height, font_size, font_color, font_family, min_font_size, startergy ("shrink" | "ellipsis" | "wrap"), overflow
    */

    // Step 2. For each placeholder, create an SVG <text> element with absolute pixel coordinates.
    const svgElements = input.placeholders.map((ph) => {
        // Convert relative coordinates to absolute pixels
        const absX = ph.x * width;
        const absY = ph.y * height;
        const absWidth = ph.width * width;
        const absHeight = ph.height * height;

        // Derive the center since x and y are start of placeholder rectangle
        const centerX = absX + absWidth / 2;
        const centerY = absY + absHeight / 2;

        // Get Placeholder metadata and use defaults where necessary
        const content = input.data[ph.key];
        console.log(`Rendering placeholder "${ph.name}" with content (raw):`, content);

        
        const strategy : "shrink" | "ellipsis" | "wrap" = ph.strategy ?? "shrink";
        const fontSize : number = ph.font_size ?? 40;
        const color = ph.font_color ?? "#000000";
        const family = ph.font_family ?? "sans-serif"; 
        const ph_width = ph.width;
        const min_font_size = ph.min_font_size;
        
        // Get Placeholder text and apply strategy if needed
        let result : LayoutResult = strategyFn(
            String(content),
            min_font_size? min_font_size : 10,
            width,
            ph_width,
            fontSize,
            family,
            strategy
        );
        
        
        // strategyFn will return the processed text and font size based on the strategy
        // If no processing is needed, it will return the original content and font size
        const correctedFontSize = result.font_size;
        const lineHeight = correctedFontSize * 1.2;
        const totalHeight = (result.lines.length - 1) * lineHeight;
        const startY = centerY - totalHeight / 2;
        const correctedContent = result.lines.map((line, i) => `
            <tspan
                x="${centerX}"
                y="${startY + i * lineHeight}"
            >
                ${escapeXml(line)}
            </tspan>
        `).join("");
        const anchorMap = { center: "middle", right: "end", left: "start" } as const;
        const anchor = anchorMap[ph.align ?? "left"];
        
        return `
            <text
                x="${centerX}"
                y="${centerY}"
                font-size="${correctedFontSize}"
                fill="${color}"
                text-anchor="${anchor}"
                font-family="${escapeXml(family)}"
                dominant-baseline="middle"
            >
                ${correctedContent}
            </text>
        `
    });

    // Step 2.5. If debug options are enabled, generate SVG elements for debugging (bounding boxes, centers, baselines).
    const debugLayer = buildDebugOverlay({
        placeholders: input.placeholders,
        width,
        height,
        debug: debugOptions
    });

    // Step 3. Composite the SVG elements onto the template image and export as PNG.
    const svg = `
        <svg
            width="${width}"
            height="${height}"
            xmlns="http://www.w3.org/2000/svg"
        >
            ${svgElements.join("\n")}
            ${debugLayer}
        </svg>
    `;

    // Step 4. Composite the SVG onto the template image and export as PNG buffer.
    try {
        return await image
        .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
        .png()
        .toBuffer();
    } catch (err) {
        throw new Error(`renderCertificate: composite/export failed — ${err}`);
    }
}