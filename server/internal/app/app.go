package app

import (
	"log"
	"os"
	"time"

	"github.com/lpernett/godotenv"

	"github.com/Andmalil/WeatherWise/assets"
	"github.com/Andmalil/WeatherWise/internal/middleware"
	"github.com/Andmalil/WeatherWise/internal/server"
	"github.com/Andmalil/WeatherWise/internal/service"
	"github.com/Andmalil/WeatherWise/internal/store/repository"
	"github.com/Andmalil/WeatherWise/internal/transport/rest"
	"github.com/Andmalil/WeatherWise/templates"
)

func Run() {

	// load .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Failed to load .env file")
	}

	server := server.New(os.Getenv("ADDRESS"), 10*time.Second)

	hintTask := &repository.SQLHintStore{}

	hints, err := hintTask.GetHints()

	if err != nil {
		log.Fatal(err)
	}

	hintService := service.HintService{Store: hints}

	hintHandler := rest.HintHandler{HintService: hintService}

	homePage := rest.HomePage{Template: templates.TemplateFiles}
	server.GET("/", homePage.Home)

	server.GET("/citysearch/{word}", hintHandler.ListHintsHandler)
	server.GET("/search/{id}", hintHandler.GetCityCurrentWeather)
	server.UseMiddleware(middleware.LoggingMiddleware)
	server.StaticFiles("/assets/", assets.StaticFiles)

	err = server.ListenAndServe()
	if err != nil {
		log.Fatal("Failed to start the server: ", err)
	}
}
