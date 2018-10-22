package Content

import (
  "time"
  "net/http"
  "github.com/gocql/gocql"
  "strconv"
  "strings"
)

func appendError(errs []string, errStr string) ([]string) {
  if len(errStr) > 0 {
    errs = append(errs, errStr)
  }
  return errs
}

func processFormField(r *http.Request, field string, optional bool) (string, string) {
  fieldData := r.PostFormValue(field)
  if len(fieldData) == 0 && optional == false {
    return "", "Missing '" + field + "' parameter, cannot continue"
  }
  return fieldData, ""
}

func NewContent(r *http.Request) (Content, []string) {
  var content Content
  var errStr, costStr, totalSpotsStr, ownerIdStr, startDateStr, endDateStr, subscriptionsStr string
  var errs []string
  var err error
  var tempInt int64
  var tempFloat float64

  content.ContentId, _  = gocql.RandomUUID()
  content.Content, errStr = processFormField(r, "content", false)
  errs = appendError(errs, errStr)
  content.ActivityType, errStr = processFormField(r, "activity_type", true)
  errs = appendError(errs, errStr)
  content.City, errStr = processFormField(r, "city", true)
  errs = appendError(errs, errStr)
  content.ContentType, errStr = processFormField(r, "content_type", false)
  errs = appendError(errs, errStr)
  costStr, errStr = processFormField(r, "cost", true)
  if len(errStr) != 0 {
    errs = append(errs, errStr)
  } else if costStr != "" {
    tempFloat, err = strconv.ParseFloat(costStr, 32)
    if err == nil {
      content.Cost = float32(tempFloat)
    } else if err != nil {
      errs = append(errs, "Parameter 'cost' is not a float32")
    }
}
errs = appendError(errs, errStr)
content.ImageUrl, errStr = processFormField(r, "image_url", true)
errs = appendError(errs, errStr)
content.Name, errStr = processFormField(r, "name", true)
errs = appendError(errs, errStr)
//OWNER ID
ownerIdStr, errStr = processFormField(r, "owner_id", false)
if len(errStr) != 0 {
errs = append(errs, errStr)
} else {
content.OwnerId, err = gocql.ParseUUID(ownerIdStr)
if err != nil {
errs = append(errs, "Parameter 'owner_id' is not a UUID")
}
}

//TOTAL SPOTS
totalSpotsStr, errStr = processFormField(r, "total_spots", true)
if len(errStr) != 0 {
errs = append(errs, errStr)
} else if totalSpotsStr != "" {
tempInt, err = strconv.ParseInt(totalSpotsStr, 10, 32)
if err == nil {
content.TotalSpots = int32(tempInt)
} else if err != nil {
errs = append(errs, "Parameter 'total_spots' is not an int32")
}
}

content.Visibility, errStr = processFormField(r, "visibility", false)
errs = appendError(errs, errStr)

//START DATE
startDateStr, errStr = processFormField(r, "start_date", true)
if len(errStr) != 0 {
errs = append(errs, errStr)
} else if startDateStr != "" {
content.StartDate, err = time.Parse(time.RFC3339, startDateStr)
if err != nil {
errs = append(errs, "Parameter 'start_date' is not a timestamp")
}
}

//END DATE
endDateStr, errStr = processFormField(r, "end_date", true)
if len(errStr) != 0 {
  errs = append(errs, errStr)
} else if endDateStr != "" {
  content.EndDate, err = time.Parse(time.RFC3339, endDateStr)
  if err != nil {
    errs = append(errs, "Parameter 'end_date' is not a timestamp")
  }
}

content.OwnerType, errStr = processFormField(r, "owner_type", false)
errs = appendError(errs, errStr)

content.OwnerName, errStr = processFormField(r, "owner_name", false)
errs = appendError(errs, errStr)

content.OwnerUsername, errStr = processFormField(r, "owner_username", false)
errs = appendError(errs, errStr)

subscriptionsStr, errStr = processFormField(r, "subscriptions", false)
if len(errStr) != 0 {
  errs = append(errs, errStr)
} else {
  content.Subscriptions = strings.Split(subscriptionsStr, ",")
}

return content, errs
}
