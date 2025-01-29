import { useRef } from "react"

interface IForecastTempRange {
    className: string | undefined
    width: string,
    height: string,
    minTemp: number,
    maxTemp: number,
    forecastMinTemp: number,
    forecastMaxTemp: number,
    currentTemp: number | null
}

export function ForecastTempRange(props: IForecastTempRange) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    
    const calculatePos = (value: number, min: number, max: number) => {
        const position = (value-min)/(max-min)
        if (position < 0) {
            return 0
        } else if (position > 1) {
            return 1
        }
        return position
    }

    const drawBar = (ctx: CanvasRenderingContext2D, w: number, h: number, color: string[], start: number, end: number) => {
        const background = ctx.createLinearGradient(w*start, h/2, w*end, h/2)
        background.addColorStop(0, color[0])
        background.addColorStop(1, color[1])

        ctx.strokeStyle = background
        ctx.lineWidth = h
        ctx.lineCap = "round"

        ctx.beginPath()
        ctx.moveTo((w+h/2)*start, h/2)
        ctx.lineTo((w-h/2)*end, h/2)
        ctx.stroke()
        ctx.closePath()
    }

    const drawCurrentTemp = (ctx: CanvasRenderingContext2D, w: number, h: number, value: number) => {
        ctx.strokeStyle = "black"
        ctx.fillStyle = "white"
        ctx.lineWidth = h*0.1
        ctx.beginPath()
        ctx.arc(h/2+(w-h)*value, h/2, h/2-ctx.lineWidth/2, 0, Math.PI*2)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }

    if (canvasRef) {
        const canvas = canvasRef.current
        if (canvas) {
            const context = canvas.getContext("2d")
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height)
                drawBar(context, canvas.width, canvas.height, ["#C7C7C7", "#A9A9A9"], 0, 1)
                drawBar(context, canvas.width, canvas.height, ["#10ABFD", "#4E9CE2"], 
                    calculatePos(props.minTemp, props.forecastMinTemp, props.forecastMaxTemp), 
                    calculatePos(props.maxTemp, props.forecastMinTemp, props.forecastMaxTemp))
                
                if (props.currentTemp) {
                    drawCurrentTemp(context, canvas.width, canvas.height, calculatePos(props.currentTemp, props.forecastMinTemp, props.forecastMaxTemp))
                }
                
            }
        }
    }

    return <canvas ref={ canvasRef } className={ props.className } width={ props.width } height={ props.height } />
}