import { useRef, ComponentProps, useEffect } from "react"
import { toDegree } from "../../../constants/charts"

export function PressureChart(props: ComponentProps<"canvas">) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const indicatorLength = 12

    const blueGradient = (ctx: CanvasRenderingContext2D, w: number, h: number): CanvasGradient => {
        const gradient = ctx.createConicGradient(toDegree(90), w/2, h/2)
        gradient.addColorStop(0.125, "#10ABFD")
        gradient.addColorStop(0.875, "#4E9CE2")
        return gradient
    }

    const drawChart = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        ctx.strokeStyle = blueGradient(ctx, w, h)
        ctx.lineWidth = Math.min(w, h) * 0.07
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.arc(w/2, h/2, Math.min(w, h)/2-Math.min(w, h) * 0.1, toDegree(45), toDegree(135), true)
        ctx.stroke()
        ctx.closePath()
    }

    const drawIndicator = (ctx: CanvasRenderingContext2D, value: number, w: number, h: number) => {
        var angle = toDegree(315 - 270*value)

        if (value > 1) {
            angle = toDegree(45)
        } else if (value < 0) {
            angle = toDegree(315)
        }
        const r1 = Math.min(w, h)/2-Math.min(w, h) * 0.1 - indicatorLength/2
        const r2 = Math.min(w, h)/2-Math.min(w, h) * 0.1 + indicatorLength/2

        const x1 = w/2 + Math.sin(angle) * r1
        const y1 = h/2 + Math.cos(angle) * r1

        const x2 = w/2 + Math.sin(angle) * r2
        const y2 = h/2 + Math.cos(angle) * r2

        ctx.strokeStyle = "#E6E6EF"
        ctx.beginPath()
        ctx.lineWidth = Math.min(w, h) * 0.1
        ctx.moveTo(w/2, h/2)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.closePath()

        ctx.strokeStyle = blueGradient(ctx, w, h)
        ctx.lineWidth = Math.min(w, h) * 0.05
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.closePath()

       
        
    }

    const drawArrow = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        const width = Math.min(w, h) * 0.14
        ctx.lineWidth = Math.min(w, h) * 0.05

        ctx.strokeStyle = blueGradient(ctx, w, h)
        ctx.lineJoin = "round"
        ctx.beginPath()
        ctx.moveTo(w/2, h/2 + width)
        ctx.lineTo(w/2, h/2 - width)

        ctx.lineTo(w/2 - width, h/2)

        ctx.moveTo(w/2, h/2 - width)
        ctx.lineTo(w/2 + width, h/2)
        ctx.stroke()
        ctx.closePath()
    }

    const drawUnits = (ctx: CanvasRenderingContext2D, unit: string, w: number, h: number) => {
        ctx.fillStyle = "#87858F"
        ctx.font = `Bold ${w/7}px Inter`
        ctx.beginPath()
        const valueMeasure = ctx.measureText(unit)
        const valueWidth = valueMeasure.width
        const valueHeight = valueMeasure.actualBoundingBoxAscent + valueMeasure.actualBoundingBoxDescent
        
        ctx.fillText(unit, w/2 - valueWidth/2, h - valueHeight)
        
        ctx.closePath()
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const context = canvas.getContext("2d")
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height)
                drawChart(context, canvas.width, canvas.height)
                drawIndicator(context, 0.1, canvas.width, canvas.height)
                drawArrow(context, canvas.width, canvas.height)
                drawUnits(context, "mbar", canvas.width, canvas.height)
                
            }
        }
    })
    return <canvas ref={ canvasRef } { ...props } />
}