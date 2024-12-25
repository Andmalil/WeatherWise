import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Line } from "react-chartjs-2";
import styles from "../../../styles/components/Content.module.scss"

import { useContext } from 'react';
import { WeatherContext } from '../../../context/weatherContext';
import { WeatherContextType } from '../../../@types/weather';

export function ForecastChart() {

    const { forecasts, currentCity } = useContext(WeatherContext) as WeatherContextType
        ChartJS.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Title,
            Tooltip,
            Legend
          );
          
        const labels = ["00:00", "00:01", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
            "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
        ]
        const data = {
            labels: labels,
            datasets: [{
              data: forecasts[currentCity].hourForecast,
              fill: false,
              borderColor: '#B6C3CE',
              borderWidth: 2,
              tension: 0.5,
            
            }]
          };

    return (
        <Line className={ styles.chart }
            data={ data }
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
                        border: {
                            display: false
                        },
                        grid: {
                            display: false
                        }
                    }
                }

            }}
            />
    )
}