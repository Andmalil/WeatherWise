package rest

import (
	"embed"
	"net/http"

	"github.com/Andmalil/WeatherWise/internal/transport/rest/handlers"
)

type Router struct {
	Mux         *http.ServeMux
	StaticFiles embed.FS
	Database    *handlers.HintHandler
}

func (r Router) CreateRoutes() {
	// Configure the router for static files
	r.Mux.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.FS(r.StaticFiles))))

	r.Mux.HandleFunc("/", handlers.Home)
	r.Mux.HandleFunc("GET /citysearch/{word}", r.Database.ListHintsHandler)
	r.Mux.HandleFunc("GET /search/{id}", r.Database.GetCityCoordinates)

}
