package core

type Hint struct {
	Id         int     `json:"id"`
	Name       string  `json:"name"`
	Lat        float32 `json:"lat"`
	Lng        float32 `json:"lng"`
	Name_ascii string  `json:"name_ascii"`
	Country    string  `json:"country"`
}
