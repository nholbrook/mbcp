package Content

import (
  "net/http"
  "github.com/gocql/gocql"
  "encoding/json"
  "github.com/nholbrook/Cassandra"
  "fmt"
  "time"
)

func Post(w http.ResponseWriter, r *http.Request) {
  var errs []string
  var gocqlUuid gocql.UUID

  content, errs := NewContent(r)

  var createdContent = false
  var createdFeed = false

  if len(errs) == 0 {
    fmt.Println("creating new content")

    gocqlUuid = gocql.TimeUUID()
    t := time.Now()

    if err := Cassandra.Session.Query(`
      INSERT INTO content (content_id, created_date, activity_type, city, content, content_type, cost, image_url, name, owner_id, total_spots, visibility, start_date, end_date, owner_type, owner_name, owner_username)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        content.ContentId,
        t,
        content.ActivityType,
        content.City,
        content.Content,
        content.ContentType,
        content.Cost,
        content.ImageUrl,
        content.Name,
        content.OwnerId,
        content.TotalSpots,
        content.Visibility,
        content.StartDate,
        content.EndDate,
        content.OwnerType,
        content.OwnerName,
        content.OwnerUsername,
      ).Exec(); err != nil {
      errs = append(errs, err.Error())
    } else {
      createdContent = true
    }

  for i := 0; i < len(content.Subscriptions); i++ {
     if err := Cassandra.Session.Query(`
      INSERT INTO feeds (content_id, created_date, activity_type, city, content, content_type, cost, image_url, name, owner_id, total_spots, visibility, start_date, end_date, owner_type, owner_name, owner_username)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        content.ContentId,
        t,
        content.ActivityType,
        content.City,
        content.Content,
        content.ContentType,
        content.Cost,
        content.ImageUrl,
        content.Name,
        content.Subscriptions[i],
        content.TotalSpots,
        content.Visibility,
        content.StartDate,
        content.EndDate,
        content.OwnerType,
        content.OwnerName,
        content.OwnerUsername,
      ).Exec(); err != nil {
      errs = append(errs, err.Error())
      createdFeed = false
    } else {
      createdFeed = true
    }
  }
}

fmt.Println("test", r)

if createdContent && createdFeed {
  fmt.Println("content_id", gocqlUuid)
  json.NewEncoder(w).Encode(NewContentResponse{ID: gocqlUuid})
} else {
  fmt.Println("errors", errs)
  json.NewEncoder(w).Encode(ErrorResponse{Errors: errs})
}
}
