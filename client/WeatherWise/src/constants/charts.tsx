import clear_day from "/light_theme_icons/clear_day.svg"
import clear_night from "/light_theme_icons/clear_night.svg"
import partly_cloudy_day from "/light_theme_icons/partly_cloudy_day.svg"
import partly_cloudy_night from "/light_theme_icons/partly_cloudy_night.svg"
import cloudy from "/light_theme_icons/cloudy.svg"
import fog from "/light_theme_icons/fog.svg"
import rain from "/light_theme_icons/rain.svg"
import sleet from "/light_theme_icons/sleet.svg"
import snow from "/light_theme_icons/snow.svg"
import storm from "/light_theme_icons/storm.svg"


export const toDegree = (n: number): number => {
    return (n / 180) * Math.PI
}

export const weatherIcons: { [key: number]: string[] } = {
    1000: [clear_night, clear_day],
    1003: [partly_cloudy_night, partly_cloudy_day],
    1006: [cloudy, cloudy],
    1009: [cloudy, cloudy],
    1030: [fog, fog],
    1063: [rain, rain],
    1066: [snow, snow], 
    1069: [sleet, sleet],
    1072: [rain, rain], 
    1087: [storm, storm],
    1114: [snow, snow],
    1117: [snow, snow], 
    1135: [fog, fog],
    1147: [fog, fog], 
    1150: [rain, rain],
    1153: [rain, rain],
    1168: [rain, rain],
    1171: [rain, rain],
    1180: [rain, rain],
    1183: [rain, rain],
    1186: [rain, rain],
    1189: [rain, rain],
    1192: [rain, rain],
    1195: [rain, rain],
    1198: [rain, rain],
    1201: [rain, rain],
    1204: [sleet, sleet], 
    1207: [sleet, sleet], 
    1210: [snow, snow],
    1213: [snow, snow],
    1216: [snow, snow],
    1219: [snow, snow],
    1222: [snow, snow],
    1225: [snow, snow],
    1237: [snow, snow],
    1240: [rain, rain],
    1243: [rain, rain],
    1246: [rain, rain],
    1249: [sleet, sleet],
    1252: [sleet, sleet],
    1255: [snow, snow],
    1258: [snow, snow],
    1261: [snow, snow],
    1264: [snow, snow], 
    1273: [storm, storm],
    1276: [storm, storm],
    1279: [storm, storm],
    1282: [storm, storm]
}

export const chartWidth = 0.07

// 24-Hour Forecast Chart
export const hourlyForecastLabels = ["", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
]

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

// Real Feel Chart
export const coldRange = [-50, 18]
export const comfortRange = [18, 24]
export const hotRange = [24, 40]

export const getRealFeelLevel = (temp: number) => {
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

// Compass
export const windDirections: { [key: string]: string } = {
    "N": "North", 
    "NNE": "North-northeast",
    "NE": "Northeast",
    "ENE": "East-northeast",
    "E": "East",
    "ESE": "East-southeast",
    "SE": "Southeast",
    "SSE": "South-southeast",
    "S": "South",
    "SSW": "South-southwest",
    "SW": "Southwest",
    "WSW": "West-southWest",
    "W": "West",
    "WNW": "West-northwest",
    "NW": "Northwest",
    "NNW": "North-northwest"
}


// Sun Cycle Chart
export const bezierPoint = (cp1x: number, cp1y: number, cp2x: number, cp2y: number, x1: number, y1: number, x2: number, y2: number, t: number) => {
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

export const timeSunrisePos = 0.21
export const timeSunsetPos = 0.79

export const timeFormat = (time: number) => {
        const hours =  String(Math.floor(time/60))
        const minutes = String(time%60)
        return `${hours.length < 2 ? "0" + hours : hours}:${minutes.length < 2 ? "0" + minutes : minutes}`
}


