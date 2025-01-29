import { coldRange, comfortRange, hotRange } from "./charts"

export const toDegree = (n: number): number => {
    return (n / 180) * Math.PI
}


export function getRealFeelLevel (temp: number) {
    if (temp > coldRange[0] && temp <= coldRange[1]) {
        return (1-((temp-coldRange[1]) / (coldRange[0] - coldRange[1]))) * 0.5
    } else if (temp > comfortRange[0] && temp <= comfortRange[1]) {
        return 0.5 + (1-((temp-comfortRange[1]) / (comfortRange[0] - comfortRange[1]))) * (225/270-0.5)
    } else if (temp > hotRange[0] && temp <= hotRange[1]) {
        return (225/270) + (1-((temp-hotRange[1]) / (hotRange[0] - hotRange[1]))) * 0.33
    } else if (temp > hotRange[1]) {
        return 1
    }
    return 0
}

// Sun Cycle Chart
export function bezierPoint(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x1: number, y1: number, x2: number, y2: number, t: number) {
    const mid_x1 = x1+(cp1x-x1)*t
    const mid_y1 = cp1y+(y1-cp1y)*t
    
    const mid_x2 = cp2x+(x2-cp2x)*t
    const mid_y2 = cp2y+(y2-cp2y)*t

    const mid_x3 = cp1x + (cp2x - cp1x)*t
    const mid_y3 = cp1y + (cp2y - cp1y)*t

    const mid_x4 = mid_x1 + (mid_x3 - mid_x1) * t
    const mid_y4 = mid_y1 + (mid_y3 - mid_y1) * t

    const mid_x5 = mid_x3 + (mid_x2-mid_x3) * t
    const mid_y5 = mid_y3 + (mid_y2-mid_y3) * t

    const mid_x6 = mid_x4 + (mid_x5 - mid_x4)*t
    const mid_y6 = mid_y4 + (mid_y5 - mid_y4)*t

    return {x: mid_x6, y: mid_y6}
}

export function timeFormat(time: number) {
    const hours =  String(Math.floor(time/60))
    const minutes = String(time%60)
    return `${hours.length < 2 ? "0" + hours : hours}:${minutes.length < 2 ? "0" + minutes : minutes}`
}
