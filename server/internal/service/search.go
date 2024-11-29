package service

import (
	"os"
	"strconv"
	"strings"

	"github.com/Andmalil/WeatherWise/internal/core"
	"github.com/Andmalil/WeatherWise/internal/weatherapi"
)

type HintService struct {
	Store []core.SearchHint
}

func (s HintService) HintList(Word string) []core.SearchHint {
	var suitableHints []core.SearchHint

	if len(s.Store) > 0 {
		for i := range s.Store {
			if strings.Index(strings.ToLower(s.Store[i].Name), Word) == 0 || strings.Index(strings.ToLower(s.Store[i].NameASCII), Word) == 0 {

				suitableHints = append(suitableHints, s.Store[i])
			}

			if len(suitableHints) >= 40 {
				break
			}
		}
	}
	return suitableHints
}

func (s HintService) CurrentWeather(id string) ([]byte, error) {
	var city core.SearchHint
	id_int, err := strconv.Atoi(id)

	if err != nil {
		return nil, err
	}

	for i := range s.Store {

		if s.Store[i].ID == id_int {
			city = s.Store[i]
			break
		}
	}
	weather_api := weatherapi.WeatherApi{Url: os.Getenv("WEATHER_API_URL"), Key: os.Getenv("WEATHER_API_KEY")}
	weather := weather_api.GetWeather(city.Lat, city.Lng)

	return weather, nil
}
