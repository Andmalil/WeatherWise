import { useRef, ComponentProps, useEffect, useContext } from "react"
import { WeatherContext } from "../../../context/weatherContext"
import { WeatherContextType } from "../../../@types/weather"
import { hourlyForecastLabels, weatherIcons } from "../../../constants/charts"

const forecastChartColor = "#4E9CE2"

export function HourlyForecastChart(props: ComponentProps<"canvas">) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { forecasts, currentCity, currentUnits } = useContext(WeatherContext) as WeatherContextType

    const now = new Date(new Date().toLocaleString('en-US', {timeZone: forecasts[currentCity].timezone}))

    const normolization = (size: number, min: number, max: number, value: number) => {
        return (value-min)*((size/(max-min)))
    }

    const drawChart = (ctx: CanvasRenderingContext2D, w: number, h: number, width: number, color: string, values: number[][], paddings: number[]) => {
        const spaceBetween = (w-(paddings[1]+paddings[3]))/(values[0].length-1)
        const minValue = Math.min(...values[0], ...values[1]) // minimal value in the data set
        const maxValue = Math.max(...values[0], ...values[1]) // maximal value in the data set

        ctx.strokeStyle = color
        ctx.lineWidth = width

        ctx.beginPath()
        

        for (var i=0; i<24; i++) {

            const day_index1 = Math.floor(((i-1)+now.getHours())/(values[0].length)) // it's today or tomorrow
            const hour_index1 = ((i-1)+now.getHours())%(values[0].length) // What time is it

            const day_index2 = Math.floor((i+now.getHours())/(values[0].length))
            const hour_index2 = (i+now.getHours())%(values[0].length)

            const x1 = (i-1)*spaceBetween+paddings[3]
            const y1 = (h-paddings[2]) - normolization(h - (paddings[0]+paddings[2]), minValue, maxValue, values[day_index1][hour_index1])

            const x2 = i*spaceBetween+paddings[3]
            const y2 = (h-paddings[2]) - normolization(h - (paddings[0]+paddings[2]), minValue, maxValue, values[day_index2][hour_index2])
            
            ctx.moveTo(x1, y1)
            
            ctx.bezierCurveTo(
                (x1+x2)/2,
                y1,
                (x1+x2)/2,
                y2,
                x2, y2
            )

            ctx.font = `${h/17}px Inter`
            ctx.fillText(`${Math.round(values[day_index2][hour_index2])}°`, x2, y2-15)
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
        
        ctx.beginPath()
        for (var i=0; i<24; i++) {
            const x = (i*spaceBetween)

            ctx.font = `Bold ${h/20}px Inter`
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
            const day_index = Math.floor((i+now.getHours())/(data[0].length))
            const hour_index = (i+now.getHours())%(data[0].length)
            const time = (i+now.getHours())*60
            const sr = forecasts[currentCity].sunrise // sunrise time
            const ss = forecasts[currentCity].sunset // sunset time
            console.log(time, sr, ss)

            weather.src = weatherIcons[data[day_index][hour_index].weather][time>sr&&time<ss?1:0]
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
                    const paddings = [40, 0, 100, 26]
                    context.clearRect(0, 0, canvas.width, canvas.height)
                    drawChart(context, canvas.width, canvas.height, 2, forecastChartColor, forecasts[currentCity].hourForecast.map(e=>e.map(e2 => e2.temp[currentUnits.temp])), paddings)
                    drawLabels(context, canvas.width, canvas.height, forecasts[currentCity].hourForecast, 13, paddings)
                }
            }
        }
    }, [currentUnits, forecasts])
    return <canvas ref={ canvasRef } {...props}/>
}