package rest

import (
	"embed"
	"html/template"
	"log"

	// "github.com/Andmalil/WeatherWise/client"
	"net/http"
)

type HomePage struct {
	Template embed.FS
}

func (p *HomePage) Home(w http.ResponseWriter, r *http.Request) {
	// t, err := template.ParseFiles("../../templates/index.html")
	t, err := template.ParseFS(p.Template, "index.html")
	if err != nil {
		log.Println(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	err = t.Execute(w, nil)
	if err != nil {
		log.Println(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// http.FileServer(http.FS(client.Client)).ServeHTTP(w, r)
}
