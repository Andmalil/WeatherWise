package server

import (
	"context"
	"embed"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/Andmalil/WeatherWise/internal/core"
)

type HintDatabase interface {
	HintList() ([]core.SearchHint, error)
}
type Server struct {
	httpServer        *http.Server
	address           string
	readTimeout       time.Duration
	handlers          map[string]func(http.ResponseWriter, *http.Request)
	middlewares       []func(http.Handler) http.Handler
	staticFilesPrefix string
	staticFiles       embed.FS
}

func New(address string, read_timeout time.Duration) *Server {
	return &Server{
		httpServer: &http.Server{
			Addr:        address,
			ReadTimeout: read_timeout,
		},
		address:     address,
		readTimeout: read_timeout,
		handlers:    make(map[string]func(http.ResponseWriter, *http.Request)),
	}
}

func (s *Server) ListenAndServe() error {
	mux := http.NewServeMux()

	if s.handlers != nil {
		for p, f := range s.handlers {
			mux.Handle(p, CreateMiddlewareFunc(s.middlewares, f))
		}
		if s.staticFilesPrefix != "" {
			mux.Handle("GET "+s.staticFilesPrefix, http.StripPrefix(s.staticFilesPrefix, http.FileServerFS(s.staticFiles)))
		}
		s.httpServer.Handler = mux
	}

	log.Printf("Starting server on: %v\n", s.address)
	return s.httpServer.ListenAndServe()
}

func (s *Server) Stop(ctx context.Context) error {
	log.Println("Stopping server")
	return s.httpServer.Shutdown(ctx)
}

func (s *Server) GET(pattern string, HandlerFunc func(http.ResponseWriter, *http.Request)) {
	s.handlers["GET "+strings.TrimSpace(pattern)] = HandlerFunc
}

func (s *Server) UseMiddleware(middleware func(http.Handler) http.Handler) {
	s.middlewares = append(s.middlewares, middleware)
}

func (s *Server) StaticFiles(prefix string, files embed.FS) {
	s.staticFilesPrefix = prefix
	s.staticFiles = files
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
