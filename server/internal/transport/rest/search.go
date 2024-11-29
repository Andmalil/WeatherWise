package rest

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/Andmalil/WeatherWise/internal/core"
)

type HintService interface {
	HintList(string) []core.SearchHint
	CurrentWeather(id string) ([]byte, error)
}

type HintHandler struct {
	HintService HintService
}

func (h HintHandler) ListHintsHandler(w http.ResponseWriter, r *http.Request) {
	word := strings.TrimSpace(strings.ToLower(r.PathValue("word")))
	hintList := h.HintService.HintList(word)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(hintList)
}

func (h *HintHandler) GetCityCurrentWeather(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")

	weather, err := h.HintService.CurrentWeather(id)
	if err != nil {
		log.Println("Failed to get current weather: ", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Internal Server Error"))
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(weather)
}
