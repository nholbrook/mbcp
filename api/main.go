package main

import (
    "github.com/gorilla/mux"
    "github.com/gorilla/handlers"
    "log"
    "net/http"
    "github.com/nholbrook/Cassandra"
    "github.com/nholbrook/Content"
)

func main() {
  CassandraSession := Cassandra.Session
  defer CassandraSession.Close()

  headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Access-Control-Allow-Origin"})
  originsOk := handlers.AllowedOrigins([]string{"*"})
  methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

  router := mux.NewRouter()
  router.HandleFunc("/v1/feed", Content.GetFeed).Methods("GET")
  router.HandleFunc("/v1/content", Content.Get).Methods("GET")
  router.HandleFunc("/v1/content", Content.Post).Methods("POST")
  log.Fatal(http.ListenAndServe(":80",handlers.CORS(originsOk, headersOk, methodsOk)(router)))
}
