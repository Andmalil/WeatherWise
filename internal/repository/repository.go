package repository

import (
	"database/sql"
	"github.com/Andmalil/WeatherWise/internal/repository/postgresql"
	"github.com/Andmalil/WeatherWise/internal/service"
	"github.com/Andmalil/WeatherWise/internal/transport/rest/handlers"
	"log"

	_ "github.com/lib/pq"
)

func NewSearchManager() *handlers.HintHandler {
	dataSourceName := "postgresql://andy:vt5xZ0mWX4G0z4yqNoxYKT5ds1AkX9wQ@dpg-cs062223esus738tcoq0-a.oregon-postgres.render.com/weatherapp_p9w6"

	db, err := sql.Open("postgres", dataSourceName)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	hintStore := &postgresql.SQLHintStore{DB: db}
	hintService := service.HintService{HintStore: hintStore}
	hints, err := hintService.ListHints()

	if err != nil {
		log.Fatal(err)
	}
	hintHandler := handlers.HintHandler{Hints: hints}

	log.Println("Search manager is ready")

	return &hintHandler
}
