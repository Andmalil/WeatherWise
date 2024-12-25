import { useRef, ComponentProps, useEffect, useContext } from "react"
import { WeatherContext } from "../../../context/weatherContext"
import { WeatherContextType } from "../../../@types/weather"

export function UVChart(props: ComponentProps<"canvas">) {
    const { forecasts, currentCity } = useContext(WeatherContext) as WeatherContextType
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const toDegree = (n: number): number => {
        return (n / 180) * Math.PI
    }

    const gradient = (ctx: CanvasRenderingContext2D, w: number, h: number): CanvasGradient => {
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
    const drawChart = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        if (ctx) {
            
            
            ctx.strokeStyle = gradient(ctx, w, h)
            ctx.lineWidth = Math.max(w, h) * 0.1
            ctx.lineCap = "round"
            ctx.beginPath()
            ctx.arc(w/2, h/2, Math.max(w, h)/2-Math.max(w, h) * 0.1, toDegree(45), toDegree(135), true)
            ctx.stroke()
            ctx.closePath()
            

            
        }
    }

    const drawIndicator = (ctx: CanvasRenderingContext2D, uvLevel: number, w: number, h: number) => {
        
        const degree = uvLevel <= 10 ? toDegree(-27*(10 - uvLevel) + 45) : toDegree(45)

        ctx.fillStyle = gradient(ctx, w, h)
        ctx.strokeStyle = "#E6E6EF"
        ctx.lineWidth = Math.max(w, h) * 0.02
        ctx.beginPath()
        const x = (w/2) + (Math.cos(degree) * (Math.max(w, h)/2-Math.max(w, h) * 0.1))
        const y = (h/2) + (Math.sin(degree) * (Math.max(w, h)/2-Math.max(w, h) * 0.1))
        ctx.arc(x, y, Math.max(w, h) * 0.08, 0, Math.PI*2)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()

    }

    const drawValue = (ctx: CanvasRenderingContext2D, value: number, w: number, h: number) => {
        ctx.fillStyle = "#87858F"
        ctx.font = `Bold ${w/2.7}px Inter`
        ctx.beginPath()
        const valueMeasure = ctx.measureText(value.toString())
        const valueWidth = valueMeasure.width
        const valueHeight = valueMeasure.actualBoundingBoxAscent + valueMeasure.actualBoundingBoxDescent
        
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