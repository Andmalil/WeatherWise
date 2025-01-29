import { ComponentProps, useRef, useEffect, useContext } from "react"
import { WeatherContext } from "../../../context/weatherContext"
import { WeatherContextType } from "../../../@types/weather"
import { chartWidth } from "../../../constants/charts"
import { toDegree } from "../../../constants/functions"

import drop from "/light_theme_icons/blue_drop.svg"


export function HumidityChart(props: ComponentProps<"canvas">) {
    const { forecasts, currentCity } = useContext(WeatherContext) as WeatherContextType
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const drawChartBackground = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        const chartBackground = ctx.createConicGradient(toDegree(90), w/2, h/2)
        chartBackground.addColorStop(0.125, "#C7C7C7")
        chartBackground.addColorStop(0.875, "#A9A9A9")

        ctx.strokeStyle = chartBackground
        ctx.lineWidth = Math.max(w, h) * chartWidth
        ctx.lineCap = "round" 
        
        ctx.beginPath()
        ctx.arc(w/2, h/2, Math.max(w, h)/2-Math.max(w, h) * 0.1, toDegree(135), toDegree(405), false)
        ctx.stroke()
        ctx.closePath() 
    }
    const drawChartFill = (ctx: CanvasRenderingContext2D, value: number, w: number, h: number) => {
        const chartFill = ctx.createConicGradient(toDegree(90), w/2, h/2)
        chartFill.addColorStop(0.125, "#10ABFD")
        chartFill.addColorStop(0.875, "#4E9CE2")
        
        ctx.strokeStyle = chartFill
        ctx.lineWidth = Math.max(w, h) * chartWidth
        ctx.lineCap = "round"
        
        ctx.beginPath()
        ctx.arc(w/2, h/2, Math.max(w, h)*0.4, toDegree(135), toDegree(135+(270*value)), false)
        ctx.stroke()
        ctx.closePath()
    }

    const drawDrop = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        const drop_img = new Image()
        drop_img.onload = () => {
            ctx.save()
            ctx.translate(w/2, h/2)
            ctx.scale(w/65, h/65)
            ctx.drawImage(drop_img, -drop_img.width/2, -drop_img.height/2)
            
            ctx.restore()
        }
        drop_img.src = drop
    }
    useEffect(()=> {
        const canvas = canvasRef.current
        if (canvas) {
            const context = canvas.getContext("2d")
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height)
                drawChartBackground(context, canvas.width, canvas.height)
                drawChartFill(context, forecasts[currentCity].humidity/100, canvas.width, canvas.height)
                drawDrop(context, canvas.width, canvas.height)
            }
        }
    }, [forecasts])
    return <canvas ref={ canvasRef } { ...props } />
}