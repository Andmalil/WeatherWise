import { useRef, ComponentProps, useEffect, useContext } from "react"
import { WeatherContext } from "../../../context/weatherContext"
import { WeatherContextType } from "../../../@types/weather"
import { hourlyForecastLabels, weatherIcons } from "../../../constants/charts"

const forecastChartColor = "#5CC14D"

export function HourlyForecastChart(props: ComponentProps<"canvas">) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { forecasts, currentCity, currentUnits } = useContext(WeatherContext) as WeatherContextType

    const now = new Date(new Date().toLocaleString('en-US', {timeZone: forecasts[currentCity].timezone}))

    const normolization = (size: number, min: number, max: number, value: number) => {
        return (value-min)*((size/(max-min)))
    }

    const drawChart = (ctx: CanvasRenderingContext2D, w: number, h: number, width: number, color: string, values: number[], paddings: number[]) => {
        const spaceBetween = (w-(paddings[1]+paddings[3]))/(values.length-1)
        const minValue = Math.min(...values) // minimal value in the data set
        const maxValue = Math.max(...values) // maximal value in the data set

        ctx.strokeStyle = color
        ctx.lineWidth = width

        ctx.beginPath()
        for (var i=1; i<values.length; i++) {
            const x1 = (i-1)*spaceBetween+paddings[3]
            const y1 = (h-paddings[2]) - normolization(h - (paddings[0]+paddings[2]), minValue, maxValue, values[i-1])
           
            const x2 = i*spaceBetween+paddings[3]
            const y2 = (h-paddings[2]) - normolization(h - (paddings[0]+paddings[2]), minValue, maxValue, values[i])
            
            ctx.moveTo(x1, y1)
            
            ctx.bezierCurveTo(
                (x1+x2)/2,
                y1,
                (x1+x2)/2,
                y2,
                x2, y2
            )
        }
        ctx.stroke()
        ctx.closePath()
        
    }

    const drawLabels = (ctx: CanvasRenderingContext2D, w: number, h: number, data: {temp:{[key:string]: number}, wind:{[key:string]: number}, weather:number}[][], space: number, paddings: number[]) => {
        if (data.length != 2 && data[0].length != 24 && data[1].length != 24) {
            return 0
        }
        
        const spaceBetween = (w-(paddings[1]+paddings[3]))/(data[0].length-1)
        const windSpeedUnit = currentUnits.wind == "kph" ? "km/h" : "mph"

        ctx.fillStyle = "#87858F"
        ctx.rect(0, 0, w, h)
        ctx.stroke()
        
        var max_height = 0
        

        ctx.beginPath()
        for (var i=0; i<24; i++) {
            const x = (i*spaceBetween)

            ctx.font = `Bold ${h/20}px Inter`
           console.log(data)
            const timeLabel = i==0 ? "Now" : hourlyForecastLabels[(i+now.getHours())%(data[0].length)]

            const labelMeasure = ctx.measureText(timeLabel)
            const labelWidth = labelMeasure.width
            const labelHeight = labelMeasure.actualBoundingBoxAscent + labelMeasure.actualBoundingBoxDescent
            
            
            ctx.fillText(timeLabel, paddings[3]+x-(labelWidth/2), h-labelHeight)

            ctx.font = `${h/20}px Inter`
            const windSpeedMeasure = ctx.measureText(`${Math.round(data[0][i].wind[currentUnits.wind])}${windSpeedUnit}`)
            const windSpeedWidth = windSpeedMeasure.width
            const windSpeedHeight = windSpeedMeasure.actualBoundingBoxAscent + windSpeedMeasure.actualBoundingBoxDescent
            
            ctx.fillText(`${Math.round(data[0][i].wind[currentUnits.wind])}${windSpeedUnit}`, paddings[3]+x-(windSpeedWidth/2), h-labelHeight-space-windSpeedHeight/2)

            
            const weather = new Image()
            const img_size = ctx.measureText("00:00").width
            if (true) {
            weather.onload = ()=> {
                ctx.save()
                ctx.translate(x+spaceBetween/2-img_size/2, h-labelHeight*2-space*2-windSpeedHeight/2-img_size)
                ctx.drawImage(weather, 0, 0, img_size, img_size)
                
                
                ctx.restore()
                }
            }
            weather.src = weatherIcons[data[0][i].weather][forecasts[currentCity].isDay]
            ctx.stroke()
            

        }
        ctx.closePath()
        return 
    }

    useEffect(() => {
        if (canvasRef) {
            const canvas = canvasRef.current
            if (canvas) {
                const context = canvas.getContext("2d")
                if (context) { 
                    const paddings = [12, 0, 40, 26]
                    context.clearRect(0, 0, canvas.width, canvas.height)
                    drawChart(context, canvas.width, canvas.height, 2, forecastChartColor, forecasts[currentCity].hourForecast[0].map(e=>e.temp[currentUnits.temp]), paddings)
                    drawLabels(context, canvas.width, canvas.height, forecasts[currentCity].hourForecast, 13, paddings)
                }
            }
        }
    })
    return <canvas ref={ canvasRef } {...props}/>
}