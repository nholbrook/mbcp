package Content

import (
  "time"
  "github.com/gocql/gocql"
)

type Content struct {
  ContentId gocql.UUID `json:"content_id,omitempty"`
  ActivityType string `json:"activity_type,omitempty"`
  City string `json:"city,omitempty"`
  Content string `json:"content,omitempty"`
  ContentType string `json:"content_type,omitempty"`
  Cost float32 `json:"cost,omitempty"`
  StartDate time.Time `json:"start_date,omitempty"`
  EndDate time.Time `json:"end_date,omitempty"`
  ImageUrl string `json:"image_url,omitempty"`
  Name string `json:"name,omitempty"`
  OwnerId gocql.UUID `json:"owner_id,omitempty"`
  OwnerType string `json:"owner_type,omitempty"`
  OwnerName string `json:"owner_name,omitempty"`
  OwnerUsername string `json:"owner_username,omitempty"`
  TotalSpots int32 `json:"total_spots,omitempty"`
  Visibility string `json:"visibility,omitempty"`
  Subscriptions []string `json:"subscriptions,omitempty"`
}

type GetContentResponse struct {
        Content Content `json:"content"`
}

type FeedResponse struct {
        Content []Content `json:"feed"`
}

type NewContentResponse struct {
        ID gocql.UUID `json:"id"`
}

type ErrorResponse struct {
        Errors []string `json:"errors"`
}
