package rest

import (
	"context"
	"fmt"
	"log"
	"net/http"
)

type MiddlewareFunc func(next http.HandlerFunc) http.HandlerFunc
type Server struct {
	httpServer *http.Server
	Router     Router
	Middleware []MiddlewareFunc
}

func NewServer(Router Router, Port int) *Server {

	return &Server{
		httpServer: &http.Server{
			Addr:    fmt.Sprintf(":%d", Port),
			Handler: Router.Mux,
		},
		Router:     Router,
		Middleware: make([]MiddlewareFunc, 0),
	}
}

func (s *Server) ListenAndServe() error {
	s.Router.CreateRoutes()
	log.Println("Starting server on port :3000")
	return s.httpServer.ListenAndServe()
}

func (s *Server) Stop(ctx context.Context) error {
	return s.httpServer.Shutdown(ctx)
}

func (s *Server) UseMiddleware(middleware ...MiddlewareFunc) {
	s.Middleware = append(s.Middleware, middleware...)
}
