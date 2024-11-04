package rest

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/Andmalil/WeatherWise/internal/core"
	"github.com/Andmalil/WeatherWise/internal/weatherapi"
)

type HintService interface {
	HintList() ([]core.SearchHint, error)
}

type HintHandler struct {
	HintService HintService
}

func (h *HintHandler) ListHintsHandler(w http.ResponseWriter, r *http.Request) {
	word := strings.TrimSpace(strings.ToLower(r.PathValue("word")))
	hints, err := h.HintService.HintList()
	if err != nil {
		log.Fatal(err)
	}

	var suitableHints []core.SearchHint

	if len(hints) > 0 {
		for i := range hints {
			if strings.Index(strings.ToLower(hints[i].Name), word) == 0 || strings.Index(strings.ToLower(hints[i].NameASCII), word) == 0 {

				suitableHints = append(suitableHints, hints[i])
			}

			if len(suitableHints) >= 30 {
				break
			}
		}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(suitableHints)
}

func (h *HintHandler) GetCityCoordinates(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	hints, err := h.HintService.HintList()
	if err != nil {
		log.Fatal(err)
	}

	var city core.SearchHint
	for i := range hints {
		id_int, err := strconv.Atoi(id)

		if err != nil {
			log.Println(err)
			return
		}

		if hints[i].ID == id_int {
			city = hints[i]
			break
		}
	}
	weather_api := weatherapi.WeatherApi{Url: "http://api.weatherapi.com/v1/current.json", Key: "3b63195cbc744f2f843152516242009"}
	weather := weather_api.GetWeather(city.Lat, city.Lng)

	w.Header().Set("Content-Type", "application/json")
	w.Write(weather)
}
