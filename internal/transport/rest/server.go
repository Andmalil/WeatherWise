package rest

import (
	"context"
	"embed"
	"fmt"
	"net/http"
	"weatherwise/internal/transport/rest/handlers"
)

type Server struct {
	httpServer *http.Server
}

func NewServer(port int, static_files embed.FS, database *handlers.HintHandler) *Server {
	router := Router{Router: http.NewServeMux(), StaticFiles: static_files, database: database}
	router.CreateRoutes()

	return &Server{
		httpServer: &http.Server{
			Addr:    fmt.Sprintf(":%d", port),
			Handler: router.Router,
		},
	}
}

func (s *Server) ListenAndServe() error {
	return s.httpServer.ListenAndServe()
}

func (s *Server) Stop(ctx context.Context) error {
	return s.httpServer.Shutdown(ctx)
}
