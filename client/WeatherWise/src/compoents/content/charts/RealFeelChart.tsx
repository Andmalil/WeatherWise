import { ComponentProps, useContext, useEffect, useRef } from "react";
import { WeatherContext } from "../../../context/weatherContext";
import { WeatherContextType } from "../../../@types/weather";

export function RealFeelChart(props: ComponentProps<"canvas">) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { forecasts, currentCity } = useContext(WeatherContext) as WeatherContextType

    

    
    // const minTemp = 9
    // const maxTemp = 27
    const coldRange = [-50, 18]
    const comfortRange = [18, 24]
    const hotRange = [24, 40]
    const getLevel = (temp: number) => {
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

    const toDegree = (n: number): number => {
        return (n / 180) * Math.PI
    }

    const drawChart = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        const coldFill = ctx.createConicGradient(toDegree(90), w/2, h/2)
        coldFill.addColorStop(0.125, "#10ABFD")
        coldFill.addColorStop(0.5, "#4E9CE2")

        const comfortFill = ctx.createConicGradient(toDegree(90), w/2, h/2)
        comfortFill.addColorStop(0.5, "#00E06C")
        comfortFill.addColorStop(0.75, "#04AD50")

        const hotFill = ctx.createConicGradient(toDegree(90), w/2, h/2)
        hotFill.addColorStop(0.75, "#FA9E3C")
        hotFill.addColorStop(0.875, "#E88C38")


        ctx.strokeStyle = hotFill
        ctx.lineWidth = Math.max(w, h) * 0.1
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.arc(w/2, h/2, Math.max(w, h)/2-Math.max(w, h) * 0.1, toDegree(135), toDegree(405), false)
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.strokeStyle = coldFill
        ctx.arc(w/2, h/2, Math.max(w, h)/2-Math.max(w, h) * 0.1, toDegree(135), toDegree(270), false)
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.lineCap = "butt"
        ctx.strokeStyle = comfortFill
        ctx.arc(w/2, h/2, Math.max(w, h)/2-Math.max(w, h) * 0.1, toDegree(270), toDegree(360), false)
        ctx.stroke()
        ctx.closePath()


        ctx.beginPath()
        
        ctx.strokeStyle = "#E6E6EF"
        ctx.lineWidth = Math.max(w, h) * 0.05
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
        ctx.fillStyle = "#E6E6EF"
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
                drawArrow(context, getLevel(forecasts[currentCity].realFeel), canvas.width, canvas.height)
            }
            // (forecasts[0].feelLike - minTemp)/(maxTemp-minTemp)
        }
    }, [forecasts])
    return <canvas ref={ canvasRef } { ...props } />
}