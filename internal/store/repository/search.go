package repository

import (
	"database/sql"

	"github.com/Andmalil/WeatherWise/internal/core"

	_ "github.com/mattn/go-sqlite3"
)

type SQLHintStore struct {
	Database *sql.DB
}

func (s *SQLHintStore) GetHints() ([]core.SearchHint, error) {
	// db, err := sql.Open("sqlite3", "database/worldcities.db")
	// if err != nil {
	// 	log.Fatal(err)
	// }
	rows, err := s.Database.Query("SELECT name, name_ascii, lat, lng, country FROM city")
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var hints []core.SearchHint

	for rows.Next() {
		var hint core.SearchHint

		if err := rows.Scan(&hint.Name, &hint.NameASCII, &hint.Lat, &hint.Lng, &hint.Country); err != nil {
			return nil, err
		}

		hints = append(hints, hint)
	}

	return hints, nil
}
