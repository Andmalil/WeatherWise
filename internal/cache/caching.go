package cache

import (
	"context"
	"log"
	"strconv"

	"github.com/Andmalil/WeatherWise/internal/core"
)

type HintService interface {
	GetHints() ([]core.SearchHint, error)
}

func Caching(db HintService) {
	hint_cash := New(context.Background(), "127.0.0.1:6379", "", 0)
	hint_cash.Client.FlushAll(hint_cash.Ctx)
	log.Println("Start caching...")

	hint_list, err := db.GetHints()

	if err != nil {
		log.Fatal("Failed to recieve of the hint list: ", err)
	}

	for _, h := range hint_list {
		hint_cash.Set(strconv.Itoa(h.ID), "name", h.Name, "name_ascii", h.NameASCII, "lat", h.Lat, "lng", h.Lng, "country", h.Country)
	}

	log.Println("Caching is over.")
}
