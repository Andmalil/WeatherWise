package rest

import (
	"context"
	"embed"
	"fmt"
	"github.com/Andmalil/WeatherWise/internal/transport/rest/handlers"
	"log"
	"net/http"
	"strings"
)

type Handler struct {
	Pattern string
	Func    func(context.Context)
}

type MiddlewareFunc func(next http.HandlerFunc) http.HandlerFunc
type Server struct {
	httpServer *http.Server
	Mux        *http.ServeMux
	Handlers   []Handler
	// Router     Router
	Middleware []MiddlewareFunc
}

func NewServer(Address string, StaticFiles embed.FS, Database *handlers.HintHandler) *Server {

	return &Server{
		httpServer: &http.Server{
			Addr:    Address,
			Handler: http.NewServeMux(),
		},
		// Router:     Router,
		Middleware: make([]MiddlewareFunc, 0),
	}
}

func (s *Server) ListenAndServe() error {
	// s.Router.CreateRoutes()
	// for h := range s.Handlers {
	// 	s.httpServer.Handler = h.Func
	// }
	log.Println("Starting server on port :3000")
	return s.httpServer.ListenAndServe()
}

func (s *Server) Stop(ctx context.Context) error {
	return s.httpServer.Shutdown(ctx)
}

func (s *Server) UseMiddleware(middleware ...MiddlewareFunc) {
	s.Middleware = append(s.Middleware, middleware...)
}

func (s *Server) GET(ctx context.Context, pattern string, handler func(context.Context)) {
	s.Handlers = append(s.Handlers, Handler{Pattern: fmt.Sprintf("GET %s", strings.TrimSpace(pattern)), Func: handler})
}
