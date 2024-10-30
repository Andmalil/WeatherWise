package main

import (
	"github.com/Andmalil/WeatherWise/assets"
	"github.com/Andmalil/WeatherWise/internal/middleware"
	"github.com/Andmalil/WeatherWise/internal/repository"
	"github.com/Andmalil/WeatherWise/internal/transport/rest"
	"log"
)

func checkErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
func main() {
	database := repository.NewSearchManager()
	// router := rest.Router{Mux: http.NewServeMux(), StaticFiles: assets.StaticFile, Database: database}
	server := rest.NewServer(":3000", assets.StaticFile, database)

	server.UseMiddleware(middleware.RoutingLogging)

	err := server.ListenAndServe()
	checkErr(err)
}
