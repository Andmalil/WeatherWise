package main

import (
	"log"
	"net/http"
	"time"

	"github.com/Andmalil/WeatherWise/internal/middleware"
	"github.com/Andmalil/WeatherWise/internal/server"
)

func main() {
	server := server.New(":3000", 10*time.Second)

	server.GET("/hello1", func(w http.ResponseWriter, r *http.Request) {
		log.Println("Hello1")
	})

	server.GET("/hello2", func(w http.ResponseWriter, r *http.Request) {
		log.Println("Hello2")
	})
	server.UseMiddleware(middleware.LoggingMiddleware)

	server.ListenAndServe()
}
