import { ComponentProps, useContext, useEffect, useRef } from "react";
import { WeatherContext } from "../../../context/weatherContext";
import { WeatherContextType } from "../../../@types/weather";
import { bezierPoint, timeFormat, timeSunrisePos, timeSunsetPos } from "../../../constants/charts";

export function SunCycleChart(props: ComponentProps<"canvas">) {
    const { forecasts, currentCity } = useContext(WeatherContext) as WeatherContextType
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const calculateSunPos = (sunriseTime: number, sunsetTime: number) => {
        const now = new Date(new Date().toLocaleString('en-US', {timeZone: forecasts[currentCity].timezone}))
       
        const currentTime = now.getHours()*60 + now.getMinutes()

        if (currentTime <= sunriseTime) {
            return currentTime/sunriseTime*timeSunrisePos
        } else if (currentTime >= sunsetTime) {
            return timeSunsetPos + ((currentTime-sunsetTime)/(1440-sunsetTime)*(1-timeSunsetPos))
        }
        return timeSunrisePos + ((currentTime - sunriseTime)/(sunsetTime - sunriseTime) * (timeSunsetPos - timeSunrisePos))
    }   
    const chartHeight = (w: number, h: number) => Math.min(w, h)*0.5
    const radius = (w: number, h: number) => Math.min(w, h)*0.4
    const offset = (w: number, h: number) => {
        return Math.min(w, h) * 0.15
    }


    const bezierChart = (w: number, h: number): {
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number,
        cp1x: number,
        cp1y: number,
        cp2x: number,
        cp2y: number,
        cp3x: number,
        cp3y: number,
        cp4x: number,
        cp4y: number
    } => {
    const bezierPoints = {
        x1: w/2-radius(w, h),
        y1: h/2 + chartHeight(w, h)/2,
        x2: w/2,
        y2: h/2 - chartHeight(w, h)/2,
        x3: w/2 + radius(w, h),
        y3: h/2 + chartHeight(w, h)/2
    }
    return {
        ...bezierPoints,
        cp1x: (bezierPoints.x1 + bezierPoints.x2)/2,
        cp1y: bezierPoints.y1,
        cp2x: w/2-((bezierPoints.x2+bezierPoints.x3)/1.8 - w/2),
        cp2y: bezierPoints.y2,
        cp3x: (bezierPoints.x2+bezierPoints.x3)/1.8,
        cp3y: bezierPoints.y2,
        cp4x: (bezierPoints.x2+bezierPoints.x3)/2,
        cp4y: bezierPoints.y3
    }
}

    const sunCycleGradient = (ctx: CanvasRenderingContext2D,  w: number, min_h: number, max_h: number): CanvasGradient => {
        const gradient = ctx.createLinearGradient(w/2, max_h-ctx.lineWidth, w/2, min_h+ctx.lineWidth)
        gradient.addColorStop(0, "#F0CC7F")
        gradient.addColorStop(0.6, "#F09F82")
        gradient.addColorStop(0.6, "#8488B9")
        gradient.addColorStop(1, "#6564B5")
        return gradient
    }

    const drawChart = (ctx: CanvasRenderingContext2D,  w: number, h: number) => {
        const bezier = bezierChart(w, h)

        ctx.strokeStyle = sunCycleGradient(ctx, w, bezier.y1 - offset(w, h), bezier.y2 - offset(w, h))
        ctx.lineCap = "round"
        ctx.lineWidth = Math.max(w, h) * 0.07

        ctx.beginPath()  
        ctx.moveTo(bezier.x1, bezier.y1 - offset(w, h))
        ctx.bezierCurveTo(bezier.cp1x, bezier.cp1y - offset(w, h), bezier.cp2x, bezier.cp2y - offset(w, h), bezier.x2, bezier.y2 - offset(w, h))
        ctx.bezierCurveTo(bezier.cp3x, bezier.cp3y - offset(w, h), bezier.cp4x, bezier.cp4y - offset(w, h), bezier.x3, bezier.y3 - offset(w, h))
        ctx.stroke()
        ctx.closePath()
    }

    const drawIndicator = (ctx: CanvasRenderingContext2D, value:number, w: number, h: number) => {
        const bezier = bezierChart(w, h)
        var coordinates = bezierPoint(bezier.cp1x, bezier.cp1y, bezier.cp2x, bezier.cp2y, bezier.x1, bezier.y1, bezier.x2, bezier.y2, value*2)
        if (value >= 0.5)
            coordinates = bezierPoint(bezier.cp3x, bezier.cp3y, bezier.cp4x, bezier.cp4y, bezier.x2, bezier.y2, bezier.x3, bezier.y3, (value-0.5)*2)
        ctx.fillStyle = sunCycleGradient(ctx, w, bezier.y1-offset(w, h), bezier.y2-offset(w, h))
        ctx.strokeStyle = "#E6E6EF"
        ctx.lineWidth = Math.max(w, h) * 0.025

        ctx.beginPath()
        ctx.arc(coordinates.x, coordinates.y-offset(w, h), Math.max(w, h) * 0.07, 0, Math.PI*2)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }

    const drawHorizon = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        const chartHeight = Math.max(w, h) * 0.5
        const offset = Math.min(w, h) * 0.15

        ctx.setLineDash([5])
        ctx.lineWidth = Math.max(w, h) * 0.01
        ctx.strokeStyle = "#87858F"

        ctx.beginPath()
        ctx.moveTo(0, h/2 + chartHeight*0.1 - offset)
        ctx.lineTo(w,  h/2 + chartHeight*0.1 - offset)
        ctx.stroke()
        ctx.closePath()
        ctx.setLineDash([0])
    }

    const drawLabels = (ctx: CanvasRenderingContext2D, sunset: string, sunrise: string, w: number, h: number) => {
        const points = bezierChart(w, h)

        const valueMeasureSunrise = ctx.measureText(sunrise)
        const valueWidthSunrise = valueMeasureSunrise.width

        ctx.fillStyle = "#87858F"
        ctx.font = `Bold ${w/10}px Inter`
        
        ctx.beginPath()
        ctx.fillText(sunset, points.x1-Math.max(w, h) * 0.07, points.y1-offset(w, h)+Math.min(w, h) * 0.15)
        ctx.fillText(sunrise, points.x3 - valueWidthSunrise+Math.max(w, h) * 0.07, points.y3-offset(w, h)+Math.min(w, h) * 0.15)
        ctx.closePath()
        
    }


    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const context = canvas.getContext("2d")
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height)
                drawChart(context, canvas.width, canvas.height)
                drawHorizon(context, canvas.width, canvas.height)
                drawIndicator(context, calculateSunPos(forecasts[currentCity].sunrise, forecasts[currentCity].sunset), canvas.width, canvas.height)
                drawLabels(context, 
                    timeFormat(forecasts[currentCity].sunrise),
                    timeFormat(forecasts[currentCity].sunset), 
                    canvas.width, canvas.height)
            }
        }
    }, [forecasts])

    return <canvas ref={ canvasRef } { ...props } />
}