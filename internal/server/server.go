package server

import (
	"context"
	"log"
	"net/http"
	"strings"
	"time"
)

type Server struct {
	HttpServer  *http.Server
	Address     string
	ReadTimeout time.Duration
	Handlers    map[string]func(http.ResponseWriter, *http.Request)
	Middlewares []func(http.Handler) http.Handler
}

func New(address string, read_timeout time.Duration) *Server {
	return &Server{
		HttpServer: &http.Server{
			Addr:        address,
			ReadTimeout: read_timeout,
		},
		Address:     address,
		ReadTimeout: read_timeout,
		Handlers:    make(map[string]func(http.ResponseWriter, *http.Request)),
	}
}

func (s *Server) ListenAndServe() error {
	mux := http.NewServeMux()

	for p, f := range s.Handlers {

		mux.Handle(p, CreateMiddlewareFunc(s.Middlewares, f))

	}

	s.HttpServer.Handler = mux

	log.Printf("Starting server on: %v\n", s.Address)
	return s.HttpServer.ListenAndServe()
}

func (s *Server) Stop(ctx context.Context) error {
	log.Println("Stopping server")
	return s.HttpServer.Shutdown(ctx)
}

func (s *Server) GET(pattern string, HandlerFunc func(http.ResponseWriter, *http.Request)) {
	s.Handlers["GET "+strings.TrimSpace(pattern)] = HandlerFunc
}

func (s *Server) UseMiddleware(middleware func(http.Handler) http.Handler) {
	s.Middlewares = append(s.Middlewares, middleware)
}

func CreateMiddlewareFunc(middlewares []func(http.Handler) http.Handler, handler func(http.ResponseWriter, *http.Request)) http.Handler {
	if len(middlewares) > 0 {
		middleware := middlewares[0](http.HandlerFunc(handler))
		for _, m := range middlewares[1:] {
			middleware = m(middleware)
		}

		return middleware
	}

	return http.HandlerFunc(handler)
}
