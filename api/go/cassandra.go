package Cassandra

import (
  "github.com/gocql/gocql"
  "fmt"
)

var Session *gocql.Session

func init() {
  var err error

  cluster := gocql.NewCluster("10.0.0.137")
  cluster.Keyspace = "production"
  Session, err = cluster.CreateSession()
  if err != nil {
    panic(err)
  }
  fmt.Println("cassandra init done")
}
