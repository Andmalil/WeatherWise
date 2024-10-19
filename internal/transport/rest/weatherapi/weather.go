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

// type WeatherLocation struct {
// 	name    string
// 	region  string
// 	country string
// 	lat     float32
// 	lng     float32
// 	tz_id   string
// }

// type WeatherJSON struct {
// 	Location WeatherLocation
// }

func (w WeatherApi) GetWeather(lat float32, lng float32) []byte {
	// var coordinatesJSON = fmt.Sprintf(`{"key":"%s","q":"%g,%g"}`, w.Key, lat, lng)
	params := url.Values{}
	params.Add("key", w.Key)
	params.Add("q", fmt.Sprintf("%g,%g", lat, lng))

	u, _ := url.ParseRequestURI(w.Url)
	u.RawQuery = params.Encode()

	req, err := http.NewRequest("GET", fmt.Sprintf("%v", u), nil)

	if err != nil {
		log.Println(err)
	}

	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		log.Println(err)
	}
	defer resp.Body.Close()

	fmt.Println("response Status:", resp.Status)
	body, _ := io.ReadAll(resp.Body)
	return body
}
