export function toCanvasRect(
    x: number,
    y: number,
    width: number,
    height: number,
    canvasWidth: number,
    canvasHeight: number
) {
    return {
        x: x * canvasWidth,
        y: y * canvasHeight,
        width: width * canvasWidth,
        height: height * canvasHeight,
    };
}

export function toNormalizedRect(
    x: number,
    y: number,
    width: number,
    height: number,
    canvasWidth: number,
    canvasHeight: number
) {
    return {
        x: x / canvasWidth,
        y: y / canvasHeight,
        width: width / canvasWidth,
        height: height / canvasHeight,
    };
}