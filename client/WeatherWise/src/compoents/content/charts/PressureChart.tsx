import { useRef, ComponentProps, useEffect } from "react"

export function PressureChart(props: ComponentProps<"canvas">) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const toDegree = (n: number): number => {
        return (n / 180) * Math.PI
    }

    const drawChart = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        const gradient = ctx.createConicGradient(toDegree(90), w/2, h/2)
        gradient.addColorStop(0.125, "#10ABFD")
        gradient.addColorStop(0.875, "#4E9CE2")

        ctx.strokeStyle = gradient
        ctx.lineWidth = Math.max(w, h) * 0.1
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.arc(w/2, h/2, Math.max(w, h)/2-Math.max(w, h) * 0.1, toDegree(45), toDegree(135), true)
        ctx.stroke()
        ctx.closePath()
    }

    const drawArrow = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        const width = Math.max(w, h) * 0.14
        ctx.lineWidth = Math.max(w, h) * 0.05

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
                drawArrow(context, canvas.width, canvas.height)
                drawUnits(context, "mbar", canvas.width, canvas.height)
            }
        }
    })
    return <canvas ref={ canvasRef } { ...props } />
}