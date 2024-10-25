package middleware

import (
	"log"
	"net/http"
)

func RoutingLogging(next http.HandlerFunc) http.HandlerFunc {

	log.Printf("Hello")
	return next
}
