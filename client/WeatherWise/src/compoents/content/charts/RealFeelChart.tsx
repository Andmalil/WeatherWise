import { ComponentProps, useContext, useEffect, useRef } from "react";
import { WeatherContext } from "../../../context/weatherContext";
import { WeatherContextType } from "../../../@types/weather";
import { chartWidth } from "../../../constants/charts"
import { getRealFeelLevel } from "../../../constants/functions";
import { toDegree } from "../../../constants/functions";
import { backgroundColor } from "../../../constants/colors";

export function RealFeelChart(props: ComponentProps<"canvas">) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { forecasts, currentCity, currentUnits } = useContext(WeatherContext) as WeatherContextType

    


    const drawChart = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        const coldFill = ctx.createConicGradient(toDegree(90), w/2, h/2)
        coldFill.addColorStop(0.125, "#10ABFD")
        coldFill.addColorStop(0.5, "#4E9CE2")

        
        coldFill.addColorStop(0.5, "#00E06C")
        coldFill.addColorStop(0.75, "#04AD50")

        
        coldFill.addColorStop(0.75, "#FA9E3C")
        coldFill.addColorStop(0.875, "#E88C38")


        ctx.strokeStyle = coldFill
        ctx.lineWidth = Math.max(w, h) * chartWidth
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.arc(w/2, h/2, Math.max(w, h)/2-Math.max(w, h) * 0.1, toDegree(135), toDegree(405), false)
        ctx.stroke()
        ctx.closePath()

        ctx.strokeStyle = backgroundColor
        ctx.lineWidth = Math.max(w, h) * 0.05

        ctx.beginPath()
        ctx.moveTo(w/2, h/2)
        ctx.lineTo(w/2, h/2-Math.max(w, h) * 0.5)
        ctx.moveTo(w/2, h/2)
        ctx.lineTo(w/2+Math.max(w, h) * 0.5, h/2)
        ctx.stroke()
        ctx.closePath()
    }

    const drawArrow = (ctx: CanvasRenderingContext2D, value: number, w: number, h: number) => {
        var angle = toDegree(315 - 270*value)

        if (value > 1) {
            angle = toDegree(45)
        } else if (value < 0) {
            angle = toDegree(315)
        }

        const radiusOfPoint = Math.max(w, h) * 0.06

        const x1 = w/2 + Math.sin(angle) * radiusOfPoint
        const y1 = h/2 + Math.cos(angle) * radiusOfPoint

        const x2 = w/2 + Math.sin(angle) * Math.max(w, h) * 0.25 
        const y2 = h/2 + Math.cos(angle) * Math.max(w, h) * 0.25

        ctx.strokeStyle = "black"
        ctx.lineCap = "round"
        ctx.fillStyle = backgroundColor
        ctx.lineWidth = Math.max(w, h) * 0.04
        ctx.beginPath()
        ctx.arc(w/2, h/2, radiusOfPoint, 0, Math.PI*2)
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.closePath()
        
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const context = canvas.getContext("2d")
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height)
                drawChart(context, canvas.width, canvas.height)
                drawArrow(context, getRealFeelLevel(forecasts[currentCity].realFeel[currentUnits.temp]), canvas.width, canvas.height)
            }
        }
    }, [forecasts])
    return <canvas ref={ canvasRef } { ...props } />
}