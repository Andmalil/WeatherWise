package main

import (
	"log"
	"os"
	"weatherwise/assets"
	"weatherwise/internal/repository"
	"weatherwise/internal/transport/rest"
)

func checkErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	database := repository.NewSearchManager()
	server := rest.NewServer(3000, assets.StaticFile, database)

	log.Println("Starting server on port :" + os.Getenv("SERVERPORT"))
	err := server.ListenAndServe()
	checkErr(err)
}
