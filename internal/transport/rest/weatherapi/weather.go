package weatherapi

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
)

type WeatherApi struct {
	Url string
	Key string
}

func (w WeatherApi) GetWeather(lat float32, lng float32) []byte {
	params := url.Values{}
	params.Add("key", w.Key)
	params.Add("q", fmt.Sprintf("%g,%g", lat, lng))

	u, _ := url.ParseRequestURI(w.Url)
	u.RawQuery = params.Encode()

	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%v", u), nil)

	if err != nil {
		log.Println(err)
	}

	req.Header.Set("Content-Type", "application/json")
	client := http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		log.Println(err)
	}
	defer resp.Body.Close()

	log.Println("response Status:", resp.Status)
	body, _ := io.ReadAll(resp.Body)
	return body
}
