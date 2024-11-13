package app

import (
	// "database/sql"
	"log"
	"time"

	"github.com/Andmalil/WeatherWise/assets"
	"github.com/Andmalil/WeatherWise/internal/cache"
	"github.com/Andmalil/WeatherWise/internal/middleware"
	"github.com/Andmalil/WeatherWise/internal/server"
	"github.com/Andmalil/WeatherWise/internal/service"
	"github.com/Andmalil/WeatherWise/internal/store/repository"
	"github.com/Andmalil/WeatherWise/internal/transport/rest"
	"github.com/Andmalil/WeatherWise/templates"
)

func Run() {
	// hints_db, err := sql.Open("sqlite3", "database/worldcities.db")
	// if err != nil {
	// 	log.Fatal(err)
	// }

	server := server.New(":3000", 10*time.Second)

	hintTask := &repository.SQLHintStore{}
	hintService := service.HintService{Store: hintTask}

	hintHandler := rest.HintHandler{HintService: &hintService}

	cache.Caching(hintTask)

	homePage := rest.HomePage{Template: templates.TemplateFiles}
	server.GET("/", homePage.Home)

	server.GET("/citysearch/{word}", hintHandler.ListHintsHandler)
	server.UseMiddleware(middleware.LoggingMiddleware)
	server.StaticFiles("/assets/", assets.StaticFiles)

	err := server.ListenAndServe()
	if err != nil {
		log.Fatal("Failed to start the server: ", err)
	}
}
