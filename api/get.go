package Content

import (
  "net/http"
  "github.com/gocql/gocql"
  "encoding/json"
  "github.com/nholbrook/Cassandra"
  "github.com/gorilla/mux"
)

func GetFeed(w http.ResponseWriter, r *http.Request) {
  var feed []Content
  m := map[string]interface{}{}

  vars := mux.Vars(r)
  id := vars["owner_id"]
  id = r.URL.Query().Get("owner_id")

  query := "SELECT * FROM feeds WHERE owner_id = " + id
  iterable := Cassandra.Session.Query(query).Iter()

  for iterable.MapScan(m) {
     feed = append(feed, Content {
       ContentId: m["content_id"].(gocql.UUID),
       ActivityType: m["activity_type"].(string),
       City: m["city"].(string),
       Content: m["content"].(string),
       ContentType: m["content_type"].(string),
       Cost: m["cost"].(float32),
       ImageUrl: m["image_url"].(string),
       Name: m["name"].(string),
       OwnerId: m["owner_id"].(gocql.UUID),
       OwnerName: m["owner_name"].(string),
       OwnerUsername: m["owner_username"].(string),
       TotalSpots: int32(m["total_spots"].(int)),
       Visibility: m["visibility"].(string),
     })
     m = map[string]interface{}{}
   }
   json.NewEncoder(w).Encode(FeedResponse{Content: feed})
  }

  func Get(w http.ResponseWriter, r *http.Request) {
   var feed []Content
   m := map[string]interface{}{}

   vars := mux.Vars(r)
   id := vars["content_id"]
   id = r.URL.Query().Get("content_id")

   query := "SELECT * FROM content where content_id = " + id + " LIMIT 1"
   iterable := Cassandra.Session.Query(query).Iter()
   for iterable.MapScan(m) {
     feed = append(feed, Content {
       ContentId: m["content_id"].(gocql.UUID),
       ActivityType: m["activity_type"].(string),
       City: m["city"].(string),
       Content: m["content"].(string),
       ContentType: m["content_type"].(string),
       Cost: m["cost"].(float32),
       ImageUrl: m["image_url"].(string),
       Name: m["name"].(string),
       OwnerId: m["owner_id"].(gocql.UUID),
       OwnerName: m["owner_name"].(string),
       OwnerUsername: m["owner_username"].(string),
       TotalSpots: int32(m["total_spots"].(int)),
       Visibility: m["visibility"].(string),
     })
     m = map[string]interface{}{}
   }
 json.NewEncoder(w).Encode(FeedResponse{Content: feed})
}
