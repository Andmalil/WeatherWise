package handlers

import (
	"encoding/json"
	"github.com/Andmalil/WeatherWise/internal/core"
	"github.com/Andmalil/WeatherWise/internal/transport/rest/weatherapi"
	"log"
	"net/http"
	"strconv"
	"strings"
)

type HintHandler struct {
	Hints []core.Hint
}

func (h *HintHandler) ListHintsHandler(w http.ResponseWriter, r *http.Request) {
	word := strings.TrimSpace(strings.ToLower(r.PathValue("word")))
	var hints []core.Hint

	if len(h.Hints) > 0 {
		for i := range h.Hints {
			if strings.Index(strings.ToLower(h.Hints[i].Name), word) == 0 || strings.Index(strings.ToLower(h.Hints[i].Name_ascii), word) == 0 {

				hints = append(hints, h.Hints[i])
			}

			if len(hints) >= 30 {
				break
			}
		}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(hints)
}

func (h *HintHandler) GetCityCoordinates(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	log.Println(id)
	var city core.Hint
	for i := range h.Hints {
		id_int, err := strconv.Atoi(id)

		if err != nil {
			log.Println(err)
			return
		}

		if h.Hints[i].Id == id_int {
			city = h.Hints[i]
			break
		}
	}
	weather_api := weatherapi.WeatherApi{Url: "http://api.weatherapi.com/v1/current.json", Key: "3b63195cbc744f2f843152516242009"}
	weather := weather_api.GetWeather(city.Lat, city.Lng)

	w.Header().Set("Content-Type", "application/json")
	w.Write(weather)
}
