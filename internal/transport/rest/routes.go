package rest

import (
	"embed"
	"net/http"
	"weatherwise/internal/transport/rest/handlers"
)

type Router struct {
	Router      *http.ServeMux
	StaticFiles embed.FS
	database    *handlers.HintHandler
}

func (r Router) CreateRoutes() {
	// Configure the router for static files
	r.Router.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.FS(r.StaticFiles))))

	r.Router.HandleFunc("/", handlers.Home)
	r.Router.HandleFunc("GET /citysearch/{word}", r.database.ListHintsHandler)
	r.Router.HandleFunc("GET /search/{id}", r.database.GetCityCoordinates)

}
