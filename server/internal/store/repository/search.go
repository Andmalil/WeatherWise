package repository

import (
	"database/sql"

	"github.com/Andmalil/WeatherWise/internal/core"
	"github.com/cvilsmeier/sqinn-go/sqinn"
)

type SQLHintStore struct {
	Database *sql.DB
}

func (s *SQLHintStore) GetHints() ([]core.SearchHint, error) {
	sq := sqinn.MustLaunch(sqinn.Options{
		SqinnPath: "./config/sql/sqinn.exe",
	})
	defer sq.Terminate()

	sq.MustOpen("./internal/store/repository/database/worldcities.db")
	defer sq.Close()

	var hints []core.SearchHint
	rows := sq.MustQuery("SELECT id, name, name_ascii, lat, lng, country FROM city", nil, []byte{sqinn.ValInt, sqinn.ValText, sqinn.ValText, sqinn.ValDouble, sqinn.ValDouble, sqinn.ValText})
	for _, row := range rows {
		hints = append(hints, core.SearchHint{
			ID:        row.Values[0].AsInt(),
			Name:      row.Values[1].AsString(),
			NameASCII: row.Values[2].AsString(),
			Lat:       float32(row.Values[3].AsDouble()),
			Lng:       float32(row.Values[4].AsDouble()),
			Country:   row.Values[5].AsString(),
		})
	}

	return hints, nil
}
