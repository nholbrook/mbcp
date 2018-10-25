'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContentSchema = new Schema({
  content_id: {
    type: String,
    required: 'content id is required.'
  },
  created_date: {
    type: Date,
    required: 'created date is required.'
  },
  activity_type: {
    type: String
  },
  city: {
    type: String
  },
  content: {
    type: String
  },
  content_type: {
    type: [
      {
        type: String,
        enum: ['post', 'trip', 'comment']
      }
    ],
    required: 'content type is required'
  },
  cost: {
    type: String
  },
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  },
  image_url: {
    type: String
  },
  name: {
    type: String
  },
  owner_id: {
    type: String,
    required: 'owner id is required'
  },
  owner_type: {
    type: [
      {
        type: String,
        enum: ['user', 'organization']
      }
    ],
    required: 'owner type is required'
  },
  owner_name: {
    type: String,
    required: 'owner name is required'
  },
  owner_username: {
    type: String,
    required: 'owner username is required'
  },
  total_spots: {
    type: String
  },
  visibility: {
    type: [
      {
        type: String,
        enum: ['public', 'protected', 'private']
      }
    ],
    default: ['public']
  },
  subscriptions: {
    type: String,
    required: 'subscriptions are required'
  },
  activity_type: {
    type: [
      {
        type: String,
        enum: ['pending', 'ongoing', 'completed']
      }
    ],
    required: 'activity type is required'
  }
});

module.exports = mongoose.model('Content', ContentSchema);
