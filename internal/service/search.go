package service

import (
	"github.com/Andmalil/WeatherWise/internal/core"
	"github.com/Andmalil/WeatherWise/internal/repository/postgresql"
)

type HintService struct {
	HintStore postgresql.HintStore
}

func (s *HintService) ListHints() ([]core.Hint, error) {
	return s.HintStore.GetAllHints()
}
