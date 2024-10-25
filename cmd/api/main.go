package main

import (
	"log"
	"net/http"
	"weatherwise/assets"
	"weatherwise/internal/middleware"
	"weatherwise/internal/repository"
	"weatherwise/internal/transport/rest"
)

func checkErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
func main() {
	database := repository.NewSearchManager()
	router := rest.Router{Mux: http.NewServeMux(), StaticFiles: assets.StaticFile, Database: database}
	server := rest.NewServer(router, 3000)

	server.UseMiddleware(middleware.RoutingLogging)

	err := server.ListenAndServe()
	checkErr(err)
}


