import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend,
  } from 'chart.js';

import AnnotationPlugin from 'chartjs-plugin-annotation';

import { Line } from "react-chartjs-2";
import styles from "../../../styles/components/Content.module.scss"

import { useContext } from 'react';
import { WeatherContext } from '../../../context/weatherContext';
import { WeatherContextType } from '../../../@types/weather';
import { hourlyForecastLabels } from '../../../constants/charts';



const forecastChartColor = "#5CC14D"

export function HourlyForecastChart() {
    const { forecasts, currentCity } = useContext(WeatherContext) as WeatherContextType
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        AnnotationPlugin,
        Legend
    );

    const tempLabels = (values: number[]) => {
        const ratio = (Math.max(...forecasts[currentCity].hourForecast)-Math.min(...forecasts[currentCity].hourForecast))/10
        const pointArray: {[key: string]: {type: string, xValue: number, yValue: number, backgroundColor: string, color: string, content: string[], font: {size: number}}} = {}
        for (let i=1; i < values.length; i++) {
            pointArray[`point${i}`] = {
                type: "label",
                xValue: i,
                yValue: values[i] + ratio,
                backgroundColor: "transparent",
                color: "black",
                content: [`${values[i]}°`],
                font: {
                    size: 14
                }
            }
        }
        return pointArray
    }
    const data = {
        labels: hourlyForecastLabels,
        datasets: [{
            data: forecasts[currentCity].hourForecast,
            fill: false,
            borderColor: forecastChartColor,
            borderWidth: 2,
            tension: 0.5,
            
        
        }]
    };

    return (
        <div className={ styles.chart }>
        <Line data={ data }
            options={{
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1,
                animation: false,
                elements: {
                    
                    point: {
                        radius: 0
                    }
                },
                
                plugins: {
                    
                    title: {
                        display: false,
                    },
                    legend: {
                        display: false
                    },
                    annotation: {
                        annotations: {
                          "current_weather": {
                            type: 'line',
                            xMin: 1,
                            xMax: 1,
                            yMax: forecasts[currentCity].hourForecast[1],
                            borderColor: '#B6C3CE',
                            borderWidth: 2,
                            borderDash: [5]
                          },
                          "current_point": {
                            type: 'point',
                            xValue: 1,
                            yValue: forecasts[currentCity].hourForecast[1],
                            radius: 5,
                            backgroundColor: 'white',
                            borderColor: 'transparent',
                            backgroundShadowColor: 'rgb(50, 50, 50)',
                            shadowBlur: 3,
                            shadowOffsetX: 1,
                            shadowOffsetY: 1
                          },
                          
                          ...tempLabels(forecasts[currentCity].hourForecast)
                        }
                      }
                    
                },
                scales: {
                    x: {
                        border: {
                            display: false
                        },
                        grid: {
                            display: false,

                        }
                    },
                    y: {
                        display: false,
                        border: {
                            display: false
                        },
                        grid: {
                            display: false
                        },
                    },
                }

            }}
            />
            </div>
    )
}