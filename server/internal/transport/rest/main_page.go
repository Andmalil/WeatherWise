package rest

import (
	"embed"
	"html/template"
	"log"

	// "github.com/Andmalil/WeatherWise/client"
	"net/http"
)

type cash interface {
	Set(key string, value interface{})
	Get(key string)
}
type HomePage struct {
	Template embed.FS
	hints    cash
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
