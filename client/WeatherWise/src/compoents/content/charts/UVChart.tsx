import { useRef, ComponentProps, useEffect, useContext } from "react"
import { WeatherContext } from "../../../context/weatherContext"
import { WeatherContextType } from "../../../@types/weather"
import { chartWidth } from "../../../constants/charts"
import { toDegree } from "../../../constants/functions"
import { rainbowGradient } from "../../../constants/gradients"
import { backgroundColor } from "../../../constants/colors"
 
export function UVChart(props: ComponentProps<"canvas">) {
    const { forecasts, currentCity } = useContext(WeatherContext) as WeatherContextType
    const canvasRef = useRef<HTMLCanvasElement>(null)

    
    const drawChart = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        if (ctx) {   
            ctx.strokeStyle = rainbowGradient(ctx, w, h)
            ctx.lineWidth = Math.min(w, h) * chartWidth
            ctx.lineCap = "round"
            ctx.beginPath()
            ctx.arc(w/2, h/2, Math.min(w, h)*0.4, toDegree(45), toDegree(135), true)
            ctx.stroke()
            ctx.closePath()
        }
    }

    const drawIndicator = (ctx: CanvasRenderingContext2D, uvLevel: number, w: number, h: number) => {
        
        const degree = uvLevel <= 10 ? toDegree(-27*(10 - uvLevel) + 45) : toDegree(45)

        ctx.fillStyle = rainbowGradient(ctx, w, h)
        ctx.strokeStyle = backgroundColor
        ctx.lineWidth = Math.min(w, h) * 0.025
        ctx.beginPath()
        const x = (w/2) + (Math.cos(degree) * (Math.min(w, h)/2-Math.min(w, h) * 0.1))
        const y = (h/2) + (Math.sin(degree) * (Math.min(w, h)/2-Math.min(w, h) * 0.1))
        ctx.arc(x, y, Math.min(w, h) * 0.07, 0, Math.PI*2)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()

    }

    const drawValue = (ctx: CanvasRenderingContext2D, value: number, w: number, h: number) => {
        const valueMeasure = ctx.measureText(value.toString())
        const valueWidth = valueMeasure.width
        const valueHeight = valueMeasure.actualBoundingBoxAscent + valueMeasure.actualBoundingBoxDescent

        ctx.fillStyle = "#87858F"
        ctx.font = `Bold ${w/2.7}px Inter`
        ctx.beginPath()
        
        ctx.fillText(value.toString(), w/2 - valueWidth/2, h/2 + valueHeight/2)
        
        ctx.closePath()
    }
    
    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const context = canvas.getContext('2d')
            
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height)

                drawChart(context, canvas.width, canvas.height)
                drawIndicator(context, forecasts[currentCity].uvLevel, canvas.width, canvas.height)
                drawValue(context, forecasts[currentCity].uvLevel, canvas.width, canvas.height)
            }
        }
    }, [forecasts])
    
    return (
        <canvas ref={ canvasRef } { ...props }/>
    )
}