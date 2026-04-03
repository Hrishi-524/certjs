import { createCanvas } from "@napi-rs/canvas";

const canvas = createCanvas(0, 0);
const ctx = canvas.getContext("2d");

const cache = new Map<string, number>();

export default function measureWidth(
    text: string,
    fontSize: number,
    fontFamily: string
):  number {
    const key = `${text}-${fontSize}-${fontFamily}`;

    if (cache.has(key)) {
        return cache.get(key)!;
    }

    ctx.font = `${fontSize}px ${fontFamily}`;

    const width = ctx.measureText(text).width;

    cache.set(key, width);

    return width;
}