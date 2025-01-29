import { ComponentProps, useContext, useEffect, useRef } from "react"

import compass_scales from "/light_theme_icons/compass_light_scales.svg"
import compass_arrow from "/light_theme_icons/compass_light_arrow.svg"
import compass_directions from "/light_theme_icons/compass_light_directions.svg"
import { WeatherContext } from "../../../context/weatherContext"
import { WeatherContextType } from "../../../@types/weather"
import { toDegree } from "../../../constants/functions"


export function Compass(props: ComponentProps<"canvas">) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { forecasts, currentCity, currentUnits } = useContext(WeatherContext) as WeatherContextType

    const drawCompass = (ctx: CanvasRenderingContext2D, angle: number, w: number, h: number) => {
        const compassScalesImg = new Image()
        const compassArrowImg = new Image()
        const compassDirectionsImg = new Image()

        compassScalesImg.onload = () => {
            ctx.save()
            ctx.translate(w/2, h/2)
            ctx.scale(w/65, h/65)
            ctx.drawImage(compassScalesImg, -compassScalesImg.width/2, -compassScalesImg.height/2)
            ctx.restore()
        }

        compassArrowImg.onload = () => {
            ctx.save()
            ctx.translate(w/2, h/2)
            ctx.scale(w/65, h/65)
            ctx.rotate(toDegree(angle))
            ctx.drawImage(compassArrowImg, -compassArrowImg.width/2, -compassArrowImg.height/2)
            ctx.restore()
            drawUnits(ctx, currentUnits.wind=="kph" ? "km/h" : "mph", w, h)
        }

        compassDirectionsImg.onload = () => {
            ctx.save()
            ctx.translate(w/2, h/2)
            ctx.scale(w/65, h/65)
            ctx.drawImage(compassDirectionsImg, -compassDirectionsImg.width/2, -compassDirectionsImg.height/2)
            ctx.restore()
        }

        compassScalesImg.src = compass_scales
        compassArrowImg.src = compass_arrow
        compassDirectionsImg.src = compass_directions
    }

    const drawUnits = (ctx: CanvasRenderingContext2D, value: string, w: number, h: number) => {
        ctx.fillStyle = "white"
        ctx.font = `${w/10}px Inter`
        ctx.beginPath()
        const valueMeasure = ctx.measureText(value)
        const valueWidth = valueMeasure.width
        const valueHeight = valueMeasure.actualBoundingBoxAscent + valueMeasure.actualBoundingBoxDescent
        
        ctx.fillText(value.toString(), w/2 - valueWidth/2, h/2 + valueHeight/2-1)
        
        ctx.closePath()
    }

    useEffect(() => {
        const canvas = canvasRef.current

        if (canvas) {
            const context = canvas.getContext("2d")
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height)
                drawCompass(context, forecasts[currentCity].windDegree, canvas.width, canvas.height)
                
            }
        }
    }, [forecasts, currentUnits])
    return <canvas ref={ canvasRef } { ...props } /> 
}