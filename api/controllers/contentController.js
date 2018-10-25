'use strict';

var mongoose = require('mongoose'),
  Content = mongoose.model('Content');

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
  contactPoints: ['10.0.0.137'],
  keyspace: 'production'
});

exports.get_feed = function(req, res) {
  const query =
    'SELECT content_id, created_date, activity_type, city, content, content_type, cost, image_url, name, owner_id, owner_name, owner_type, owner_username, total_spots, visibility FROM feeds WHERE owner_id = ?';
  const params = [req.query.id];
  client.execute(query, params, function(err, result) {
    if (err != null) res.json(err);
    res.json(result);
  });
};

exports.get_content = function(req, res) {
  const query =
    'SELECT content_id, created_date, activity_type, city, content, content_type, cost, image_url, name, owner_id, owner_name, owner_type, owner_username, total_spots, visibility FROM content WHERE content_id = ?';
  const params = [req.query.id];
  client.execute(query, params, function(err, result) {
    if (err != null) console.log(err);
    res.json(result);
  });
};

exports.create_content = function(req, res) {
  const query =
    'INSERT INTO content (content_id, created_date, activity_type, city, content, content_type, cost, image_url, name, owner_id, owner_name, owner_type, owner_username, total_spots, visibility) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const params = [
    '58bf448f-cc9f-43d6-aba4-1a980685c622',
    '2018-10-25 19:14:06+0000',
    'other',
    '',
    'This is a NodeJS post.',
    'post',
    '',
    '',
    '',
    '10000000-0000-0000-0000-000000000000',
    'Nick Holbrook',
    'user',
    'nholbrook',
    '',
    'public'
  ];
  client.execute(query, function(err, result) {
    if (err != null) res.json(err);
    res.json(result);
  });
};

exports.read_content = function(req, res) {
  Content.findById(req.params.taskId, function(err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.update_content = function(req, res) {
  Content.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true },
    function(err, task) {
      if (err) res.send(err);
      res.json(task);
    }
  );
};

exports.delete_content = function(req, res) {
  Content.remove(
    {
      _id: req.params.taskId
    },
    function(err, task) {
      if (err) res.send(err);
      res.json({ message: 'Task successfully deleted' });
    }
  );
};
