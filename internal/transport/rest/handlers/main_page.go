package handlers

import (
	// "html/template"
	"github.com/Andmalil/WeatherWise/client"
	"net/http"
)

func Home(w http.ResponseWriter, r *http.Request) {
	// t, err := template.ParseFiles("../../client/WeatherWise/index.html")
	// if err != nil {
	// 	http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	// 	return
	// }
	// err = t.Execute(w, nil)
	// if err != nil {
	// 	http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	// 	return
	// }

	http.FileServer(http.FS(client.Client)).ServeHTTP(w, r)
}
