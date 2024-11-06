package app

import (
	"context"
	"database/sql"
	"log"
	"strconv"
	"time"

	"github.com/Andmalil/WeatherWise/assets"
	"github.com/Andmalil/WeatherWise/internal/middleware"
	"github.com/Andmalil/WeatherWise/internal/server"
	"github.com/Andmalil/WeatherWise/internal/service"
	"github.com/Andmalil/WeatherWise/internal/store/cash"
	"github.com/Andmalil/WeatherWise/internal/store/repository"
	"github.com/Andmalil/WeatherWise/internal/transport/rest"
	"github.com/Andmalil/WeatherWise/templates"
)

func Run() {
	hints_db, err := sql.Open("sqlite3", "database/worldcities.db")
	if err != nil {
		log.Fatal(err)
	}

	server := server.New(":3000", 10*time.Second)

	hintTask := &repository.SQLHintStore{Database: hints_db}
	hintService := &service.HintService{Store: hintTask}
	hintHandler := rest.HintHandler{HintService: hintService}

	hint_cash := cash.New(context.Background(), "127.0.0.1:6379", "", 0)
	hint_list, err := hintService.HintList()

	if err != nil {
		log.Fatal(err)
	}
	for _, h := range hint_list {
		hint_cash.Set(strconv.Itoa(h.ID), strconv.Itoa(h.ID))
		hint_cash.Get(strconv.Itoa(h.ID))
	}

	homePage := rest.HomePage{Template: templates.TemplateFiles}
	server.GET("/", homePage.Home)

	server.GET("/citysearch/{word}", hintHandler.ListHintsHandler)
	server.UseMiddleware(middleware.LoggingMiddleware)
	server.StaticFiles("/assets/", assets.StaticFiles)

	err = server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
