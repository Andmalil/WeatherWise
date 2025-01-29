import { toDegree } from "./functions"

// UV Chart
export const rainbowGradient = (ctx: CanvasRenderingContext2D, w: number, h: number): CanvasGradient => {
    const gradient = ctx.createConicGradient(toDegree(90), w/2, h/2)
    gradient.addColorStop(0.125, "#FF2E2E")
    gradient.addColorStop(0.25, "#FFB52E")
    gradient.addColorStop(0.375, "#FFFF2E")
    gradient.addColorStop(0.5, "#69C96E")
    gradient.addColorStop(0.625, "#38AEE6")
    gradient.addColorStop(0.75, "#2E2EFF")
    gradient.addColorStop(0.875, "#7C73D9")
    return gradient
}