package service

import (
	"weatherwise/internal/core"
	"weatherwise/internal/repository/postgresql"
)

type HintService struct {
	HintStore postgresql.HintStore
}

func (s *HintService) ListHints() ([]core.Hint, error) {
	return s.HintStore.GetAllHints()
}
