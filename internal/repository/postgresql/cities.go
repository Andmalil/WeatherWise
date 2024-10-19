package postgresql

import (
	"database/sql"
	"log"
	"weatherwise/internal/core"

	_ "github.com/lib/pq"
)

type HintStore interface {
	GetAllHints() ([]core.Hint, error)
}

type SQLHintStore struct {
	DB *sql.DB
}

func (s *SQLHintStore) GetAllHints() ([]core.Hint, error) {
	rows, err := s.DB.Query("SELECT id, name, lat, lng, name_ascii, country FROM cities ORDER BY name")
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	var hints []core.Hint

	for rows.Next() {
		var hint core.Hint
		if err := rows.Scan(&hint.Id, &hint.Name, &hint.Lat, &hint.Lng, &hint.Name_ascii, &hint.Country); err != nil {
			log.Println(err)
			return nil, err
		}

		hints = append(hints, hint)
	}
	return hints, nil

}
