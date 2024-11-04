package service

import (
	"github.com/Andmalil/WeatherWise/internal/core"
)

type HintStore interface {
	GetHints() ([]core.SearchHint, error)
}

type HintService struct {
	Store HintStore
}

func (s *HintService) HintList() ([]core.SearchHint, error) {
	return s.Store.GetHints()
}
